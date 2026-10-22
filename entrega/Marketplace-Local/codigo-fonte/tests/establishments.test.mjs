import test from 'node:test';
import assert from 'node:assert/strict';
import {MARKET_DEFAULTS,pickupAllowed,validateEstablishment} from '../prototype/marketplace-settings.js';
import {createDemoOrder} from '../prototype/order-model.js';
const memory=new Map();globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
test('retirada de Cianorte não é ampliada pela entrega nem pela marca',()=>{
 const store={...MARKET_DEFAULTS.stores[0],from:'87000000',to:'87299999',company:'Mesma marca'};
 assert.equal(pickupAllowed(store,'87000000'),false);
 assert.equal(pickupAllowed(store,'87299999'),true);
 assert.equal(pickupAllowed({...store,cep:'87000000'},'87000000'),false);
 assert.throws(()=>validateEstablishment({...store,cep:'87000000'}),/cidade/);
});
test('filial tem cidade e aprovação próprias',()=>{
 const branch={...MARKET_DEFAULTS.stores[0],id:3,city:'Maringá',cep:'87000000',company:'Mesma marca'};
 assert.equal(pickupAllowed({...branch,status:'pending'},'87000000'),false);
 assert.equal(pickupAllowed(branch,'87000000'),true);
 assert.equal(pickupAllowed(branch,'87200000'),false);
});
test('pedido de filial preserva identidade e endereço da unidade',()=>{
 const c=structuredClone(MARKET_DEFAULTS),branch={...c.stores[1],id:3,name:'Filial Maringá',company:'Empresa exemplo',cnpj:'12345678000200',street:'Rua da filial',number:'55',state:'PR'};
 c.stores.push(branch);localStorage.setItem('temlogoali.settings.v1',JSON.stringify(c));
 const catalog=[{id:0,name:'Produto',store:3,type:'simple',stock:10,priceCents:1000}];
 const order=createDemoOrder(catalog,[{id:0,qty:1,selection:{}}],{3:{method:'pickup'}},{cep:'87000000'},'pix',[]);
 assert.equal(order.suborders[0].establishment.cnpj,branch.cnpj);
 assert.equal(order.suborders[0].storeName,'Filial Maringá');
 branch.street='Outro endereço';localStorage.setItem('temlogoali.settings.v1',JSON.stringify(c));
 assert.equal(order.suborders[0].establishment.street,'Rua da filial');
 assert.throws(()=>createDemoOrder(catalog,[{id:0,qty:1,selection:{}}],{3:{method:'pickup'}},{cep:'87200000'},'pix',[]),/retirada/);
});
