import test from 'node:test';
import assert from 'node:assert/strict';
import {seedSellerExamples,readDemoOrders,saveDemoOrders} from '../prototype/order-storage.js';
import {MARKET_DEFAULTS,sealMetrics} from '../prototype/marketplace-settings.js';
import {validateOrderStock} from '../prototype/order-model.js';
import {adminContent} from '../prototype/admin-console.js';
import {renderConfiguredModules} from '../prototype/configured-modules.js';
const memory=new Map();globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};globalThis.sessionStorage={getItem:()=>null};
test('pedidos fictícios não duplicam nem alteram estoque ou classificação',()=>{
 saveDemoOrders([{id:'real',payment:'failed',suborders:[]}]);seedSellerExamples(MARKET_DEFAULTS.stores[0]);seedSellerExamples(MARKET_DEFAULTS.stores[0]);
 const orders=readDemoOrders();assert.equal(orders.length,5);assert.equal(orders[0].id,'real');assert.equal(orders.filter(o=>o.demoData).length,4);
 assert.equal(sealMetrics(orders.filter(o=>o.demoData),0).peak,0);
 assert.doesNotThrow(()=>validateOrderStock([{id:0,type:'simple',stock:1,priceCents:100}], [{id:0,qty:1,selection:{}}],orders));
 const html=adminContent('financeiro','seller');assert.match(html,/Líquido simulado/);assert.match(html,/A liberar simulado/);assert.match(html,/EXEMPLO-0/);
});
test('grade respeita ordem, quantidade e catálogo próprio; categorias e mosaico são renderizados',()=>{
 localStorage.setItem('temlogoali.buyer-cep','87200000');
 const products=[{id:1,store:0,name:'Um',category:'Casa',image:'one'},{id:2,store:0,name:'Dois',category:'Decoração',image:'two'}];
 const card=p=>'<article>'+p.name+'</article>';
 const html=renderConfiguredModules([{type:'grid',title:'Grade',ids:[2,99,1],count:2},{type:'categories',title:'Categorias',count:10},{type:'mosaic',title:'Banners',count:2,images:['https://example.com/a.jpg','https://example.com/b.jpg']}],products,card,String);
 assert.ok(html.indexOf('<article>Dois')<html.indexOf('<article>Um'));assert.match(html,/listing-grid/);assert.match(html,/#\/loja\/0\?category=Casa/);assert.match(html,/https:\/\/example.com\/b.jpg/);
});
