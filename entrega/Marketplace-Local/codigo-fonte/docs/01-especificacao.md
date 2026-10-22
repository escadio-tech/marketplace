> **Atualização vigente — 08/10/2026:** consulte [Regras, pedidos e Administração](13-regras-pedidos-administracao.md). Retirada por CEP da cidade sem limite de km; Indicada com 100 pedidos/dia e revisão semestral; Oficial somente por documentos. Regras antigas conflitantes abaixo são histórico.

# Especificação do marketplace local

Versão 0.9 — 03/10/2026. Inclui classificações de lojas e vitrines modulares, além da regra global de prazo por distância.

## 1. Objetivo e condições confirmadas

Reunir empresas locais em uma plataforma onde compradores encontram produtos e compram de lojas que atendem sua cidade e região.

Condições confirmadas:

- O dono do marketplace é o administrador principal.
- Seller é a empresa/vendedor que comercializa na plataforma.
- Seller pode cadastrar usuários com acesso igual ou inferior para ajudar na operação.
- Cliente é o comprador.
- O sistema deve oferecer a operação completa de loja virtual com controle de acesso.
- Frontend desenvolvido neste projeto; painel sem acesso ao código HTML, CSS ou JavaScript.
- Funcionalidades e documentação WDNA servem de referência, com seleção do que é pertinente.

Decisões confirmadas na primeira rodada:

- Atender Cianorte e região e Maringá e região, com municípios e cobertura detalhada a cadastrar.
- Foco inicial em varejo e comércio geral.
- Cliente poderá comprar de várias lojas ao mesmo tempo.
- Cada loja fará suas entregas; também haverá retirada em loja.
- Receita exclusivamente por comissão sobre produtos, com percentual uniforme para todos os sellers e valor ainda a definir. Frete fora da base de comissão.
- Integrar split de pagamento, buscando estabilidade e baixo custo para o marketplace.
- Cadastro aberto a empresas com CNPJ; os primeiros sellers serão aprovados pelo marketplace.
- Permissões dos funcionários escolhidas individualmente pelo seller, dentro de seu limite de delegação.

Decisões confirmadas na segunda rodada:

- A taxa de pagamento será descontada do seller por pedido; valores dependem do futuro provedor.
- Pix e cartão de crédito são importantes e passam a requisitos da seleção do provedor; condições e parcelamento serão definidos posteriormente.
- Cada loja define cobertura e valor de entrega por distância em metros ou quilômetros.
- Frete discriminado separadamente, pago no mesmo checkout dos produtos, destinado ao seller e sem comissão do marketplace (esclarecimento da terceira rodada).
- Escolha do provedor e estimativas de volume adiadas pelo proprietário; não impedem o avanço da especificação e do protótipo.

Decisões confirmadas na terceira rodada:

- Distância de entrega medida pelo trajeto nas ruas, com preço por quilômetro definido pela loja.
- Todo produto exige aprovação do marketplace antes da publicação, no início da operação.
- Cada seller terá uma única loja inicialmente.
- Comprador conversa diretamente com a loja pelo chat interno do marketplace.

Decisões confirmadas na quarta rodada:

- Alterações de título, descrição, atributos, especificações e imagens exigem aprovação.
- Estoque e preço podem ser atualizados imediatamente; ao alterar preço, avisar ao seller se está acima ou abaixo dos preços do mesmo produto de outras lojas da plataforma.
- Cálculo de frete proporcional aos quilômetros fracionários permitido.
- Chat somente após compra, com envio de imagens e limite de tamanho. Definição técnica inicial: 5 MB por imagem.
- Seller deve despachar no mesmo dia ou no seguinte, conforme momento da venda e horário de corte configurado na Central de Vendedores.
- Compras disponíveis continuamente, 24 horas, sem fechar checkout por horário de funcionamento da loja.
- Nome e identidade visual ainda não definidos.

Decisões confirmadas na quinta rodada:

