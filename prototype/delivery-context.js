import { readMarketplace, postalRegion, pickupAllowed, commercialDiscount } from './marketplace-settings.js';
const deliveryLocationKey='temlogoali.location.v1';
export function cleanPostalCode(value){return String(value||'').replace(/\D/g,'')}
export function readDeliveryLocation(){try{const saved=JSON.parse(localStorage.getItem(deliveryLocationKey)||'null');if(saved&&/^\d{8}$/.test(saved.cep))return saved;const cep=cleanPostalCode(localStorage.getItem('temlogoali.buyer-cep')),region=postalRegion(cep);return /^\d{8}$/.test(cep)?{cep,city:region?.name||'Outra cidade'}:null}catch{return null}}
export function saveDeliveryLocation(city,rawCep,{notify=true}={}){const cep=cleanPostalCode(rawCep),region=postalRegion(cep);if(!/^\d{8}$/.test(cep))throw Error('Informe um CEP com 8 dígitos.');if(!String(city||'').trim())throw Error('Escolha sua cidade.');if(region&&region.name!==city)throw Error(`Este CEP pertence à região ${region.name} nesta demonstração. Confira a cidade.`);const value={city:String(city).trim(),cep};localStorage.setItem(deliveryLocationKey,JSON.stringify(value));localStorage.setItem('temlogoali.buyer-cep',cep);if(notify&&typeof window!=='undefined')window.dispatchEvent(new Event('delivery-location-change'));return value}
export function deliveryAllowed(store,rawCep,config=readMarketplace()){const cep=cleanPostalCode(rawCep);return !!store&&store.status==='active'&&!!postalRegion(cep,config)&&/^\d{8}$/.test(cep)&&cep>=store.from&&cep<=store.to}
export function storeVisibleForPostal(storeId,cep=readDeliveryLocation()?.cep,config=readMarketplace()){const store=config.stores.find(s=>s.id===storeId);return !!store&&(deliveryAllowed(store,cep,config)||pickupAllowed(store,cep,config))}
export function productVisibleForPostal(product,cep=readDeliveryLocation()?.cep,config=readMarketplace()){return !!product&&storeVisibleForPostal(product.store,cep,config)}
export function localFreightQuote(storeId,rawCep,subtotal=0,config=readMarketplace()){
 const cep=cleanPostalCode(rawCep),store=config.stores.find(s=>s.id===storeId);if(!/^\d{8}$/.test(cep))throw Error('Informe um CEP com 8 dígitos.');if(!store)throw Error('Loja não encontrada.');
 const km=Number(store.routeKm??3.4),delivery=deliveryAllowed(store,cep,config)&&Number.isFinite(km)&&km>0&&km<=store.maxKm,pickup=pickupAllowed(store,cep,config),originalFreight=delivery?Math.round(km*store.rate):0;
 return {cep,delivery,pickup,km,originalFreight,freight:delivery?commercialDiscount(subtotal,originalFreight,null,config).freight:null,minutes:Math.ceil(km*config.minutesPerKm),simulated:true};
}
