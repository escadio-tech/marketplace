import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {resolveSelection,validateCart,TYPE_LABELS} from '../prototype/product-types.js';
import {ORDER_STORES} from '../prototype/order-model.js';
import {readMarketplace,EXTRA_DEMO_STORES} from '../prototype/marketplace-settings.js';
test('sacola lateral renderiza produtos das três novas lojas com quantidades e totais',async()=>{
 globalThis.localStorage={getItem:()=>null};
 const listeners=[],drawers=[],scroll={scrollTop:0};
 const products=EXTRA_DEMO_STORES.map((s,id)=>({id,store:s.id,name:'Produto '+s.name,type:'simple',priceCents:1000,stock:10,image:'data:image/svg+xml,test'}));
 const context={readMarketplace,ORDER_STORES,resolveSelection,validateCart,TYPE_LABELS,productVisibleForPostal:()=>true,
 document:{addEventListener:(type,fn)=>{if(type==='click')listeners.push(fn)},querySelector:()=>scroll,querySelectorAll:()=>[],activeElement:null},
 createOrderJourney:({lines})=>{products.forEach(p=>lines.set(String(p.id),{id:p.id,qty:2,selection:{}}));return {}},
 products,state:{cart:new Map()},money:n=>'R$ '+n.toFixed(2),escape:String,icon:()=>'',modal:(...args)=>drawers.push(args),toast:()=>{}};
 vm.createContext(context);
 const source=(await readFile(new URL('../prototype/product-experience.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/gm,'').replace('export function','function');
 vm.runInContext(source+'\ncreateProductExperience({products,state,money,escape,icon,modal,toast});',context);
 listeners.at(-1)({target:{closest:()=>({dataset:{action:'cart'}})},preventDefault(){},stopImmediatePropagation(){}});
 assert.equal(drawers[0][2],'cart');
 for(const store of EXTRA_DEMO_STORES)assert.ok(drawers[0][1].includes(store.name));
 assert.match(drawers[0][1],/R\$ 60.00/);assert.equal((drawers[0][1].match(/class="drawer-item /g)||[]).length,3);
});
