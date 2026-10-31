import test from 'node:test';
import assert from 'node:assert/strict';
import {marketplaceCatalog} from '../prototype/catalog.js';
import {productVisibleForPostal} from '../prototype/delivery-context.js';
import {categoryMediaLayout,categoryGridMarkup} from '../prototype/product-media.js';
test('moda tem produtos em Cianorte e Maringá mantendo filtro de cobertura e banner',()=>{
 const catalog=marketplaceCatalog();
 for(const cep of ['87200000','87000000']){const list=catalog.filter(p=>p.category==='Moda & acessórios'&&productVisibleForPostal(p,cep));assert.ok(list.length>=4,cep);assert.equal(categoryMediaLayout('Moda & acessórios'),'portrait');assert.match(categoryGridMarkup(list,'Moda & acessórios',p=>'<article>'+p.name+'</article>',String),/category-banner-card/);}
 const local=catalog.filter(p=>p.id>=28);assert.equal(local.length,5);assert.ok(local.every(p=>productVisibleForPostal(p,'87200000')&&!productVisibleForPostal(p,'87000000')));
 assert.equal(new Set(catalog.flatMap(p=>(p.variants||[]).map(v=>v.sku))).size,catalog.flatMap(p=>p.variants||[]).length);
});
