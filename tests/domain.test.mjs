import test from 'node:test';
import assert from 'node:assert/strict';
import { freight,dispatchDate,comparison,totals } from '../prototype/domain.js';
test('frete proporcional com centavos',()=>assert.equal(freight(3400,200),680));
test('corte e fim de semana respeitados',()=>{assert.equal(dispatchDate('2026-10-05T14:59'),'2026-10-05');assert.equal(dispatchDate('2026-10-05T15:00'),'2026-10-06');assert.equal(dispatchDate('2026-10-09T16:00'),'2026-10-12');assert.equal(dispatchDate('2026-10-10T09:00'),'2026-10-12')});
test('comissão exclui frete e valores conciliam por seller',()=>{const g=totals([{seller:1,price:10000,qty:1},{seller:2,price:5000,qty:2}],{2:'pickup'},[{id:1,rate:200},{id:2,rate:300}],{1:4000,2:5000},10,3);assert.equal(g[0].commission,1000);assert.equal(g[0].shipping,800);assert.equal(g[1].shipping,0);for(const x of g)assert.equal(x.net+x.commission+x.fee,x.gross)});
test('comparação ignora próprio seller, variantes e indisponíveis',()=>{const p={seller:1,identity:'A'};assert.equal(comparison([{seller:2,identity:'A',price:100,status:'approved',stock:1},{seller:3,identity:'B',price:1,status:'approved',stock:1},{seller:1,identity:'A',price:2,status:'approved',stock:1},{seller:4,identity:'A',price:3,status:'approved',stock:0}],p,110).diff,10);assert.equal(comparison([],p,10),null)});
