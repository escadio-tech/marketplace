import test from 'node:test';
import assert from 'node:assert/strict';
import {renderConfiguredModules,categoryModulesMarkup,categoryCardsWithModules} from '../prototype/configured-modules.js';
import {marketplaceCatalog} from '../prototype/catalog.js';
import {adminContent,mountAdminContent} from '../prototype/admin-console.js';
import {readMarketplace} from '../prototype/marketplace-settings.js';
const memory=new Map([['temlogoali.buyer-cep','87200000']]);
globalThis.localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};
const catalog=marketplaceCatalog(),card=p=>`<article>ITEM-${p.id}</article>`;
test('vídeo modular usa mídia local e respeita destino, região e autoplay',()=>{
 const module={type:'video',title:'Vídeo',ids:[32],autoplay:false,target:'#/produto/32'};
 const html=renderConfiguredModules([module],catalog,card,String);
 assert.match(html,/modelo-blazer.mp4/);assert.match(html,/data-autoplay="false"/);assert.match(html,/data-fashion-play/);
 assert.equal(renderConfiguredModules([{...module,target:'#/produto/12'}],catalog,card,String),'');
 assert.equal(renderConfiguredModules([{...module,videoUrl:'javascript:alert(1)'}],catalog,card,String),'');
});
test('categoria posiciona banners e vídeos sem alterar produtos ou misturar posições',()=>{
 const list=[catalog[28],catalog[32]],modules=[{type:'banner',title:'Topo',placement:'top'},{type:'video',title:'Entre',placement:'grid',position:2,ids:[32]},{type:'banner',title:'Fim',placement:'bottom'}];
 assert.match(categoryModulesMarkup(modules,'top',list,card,String),/Topo/);assert.doesNotMatch(categoryModulesMarkup(modules,'top',list,card,String),/Entre|Fim/);
 const html=categoryCardsWithModules(modules,list,card,String);assert.ok(html.indexOf('ITEM-28')<html.indexOf('Entre'));assert.ok(html.indexOf('Entre')<html.indexOf('ITEM-32'));assert.equal((html.match(/<article>/g)||[]).length,2);
});
test('administrador salva módulos por categoria e seller não pode editar escopo global',()=>{
 const OriginalFormData=globalThis.FormData;globalThis.FormData=class{constructor(f){return Object.entries(f.values)}};
 const feedback={textContent:''},root={querySelector:()=>feedback};globalThis.document={querySelector:()=>root};
 const form={dataset:{adminForm:'module',scope:'category'},values:{category:'Moda & acessórios',type:'video',title:'Teste categoria',ids:'32',videoUrl:'',autoplay:'on',placement:'grid',position:'2',target:'#/produto/32',reason:'Teste'}};
 const event={target:{closest:()=>form},preventDefault(){}};
 try{mountAdminContent(()=>{},'admin');root.onsubmit(event);assert.equal(readMarketplace().categoryModules['Moda & acessórios'].at(-1).title,'Teste categoria');const count=readMarketplace().categoryModules['Moda & acessórios'].length;mountAdminContent(()=>{},'seller');root.onsubmit(event);assert.match(feedback.textContent,/Personalização/);assert.equal(readMarketplace().categoryModules['Moda & acessórios'].length,count);assert.match(adminContent('vitrines'),/Banners e vídeos das categorias/);}finally{globalThis.FormData=OriginalFormData;delete globalThis.document;}
});
