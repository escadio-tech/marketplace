# Avaliação inicial de split de pagamento

Pesquisa em fontes oficiais: 02/10/2026. Estado: comparação documental, sem contratação, contato comercial ou homologação. Nenhum fornecedor foi escolhido. Documentação pública não comprova estabilidade em produção nem garante habilitação para nossa empresa.

**Atualização de escopo:** o proprietário adiou a escolha do provedor e informou que ainda não há estimativas de volume. Pesquisa preservada para consulta futura; não há cotação ou seleção em andamento. Pix e cartão de crédito são requisitos desejados para essa escolha. A documentação e o protótipo podem avançar com integração abstrata e dados simulados.

## 1. Necessidade confirmada

Marketplace de varejo e comércio geral em Cianorte e região e Maringá e região. Carrinho pode conter produtos de várias empresas com CNPJ. Cada seller entrega ou disponibiliza retirada. Marketplace ganha apenas comissão sobre o valor do pedido.

Proposta de experiência: cliente faz um pagamento; o provedor distribui os valores entre marketplace e sellers. Precisamos avaliar múltiplos recebedores na mesma cobrança. Confirmado: comissão uniforme somente sobre produtos e taxa de pagamento descontada do seller por pedido. Frete integra a cobrança no mesmo checkout e pertence ao seller, sem comissão. Percentual, tratamento dos descontos, condições de Pix/cartão, valores das taxas e prazo de recebimento serão definidos posteriormente. Na futura homologação, testar a separação entre base da comissão e base da taxa do provedor, que pode incluir frete.

## 2. Comparação documental

