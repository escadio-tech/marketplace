import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const base=new URL('../entrega/Marketplace-Local/',import.meta.url),html=await fs.readFile(new URL('REVISAO-PROJETO.html',base),'utf8');
const data=JSON.parse(html.match(/<script type="application\/json" id="inventory-data">([\s\S]*?)<\/script>/)[1]);
test('inventário inclui todas as páginas de produtos, documentos e arquivos de entrada existentes',async()=>{
 assert.equal(data.entries.filter(e=>e.area==='Produtos').length,33);assert.equal(data.entries.filter(e=>e.area==='Lojas').length,6);assert.equal(data.entries.filter(e=>e.area==='Categorias').length,12);assert.equal(new Set(data.entries.map(e=>e.id)).size,data.entries.length);
 for(const e of data.entries)await fs.access(new URL(e.url.split('#')[0],base));
 for(const d of data.docs)await fs.access(new URL(d.url,base));
 assert.ok(data.docs.some(d=>d.name.startsWith('26-')));
});
test('revisão inicia pendente e permite importar e exportar notas sem presumir aprovação',async()=>{
 const nodes=new Map(),stored=new Map();let blob;
 const node=()=>({value:'',textContent:'',innerHTML:'',append(){},addEventListener(){},click(){}});
 const document={querySelector(s){if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)},querySelectorAll(){return []},getElementById(id){return this.querySelector('#'+id)},createElement:node};document.querySelector('#inventory-data').textContent=JSON.stringify(data);
 const ctx=vm.createContext({document,localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},Blob,URL:{createObjectURL(b){blob=b;return 'blob:demo'},revokeObjectURL(){}},setTimeout(){},window:{print(){}}});
 new vm.Script(html.match(/<script>([\s\S]*)<\/script>/)[1]).runInContext(ctx);
 nodes.get('#export-json').onclick();let exported=JSON.parse(await blob.text());assert.ok(exported.items.every(e=>e.status==='pending'));
 const item={...exported.items[0],status:'change',notes:'Ajustar o banner <sem executar HTML>.'};const input={files:[{size:400,text:async()=>JSON.stringify({project:'temlogoali',items:[item]})}],value:'demo'};
 await nodes.get('#import-json').onchange({target:input});assert.ok(stored.size>0);nodes.get('#export-json').onclick();exported=JSON.parse(await blob.text());assert.equal(exported.items[0].status,'change');assert.equal(exported.items[0].notes,item.notes);assert.ok(nodes.get('#page-list').innerHTML.includes('&lt;sem executar HTML&gt;'));
 nodes.get('#export-csv').onclick();assert.match(await blob.text(),/Solicitar alteração/);
});
