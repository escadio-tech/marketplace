export const HOME_CATEGORIES=[['Casa & decoração','home'],['Moda & acessórios','shirt'],['Beleza & cuidados','beauty'],['Eletrônicos','tech'],['Esporte & lazer','sport'],['Jardim & plantas','leaf'],['Livros & digitais','grid'],['Mercado & alimentos','bag'],['Pet shop','heart'],['Brinquedos & jogos','star'],['Papelaria & escritório','grid'],['Ferramentas & construção','home']];
if(typeof document!=='undefined')document.addEventListener('click',e=>{const track=e.target.closest('.carousel-track[data-drag-click]');if(track){delete track.dataset.dragClick;e.preventDefault();e.stopImmediatePropagation();}},true);
export function validProductVideo(url){return typeof url==='string'&&(/^(https:\/\/[^\s]+\.(mp4|webm)(\?[^\s]*)?|\.\/assets\/(poltrona-vertical|camisa-video|modelo-blazer)\.mp4)$/.test(url)||/^data:video\/(mp4|webm);base64,[A-Za-z0-9+/=]+$/.test(url));}
export function categoryMediaLayout(category){return category==='Moda & acessórios'?'portrait':'square';}
export function orderedProductMedia(p){
 const valid=m=>m&&((m.type==='video'&&validProductVideo(m.src))||(m.type==='image'&&/^(https:\/\/|\.\/assets\/|data:image\/)/.test(m.src)));
 if(Array.isArray(p.media)&&p.media.some(valid))return p.media.filter(valid).map(m=>({...m}));
 const photo={type:'image',src:p.image,alt:p.name},video={type:'video',src:p.videoUrl,poster:p.image,alt:p.name};
 return validProductVideo(p.videoUrl)?(p.firstMedia==='video'?[video,photo]:[photo,video]):[photo];
}
export function moveProductMedia(media,from,to){const result=media.map(m=>({...m}));if(from<0||from>=result.length||to<0||to>=result.length)return result;result.splice(to,0,result.splice(from,1)[0]);return result;}
export function productGalleryMarkup(p,escape){
 const media=orderedProductMedia(p),render=(m,i)=>m.type==='video'?`<video controls playsinline preload="metadata" poster="${escape(m.poster||p.image)}" src="${escape(m.src)}" aria-label="Vídeo ${i+1} de ${escape(p.name)}"></video>`:`<button type="button" data-discovery="zoom" data-media-index="${i}" aria-label="Ampliar foto ${i+1} de ${escape(p.name)}"><img src="${escape(m.src)}" alt="${escape(m.alt||p.name)}" style="object-fit:${m.fit==='cover'?'cover':'contain'};transform:scale(${Math.min(2,Math.max(1,Number(m.zoom)||1))});transform-origin:${['50% 15%','50% 85%'].includes(m.position)?m.position:'50% 50%'}"><span>${escape(m.label||'Foto '+(i+1))} · ＋ Ampliar</span></button>`;
 return `<section class="ordered-gallery ${media.length===1?'single-media':''}" aria-label="Fotos e vídeos de ${escape(p.name)}"><div class="ordered-gallery-lead">${render(media[0],0)}</div>${media.length>1?`<div class="ordered-gallery-rail">${media.slice(1).map((m,i)=>render(m,i+1)).join('')}</div>`:''}</section>`;
}
export function productMediaMarkup(p,escape){
 const media=orderedProductMedia(p),first=media[0];p={...p,image:media.find(m=>m.type==='image')?.src||p.image,videoUrl:first?.type==='video'?first.src:'',firstMedia:first?.type};
 if(p.firstMedia==='video'&&validProductVideo(p.videoUrl))return `<div class="product-photo product-video"><video controls playsinline muted loop data-fashion-video data-autoplay="${first.autoplay!==false}" preload="metadata" poster="${escape(first.poster||p.image)}" aria-label="Vídeo de ${escape(p.name)}" src="${escape(p.videoUrl)}"></video><img class="video-fallback" src="${escape(first.poster||p.image)}" alt="${escape(p.name)}" hidden><a class="video-product-link" href="#/produto/${p.id}">Ver produto →</a><span class="video-label">▶ Vídeo do produto</span><button type="button" class="card-video-toggle" data-fashion-play aria-label="Reproduzir vídeo">▶</button></div>`;
 return `<button class="product-photo" data-action="product" data-id="${p.id}" aria-label="Ver ${escape(p.name)}"><img src="${escape(p.image)}" alt="${escape(p.name)}" loading="lazy" width="650" height="650"></button>`;
}
export function categoryGridMarkup(list,category,card,escape){
 if(categoryMediaLayout(category)!=='portrait')return list.map(card).join('');
 const cards=list.map(card);if(!list.length)return '';
 const video=list.find(p=>p.firstMedia==='video'&&validProductVideo(p.videoUrl)),p=list.at(-1);
 const banner=`<a class="category-banner-card fashion-media-cell" href="#/produto/${p.id}" aria-label="Conheça ${escape(p.name)}"><img src="${escape(p.image)}" alt="Seleção de ${escape(category)}" loading="lazy"><div><small>ESCOLHAS DA SUA REGIÃO</small><h2>Seu estilo.<br>Logo ali.</h2><p>${escape(p.name)}</p><b>Conhecer produto →</b></div></a>`;
 cards.splice(Math.min(2,cards.length),0,banner);return cards.join('');
}
export function bindCategoryMedia(root){
 root._mediaCleanup?.();const videos=[...root.querySelectorAll('[data-fashion-video]')];if(!videos.length)return;
 const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 const play=video=>{video.muted=true;video.play()?.catch(()=>{});};
 const observer=typeof IntersectionObserver==='function'?new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{target._inView=isIntersecting;if(isIntersecting&&!reduced&&target.dataset?.autoplay!=='false'&&!target._manualPause&&!document.hidden)play(target);else target.pause();}),{threshold:.25}):null;
 const cleanup=[];
 for(const video of videos){const cell=video.closest('.fashion-video-cell,.product-video'),button=cell.querySelector('[data-fashion-play]');
  const update=()=>{if(video.paused&&video._inView&&!document.hidden)video._manualPause=true;else if(!video.paused)video._manualPause=false;button.textContent=video.paused?'▶':'Ⅱ';button.setAttribute('aria-label',video.paused?'Reproduzir vídeo':'Pausar vídeo');};
  const toggle=()=>{if(video.paused){video._manualPause=false;play(video);}else{video._manualPause=true;video.pause();}};
  const fail=()=>{video.hidden=true;cell.querySelector('.fashion-video-fallback,.video-fallback').hidden=false;button.hidden=true;};
  button.addEventListener('click',toggle);video.addEventListener('play',update);video.addEventListener('pause',update);video.addEventListener('error',fail);observer?.observe(video);
  cleanup.push(()=>{button.removeEventListener('click',toggle);video.removeEventListener('play',update);video.removeEventListener('pause',update);video.removeEventListener('error',fail);video.pause();});
 }
 const visibility=()=>videos.forEach(video=>{if(document.hidden)video.pause();else if(video._inView&&!reduced&&video.dataset?.autoplay!=='false'&&!video._manualPause)play(video);});document.addEventListener('visibilitychange',visibility);
 root._mediaCleanup=()=>{observer?.disconnect();cleanup.forEach(fn=>fn());document.removeEventListener('visibilitychange',visibility);root._mediaCleanup=null;};
}
export function bindProductDrag(track){
 if(track.dataset.dragBound)return;track.dataset.dragBound='true';let start=null,dragged=false,suppress=false;
 track.addEventListener('dragstart',e=>e.preventDefault());
 track.addEventListener('pointerdown',e=>{delete track.dataset.dragClick;if(e.button!==0||e.target.closest('video,input,textarea,select,[data-fashion-play]'))return;start={id:e.pointerId,x:e.clientX,scroll:track.scrollLeft};dragged=false;suppress=false;});
 track.addEventListener('pointermove',e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x;if(!dragged&&Math.abs(dx)<7)return;if(!dragged){dragged=true;track.setPointerCapture(e.pointerId);track.classList.add('dragging');}e.preventDefault();track.scrollLeft=start.scroll-dx;});
 const stop=e=>{if(!start)return;if(track.hasPointerCapture?.(start.id))track.releasePointerCapture(start.id);suppress=dragged&&e.type!=='pointercancel';if(suppress)track.dataset.dragClick='true';start=null;track.classList.remove('dragging');};
 track.addEventListener('pointerup',stop);track.addEventListener('pointercancel',stop);track.addEventListener('pointerleave',()=>{if(!dragged)start=null;});
 track.addEventListener('click',e=>{if(suppress){e.preventDefault();e.stopImmediatePropagation();suppress=false;}},true);
}

