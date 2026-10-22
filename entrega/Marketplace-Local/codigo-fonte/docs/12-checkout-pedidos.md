> **Atualização vigente — 08/10/2026:** consulte [Regras, pedidos e Administração](13-regras-pedidos-administracao.md). Retirada por CEP da cidade sem limite de km; Indicada com 100 pedidos/dia e revisão semestral; Oficial somente por documentos. Regras antigas conflitantes abaixo são histórico.

# Checkout, pedidos e pós-compra

Versão 0.12 — 06/10/2026. Etapa implementada como protótipo local, sem integração externa.

## Jornada disponível

1. Escolher produto simples, selecionar todos os atributos de uma variação ou compor um kit. Adicionar à sacola.
2. A sacola agrupa produtos por loja e preserva quantidades, combinações e componentes dos kits.
3. Continuar para o checkout e escolher recebimento por loja: entrega ou retirada. Pedidos exclusivamente digitais não oferecem entrega física.
4. Ao escolher entrega, informar endereço fictício e distância do trajeto para a simulação. Endereço não é solicitado para uma compra somente com retirada ou downloads.
5. Escolher Pix ou cartão de crédito, revisar produtos, fretes por loja e total único.
6. Criar pedido demonstrativo. O carrinho é limpo somente após salvar o pedido, que nasce aguardando pagamento.
7. Simular pagamento aprovado ou falha. A falha permite nova tentativa, com revalidação do estoque.
8. Acessar Minha conta para pedidos, histórico, chat por subpedido e downloads. Na Central de Vendedores, Pedidos e Chat pós-compra mostram somente os subpedidos da Casa Aurora, a loja da conta demonstrativa. A Administração visualiza todas as lojas.

## Valores e entrega

- Valores calculados em centavos, evitando erros de soma de moeda.
- A compra gera um pedido principal e um subpedido por loja. Itens e preços são copiados para o pedido; alterações futuras no catálogo não reescrevem a compra.
- O frete de cada loja é arredondado para centavos após multiplicar distância proporcional por tarifa. Kit paga frete como produto físico, sem cobrar novamente por componente nesta demonstração.
- Uma loja com produtos digitais e físicos cobra frete somente pela entrega física. Os downloads são liberados após pagamento, independentemente do despacho dos demais itens.
- Retirada e pedidos exclusivamente digitais têm frete zero.
- A comissão deverá incidir apenas nos produtos, com frete integralmente destinado ao seller. Nenhum percentual, taxa de processamento ou repasse real é aplicado nesta etapa: provedor e valores continuam pendentes.
- Um endereço de entrega por compra é a opção implementada nesta etapa. Recebimento por loja pode combinar entrega nesse endereço com retirada em outra cidade.

### Parâmetros fictícios de teste

| Loja | Cidade de entrega simulada | Tarifa/km | Limite |
|---|---|---:|---:|
| Casa Aurora | Cianorte | R$ 2,50 | 10 km |
| Essencial Concept | Maringá | R$ 2,00 | 15 km |
| Verde & Vida | Cianorte | R$ 1,80 | 8 km |

Não são regras comerciais aprovadas. O cliente informa a distância apenas para exercitar o protótipo; em produção o servidor consultará uma rota pelas ruas e a cobertura cadastrada pelo seller. Não há consulta de CEP, geocodificação ou estimativa de chegada real. A regra global de tempo de transporte por distância ainda precisa de parâmetros.

## Pagamento, estoque e status

- Uma única escolha de Pix ou cartão para toda a compra; não são solicitados números de cartão, CPF, chaves Pix ou credenciais financeiras.
- Estados de pagamento: aguardando, não aprovado e confirmado. A confirmação é idempotente: repetir a ação não muda a data original nem reinicia o prazo. Um pagamento confirmado não pode regredir para falha.
- Pedidos pendentes reservam estoque no cálculo local; pedidos pagos consomem esse saldo. Kits e produtos avulsos compartilham o mesmo SKU. A falha libera a reserva. Nova tentativa compara com os outros pedidos antes de confirmar.
- A reserva local não tem expiração ou cancelamento nesta etapa. A vitrine ainda apresenta o estoque base do catálogo; o checkout verifica o saldo considerando os pedidos locais. Reserva atômica no banco de dados, expiração e sincronização entre usuários são trabalhos de backend.
- Entrega: pagamento confirmado → em preparação → em entrega → concluído.
- Retirada: pagamento confirmado → em preparação → pronto para retirada → concluído.
- Exclusivamente digital: concluído após pagamento confirmado, sem despacho.
- Alterações de um subpedido não alteram os demais. O cabeçalho principal mostra o pagamento; o status operacional é apresentado por loja.
- O pagamento confirmado inicia o prazo. O corte de 15h é fotografado no subpedido. Cálculo no fuso America/Sao_Paulo, segunda a sexta; no corte ou depois, próximo dia útil. **Feriados ainda não configurados** e informados como limitação na interface.
- Prazo de preparação para retirada usa, como proposta demonstrativa, o mesmo calendário do despacho; é uma decisão a confirmar antes do backend.

