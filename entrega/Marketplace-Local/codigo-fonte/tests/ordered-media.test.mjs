import test from 'node:test';
import assert from 'node:assert/strict';
import {orderedProductMedia,moveProductMedia,productGalleryMarkup,productMediaMarkup} from '../prototype/product-media.js';
import {marketplaceCatalog} from '../prototype/catalog.js';
const photo={type:'image',src:'https://example.com/front.jpg'},detail={type:'image',src:'https://example.com/detail.jpg'},video={type:'video',src:'https://example.com/demo.mp4'};
test('reordenar fotos e vídeos mantém todos os itens sem alterar a lista original',()=>{
 const source=[photo,video,detail],moved=moveProductMedia(source,1,0);
 assert.deepEqual(source,[photo,video,detail]);assert.deepEqual(moved,[video,photo,detail]);
 assert.deepEqual(moveProductMedia(moved,0,2),[photo,detail,video]);assert.deepEqual(moveProductMedia(source,0,-1),source);
});
test('capa explícita prevalece sobre campos legados em qualquer categoria',()=>{
 const p={id:0,name:'Teste',image:photo.src,category:'Casa & decoração',firstMedia:'image',media:[video,photo,detail]};
 assert.match(productMediaMarkup(p,String),/<video/);assert.equal(orderedProductMedia(p)[0].src,video.src);
 const changed={...p,media:[detail,video,photo],firstMedia:'video'};
 assert.doesNotMatch(productMediaMarkup(changed,String),/<video/);assert.match(productMediaMarkup(changed,String),/detail.jpg/);
 assert.equal(orderedProductMedia({...p,media:[{type:'video',src:'javascript:alert(1)'},photo]}).length,1);
});
test('galeria intercala vídeos e fotos na ordem escolhida e zoom usa índice real',()=>{
 const p={id:0,name:'Produto',image:photo.src,media:[photo,video,detail]};const html=productGalleryMarkup(p,String);
 assert.ok(html.indexOf('front.jpg')<html.indexOf('demo.mp4'));assert.ok(html.indexOf('demo.mp4')<html.indexOf('detail.jpg'));
 assert.match(html,/data-media-index="2"/);assert.doesNotMatch(html,/detail-crop/);
 const firstVideo=productGalleryMarkup({...p,media:[video,photo]},String);assert.match(firstVideo,/ordered-gallery-lead"><video/);
});
test('ordem da mídia fica pendente até a aprovação e reaparece no catálogo aprovado',()=>{
 const p=marketplaceCatalog()[0],draft={...p,existingCatalog:true,status:'pending',media:[detail,video,photo],image:detail.src,firstMedia:'image'};
 globalThis.localStorage={getItem:()=>JSON.stringify([draft])};
 try{assert.notEqual(orderedProductMedia(marketplaceCatalog()[0])[0].src,detail.src);draft.status='approved';assert.deepEqual(orderedProductMedia(marketplaceCatalog()[0]),draft.media);}finally{delete globalThis.localStorage;}
});