- Usar próximo dia útil na passagem de prazo de despacho.
- Contar a partir da confirmação do pagamento, com corte padrão às 15h.
- Seller pode ajustar o corte na Central de Vendedores; a alteração afeta a previsão das novas compras e não autoriza atraso de despacho já comprometido.
- Comparação de preços abrange todo o marketplace, independentemente da cidade do seller.

**Decisão adicional confirmada:** prazo de transporte calculado conforme a distância do trajeto da entrega, por regra única da plataforma para todos os sellers, combinado com o prazo de despacho de cada seller. Somente a administração autorizada do marketplace configura essa regra; seller mantém controle de sua tarifa de frete por km e do corte conforme regras já definidas.

Permanecem pendentes nome/domínio, municípios adicionais, percentual da comissão, tratamento de descontos na sua base, condições de recebimento, identidade visual, orçamento e tecnologia. Fórmula e parâmetros de tempo para entrega por distância ainda precisam ser definidos. Cadastro de feriados e regras técnicas de calendário estão propostos em operação. Aprovação automática de sellers ou produtos no futuro não está autorizada por estas decisões.

## 2. Terminologia

| Termo | Significado nesta plataforma |
|---|---|
| Marketplace | Operação global administrada pelo proprietário |
| Seller | Empresa participante; representa o limite de isolamento operacional |
| Loja | Vitrine e unidade comercial; uma única por seller no lançamento |
| Usuário | Identidade de acesso, com vínculos e permissões separados |
| Equipe | Usuários autorizados a trabalhar para um seller |
| Pedido principal | Compra multiloja vista pelo cliente, agrupando os subpedidos dos sellers |
| Subpedido | Parte comercial da compra pertencente exclusivamente a um seller |
| Local de estoque | Unidade física que mantém estoque e despacha pedidos |
| Comissão | Remuneração do marketplace conforme regra contratada |
| Repasse | Acerto financeiro devido ao seller; diferente de crédito de cliente |

Uma conta pode comprar como cliente e trabalhar em uma equipe. Ter uma conta de comprador não concede acesso administrativo. Cada seller tem uma única loja no início; filiais não fazem parte do lançamento.

## 3. Áreas e navegação propostas

### Área pública e do cliente

Início com escolha de cidade/CEP; lojas e categorias; busca; resultado com filtros; página de loja; página de produto e variação; carrinho; checkout; confirmação; conta; endereços; pedidos; acompanhamento por loja; solicitações de cancelamento/devolução; avaliações; atendimento; páginas institucionais.

A identificação da região deve funcionar também por digitação. Localização do dispositivo é opcional. A cidade selecionada é contexto de navegação; a possibilidade de entrega é validada pelo endereço no checkout.

### Painel do seller

Resumo; fila de pedidos; detalhe de subpedido; produtos e variações; estoque; preços; promoções; cupons; perfil da loja; horários e cobertura; equipe e acessos; atendimento; financeiro e repasses; relatórios; importações; integrações autorizadas.

O menu depende das permissões. Um funcionário de expedição não recebe automaticamente acesso financeiro ou de gestão de equipe.

### Painel do proprietário

Resumo global; sellers e análise de adesões; cidades e áreas atendidas; catálogo e moderação; categorias; pedidos e disputas; comissões; pagamentos e conciliação; repasses; campanhas; conteúdo; integrações; usuários da administração; auditoria; operação e configurações.

## 4. Requisitos funcionais originais

**P0:** necessário para venda real segura. **P1:** operação completa e crescimento. **P2:** condicionado ao modelo comercial. Prioridades propostas, ainda não aprovadas.

