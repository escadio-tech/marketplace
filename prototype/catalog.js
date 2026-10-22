import {prepareProductTypes} from './product-types.js';
export function catalogPhoto(id){return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=650&q=85`;}
export function marketplaceCatalog(photo=catalogPhoto){
const products=[
['Poltrona de madeira com estofado','Casa & decoração',0,689.90,'photo-1567538096630-e0c55bd6374c','Madeira natural · Bege'],
['Tênis casual urbano','Moda & acessórios',1,189.90,'photo-1549298916-b41d501d3772','Casual · Vários tamanhos'],
['Fone de ouvido sem fio','Eletrônicos',1,249.90,'photo-1505740420928-5e560c06d30e','Bluetooth · Preto'],
['Vaso de cerâmica com folhagem','Jardim & plantas',2,79.90,'photo-1485955900006-10f4d324d411','Decoração · Vaso incluso'],
['Bolsa casual preta','Moda & acessórios',1,219.90,'photo-1548036328-c9fa89d128fa','Alça ajustável · Preto'],
['Câmera fotográfica compacta','Eletrônicos',1,459.90,'photo-1516035069371-29a1b244cc32','Fotografia · Preto'],
['Kit de cuidados essenciais','Beleza & cuidados',1,89.90,'photo-1608571423902-eed4a5ad8108','Cuidados diários · Kit'],
['Luminária de mesa minimalista','Casa & decoração',0,159.90,'photo-1507473885765-e6ed057f782c','Iluminação · Design essencial'],
['Tênis esportivo para caminhada','Esporte & lazer',1,279.90,'photo-1542291026-7eec264c27ff','Esportivo · Vários tamanhos'],
['Cadeira contemporânea em madeira','Casa & decoração',0,349.90,'photo-1598300042247-d088f8ab3a91','Sala de jantar · Madeira'],
['Óculos de sol clássico','Moda & acessórios',1,119.90,'photo-1511499767150-a48a237f0083','Acessórios · Unissex'],
['Kit para cuidar do jardim','Jardim & plantas',2,59.90,'photo-1416879595882-3373a0480b5b','Jardim · Ferramentas']
].map((p,id)=>({id,name:p[0],category:p[1],store:p[2],price:p[3],image:photo(p[4]),description:p[5]}));
prepareProductTypes(products);
[["Luminária de mesa Lar & Luz","Casa & decoração",100,149.9,"photo-1507473885765-e6ed057f782c"],["Poltrona aconchego","Casa & decoração",100,649.9,"photo-1567538096630-e0c55bd6374c"],["Cadeira de madeira natural","Casa & decoração",100,329.9,"photo-1598300042247-d088f8ab3a91"],["Planta em vaso de cerâmica","Jardim & plantas",101,69.9,"photo-1485955900006-10f4d324d411"],["Ferramentas para jardinagem","Jardim & plantas",101,54.9,"photo-1416879595882-3373a0480b5b"],["Vaso verde para decorar","Jardim & plantas",101,89.9,"photo-1485955900006-10f4d324d411"],["Fone sem fio Conecta","Eletrônicos",102,229.9,"photo-1505740420928-5e560c06d30e"],["Câmera para registrar momentos","Eletrônicos",102,499.9,"photo-1516035069371-29a1b244cc32"],["Fone para música e trabalho","Eletrônicos",102,199.9,"photo-1505740420928-5e560c06d30e"]].forEach(([name,category,store,price,image])=>{const id=products.length;products.push({id,name,category,store,price,image:photo(image),description:'Produto demonstrativo · imagem ilustrativa',type:'simple',priceCents:Math.round(price*100),stock:12,sku:'ML-'+id,attributes:[],variants:[]});});

try{const drafts=JSON.parse(localStorage.getItem('marketplace.product-drafts.v1')||'[]');for(const p of products){const d=drafts.find(d=>d.id===p.id&&d.store===p.store&&d.existingCatalog);if(!d)continue;if(d.status==='approved')Object.assign(p,d);p.priceCents=d.priceCents;p.price=d.priceCents/100;if(p.type==='simple')p.stock=d.stock;if(p.type==='variable')for(const v of p.variants){const edited=d.variants?.find(x=>x.id===v.id&&JSON.stringify(x.attributes)===JSON.stringify(v.attributes));if(edited){v.stock=edited.stock;v.priceCents=edited.priceCents;}}}}catch{}
return products;
}