| Candidato | Evidência oficial | Consequência para nossa seleção |
|---|---|---|
| Mercado Pago | O produto 1:N documenta uma cobrança com vendedor principal e até 10 secundários, divisão fixa/percentual e reembolso por participante. Integração depende de contato comercial e consentimento dos participantes. [Guia 1:N](https://www.mercadopago.com.br/developers/en/docs/checkout-api-orders/resources/split-payments-1-n) | Candidato condicionado à liberação comercial, enquadramento dos participantes e limite de lojas por compra. Não assumir que o split 1:1 resolve nosso carrinho |
| Pagar.me | API documenta múltiplos recebedores, valores fixos/percentuais e opções de responsabilidade por taxas e contestação. Recurso restrito a clientes PSP. [Split](https://docs.pagar.me/reference/split-1) | Candidato direto à cotação. Confirmar habilitação PSP, limite por cobrança, métodos, regras de estorno e obrigações contratuais |
| Asaas | Distribui entre contas identificadas por carteira; percentual incide sobre o líquido após taxas. O saldo não distribuído permanece na origem. [Introdução](https://docs.asaas.com/docs/split-de-pagamentos) | Alternativa a cotar. Não confundir percentual de split líquido com comissão comercial sobre o pedido; calcular e reconciliar explicitamente |

O Mercado Pago distingue a disponibilidade comercial do 1:N em seus [pré-requisitos](https://www.mercadopago.com.br/developers/pt/docs/split-payments/split-1-1/prerequisites). Portanto, sua integração para este projeto depende da habilitação correspondente.

No Pagar.me, recebedores são cadastrados antes das vendas e podem ser reutilizados. [Recebedores](https://docs.pagar.me/reference/recebedores-1). Os resultados de pesquisa também exibiram APIs antigas v3/v4; elas não servem de contrato para nossa implementação. O estorno parcial dirigido a um seller precisa ser confirmado na API atual e testado em homologação antes de seleção definitiva.

O Asaas documenta estorno integral/parcial de cartão e Pix, com distribuição de estorno por split. Também informa que taxas de cobrança não são devolvidas e que saldo insuficiente pode impedir estorno. [Estornar cobrança](https://docs.asaas.com/reference/estornar-cobranca). Isso entra no cálculo de custo e no fluxo de pós-venda.

## 3. Taxas: o que já podemos concluir

Não existe ainda uma comparação de preços contratados equivalentes para nossa operação. A página comercial Pagar.me apresenta o split na oferta Flex com taxas personalizadas; não devemos aplicar automaticamente ao marketplace a taxa de seu plano Essencial. [Ofertas](https://website.pagar.me/ofertas).

O Asaas publica valores padrão e promocionais, com duração e condições distintas, e orienta conferir as condições do contrato na conta. Essa tabela ajuda na triagem, mas não é uma cotação completa do nosso arranjo de split. [Preços e taxas](https://www.asaas.com/precos-e-taxas).

As fontes consultadas do Mercado Pago não estabelecem um preço contratado de split 1:N para nosso marketplace. Solicitar proposta específica antes de comparar custo.

**Conclusão:** nenhum candidato pode ser declarado o mais barato com os dados atuais. Quando o proprietário retomar a seleção, a proposta é cotar Pagar.me e Asaas e verificar a habilitação 1:N do Mercado Pago. Trata-se de sequência futura de investigação, não de escolha ou ranking de estabilidade.

## 4. Modelo de comparação econômica

Para comparar propostas, usar o mesmo volume de vendas, quantidade de cobranças, ticket médio, número médio de sellers por compra, participação de Pix/cartão, parcelamento, prazo de recebimento e frequência de devolução.

`custo total = processamento + valores fixos por cobrança + split/recebedores + saques/repasses + antifraude + antecipação + custos de estorno/contestação + mínimos/mensalidades`

`receita líquida operacional do marketplace = comissão contratada - custos atribuídos ao marketplace - subsídios/ajustes de sua responsabilidade`

Comissão é nossa receita; tarifa de pagamento é um custo separado, a descontar do seller por pedido conforme decisão confirmada. Tarifas adicionais de operação precisarão ser identificadas no contrato, sem supor que tudo possa ser repassado pela mesma regra. Tarifa percentual deve indicar sua base; um valor fixo deve indicar se é por compra, cobrança, parcela ou recebedor. Rateio entre subpedidos não pode duplicar custos de uma única cobrança.

Exemplo hipotético apenas para comparação: R$ 100.000/mês em 1.000 cobranças. Uma diferença de 0,3 ponto percentual representa R$ 300/mês sobre essa base; R$ 0,30 por cobrança também representa R$ 300/mês. Custos por recebedor podem crescer com a quantidade de lojas no carrinho. Nenhum desses números é tarifa anunciada por um fornecedor.

## 5. Informações a obter dos candidatos

| Assunto | Informação necessária |
|---|---|
| Elegibilidade | Aceitam marketplace regional novo? Exigem volume mínimo, tempo de atividade ou carteira assessorada? |
| Cobrança | Um pagamento para N sellers e marketplace? Limite de participantes por método? |
| Cadastro | Quais dados da empresa/responsável, validações, prazos e motivos de reprovação? |
| Tarifas | Pix, cartão à vista/parcelado, valor fixo, antifraude, split, recebedor, saque e mensalidade/mínimo |
| Disponibilidade | Prazos, antecipação obrigatória/opcional, retenções e condições da comissão |
| Pós-venda | Reembolso parcial de apenas um seller, taxas não devolvidas, saldo insuficiente e contestação após repasse |
| Operação | Webhooks, conciliação, relatórios, idempotência, limites de API e recuperação de falhas |
| Suporte | SLA contratual aplicável, suporte técnico, incidentes e comunicação de mudanças |
| Migração | Exportação do histórico e portabilidade operacional; recadastro de recebedores/tokenização |

Essas perguntas estão preparadas para cotação, mas não foram enviadas a terceiros.

## 6. Critérios técnicos de seleção

Homologar os candidatos comercialmente viáveis com: marketplace e duas empresas recebedoras; pagamento aprovado; recusa; expiração; webhook duplicado; estorno de uma loja preservando a outra; bloqueio de recebedor; falta de saldo para estorno; conciliação de centavos; repasse e consulta do histórico.

Requisitos eliminatórios: atender o fluxo multiloja acordado, manter valores rastreáveis, permitir pós-venda por seller nos métodos escolhidos e apresentar condições comerciais sustentáveis. Estabilidade será avaliada por esses testes e evidências operacionais/contratuais, não por promessa comercial.

O sistema terá uma camada própria para cadastro de recebedores, cobrança com split, eventos, consulta e reembolso. Implementar um provedor inicialmente. Preservar identificadores e histórico por provedor permite evoluir, mas não implica migração automática de contas ou cartões.
