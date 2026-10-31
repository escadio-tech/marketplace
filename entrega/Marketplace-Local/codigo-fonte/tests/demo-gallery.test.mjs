import test from 'node:test';
import assert from 'node:assert/strict';
import {marketplaceCatalog} from '../prototype/catalog.js';
import {orderedProductMedia,productGalleryMarkup,productMediaMarkup} from '../prototype/product-media.js';
test('todos os produtos demonstrativos têm pelo menos cinco imagens',()=>{
 const products=marketplaceCatalog();assert.equal(products.length,33);
 for(const p of products){const media=orderedProductMedia(p);assert.ok(media.filter(m=>m.type==='image').length>=5,p.name);assert.ok(media.every(m=>m.src));const html=productGalleryMarkup(p,String);assert.ok((html.match(/data-media-index=/g)||[]).length>=5,p.name);}
});
test('três produtos têm vídeo: poltrona, camisa e novo modelo',()=>{
 const products=marketplaceCatalog(),withVideo=products.filter(p=>orderedProductMedia(p).some(m=>m.type==='video'));
 assert.deepEqual(withVideo.map(p=>p.id),[0,28,32]);assert.equal(orderedProductMedia(products[0])[0].type,'video');assert.equal(orderedProductMedia(products[28])[2].type,'video');
 assert.match(productMediaMarkup(products[0],String),/<video/);assert.doesNotMatch(productMediaMarkup(products[28],String),/<video/);
 assert.equal(products[0].store,products[28].store);
});