## Chat e downloads

- Chat só existe dentro de um pedido criado; não há chat pré-venda. A demonstração permite conversar também enquanto aguarda pagamento, pois o pedido já existe. A exigência de pagamento antes de conversar pode ser decidida posteriormente.
- Cada conversa pertence a um subpedido. Comprador e vendedor têm mensagens identificadas, data/hora e texto de até 2.000 caracteres.
- Imagens PNG, JPEG e WEBP de até 5 MB são aceitas pelo formulário e salvas localmente. Se a cota do navegador for excedida, o envio falha com mensagem e sem declarar sucesso. Não existe transmissão a uma loja real, notificação ou proteção de servidor.
- Arquivo digital bloqueado antes do pagamento. Depois da confirmação, o botão entrega um `.txt` de exemplo, não o arquivo comercial anunciado como PDF. Isso substitui o antigo botão avulso de simulação do produto digital da etapa 11.
- A entrega real exigirá autenticação, checagem de propriedade do pedido, armazenamento privado e URL temporária emitida pelo servidor, além de revogação em estorno.

## Persistência e segurança

Dados fictícios em `marketplace.orders.v1` no localStorage. O carrinho permanece apenas durante a sessão da página. Pedidos, histórico e conversas sobrevivem ao recarregamento no mesmo navegador/origem. Sem sincronização entre computadores; telas abertas devem ser reabertas ou atualizadas para refletir alterações feitas em outra aba.

O login do vendedor continua sendo uma simulação. Filtros de loja no frontend demonstram o escopo; não são autorização segura. Administração e comprador também não têm autenticação real. Não inserir dados pessoais reais. No modo `file:`, compartilhamento de armazenamento entre arquivos depende do navegador; para validar o fluxo entre áreas de forma consistente, usar o servidor local em `http://localhost:4173/`.

## Arquivos e validação

- `prototype/order-model.js`: cotação, validação de estoque, criação de pedidos, pagamento, prazo e transições.
- `prototype/order-storage.js`: persistência local e erro explícito se não puder salvar.
- `prototype/order-ui.js` e `prototype/orders.css`: checkout, revisão, pedidos, chat e downloads; compartilhados com os painéis.
- `tests/orders.test.mjs`: oito testes adicionais para multiloja, frete, virtual, cobertura, endereço, reserva, pagamento idempotente, corte, escopo do vendedor, sequência de status e snapshot de valores.
- Comando: `node --test tests/domain.test.mjs tests/product-types.test.mjs tests/orders.test.mjs`.

Próxima fase técnica: API e banco de dados, autenticação/autorização por empresa, estoque e pedidos transacionais, serviço de rotas e integração de pagamento com split. Cancelamentos, devoluções, estornos, feriados e expiração de reserva devem ser detalhados antes de operação real.

### Conferência realizada

20 testes passaram. No navegador: sacola com kit, físico e digital em duas lojas; entrega de 3,4 km por R$ 8,50 e retirada gratuita na outra loja; total único de R$ 1.597,80; criação de dois subpedidos; falha e nova aprovação; download bloqueado antes e habilitado após pagamento; mensagem do comprador e resposta da loja; preparação, despacho e conclusão refletidos no comprador; checkout digital com Pix, sem endereço e frete zero. Layout de pedidos conferido em 390 px e 1280 px, sem transbordamento horizontal no modal móvel.

Capturas: `docs/previews/pedidos-desktop.png` e `docs/previews/pedidos-mobile.png`. Anexos de imagem têm validação implementada, mas envio de arquivo pela interface não foi testado nesta rodada.

### Ajuste de acesso local — 06/10/2026

Adicionado o arquivo de entrada ABRIR-MARKETPLACE.html. Abertura por file: dos HTML de código-fonte direciona para a entrega standalone correspondente, sem tentar carregar módulos locais. Login mantém a tela inicial e ganhou entrada explícita com a conta demonstrativa em um clique. Validado sair, entrar e acessar Produtos pelo servidor local. A execução em file: no Chrome permanece sem automação nesta sessão.
