import { deliveryAllowed, storeVisibleForPostal } from './delivery-context.js';
import { resolveSelection, validateCart } from './product-types.js';
import { readMarketplace, pickupAllowed, commercialDiscount, establishmentSnapshot } from './marketplace-settings.js';
export const ORDER_STORES=[{id:0,name:'Casa Aurora',city:'Cianorte',rate:250,maxKm:10,cutoff:'15:00'},{id:1,name:'Essencial Concept',city:'Maringá',rate:200,maxKm:15,cutoff:'15:00'},{id:2,name:'Verde & Vida',city:'Cianorte',rate:180,maxKm:8,cutoff:'15:00'}];
export const ORDER_STATUS={pending:'Pedido realizado',failed:'Pagamento não aprovado',paid:'Pagamento confirmado',preparing:'Em separação',shipping:'Pronto para envio',dispatched:'Saiu para entrega',ready:'Pronto para retirada',completed:'Entregue',cancelled:'Pedido cancelado',held:'Pedido em análise'};
export function statusLabel(s,status=s.status){return status==='completed'?(s.method==='pickup'?'Pedido retirado':s.method==='digital'?'Produto entregue':'Entregue'):ORDER_STATUS[status]||status}
export function orderEvent(order,s,status,now=new Date().toISOString()){
  if(s.history.at(-1)?.status===status)return;
  s.status=status;s.history.push({status,at:now});order.notifications||=[];
  const settings=readMarketplace();
  for(const channel of ['email','whatsapp']){const eventId=`${s.id}:${s.history.length}:${channel}`;if(order.notifications.some(n=>n.id===eventId))continue;order.notifications.push({id:eventId,subId:s.id,channel,status,at:now,state:'awaiting_provider',recipient:order.contact?.[channel]||'',subject:statusLabel(s,status),body:settings.notifications[channel].replaceAll('{pedido}',s.id).replaceAll('{status}',statusLabel(s,status)),downloads:status==='completed'&&s.method==='digital'?s.items.filter(i=>i.type==='virtual').map(i=>({productId:i.id,name:i.name,access:'Área autenticada de downloads — arquivo demonstrativo'})):[]});}
}
export function orderDispatch(instant,cutoff='15:00'){
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(instant)).map(p=>[p.type,p.value]));
  const day=new Date(`${parts.year}-${parts.month}-${parts.day}T12:00:00Z`);
  if([0,6].includes(day.getUTCDay())||`${parts.hour}:${parts.minute}`>=cutoff)day.setUTCDate(day.getUTCDate()+1);
  while([0,6].includes(day.getUTCDay()))day.setUTCDate(day.getUTCDate()+1);
  return day.toISOString().slice(0,10);
}
export function checkoutQuote(catalog,lines,delivery){
  if(!lines.length)throw Error('Sua sacola está vazia.');validateCart(catalog,lines);
  const groups=new Map();
  for(const line of lines){const p=catalog.find(p=>p.id===line.id),q=resolveSelection(catalog,p,line.selection,line.qty);if(!groups.has(p.store))groups.set(p.store,{store:p.store,storeName:(readMarketplace().stores.find(s=>s.id===p.store)||{}).name||'Loja',items:[],subtotal:0,physical:false});const g=groups.get(p.store);g.items.push({id:p.id,name:p.name,type:p.type,qty:line.qty,unitCents:q.unitCents,totalCents:q.totalCents,label:q.label,parts:q.parts.map(x=>({name:x.name,label:x.label,qty:x.componentQty*line.qty})),selection:structuredClone(line.selection)});g.subtotal+=q.totalCents;g.physical||=p.type!=='virtual';}
  return [...groups.values()].map(g=>{const config=readMarketplace().stores.find(s=>s.id===g.store)||ORDER_STORES[g.store],d=delivery[g.store]||{method:'pickup'},method=g.physical?d.method:'digital';if(config.status&&config.status!=='active')throw Error('Esta loja está suspensa para novas compras.');if(!['delivery','pickup','digital'].includes(method)||(g.physical&&method==='digital'))throw Error('Escolha entrega ou retirada para os itens físicos.');let freight=0;if(method!=='pickup'&&d.cep&&!storeVisibleForPostal(g.store,d.cep))throw Error(config.name+': loja fora da cobertura do CEP selecionado.');
    if(method==='pickup'&&d.cep!==undefined&&!pickupAllowed(config,d.cep))throw Error(`${config.name}: retirada fora da região do CEP do comprador.`);
    if(method==='delivery'){if(!d.cep&&d.city!==config.city)throw Error(`${config.name}: cidade fora da cobertura demonstrativa. Escolha retirada ou outro endereço.`);if(!Number.isFinite(d.km)||d.km<=0||d.km>config.maxKm)throw Error(`${config.name}: distância deve ser maior que zero e até ${config.maxKm} km.`);freight=Math.round(d.km*config.rate);}
    if(method==='delivery'&&d.cep){const cep=String(d.cep).replace(/\D/g,'');if(!deliveryAllowed(config,cep))throw Error('CEP fora da cobertura da loja.');}
    const benefits=commercialDiscount(g.subtotal,freight,d.coupon);return {...g,method,km:method==='delivery'?d.km:0,originalFreight:freight,...benefits,total:g.subtotal-benefits.discount+benefits.freight,commission:Math.round((g.subtotal-benefits.discount)*readMarketplace().commission/100),cutoff:config.cutoff,rate:config.rate,establishment:establishmentSnapshot(config)};});
}
export function validateOrderStock(catalog,lines,orders,excludeId=null){
  const reserved=orders.filter(o=>!o.demoData&&o.id!==excludeId&&['pending','paid'].includes(o.payment)).flatMap(o=>o.suborders.filter(s=>s.status!=='cancelled').flatMap(s=>s.items.map(i=>({id:i.id,qty:i.qty,selection:i.selection}))));
  return validateCart(catalog,[...reserved,...lines]);
}
export function createDemoOrder(catalog,lines,delivery,address,paymentMethod,orders,now=new Date().toISOString()){
  if(!['pix','card'].includes(paymentMethod)||!readMarketplace()[paymentMethod])throw Error('Escolha uma forma de pagamento habilitada.');validateOrderStock(catalog,lines,orders);
  if(lines.some(l=>catalog.find(p=>p.id===l.id)?.type!=='virtual')&&!/^\d{8}$/.test(String(address?.cep||'').replace(/\D/g,'')))throw Error('Preencha o CEP do comprador para entrega ou retirada.');
  const checkedDelivery=Object.fromEntries([...new Set(lines.map(l=>catalog.find(p=>p.id===l.id).store))].map(id=>[id,{...(delivery[id]||{method:'pickup'}),cep:address?.cep}]));const groups=checkoutQuote(catalog,lines,checkedDelivery);
  if(groups.some(g=>g.method==='delivery')&&(!address?.name?.trim()||!address.street?.trim()||!address.number?.trim()||!address.city?.trim()||!/^\d{8}$/.test((address.cep||'').replace(/\D/g,''))))throw Error('Preencha nome, CEP, rua, número e cidade para entrega.');
  const id='ML-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
  const order={id,createdAt:now,payment:'pending',paymentMethod,contact:{email:address?.email||'',whatsapp:address?.whatsapp||''},address:groups.some(g=>g.method==='delivery')?structuredClone(address):null,total:groups.reduce((n,g)=>n+g.total,0),notifications:[],suborders:groups.map((g,i)=>({...g,id:id+'-'+(i+1),status:'pending',dispatchBy:null,messages:[],history:[]}))};order.suborders.forEach(s=>orderEvent(order,s,'pending',now));return order;
}
export function changeDemoPayment(order,outcome,now=new Date().toISOString()){
  if(order.payment==='paid')return order;
  if(!['paid','failed','pending'].includes(outcome))throw Error('Resultado de pagamento inválido.');
  order.payment=outcome;if(outcome==='paid')order.paidAt=now;
  order.suborders.filter(s=>s.status!=='cancelled').forEach(s=>{if(outcome==='paid'){orderEvent(order,s,'paid',now);s.dispatchBy=s.physical?orderDispatch(now,s.cutoff):null;if(!s.physical)orderEvent(order,s,'completed',now);else if(s.items.some(i=>i.type==='virtual')){s.digitalDeliveredAt=now;const digital={...s,id:s.id+'-digital',method:'digital',history:[],items:s.items.filter(i=>i.type==='virtual')};orderEvent(order,digital,'completed',now);}}else{orderEvent(order,s,outcome,now);}});return order;
}
export function advanceDemoSuborder(order,subId,store,now=new Date().toISOString()){
  const s=order.suborders.find(s=>s.id===subId&&s.store===store);if(!s||order.payment!=='paid'||!s.physical)throw Error('Pedido não disponível para esta operação.');
  if(s.hold)throw Error('Pedido em análise administrativa.');const next={paid:'preparing',preparing:s.method==='pickup'?'ready':'shipping',shipping:'dispatched',ready:'completed',dispatched:'completed'}[s.status];if(!next)throw Error('Pedido já concluído.');orderEvent(order,s,next,now);return s;
}

