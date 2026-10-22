# Monitoramento de preços entre sellers

Versão inicial — 02/10/2026. Especificação de produto, ainda não implementada.

## 1. Requisito confirmado

Preço e estoque atualizam assim que o seller os altera. Ao editar preço, avisar se o novo valor está abaixo ou acima do preço do mesmo produto oferecido por outros sellers do marketplace. Conteúdo editorial continua sujeito à aprovação. Este monitoramento usa ofertas publicadas na nossa plataforma; não foi solicitada pesquisa de preços em sites externos.

O alerta é informativo. Não gera aprovação adicional, preço imposto, bloqueio por diferença ou reajuste automático. O seller continua escolhendo seu preço. Alertas de validação comuns, como valor inválido, permanecem independentes dessa comparação.

## 2. Identificar o mesmo produto

Criar uma identidade de produto/variação compartilhada para comparar ofertas sem compartilhar edição do catálogo entre empresas. Proposta: GTIN/EAN validado como identificador preferencial, cruzado com marca, modelo, variação, conteúdo da embalagem e condição. GTIN isolado não dispensa validação de consistência. Sem código confiável, associação manual pela equipe de catálogo com base nas especificações aprovadas.

Não associar automaticamente só pelo título. Duas camisetas de tamanhos diferentes, embalagens com quantidades diferentes, kits e unidades avulsas não são equivalentes. Correspondências incertas ficam pendentes e mostram “Sem ofertas comparáveis”, sem comparação enganosa. Vínculo de equivalência é governado pelo marketplace; seller pode solicitar correção, não editar livremente referências concorrentes.

## 3. Referência proposta

Considerar ofertas públicas aprovadas, ativas, disponíveis para compra, de outros sellers e com identidade/variação equivalente. Excluir a própria empresa. **Escopo confirmado: todo o marketplace**, sem filtro obrigatório por cidade, região ou cobertura de entrega. Identificar a abrangência no aviso; uma oferta comparável pode não entregar no endereço de um comprador específico.

Comparar preço público unitário do produto, na mesma moeda, mesma quantidade e mesma condição de pagamento, excluindo frete. Desconto geral vigente pode compor referência; cupom individual, preço B2B privado e condições exclusivas não entram. Informar a condição utilizada no alerta. Comparação com ofertas em estoque evita usar preço de item indisponível como referência de compra.

Referência principal proposta: menor preço comparável, acompanhada da faixa mínima–máxima, quantidade de ofertas e momento da consulta. Se houver apenas uma oferta, mostrar seu valor; em empate, informar igualdade. Identificar como comparação de ofertas do marketplace, sem alegar menor preço de todo o mercado externo.

## 4. Fluxo de edição

1. Seller abre preço de uma variação própria, com permissão `price.update`.
2. Sistema consulta comparáveis publicados e, enquanto ele digita, atualiza a diferença do valor proposto. Não transmitir preços em rascunho a outros sellers.
3. Aviso informa maior/menor/igual à referência, diferença em reais e percentual quando referência maior que zero, condição de pagamento, quantidade de ofertas e horário de atualização.
4. Seller salva normalmente. Servidor valida permissão, preço e concorrência de edição; publica o novo preço imediatamente e registra alteração.
5. Comparações seguintes passam a usar o novo preço publicado, sem expor custos, margens, estoque detalhado, vendas ou dados de compradores de outras lojas.

Exemplo ilustrativo: menor oferta comparável R$ 100 e novo preço R$ 110 → “Seu preço está R$ 10 (10%) acima da menor oferta comparável: R$ 100. Comparação de produtos, sem frete.” Se for R$ 90, informar R$ 10 (10%) abaixo. Com ofertas de R$ 100 e R$ 120, R$ 110 está acima da menor e dentro da faixa; evitar dizer que está acima de todos.

Sem referência válida, mostrar ausência de dados. Falha do monitor não deve bloquear atualização autorizada: avisar “Comparação indisponível” e permitir salvar. Comparação é uma fotografia daquele momento, não uma garantia de posição futura. Mudanças simultâneas são tratadas por versão da oferta e atualização dos dados, sem travar preços de concorrentes.

## 5. Dados e processamento propostos

Entidades: `CatalogIdentity`, `OfferIdentityLink`, `PriceChangeEvent` e `PriceComparisonSnapshot`. Guardar autoria e motivo de alterações de equivalência. Referências de comparação incluem preço público, condição, região e instante observado, sem dados comerciais privados.

Consultar no momento da edição e invalidar referências quando preço, promoção, publicação, disponibilidade ou equivalência mudarem. Histórico de preços deve permitir auditoria. Alertas automáticos quando concorrentes mudarem preço fora da tela de edição são uma possível evolução, ainda não confirmada.

Importação ou ação em lote de preços deve oferecer prévia comparativa por linha e resumo, sem contornar permissões nem submeter preço à revisão editorial. Contratos de API retornam avisos estruturados para integração futura; reenvios não duplicam alterações.

## 6. Critérios de aceite

- Produtos equivalentes em duas lojas geram comparações corretas de preço menor, maior e igual.
- Variações, embalagens e condições diferentes não são comparadas como idênticas.
- Sem correspondência confiável, interface informa ausência de referência.
- Seller vê apenas valores públicos dos comparáveis, sem acesso administrativo às outras lojas.
- Aprovação de revisão editorial não sobrescreve preço ou estoque alterado enquanto estava em análise.
- Falha de comparação não impede salvar preço válido; ausência de permissão impede.
- Alteração de estoque afeta a elegibilidade como oferta comparável sem publicar conteúdo editorial pendente.

Abrangência de todo o marketplace confirmada. Permanecem propostas a validar: uso de menor preço como referência principal e governança detalhada para itens sem GTIN.