export function mountMediaEditor(host,initial=[]){
 if(!host)return null;let items=initial.map(m=>({...m}));
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function draw(){host.innerHTML=`<h3>Fotos e vídeos — ordem de exibição</h3><p>A posição 1 é a capa nas categorias e vitrines. Mova fotos e vídeos para qualquer posição.</p><ol class="media-editor-list">${items.map((m,i)=>`<li draggable="true" data-media-row="${i}"><span class="media-number">${i+1}</span>${m.type==='video'?`<video muted preload="metadata" src="${esc(m.src)}"></video>`:`<img src="${esc(m.src)}" alt="Prévia da foto ${i+1}">`}<b>${m.type==='video'?'Vídeo':'Foto'}${i===0?' · Capa':''}</b>${m.type==='video'?`<label class="media-autoplay"><input type="checkbox" data-media-autoplay="${i}" ${m.autoplay!==false?'checked':''}>Iniciar automaticamente na categoria</label>`:''}<button type="button" data-media-up="${i}" ${i===0?'disabled':''} aria-label="Mover mídia ${i+1} para cima">↑</button><button type="button" data-media-down="${i}" ${i===items.length-1?'disabled':''} aria-label="Mover mídia ${i+1} para baixo">↓</button><button type="button" data-media-remove="${i}" aria-label="Remover mídia ${i+1}">Remover</button></li>`).join('')}</ol><div class="media-editor-add"><select data-media-type aria-label="Tipo de mídia"><option value="image">Foto</option><option value="video">Vídeo MP4/WebM</option></select><input data-media-url type="url" placeholder="https://…" aria-label="URL da mídia"><button type="button" data-media-add>Adicionar URL</button></div><label class="field-label">Ou selecionar arquivo local (até 8 MB por arquivo)<input type="file" data-media-file accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"></label><p>Fotos de moda: 4:5, recomendado 1600 × 2000 px. Outras categorias: 1:1, recomendado 2048 × 2048 px. Para a página do produto, envie vídeos verticais 9:16, preferencialmente MP4/H.264, 1080 × 1920 px (ou 720 × 1280 px). O player da página do produto é sempre vertical; arquivos horizontais mantêm faixas acima e abaixo, sem cortes. Nas categorias, vídeos se adaptam ao quadro do card. Arquivos ficam neste navegador; alterações precisam de aprovação.</p><p data-media-feedback role="status"></p>`;}
 const feedback=text=>host.querySelector('[data-media-feedback]').textContent=text;
 host.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;for(const [key,delta] of [['mediaUp',-1],['mediaDown',1]])if(b.dataset[key]!==undefined){items=moveProductMedia(items,Number(b.dataset[key]),Number(b.dataset[key])+delta);draw();host.querySelector(`[data-media-row="${Number(b.dataset[key])+delta}"] button`)?.focus();return;}
 if(b.dataset.mediaRemove!==undefined){items.splice(Number(b.dataset.mediaRemove),1);draw();return;}
 if(b.hasAttribute('data-media-add')){const type=host.querySelector('[data-media-type]').value,src=host.querySelector('[data-media-url]').value.trim();if(!src.startsWith('https://')||(type==='video'&&!validProductVideo(src))){feedback('Use uma URL HTTPS; vídeos precisam ser MP4 ou WebM.');return;}if(items.length>=20){feedback('Limite de 20 mídias por produto.');return;}items.push({type,src});draw();}});
 let dragging=null;host.addEventListener('dragstart',e=>{const row=e.target.closest('[data-media-row]');if(row){dragging=Number(row.dataset.mediaRow);e.dataTransfer?.setData('text/plain',String(dragging));}});host.addEventListener('dragover',e=>{if(e.target.closest('[data-media-row]'))e.preventDefault();});host.addEventListener('drop',e=>{const row=e.target.closest('[data-media-row]');if(row&&dragging!==null){e.preventDefault();items=moveProductMedia(items,dragging,Number(row.dataset.mediaRow));dragging=null;draw();}});host.addEventListener('dragend',()=>dragging=null);
 host.addEventListener('change',async e=>{if(e.target.dataset.mediaAutoplay!==undefined){items[Number(e.target.dataset.mediaAutoplay)].autoplay=e.target.checked;return;}if(!e.target.hasAttribute('data-media-file'))return;const file=e.target.files?.[0];if(!file)return;if(!['image/jpeg','image/png','image/webp','video/mp4','video/webm'].includes(file.type)||file.size>8*1024*1024||items.length>=20){feedback('Selecione foto ou vídeo de até 8 MB; limite de 20 mídias.');return;}const reader=new FileReader();reader.onload=()=>{items.push({type:file.type.startsWith('video/')?'video':'image',src:reader.result});draw();};reader.onerror=()=>feedback('Não foi possível ler o arquivo.');reader.readAsDataURL(file);});
 draw();return {get:()=>items.map(m=>({...m})),set:media=>{items=media.map(m=>({...m}));draw();}};
}
