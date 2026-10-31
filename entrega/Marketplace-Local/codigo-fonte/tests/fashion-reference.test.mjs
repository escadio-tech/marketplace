import test from 'node:test';
import assert from 'node:assert/strict';
import {categoryGridMarkup,bindCategoryMedia} from '../prototype/product-media.js';
import {marketplaceCatalog} from '../prototype/catalog.js';
test('moda preserva a capa escolhida pelo seller sem duplicar vídeo como campanha',()=>{
 const list=marketplaceCatalog().filter(p=>p.store===0&&p.category==='Moda & acessórios'),seen=[];
 const html=categoryGridMarkup(list,'Moda & acessórios',p=>{seen.push(p);return `<article data-id="${p.id}">CARD</article>`},String);
 assert.equal(seen[0].firstMedia,list[0].firstMedia);assert.equal(seen.length,list.length);
 assert.doesNotMatch(html,/data-fashion-video/);assert.match(html,/category-banner-card fashion-media-cell/);
 assert.doesNotMatch(categoryGridMarkup(list,'Casa & decoração',()=>'<article/>',String),/fashion-media-cell/);
});
test('campanha reproduz sem som quando visível e pausa fora da tela ou por decisão do comprador',()=>{
 let observe,visibility,plays=0,pauses=0;const listeners={},button={addEventListener:(k,fn)=>listeners[k]=fn,removeEventListener(){},setAttribute(){}};
 const video={paused:true,addEventListener(){},removeEventListener(){},closest:()=>({querySelector:()=>button}),play(){plays++;this.paused=false;return Promise.resolve()},pause(){pauses++;this.paused=true}};
 globalThis.document={hidden:false,addEventListener:(_,fn)=>visibility=fn,removeEventListener(){}};globalThis.matchMedia=()=>({matches:false});globalThis.IntersectionObserver=class{constructor(fn){observe=fn}observe(){}disconnect(){}};
 const root={querySelectorAll:()=>[video]};
 try{bindCategoryMedia(root);observe([{target:video,isIntersecting:true}]);assert.equal(plays,1);assert.equal(video.muted,true);listeners.click();assert.equal(video._manualPause,true);observe([{target:video,isIntersecting:true}]);assert.equal(plays,1);listeners.click();assert.equal(plays,2);document.hidden=true;visibility();assert.ok(pauses>0);root._mediaCleanup();assert.equal(root._mediaCleanup,null);}finally{delete globalThis.document;delete globalThis.matchMedia;delete globalThis.IntersectionObserver;}
});
test('preferência por movimento reduzido impede reprodução automática',()=>{
 let observe,plays=0;const button={addEventListener(){},removeEventListener(){}};const video={addEventListener(){},removeEventListener(){},closest:()=>({querySelector:()=>button}),play(){plays++;return Promise.resolve()},pause(){}};
 globalThis.document={hidden:false,addEventListener(){},removeEventListener(){}};globalThis.matchMedia=()=>({matches:true});globalThis.IntersectionObserver=class{constructor(fn){observe=fn}observe(){}disconnect(){}};
 const root={querySelectorAll:()=>[video]};try{bindCategoryMedia(root);observe([{target:video,isIntersecting:true}]);assert.equal(plays,0);root._mediaCleanup();}finally{delete globalThis.document;delete globalThis.matchMedia;delete globalThis.IntersectionObserver;}
});
test('lojista pode desativar autoplay e comprador ainda pode reproduzir',()=>{
 let observe,plays=0;const handlers={},button={addEventListener:(name,fn)=>handlers[name]=fn,removeEventListener(){}};
 const video={dataset:{autoplay:'false'},paused:true,addEventListener(){},removeEventListener(){},closest:()=>({querySelector:()=>button}),play(){plays++;this.paused=false;return Promise.resolve()},pause(){this.paused=true}};
 globalThis.document={hidden:false,addEventListener(){},removeEventListener(){}};globalThis.matchMedia=()=>({matches:false});globalThis.IntersectionObserver=class{constructor(fn){observe=fn}observe(){}disconnect(){}};
 const root={querySelectorAll:()=>[video]};try{bindCategoryMedia(root);observe([{target:video,isIntersecting:true}]);assert.equal(plays,0);handlers.click();assert.equal(plays,1);root._mediaCleanup();}finally{delete globalThis.document;delete globalThis.matchMedia;delete globalThis.IntersectionObserver;}
});
