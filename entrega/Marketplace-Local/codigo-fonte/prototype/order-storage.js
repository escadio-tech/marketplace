const orderStorageKey='marketplace.orders.v1';let orderMemory=[];
export function readDemoOrders(){try{const data=JSON.parse(localStorage.getItem(orderStorageKey)||'[]');return Array.isArray(data)?data:orderMemory}catch{return orderMemory}}
export function saveDemoOrders(orders){try{localStorage.setItem(orderStorageKey,JSON.stringify(orders));orderMemory=orders;return true}catch{throw Error('Não foi possível salvar os pedidos neste navegador. Libere espaço de armazenamento e tente novamente.')}}

export function seedSellerExamples(store){
 const orders=readDemoOrders();if(orders.some(o=>o.demoData&&o.suborders.some(s=>s.store===store.id)))return;
 const examples=[['paid','preparing','delivery',25990,850],['paid','ready','pickup',15990,0],['paid','completed','delivery',68990,1000],['pending','pending','pickup',7990,0]];
 const now=new Date();
 const seeded=examples.map(([payment,status,method,subtotal,freight],i)=>{
  const at=new Date(now.getTime()-i*86400000).toISOString(),id='EXEMPLO-'+store.id+'-'+(i+1),commission=Math.round(subtotal*.1),paymentFee=Math.round((subtotal+freight)*.02);
  const stages=status==='pending'?['pending']:status==='preparing'?['pending','paid','preparing']:status==='ready'?['pending','paid','preparing','ready']:['pending','paid','preparing','shipping','dispatched','completed'];
  const sub={id:id+'-1',store:store.id,storeName:store.name,physical:true,method,status,subtotal,freight,originalFreight:freight,discount:0,total:subtotal+freight,commission,paymentFee,cutoff:store.cutoff,rate:store.rate,km:method==='delivery'?3.4:0,dispatchBy:null,establishment:{...store},messages:[],history:stages.map(status=>({status,at})),items:[{id:-1000-i,name:['Seleção para casa · exemplo','Presente especial · exemplo','Compra de decoração · exemplo','Item do catálogo · exemplo'][i],type:'simple',qty:1,unitCents:subtotal,totalCents:subtotal,label:'',parts:[],selection:{}}]};
  return {id,demoData:true,createdAt:at,payment,paymentMethod:i%2?'card':'pix',contact:{email:'cliente@example.com',whatsapp:''},buyerName:'Cliente fictício '+(i+1),address:method==='delivery'?{name:'Cliente fictício',street:'Rua Demonstrativa',number:'100',city:store.city,cep:store.cep,complement:'Endereço ilustrativo'}:null,total:sub.total,notifications:[],suborders:[sub]};
 });saveDemoOrders([...orders,...seeded]);
}
