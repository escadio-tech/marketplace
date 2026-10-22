import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {installEmbeddedAreas} from '../prototype/embedded-areas.js';

test('menus internos do painel incorporado navegam sem carregar a home',()=>{
 const frames=[],events={};
 globalThis.location={protocol:'file:',hash:'#area/seller'};
 globalThis.window={addEventListener(){}};
 globalThis.document={addEventListener(){},querySelector:()=>({close(){}}),createElement:()=>({}),body:{classList:{toggle(){}},append:f=>frames.push(f)}};
 try{
  installEmbeddedAreas({panel:'<html><head></head></html>'});
  const script=frames[0].srcdoc.match(/<script>([\s\S]*?)<\/script>/)[1],messages=[];
  const context={window:{},location:{hash:''},parent:{postMessage:m=>messages.push(m)},document:{addEventListener:(n,fn)=>events[n]=fn,getElementById:()=>null}};
  vm.runInNewContext(script,context);
  for(const role of ['seller','admin'])for(const page of ['inicio','produtos','pedidos','logistica','financeiro','chat','equipe','classificacao','aparencia']){
   let prevented=false;const href='#'+role+'/'+page;
   events.click({target:{closest:()=>({getAttribute:()=>href})},preventDefault(){prevented=true},stopImmediatePropagation(){}});
   assert.equal(prevented,true,'Deve impedir a resolução do link contra a home');assert.equal(context.location.hash,href);assert.equal(messages.length,0);
  }
  events.click({target:{closest:()=>({getAttribute:()=> './index.html'})},preventDefault(){},stopImmediatePropagation(){}});
  assert.equal(messages[0].file,'index.html');
 }finally{delete globalThis.window;delete globalThis.document;delete globalThis.location;}
});
test('index incorpora áreas e todos os scripts HTML compilam',async()=>{const html=await readFile(new URL('../entrega/Marketplace-Local/standalone/index.html',import.meta.url),'utf8');const scripts=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);assert.equal(scripts.length,2);for(const script of scripts)new vm.Script(script);assert.match(scripts[1],/installEmbeddedAreas/);assert.match(html,/href="\.\/vender.html"/);assert.match(html,/href="\.\/painel.html#seller"/);assert.doesNotMatch(html,/href="\/(?:painel|vender)\.html/);});
test('links de venda abrem iframe incorporado e retorno encerra a área',()=>{const listeners={},app={inert:false},frames=[];globalThis.location={protocol:'file:',hash:''};globalThis.document={addEventListener:(n,f)=>listeners['document-'+n]=f,querySelector:s=>s==='#app'?app:{close(){}},createElement:()=>({contentWindow:{},remove(){this.removed=true}}),body:{classList:{toggle(){}},append:f=>frames.push(f)}};globalThis.window={addEventListener:(n,f)=>listeners[n]=f};const pages={panel:'<html><head></head><body>PAINEL</body></html>',vender:'<html><head></head><body>VENDA</body></html>'};installEmbeddedAreas(pages);const click=href=>listeners['document-click']({target:{closest:()=>({getAttribute:()=>href})},preventDefault(){},stopImmediatePropagation(){}});click('./painel.html#seller');assert.equal(location.hash,'#area/seller');assert.equal(app.inert,true);assert.match(frames[0].srcdoc,/PAINEL/);const bridge=frames[0].srcdoc.match(/<script>([\s\S]*?)<\/script>/);assert.ok(bridge);new vm.Script(bridge[1]);click('./vender.html');assert.equal(frames[0].removed,true);assert.match(frames[1].srcdoc,/VENDA/);listeners.message({source:frames[1].contentWindow,data:{type:'temlogoali-area',file:'index.html',hash:''}});assert.equal(location.hash,'#');assert.equal(frames[1].removed,true);assert.equal(app.inert,false);delete globalThis.window;delete globalThis.document;delete globalThis.location;});
