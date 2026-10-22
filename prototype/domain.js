export const money = n => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n/100);
export const freight = (meters, centsPerKm) => Math.round(meters*centsPerKm/1000);
export function dispatchDate(iso, cutoff='15:00') {
  // Demonstration clock entered in local São Paulo civil time. Holidays are not configured.
  const [day,time] = iso.split('T');
  const d = new Date(day+'T12:00:00Z');
  if (d.getUTCDay()===0 || d.getUTCDay()===6 || time.slice(0,5)>=cutoff) d.setUTCDate(d.getUTCDate()+1);
  while ([0,6].includes(d.getUTCDay())) d.setUTCDate(d.getUTCDate()+1);
  return d.toISOString().slice(0,10);
}
export function comparison(products, product, price) {
  if (!product.identity) return null;
  const peers=products.filter(p=>p.seller!==product.seller && p.identity===product.identity && p.status==='approved' && p.stock>0);
  if (!peers.length) return null;
  const min=Math.min(...peers.map(p=>p.price)), max=Math.max(...peers.map(p=>p.price));
  return { min,max,count:peers.length,diff:price-min,percent:min ? (price-min)/min*100 : 0 };
}
export function totals(items, delivery, stores, distances, commission=10, fee=3) {
  return [...new Set(items.map(i=>i.seller))].map(id=>{
    const store=stores.find(s=>s.id===id), rows=items.filter(i=>i.seller===id);
    const subtotal=rows.reduce((a,i)=>a+i.price*i.qty,0);
    const shipping=delivery[id]==='pickup'?0:freight(distances[id],store.rate);
    const gross=subtotal+shipping, com=Math.round(subtotal*commission/100), processing=Math.round(gross*fee/100);
    return { seller:id,items:rows,subtotal,shipping,gross,commission:com,fee:processing,net:gross-com-processing,method:delivery[id]||'delivery' };
  });
}