| ID | Módulo e comportamento esperado | Prioridade |
|---|---|---|
| RF-01 | Cadastro, acesso, recuperação de conta, sessões revogáveis e perfis separados | P0 |
| RF-02 | Adesão aberta a empresas com CNPJ, revisão inicial pelo marketplace, ativação e suspensão com motivo | P0 |
| RF-03 | Convites de equipe, permissões individuais por ação e proibição de escalada de acesso | P0 |
| RF-04 | Cobertura por distância do trajeto nas ruas e preço por quilômetro definidos por loja, com validação no fechamento | P0 |
| RF-05 | Perfil público de loja com identificação, contatos, endereço e horários | P0 |
| RF-06 | Cadastro de itens, preço, descrição, fotos, categorias e disponibilidade | P0 |
| RF-07 | Variações com preço, SKU e estoque próprios | P0 |
| RF-08 | Pesquisa e filtros por loja, categoria, preço e atributos pertinentes | P0 |
| RF-09 | Carrinho preservado; revalidação de preço, disponibilidade e cobertura | P0 |
| RF-10 | Checkout multiloja com entrega pelo seller ou retirada, split e resumo por loja | P0 |
| RF-11 | Pedido, confirmação de pagamento e reserva de estoque consistente | P0 |
| RF-12 | Despacho a partir do pagamento confirmado, no mesmo dia útil ou próximo pelo corte padrão 15h ajustável, sem adiar compromisso existente | P0 |
| RF-13 | Cancelamento, devolução e reembolso integral ou parcial | P0 |
| RF-14 | Comissão uniforme sobre produtos, taxa de pagamento descontada do seller por pedido e demonstrativo separado do frete | P0 |
| RF-15 | Alertas no painel e e-mails de eventos essenciais | P0 |
| RF-16 | Relatórios de vendas, pedidos, estoque e acertos financeiros por escopo | P0 |
| RF-17 | Registro de ações sensíveis e alterações administrativas | P0 |
| RF-18 | Cadastro de dados fiscais e registro de documentos do seller/pedido | P0 |
| RF-19 | Conteúdo institucional, privacidade, termos e políticas operacionais | P0 |
| RF-20 | Cupons com limites, elegibilidade, validade e responsável pelo custo | P1 |
| RF-21 | Campanhas automáticas com regras explícitas de acumulação | P1 |
| RF-22 | Atualização em lote, clonagem e importação com prévia e validação | P1 |
| RF-23 | Exportação com filtros, escopo de acesso e links temporários | P1 |
| RF-24 | Banners e seções selecionadas pelo administrador; prévia antes de publicar | P1 |
| RF-25 | Avaliações de compras verificadas, resposta da loja e moderação justificada | P1 |
| RF-26 | Orçamento e venda assistida pela equipe com limites e rastreabilidade | P1 |
| RF-27 | Relatórios com configurações salvas e indicadores por região | P1 |
| RF-28 | SEO, URLs estáveis, sitemap e compartilhamento de páginas públicas | P1 |
| RF-29 | Conectores aprovados para atendimento, ERP, fiscal e logística | P1 |
| RF-30 | Recuperação de carrinho e campanhas com preferências de comunicação | P1 |
| RF-31 | Kits abertos e fechados com escolhas por componente e estoque compartilhado; regra inicial proposta: mesma loja | Escopo atual confirmado |
| RF-32 | Múltiplos depósitos/unidades do mesmo seller | P2 |
| RF-33 | Descontos por quantidade e tabelas B2B; kits configuráveis passam a RF-31 | P2 |
| RF-34 | Serviços com agenda, capacidade e confirmação específica | P2 |
| RF-35 | Produtos virtuais para download, excluindo cursos e aulas em vídeo; entrega protegida requerida na produção | Escopo atual confirmado |
| RF-36 | Crédito promocional/carteira de cliente com regras próprias | P2 |
| RF-37 | Vendas em canais externos, feeds e API para parceiros | P2 |
| RF-38 | Domínios exclusivos de sellers, múltiplas moedas e estoque de parceiros | P2 |
| RF-39 | Aprovação de cada produto pelo marketplace antes de publicação no início da operação | P0 |
| RF-40 | Chat após compra, com texto e imagens de até 5 MB, acesso da equipe conforme permissão | P0 |
| RF-41 | Monitorar o mesmo produto entre sellers de todo o marketplace e avisar preço acima/abaixo ao editar, mantendo atualização imediata | P0 |
| RF-42 | Checkout disponível 24 horas, independente do horário de corte para despacho | P0 |
| RF-43 | Prazo de entrega por distância do trajeto com regra global única, combinado com despacho e exibido por seller no checkout | P0 |
| RF-44 | Classificações Oficial e Indicada com alto volume superior a 200 pedidos diários; Oficial exige documentação da marca e empresa validada | Prioridade a definir |
| RF-45 | Editor de banners e posicionamento de vitrines para lojas Oficiais e Indicadas, sem código livre | Prioridade a definir |
| RF-46 | Vitrines modulares com quantidade total de produtos configurável, independente de produtos por linha | Prioridade a definir |

