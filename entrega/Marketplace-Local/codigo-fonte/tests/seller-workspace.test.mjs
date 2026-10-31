import test from 'node:test';
import assert from 'node:assert/strict';
import {marketplaceCatalog} from '../prototype/catalog.js';
import {sellerProducts,sellerProductListMarkup,productEditorMarkup,mountProductEditor} from '../prototype/product-editor.js';
import {sellerOrderRows,sellerOrdersTable,mountOrderPanel} from '../prototype/order-ui.js';
import {seedSellerExamples,saveDemoOrders,readDemoOrders} from '../prototype/order-storage.js';
import {MARKET_DEFAULTS} from '../prototype/marketplace-settings.js';
const memory=new Map();let store=0;
globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
globalThis.sessionStorage={getItem:()=>String(store)};
test('listagem usa catálogo da própria loja e cadastro está separado',()=>{
 const products=sellerProducts();assert.equal(products.length,9);assert.ok(products.every(p=>p.store===0));
 const html=sellerProductListMarkup();assert.match(html,/Poltrona de madeira/);assert.match(html,/#seller\/editar-produto\/0/);assert.doesNotMatch(html,/typed-product-form/);assert.match(productEditorMarkup(),/typed-product-form/);
 store=102;assert.equal(sellerProducts().length,3);assert.ok(sellerProducts().every(p=>p.store===102));store=0;
});
test('edição comercial atualiza preço e estoque sem antecipar conteúdo editorial',()=>{
 const p=marketplaceCatalog()[0];memory.set('marketplace.product-drafts.v1',JSON.stringify([{...p,existingCatalog:true,status:'pending',name:'Nome aguardando aprovação',priceCents:10000,stock:3}]));
 const actual=marketplaceCatalog()[0];assert.equal(actual.price,100);assert.equal(actual.stock,3);assert.equal(actual.name,p.name);
 assert.equal(sellerProducts()[0].name,'Nome aguardando aprovação');memory.delete('marketplace.product-drafts.v1');
});
test('pedidos em tabela filtram situação, cliente e data e respeitam loja',()=>{
 saveDemoOrders([]);seedSellerExamples(MARKET_DEFAULTS.stores[0]);seedSellerExamples(MARKET_DEFAULTS.stores[1]);
 assert.equal(sellerOrderRows().length,4);assert.equal(sellerOrderRows('seller',{status:['ready','preparing']}).length,2);
 assert.equal(sellerOrderRows('seller',{q:'Cliente fictício 1'}).length,1);assert.equal(sellerOrderRows('seller',{from:'2099-01-01'}).length,0);
 const html=sellerOrdersTable();assert.match(html,/<table>/);assert.match(html,/Ver detalhes/);assert.doesNotMatch(html,/purchase-card/);assert.doesNotMatch(html,/EXEMPLO-1-/);
});
test('editor carrega os dados do produto publicado',()=>{
 const node=()=>({addEventListener(){},scrollIntoView(){},closest:()=>({}),value:'',innerHTML:''});
 const f={...node(),elements:Object.fromEntries(['price','name','description','category','image'].map(k=>[k,node()]))};
 const nodes=new Map([['#typed-product-form',f]]);
 globalThis.document={querySelector:s=>{if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)},querySelectorAll:()=>[]};
 try{mountProductEditor(0);assert.equal(f.elements.name.value,'Poltrona de madeira com estofado');assert.equal(f.elements.price.value,689.9);assert.match(nodes.get('#type-editor-fields').innerHTML,/ML-0/);}finally{delete globalThis.document;}
});
test('chat tem lista de conversas própria e envia resposta sem repetir pedidos',async()=>{
 saveDemoOrders([]);seedSellerExamples(MARKET_DEFAULTS.stores[0]);const o=readDemoOrders()[0],s=o.suborders[0],slot={innerHTML:''};
 const root={innerHTML:'',querySelector:selector=>selector.startsWith('[data-chat-slot')?slot:selector==='[data-order-action="chat"]'?{click(){const button={dataset:{orderAction:'chat',order:o.id,sub:s.id}};root.onclick({target:{closest:q=>q==='[data-order-action]'?button:null},preventDefault(){}});}}:null};
 globalThis.document={querySelector:()=>root};
 try{mountOrderPanel('seller','chat');assert.match(root.innerHTML,/Conversas pós-compra/);assert.doesNotMatch(root.innerHTML,/purchase-card|Pedidos de venda/);assert.match(slot.innerHTML,/data-chat-order/);
 const f={dataset:{chatOrder:o.id,chatSub:s.id},elements:{message:{value:'Seu pedido está sendo separado.'},image:{files:[]}},querySelector:()=>({})};
 await root.onsubmit({target:{closest:()=>f},preventDefault(){}});assert.equal(readDemoOrders()[0].suborders[0].messages[0].text,'Seu pedido está sendo separado.');
 }finally{delete globalThis.document;}
});

