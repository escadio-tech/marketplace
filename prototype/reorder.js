import { resolveSelection } from './product-types.js';
import { validateOrderStock } from './order-model.js';
import { readMarketplace } from './marketplace-settings.js';
export function reorderLines(catalog,existing,order,orders){
 const merged=new Map(existing.map(l=>[l.id+'-'+encodeURIComponent(JSON.stringify(l.selection)),structuredClone(l)]));
 for(const s of order.suborders)for(const item of s.items){const product=catalog.find(p=>p.id===item.id);if(!product)throw Error(`${item.name}: produto não está mais no catálogo.`);if(product.type!==item.type)throw Error(`${item.name}: configuração alterada. Escolha novamente na página do produto.`);if(readMarketplace().stores.find(s=>s.id===product.store)?.status!=='active')throw Error(`${item.name}: a loja não está disponível para novas compras.`);const line={id:item.id,qty:item.qty,selection:structuredClone(item.selection)};resolveSelection(catalog,product,line.selection,line.qty);const key=line.id+'-'+encodeURIComponent(JSON.stringify(line.selection)),previous=merged.get(key);if(previous)previous.qty+=line.qty;else merged.set(key,line);}
 const result=[...merged.values()];validateOrderStock(catalog,result,orders);return result;
}
