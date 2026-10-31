import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {marketplaceCatalog} from '../prototype/catalog.js';
import {productMediaMarkup} from '../prototype/product-media.js';
test('roupas de ambas as cidades têm fotos e a camisa de Cianorte tem vídeo na posição 3',async()=>{
 const catalog=marketplaceCatalog();
 for(const id of [12,14,15,28,29,30]){const p=catalog[id];const bytes=await readFile(new URL('../prototype/'+p.image,import.meta.url));assert.equal(bytes[0],255);assert.equal(bytes[1],216);}
 const p=catalog[28];assert.equal(p.media[2].type,'video');assert.doesNotMatch(productMediaMarkup(p,String),/<video/);const bytes=await readFile(new URL('../prototype/'+p.videoUrl,import.meta.url));assert.equal(bytes.toString('ascii',4,8),'ftyp');

});
test('standalone incorpora as fotos e o vídeo da camisa sem depender de arquivos externos',async()=>{
 const html=await readFile(new URL('../entrega/Marketplace-Local/standalone/index.html',import.meta.url),'utf8');
 for(const name of ['camisa.jpg','calca.jpg','blazer.jpg','camisa-video.mp4']){const bytes=await readFile(new URL('../prototype/assets/'+name,import.meta.url));assert.ok(html.includes(bytes.toString('base64')),name);assert.ok(!html.includes("'./assets/"+name+"'"),name);}
});
