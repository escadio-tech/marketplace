import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
test('menus do vendedor conectam lista, cadastro, edição, pedidos e chat a telas distintas',async()=>{
 const source=(await readFile(new URL('../prototype/portal.js',import.meta.url),'utf8')).replace(/^import .*;\r?\n/gm,'');
 for(const [route,expected] of [['produtos','list'],['novo-produto','editor:null'],['editar-produto/0','editor:0'],['pedidos','orders:pedidos'],['chat','orders:chat']]){
  const calls=[],portal={innerHTML:''};
  const context={location:{hash:'#seller/'+route},window:{addEventListener(){}},document:{querySelector:s=>s==='#portal'?portal:{addEventListener(){},classList:{toggle(){}}},querySelectorAll:()=>[]},
   hasSellerSession:()=>true,sellerContext:()=>0,readMarketplace:()=>({stores:[{id:0,name:'Casa Aurora',seal:'official'}]}),seedSellerExamples(){},readDemoOrders:()=>[],adminContent:()=>null,mountAdminContent(){},
   sellerProductListMarkup:()=>'<section>LISTA</section>',productEditorMarkup:()=>'<form>CADASTRO</form>',mountSellerProductList:()=>calls.push('list'),mountProductEditor:id=>calls.push('editor:'+id),mountOrderPanel:(_,page)=>calls.push('orders:'+page)};
  vm.runInNewContext(source,context);assert.deepEqual(calls,[expected],route);
  if(route==='produtos'){assert.match(portal.innerHTML,/LISTA/);assert.doesNotMatch(portal.innerHTML,/<form>CADASTRO/);}
  assert.match(portal.innerHTML,/#seller\/novo-produto/);
 }
});
