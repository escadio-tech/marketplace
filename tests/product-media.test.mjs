import test from 'node:test';
import assert from 'node:assert/strict';
import {HOME_CATEGORIES,productMediaMarkup,categoryGridMarkup,bindProductDrag,validProductVideo,categoryMediaLayout} from '../prototype/product-media.js';
import {marketplaceCatalog} from '../prototype/catalog.js';
test('home tem 12 categorias e vídeo como capa funciona em todas as categorias',()=>{
 assert.equal(HOME_CATEGORIES.length,12);assert.equal(new Set(HOME_CATEGORIES.map(c=>c[0])).size,12);
 const p=marketplaceCatalog()[0];assert.equal(p.firstMedia,'video');assert.match(productMediaMarkup(p,String),/<video/);assert.match(productMediaMarkup({...p,category:'Moda & acessórios'},String),/<video controls playsinline muted/);assert.equal(categoryMediaLayout('Moda & acessórios'),'portrait');assert.equal(categoryMediaLayout('Casa & decoração'),'square');assert.equal(categoryMediaLayout(null),'square');assert.doesNotMatch(productMediaMarkup({...p,media:undefined,firstMedia:'image'},String),/<video/);
 assert.equal(validProductVideo('javascript:alert(1)'),false);assert.equal(validProductVideo('https://example.com/clip.webm'),true);
});
test('banner ocupa uma célula entre produtos sem mudar a sequência dos produtos',()=>{
 const list=[0,1,2,3].map(id=>({id,name:'Produto '+id,image:'image'}));
 const html=categoryGridMarkup(list,'Moda & acessórios',p=>`<article>${p.id}</article>`,String);
 assert.equal((html.match(/category-banner-card/g)||[]).length,1);assert.match(html,/<article>1<\/article><a class="category-banner-card fashion-media-cell"/);assert.ok(html.endsWith('<article>2</article><article>3</article>'));
 assert.doesNotMatch(categoryGridMarkup(list,'Casa & decoração',()=>'<article/>',String),/category-banner-card/);assert.doesNotMatch(categoryGridMarkup(list,null,()=>'<article/>',String),/category-banner-card/);
});
test('arraste move carrossel e impede abertura de produto ao soltar',()=>{
 const handlers={},track={dataset:{},scrollLeft:100,classList:{add(){},remove(){}},setPointerCapture(){},hasPointerCapture:()=>false,addEventListener:(name,fn)=>handlers[name]=fn};bindProductDrag(track);
 const target={closest:()=>null};handlers.pointerdown({button:0,pointerId:1,clientX:100,target});handlers.pointermove({pointerId:1,clientX:50,preventDefault(){}});assert.equal(track.scrollLeft,150);handlers.pointerup({type:'pointerup'});assert.equal(track.dataset.dragClick,'true');
 let prevented=false;handlers.click({preventDefault(){prevented=true},stopImmediatePropagation(){}});assert.equal(prevented,true);
});
test('alteração de vídeo aguarda aprovação sem mudar o preço imediato',()=>{
 const p=marketplaceCatalog()[0];globalThis.localStorage={getItem:()=>JSON.stringify([{...p,existingCatalog:true,videoUrl:'https://example.com/new.mp4',status:'pending',priceCents:10000}])};
 try{assert.equal(marketplaceCatalog()[0].videoUrl,p.videoUrl);assert.equal(marketplaceCatalog()[0].priceCents,10000);}finally{delete globalThis.localStorage;}
});


