export const TYPE_LABELS={simple:'Simples',variable:'Com variações',kit:'Kit',virtual:'Virtual'};
export function combinations(attributes){return attributes.reduce((rows,a)=>rows.flatMap(row=>a.values.map(v=>({...row,[a.name]:v}))),[{}]);}
export function makeVariants(productId,attributes,price,stock=8){return combinations(attributes).map((values,i)=>({id:`${productId}-v${i+1}`,sku:`ML-${productId}-${i+1}`,attributes:values,priceCents:Math.round(price*100),stock,active:true}));}
export function productArt(label,color='#dfe9d2'){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="650" height="650" viewBox="0 0 650 650"><rect width="650" height="650" fill="${color}"/><circle cx="325" cy="295" r="180" fill="#ffffff" opacity=".5"/><path d="M235 210h180v225H235z" fill="#f9f8f0" stroke="#315746" stroke-width="5"/><path d="M265 250h120m-120 35h95m-95 35h120m-120 35h75" stroke="#78906b" stroke-width="8"/><text x="325" y="495" text-anchor="middle" fill="#234937" font-family="sans-serif" font-size="25">${label}</text><text x="325" y="535" text-anchor="middle" fill="#67775e" font-family="sans-serif" font-size="14">ILUSTRAÇÃO DEMONSTRATIVA</text></svg>`);}
export function prepareProductTypes(products){
  products.forEach(p=>{p.type='simple';p.priceCents=Math.round(p.price*100);p.stock=p.id===5?0:8;p.sku=`ML-${p.id}`;p.attributes=[];p.variants=[];});
  [1,8].forEach(id=>{const p=products[id];p.type='variable';p.attributes=[{name:'Tamanho',values:['36','37','38','39','40']},{name:'Cor',values:['Caramelo','Preto']}];p.variants=makeVariants(id,p.attributes,p.price);p.variants.forEach(v=>{if(v.attributes.Tamanho==='37')v.stock=0;if(v.attributes.Tamanho==='36')v.stock=4;});});
  products[7].type='variable';products[7].attributes=[{name:'Voltagem',values:['127 V','220 V']},{name:'Modelo',values:['Clássico','Articulado']}];products[7].variants=makeVariants(7,products[7].attributes,products[7].price);products[7].variants.at(-1).priceCents+=3000;
  const clothing=[['Camisa social',129.9,['P','M','G'],['Branco','Azul']],['Cinto casual',69.9,['90','100','110'],['Preto','Marrom']],['Calça de alfaiataria',179.9,['38','40','42'],['Preto','Azul']],['Blazer clássico',299.9,['P','M','G'],['Preto','Cinza']]];
  clothing.forEach(([name,price,sizes,colors],i)=>{const id=12+i,attributes=[{name:'Tamanho',values:sizes},{name:'Cor',values:colors}];products.push({id,name,price,priceCents:Math.round(price*100),category:'Moda & acessórios',store:1,type:'variable',stock:8,sku:`ML-${id}`,attributes,variants:makeVariants(id,attributes,price),image:productArt(name,['#e4ebdd','#e9dfd1','#dbe3e6','#e6e1dc'][i]),description:'Escolha tamanho e cor'});});
  const components=[12,13,14,15,1].map(productId=>({productId,qty:1}));
  ['closed','open'].forEach((mode,i)=>{const id=16+i;products.push({id,name:`Kit Dia dos Pais — ${mode==='closed'?'completo':'monte o seu'}`,price:mode==='closed'?869.5:199.8,priceCents:mode==='closed'?86950:19980,category:'Moda & acessórios',store:1,type:'kit',kitMode:mode,components:structuredClone(components),attributes:[],variants:[],stock:null,sku:`KIT-${id}`,image:productArt(mode==='closed'?'Kit Dia dos Pais':'Monte seu Kit','#e3e8d7'),description:mode==='closed'?'5 itens · escolha as variações de cada um':'Escolha de 2 a 5 itens'});});
  products.push({id:18,name:'E-book — Guia para uma casa acolhedora',price:29.9,priceCents:2990,category:'Livros & digitais',store:0,type:'virtual',stock:null,sku:'DIG-18',attributes:[],variants:[],image:productArt('E-book · Casa acolhedora','#e7e0ce'),description:'Download digital · PDF · sem frete',digital:{format:'PDF',fileName:'guia-casa-acolhedora.pdf',fileSize:1240000,license:'Uso pessoal — exemplo de licença',sample:true}});
  return products;
}
export function resolveSelection(catalog,product,selection={},units=1){
  if(!Number.isInteger(units)||units<1)throw Error('Informe uma quantidade inteira maior que zero.');
  if(product.type==='kit'){
    const entries=product.components.filter(c=>product.kitMode==='closed'||selection.items?.[c.productId]?.included);
    if(entries.length<2)throw Error('Escolha pelo menos 2 produtos diferentes para montar o kit.');
    if(new Set(entries.map(c=>c.productId)).size!==entries.length)throw Error('O kit não pode repetir o mesmo produto na composição.');
    const parts=entries.map(c=>{const child=catalog.find(p=>p.id===c.productId);if(!child||child.store!==product.store||['kit','virtual'].includes(child.type))throw Error('Item inválido na composição do kit.');if(!Number.isInteger(c.qty)||c.qty<1)throw Error('Quantidade de componente inválida.');const resolved=resolveSelection(catalog,child,selection.items?.[c.productId]||{},units*c.qty);return {...resolved,productId:child.id,name:child.name,componentQty:c.qty};});
    return {unitCents:parts.reduce((s,p)=>s+p.unitCents*p.componentQty,0),totalCents:parts.reduce((s,p)=>s+p.totalCents,0),requirements:parts.flatMap(p=>p.requirements),parts,label:parts.map(p=>`${p.componentQty}× ${p.name}${p.label?' ('+p.label+')':''}`).join('; ')};
  }
  if(product.type==='virtual')return {unitCents:product.priceCents,totalCents:product.priceCents*units,requirements:[],label:'Download digital',parts:[]};
  let sku=product.sku,stock=product.stock,price=product.priceCents,label='';
  if(product.type==='variable'){
    const missing=product.attributes.filter(a=>!selection.attributes?.[a.name]);if(missing.length)throw Error(`${product.name}: selecione ${missing.map(a=>a.name.toLowerCase()).join(' e ')}.`);
    const variant=product.variants.find(v=>product.attributes.every(a=>v.attributes[a.name]===selection.attributes[a.name]));if(!variant||variant.active===false)throw Error(`${product.name}: combinação indisponível.`);
    ({sku,stock}=variant);price=variant.priceCents;label=product.attributes.map(a=>`${a.name}: ${variant.attributes[a.name]}`).join(' · ');
  }
  if(!Number.isInteger(stock)||stock<units)throw Error(`${product.name}: estoque insuficiente para a quantidade solicitada.`);
  return {unitCents:price,totalCents:price*units,requirements:[{key:product.store+':'+sku,stock,qty:units,productId:product.id,sku}],label,parts:[]};
}
export function validateCart(catalog,lines){const totals=new Map();for(const l of lines){const p=catalog.find(p=>p.id===l.id);if(!p)throw Error('Produto não encontrado.');const quote=resolveSelection(catalog,p,l.selection,l.qty);for(const r of quote.requirements){const qty=(totals.get(r.key)||0)+r.qty;if(qty>r.stock)throw Error(`Estoque compartilhado insuficiente para ${p.name}. Revise os itens avulsos e kits na sacola.`);totals.set(r.key,qty);}}return true;}
export function validateProductConfig(p,catalog){
  if(!Object.hasOwn(TYPE_LABELS,p.type)||!p.name?.trim())throw Error('Informe o nome e um tipo de produto válido.');
  if(p.type!=='kit'&&(!Number.isInteger(p.priceCents)||p.priceCents<1))throw Error('Informe um preço maior que zero.');
  if(p.type==='simple'&&(!p.sku?.trim()||!Number.isInteger(p.stock)||p.stock<0))throw Error('Informe SKU e estoque inteiro não negativo.');
  if(p.type==='variable'){
    if(!p.attributes.length||p.attributes.some(a=>!a.name.trim()||!a.values.length||new Set(a.values).size!==a.values.length)||new Set(p.attributes.map(a=>a.name.toLowerCase())).size!==p.attributes.length)throw Error('Configure atributos distintos e opções sem repetição.');
    const rows=combinations(p.attributes);if(rows.length>100)throw Error('Limite demonstrativo: 100 combinações por produto.');
    if(p.variants.length!==rows.length||rows.some(row=>p.variants.filter(v=>p.attributes.every(a=>v.attributes[a.name]===row[a.name])).length!==1))throw Error('Gere novamente as combinações após alterar atributos.');
    if(new Set(p.variants.map(v=>v.sku)).size!==p.variants.length||p.variants.some(v=>!v.sku.trim()||!Number.isInteger(v.stock)||v.stock<0||!Number.isInteger(v.priceCents)||v.priceCents<1))throw Error('Revise SKUs únicos, preços e estoques das combinações.');
  }
  if(p.type==='kit'){if(!['open','closed'].includes(p.kitMode)||p.components.length<2||new Set(p.components.map(c=>c.productId)).size!==p.components.length)throw Error('Configure pelo menos 2 produtos diferentes e o tipo de kit.');for(const c of p.components){const child=catalog.find(x=>x.id===c.productId);if(!child||child.store!==p.store||['kit','virtual'].includes(child.type)||child.id===p.id||!Number.isInteger(c.qty)||c.qty<1)throw Error('Use produtos físicos distintos da própria loja e quantidades válidas.');}}
  if(p.type==='virtual'){if(!p.digital?.fileName||!['PDF','EPUB','PNG','JPEG','WEBP'].includes(p.digital.format))throw Error('Anexe um arquivo PDF, EPUB, PNG, JPEG ou WEBP. Vídeos e cursos não são permitidos.');}
  return true;
}
