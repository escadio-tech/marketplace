import {marketplaceCatalog} from '../prototype/catalog.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {prepareProductTypes} from '../prototype/product-types.js';
import {EXTRA_DEMO_STORES,readMarketplace} from '../prototype/marketplace-settings.js';
test('seis lojas e todos os 33 produtos possuem imagem',async()=>{
 const source=await readFile(new URL('../prototype/home.js',import.meta.url),'utf8');
 const begin=source.indexOf('const photo='),end=source.indexOf('const categories=');
 const context={prepareProductTypes,EXTRA_DEMO_STORES,marketplaceCatalog};vm.createContext(context);
 vm.runInContext(source.slice(begin,end)+';this.catalog=products;this.shops=stores;',context);
 assert.equal(context.shops.filter(Boolean).length,6);assert.equal(context.catalog.length,33);
 for(const p of context.catalog){assert.ok(p.image?.startsWith('https://images.unsplash.com/')||p.image?.startsWith('data:image/')||p.image?.startsWith('./assets/'),p.name);assert.ok(context.shops[p.store],p.name);}
 for(const s of EXTRA_DEMO_STORES)assert.equal(context.catalog.filter(p=>p.store===s.id).length,3);
});
test('lojas novas aparecem em dados salvos sem apagar configurações anteriores',()=>{
 globalThis.localStorage={getItem:()=>JSON.stringify({stores:[{id:0,name:'Nome editado'},{id:3,name:'Loja própria'}]})};
 const config=readMarketplace();assert.equal(config.stores[0].name,'Nome editado');assert.equal(config.stores[1].name,'Loja própria');
 assert.equal(config.stores.filter(s=>EXTRA_DEMO_STORES.some(x=>x.id===s.id)).length,3);
 assert.equal(EXTRA_DEMO_STORES.filter(s=>s.city==='Cianorte').length,2);assert.equal(EXTRA_DEMO_STORES.filter(s=>s.city==='Maringá').length,1);
});



