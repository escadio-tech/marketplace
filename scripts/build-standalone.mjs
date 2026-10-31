import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'entrega','Marketplace-Local','standalone');
await mkdir(out,{recursive:true});
const read=name=>readFile(path.join(root,'prototype',name),'utf8');
async function download(url){let last;for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error(`HTTP ${r.status}`);return {data:Buffer.from(await r.arrayBuffer()),type:r.headers.get('content-type')?.split(';')[0]||'application/octet-stream'}}catch(e){last=e}}throw new Error(`Falha ao baixar ${url}: ${last.message}`)}
const dataUri=({data,type})=>`data:${type};base64,${data.toString('base64')}`;
let home=await read('home.js');
let catalogSource=await read('catalog.js');
for(const [file,type] of [['camisa.jpg','image/jpeg'],['calca.jpg','image/jpeg'],['blazer.jpg','image/jpeg'],['camisa-video.mp4','video/mp4'],['modelo-blazer.mp4','video/mp4'],['modelo-blazer-poster.jpg','image/jpeg']]){const asset=dataUri({data:await readFile(path.join(root,'prototype/assets',file)),type});catalogSource=catalogSource.replaceAll('./assets/'+file,asset);}
const demoVideo=dataUri({data:await readFile(path.join(root,'prototype/assets/poltrona-vertical.mp4')),type:'video/mp4'});catalogSource=catalogSource.replaceAll('./assets/poltrona-vertical.mp4',demoVideo);
const ids=[...new Set((home+catalogSource).match(/photo-[\w-]+/g))];
const photos={};
for(let i=0;i<ids.length;i+=4)await Promise.all(ids.slice(i,i+4).map(async id=>{photos[id]=dataUri(await download(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${id.includes('1616486338812')?1000:650}&q=85`))}));
console.log(`${ids.length} imagens do catálogo incorporadas.`);
home=home.replace(/const photo=.*?;\r?\n/,`const embeddedPhotos=${JSON.stringify(photos)};\nconst photo=id=>embeddedPhotos[id];\n`);
catalogSource=catalogSource.replace(/^export function catalogPhoto.*$/m, 'export function catalogPhoto(id){return '+JSON.stringify(photos)+'[id];}');
let css=await read('home.css');
const fontUrl=css.match(/@import url\('([^']+)'\);/)[1];
let fontCss=(await download(fontUrl)).data.toString('utf8');
for(const url of new Set([...fontCss.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1])))fontCss=fontCss.replaceAll(url,dataUri(await download(url)));
css=css.replace(/@import url\('[^']+'\);/,fontCss);
const localLinks=s=>s.replaceAll('href="/"','href="index.html"').replaceAll('href="/vender.html','href="vender.html').replaceAll('href="/painel.html','href="painel.html');
const plain=s=>s.replace(/^import .*?;\r?\n/gm,'').replace(/\bexport async function /g,'async function ').replace(/\bexport function /g,'function ').replace(/\bexport const /g,'const ');
const entries=[
  ['index.html',css+'\n'+await read('cart-drawer.css')+'\n'+await read('delivery.css')+'\n'+await read('merchandising.css')+'\n'+await read('seller.css')+'\n'+await read('discovery.css')+'\n'+await read('product-types.css')+'\n'+await read('orders.css')+'\n'+await read('buyer-account.css')+'\n'+await read('marketplace-updates.css'),plain(await read('product-media.js'))+'\n'+plain(await read('marketplace-settings.js'))+'\n'+plain(await read('delivery-context.js'))+'\n'+plain(await read('configured-modules.js'))+'\n'+plain(await read('product-types.js'))+'\n'+plain(catalogSource)+'\n'+plain(await read('order-model.js'))+'\n'+plain(await read('delivery-ui.js'))+'\n'+plain(await read('order-storage.js'))+'\n'+plain(await read('buyer-account.js'))+'\n'+plain(await read('buyer-account-ui.js'))+'\n'+plain(await read('reorder.js'))+'\n'+plain(await read('order-ui.js'))+'\n'+plain(await read('product-experience.js'))+'\n'+plain(await read('merchandising.js'))+'\n'+plain(await read('discovery.js'))+'\n'+plain(home)],
  ['painel.html',css+'\n'+await read('seller.css')+'\n'+await read('product-types.css')+'\n'+await read('orders.css')+'\n'+await read('buyer-account.css')+'\n'+await read('marketplace-updates.css'),plain(await read('product-media.js'))+'\n'+plain(await read('marketplace-settings.js'))+'\n'+plain(await read('delivery-context.js'))+'\n'+plain(await read('configured-modules.js'))+'\n'+plain(await read('product-types.js'))+'\n'+plain(catalogSource)+'\n'+plain(await read('order-model.js'))+'\n'+plain(await read('delivery-ui.js'))+'\n'+plain(await read('order-storage.js'))+'\n'+plain(await read('buyer-account.js'))+'\n'+plain(await read('buyer-account-ui.js'))+'\n'+plain(await read('reorder.js'))+'\n'+plain(await read('order-ui.js'))+'\n'+plain(await read('product-editor.js'))+'\n'+plain(await read('seller-login.js'))+'\n'+plain(await read('admin-console.js'))+'\n'+plain(await read('portal.js'))],
  ['vender.html',css+'\n'+await read('seller.css'),null]
];
for(const [name,styles,script] of entries){let html=await read(name);html=html.replace(/<script data-source-only>[\s\S]*?<\/script>/g,'');html=html.replace(/<link rel="stylesheet"[^>]+>/g,'');html=html.replace('</head>',`<style>${styles}</style></head>`);if(script!==null){new vm.Script(script);html=html.replace(/<script type="module" src="[^"]+"><\/script>/,()=>`<script>${localLinks(script).replaceAll('</script','<\\/script')}</script>`)}else{html=html.replace('type="module"','');const image=html.match(/https:\/\/images\.unsplash\.com\/[^" ]+/)[0];html=html.replace(image,dataUri(await download(image)))}html=localLinks(html);if(/(?:src|href)="\//.test(html)||/https:\/\/(?:images\.unsplash|fonts\.google)/.test(html))throw Error(`Dependência externa em ${name}`);await writeFile(path.join(out,name),html);console.log(`Gerado ${name}`)}
const embeddedPages={panel:await readFile(path.join(out,'painel.html'),'utf8'),vender:await readFile(path.join(out,'vender.html'),'utf8')};
const embeddedCode=plain(await read('embedded-areas.js'))+'\ninstallEmbeddedAreas('+JSON.stringify(embeddedPages).replaceAll('<','\\u003c')+');';
new vm.Script(embeddedCode);
let entry=await readFile(path.join(out,'index.html'),'utf8');
entry=entry.replace('</body>',()=>'<script>'+embeddedCode.replaceAll('</script','<\\/script')+'</script></body>');
await writeFile(path.join(out,'index.html'),entry);
console.log('Áreas de venda incorporadas ao index.html standalone.');
await writeFile(path.join(root,'entrega','Marketplace-Local','ABRA-PRIMEIRO.txt'),`MARKETPLACE LOCAL — PROTÓTIPO STANDALONE\n\n1. Extraia TODO o arquivo ZIP.\n2. Abra a pasta standalone.\n3. Clique com o botão direito em index.html > Abrir com > Google Chrome.\n\nNão precisa instalar Node.js, iniciar servidor ou ter internet. Imagens, fontes, estilos e scripts estão incorporados nos três HTML. O index.html incorpora também Quero Vender, Central de Vendedores e Administração. Os outros HTML são atalhos opcionais.\n\nLOGIN DEMONSTRATIVO DO VENDEDOR\nE-mail: lojista@exemplo.com\nSenha: Demo123!\nUse o botão Entrar com conta de demonstração na tela de login, ou preencha os dados acima e clique em Entrar.\n\nCONTEÚDO\nstandalone/: versão pronta para abrir no navegador.\ncodigo-fonte/: código original, documentação, pesquisas e arquivos do projeto.\n\nLIMITES\nProtótipo visual com dados fictícios, sem backend, pagamentos ou autenticação real. O login é uma simulação no navegador. Carrinho e favoritos podem reiniciar ao recarregar a home. Cadastro de compradores, endereços, pedidos, conversas e rascunhos são salvos apenas no navegador, sem servidor. O acesso sempre inicia deslogado; entre com o cadastro demonstrativo criado anteriormente. O compartilhamento entre arquivos locais depende do Chrome; para testar comprador e seller com persistência consistente, execute node server.mjs em codigo-fonte e abra http://localhost:4173/. O comportamento de armazenamento da sessão pode variar ao abrir arquivos locais. Não utilize senhas ou dados reais.\n\nAs imagens são fotografias ilustrativas provenientes do Unsplash, incorporadas a pedido para visualização offline; não representam o estoque das lojas fictícias. As fontes vieram do Google Fonts.\n`);