RF-18 não significa que a plataforma já emitirá notas: a solução fiscal e sua necessidade no lançamento dependem dos segmentos e da operação escolhidos. Se o lançamento exigir emissão integrada, RF-29 fiscal passa a P0.

## 5. Regras de catálogo e experiência

Atualização: [tipos de produto](11-tipos-de-produto.md) confirma simples (sem seletor “Único”), variações de atributos configuráveis, kits fechados/abertos (mínimo de dois produtos distintos) e virtuais. Esse documento substitui a classificação anterior de kits configuráveis e digitais como extensões futuras.

- Categorias principais são mantidas pelo marketplace. Seller escolhe categorias existentes ou solicita inclusão; não altera a organização global.
- Item guarda nome, resumo, descrição sanitizada, seller, categoria principal, categorias extras, marca opcional, unidade, fotos ordenadas, atributos, status e variações.
- SKU é único dentro do seller; identificadores iguais em empresas diferentes são permitidos.
- Campos fiscais e dimensões aparecem conforme o segmento e modalidade de envio.
- Rascunho, em análise, publicado, rejeitado e arquivado são estados separados. Títulos, descrições, atributos, especificações e imagens novos ou alterados exigem aprovação; preço e estoque têm atualização imediata com regras próprias.
- Arquivamento preserva referências de vendas anteriores. Alterar produto não reescreve o item comprado.
- Produto indisponível não deve prometer entrega. Itens sob consulta, se habilitados, abrem atendimento ou orçamento e não entram em compra com preço indefinido.
- Custo de compra e margem nunca aparecem na vitrine. Relatório com custo incompleto apresenta resultado estimado, sem afirmar lucro contábil.
- Preços em reais na proposta inicial; arredondamento e descontos seguem regras únicas no servidor.
- Layout adaptado ao celular; campos com rótulos, mensagens de erro úteis, navegação por teclado e status compreensíveis sem depender só de cores.

## 6. Personalização permitida

O proprietário pode administrar textos, logos, cores disponibilizadas, imagens, menus e seções previamente desenvolvidas. Seller altera conteúdo e identidade da própria loja dentro dos campos liberados.

Oficiais e Indicadas terão configuração de banners e posicionamento de vitrines. Quantidade total de produtos será configurável por módulo. Escopo, propostas de publicação, selos e pendências estão em [Lojas e vitrines](09-lojas-e-vitrines.md); acesso ao editor avançado para lojas comuns ainda não definido.

Não haverá editor de código, importação de temas executáveis, scripts livres, CSS customizado ou edição de templates HTML no painel, incluindo e-mails e impressão. Esses modelos serão desenvolvidos no projeto; o painel poderá modificar campos e textos permitidos. Descrições e páginas terão editor de conteúdo com sanitização e lista de elementos autorizados. Vídeos, quando usados, virão de provedores explicitamente autorizados.

## 7. Limites e decisões em aberto

Acesso igual no seller é permitido dentro da própria empresa e do conjunto de permissões delegáveis. Não permite criar outro administrador global. Detalhamento em [acessos](02-acessos.md).

Carrinho multiloja, split, entrega pelos sellers e retirada são requisitos confirmados do lançamento. Mensalidades e outras formas de monetização não fazem parte do modelo definido; logística central também fica fora da primeira etapa. Emissão fiscal integrada permanece pendente. Não há compromisso de fornecedor, SLA, volume suportado ou prazo antes de definir e validar arquitetura, orçamento e integrações.
