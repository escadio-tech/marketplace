# Histórico — substituído pela revisão 0.13

# Marketplace local — documentação consolidada

**Data:** 08/10/2026  
**Escopo:** decisões de produto, funcionalidades previstas, implementação do protótipo e pendências.  
**Fonte desta consolidação:** decisões e entregas registradas nesta conversa. Os arquivos individuais anteriores não puderam ser relidos nesta sessão por indisponibilidade das ferramentas locais; este documento não é uma transcrição integral desses arquivos.

## 1. Visão do negócio

Marketplace de varejo e comércio geral para empresas locais, inicialmente em Cianorte e região e Maringá e região. O comprador poderá adquirir produtos de várias lojas na mesma compra. O atendimento comercial da plataforma será contínuo, como um e-commerce, sem limitar o horário em que o cliente compra.

O sistema terá três áreas: comprador, Central de Vendedores e Administração. A interface será desenvolvida neste projeto. Não haverá editor de HTML, CSS ou JavaScript para os lojistas.

As referências de funcionalidades e personalização utilizadas foram:

- https://wdna.com.br/pagina/recursos-funcionalidades-plataforma
- https://wdna.com.br/pagina/documentacao-da-admin
- https://wdna.com.br/pagina/documentacao-da-admin?modulo=personalizar#vitrines

Essas referências orientam funcionalidades pertinentes; não representam obrigação de reproduzir integralmente a plataforma de referência.

## 2. Domínio, marca e localização

### Decisões vigentes

- Um único domínio para toda a plataforma. A ideia anterior de subdomínios por cidade foi abandonada.
- A cidade ou região de navegação será identificada pelo CEP do comprador.
- Mostrar lojas que entregam no endereço e lojas próximas que permitem retirada.
- Limite inicial de proximidade para retirada: **15 km**, com possibilidade de ampliação pelo comprador.
- A ampliação da busca por retirada não amplia a cobertura de entrega dos sellers.
- O CEP identifica a região; endereço completo e número serão necessários para uma cotação precisa de rota e frete.

### Proposta de experiência já apresentada

- Solicitar CEP no primeiro acesso, permitindo continuar explorando.
- Identificar ofertas com entrega e retirada, somente entrega ou somente retirada.
- Oferecer filtros por modalidade de recebimento.
- Ao mudar o endereço, recalcular disponibilidade e fretes e sinalizar itens do carrinho afetados.
- Produtos digitais não dependem de cobertura de entrega física.

**Pendente:** definir se os 15 km de proximidade para retirada usam distância em linha reta ou percurso nas ruas. A distância de frete, por sua vez, já foi definida como percurso nas ruas. A experiência por CEP e raio de retirada ainda não foi implementada no protótipo entregue.

### Nome escolhido e situação da marca

O usuário escolheu o domínio **temlogoali.com.br**. Na consulta ao Registro.br de 07/10/2026 ele estava disponível; não houve compra ou registro realizado nesta conversa.

A pesquisa preliminar no INPI de 07/10/2026 não encontrou a expressão exata TEM LOGO ALI, mas encontrou a marca **Logo Ali**, processo **923135910**, titular **LOGO ALI SOLUÇÕES DIGITAIS LTDA**, classe 35, registro em vigor, cuja especificação inclui marketplace. A base consultada estava atualizada até 06/10/2026.

Isso foi apontado como risco relevante; **não foi confirmada a registrabilidade de Tem Logo Ali**. A adoção definitiva da marca precisa de análise profissional de propriedade industrial ou escolha de outro nome. Este documento registra a consulta histórica e não certifica o estado atual do processo.

Fonte do processo: https://busca.inpi.gov.br/pePI/servlet/MarcasServletController?Action=detail&CodPedido=4549530

## 3. Perfis e permissões

| Perfil | Escopo |
|---|---|
| Dono do marketplace / administrador principal | Gestão global da plataforma, sellers, produtos, pedidos, financeiro, classificações, regras, vitrines e auditoria |
| Seller | Gestão da própria loja, catálogo, vendas, logística, financeiro, chat, equipe e aparência quando elegível |
| Equipe do seller | Permissões escolhidas individualmente, limitadas ao escopo da empresa e aos acessos que o autor pode delegar |
| Comprador | Busca, lojas, produtos, carrinho, checkout, pedidos, chat pós-compra, downloads e conta |

O seller poderá cadastrar usuários de nível igual ou inferior, sem conceder acesso superior ao que possui. Isolamento entre empresas e verificação de permissões precisam ser aplicados no servidor; ocultar menus não é controle de acesso suficiente.

## 4. Entrada e gestão dos sellers

- Cadastro de empresas com CNPJ obrigatório.
- Aprovação dos primeiros sellers pela administração.
- Uma loja por seller no início.
- Central de Vendedores precedida de login.
- Aprovação comercial, habilitação financeira para split e classificação da loja são processos distintos.

O protótipo tem login demonstrativo. Dados: **lojista@exemplo.com / Demo123!**, ou botão **Entrar com conta de demonstração**. Isso não cria uma conta real nem autentica no servidor.

## 5. Catálogo e aprovação editorial

Cada produto novo precisará de aprovação inicial. Alterações em títulos, descrições, atributos, especificações e imagens também deverão ser aprovadas.

Preço e estoque podem ser atualizados imediatamente pelo seller. A aprovação de uma revisão editorial não deve restaurar preços ou estoques antigos.

Ao alterar o preço, o seller deve receber informação de comparação com ofertas do mesmo produto em outras lojas de todo o marketplace, avisando se está acima ou abaixo dos concorrentes. É necessário identificar corretamente produtos e combinações equivalentes. O aviso é informativo; não foi definido bloqueio de preço ou obrigação de acompanhar o concorrente.

## 6. Tipos de produto

### 6.1 Produto simples

Produto sem atributos variáveis. Não exibir seletor ou informação artificial como Variação Único. Pode ter características fixas na descrição e nas especificações. Possui preço, SKU e estoque próprios.

### 6.2 Produto com variações

Um ou mais atributos configuráveis pelo lojista, como cor, tamanho, voltagem ou modelo. Cada combinação tem SKU, preço, estoque e disponibilidade. O comprador deve selecionar os atributos necessários antes de adicionar o produto à sacola. Combinações indisponíveis não podem ser compradas.

O editor do protótipo permite gerar até 100 combinações. Esse é um limite técnico demonstrativo, não uma regra comercial definitiva.

### 6.3 Produto kit

Composto por dois ou mais produtos escolhidos pelo vendedor. O comprador seleciona as variações de cada componente.

- **Kit fechado:** todos os componentes são obrigatórios; o comprador escolhe apenas as opções de cada um.
- **Kit aberto:** o comprador pode escolher parte dos componentes ou todos, mas deve levar pelo menos dois produtos distintos. Duas unidades de um único produto não atendem ao mínimo.

Exemplo solicitado: Kit Dia dos Pais com camisa, cinto, calça, blazer e sapato. A demonstração usa um tênis já existente no catálogo como componente de calçado.

No protótipo, os kits usam produtos físicos simples ou com variações da própria loja, não incluem outros kits nem digitais e têm preço igual à soma dos componentes escolhidos. Essas limitações e a política de preço são propostas operacionais a confirmar. O estoque é compartilhado com os itens vendidos avulsos. O pedido guarda a composição e as escolhas realizadas.

### 6.4 Produto virtual

Arquivos para download, como e-books e infográficos. Cursos e hospedagem de aulas online em vídeo não são permitidos.

- Sem frete, despacho ou retirada física.
- Download após pagamento confirmado.
- O acesso deve pertencer ao comprador do pedido.
- Na operação real: armazenamento privado, validação do arquivo, autorização no servidor e links temporários.

No protótipo, o cadastro aceita metadados de PDF, EPUB, PNG, JPEG e WEBP, até 20 MB. São limites demonstrativos. Não há upload comercial real. O download entregue pelo fluxo de teste é um arquivo TXT de exemplo, e não o conteúdo comercial anunciado.

## 7. Carrinho e checkout

- Carrinho com produtos de diferentes sellers, agrupados por loja.
- Preservar variações, quantidades e composição dos kits.
- Checkout único com escolha de recebimento por loja.
- Uma compra gera pedido principal e subpedidos por seller, com acompanhamento independente.
- Preços, itens e configurações são copiados para o pedido para preservar o que foi comprado.
- Mostrar subtotal de produtos, frete de cada loja e total geral.
- Produtos digitais de uma compra mista são liberados após pagamento, independentemente do despacho dos itens físicos.

Foi implementado um endereço de entrega por compra no protótipo, combinado com retirada em outras lojas quando escolhido. Endereços diferentes por seller não foram definidos.

## 8. Pagamentos, comissão e repasses

- Receita do marketplace: comissão sobre o valor dos produtos.
- Percentual uniforme para os sellers; valor ainda a definir.
- Frete pago junto com a compra, destinado ao seller, sem comissão do marketplace.
- Taxa do meio de pagamento descontada do seller por pedido. Forma e valores de repasse dependem da negociação com o provedor.
- Pix e cartão de crédito são requisitos prioritários.
- Integração com split de pagamento desejada.
- Mercado Pago, Pagar.me ou outro provedor estável e competitivo serão avaliados posteriormente; nenhum foi escolhido.

O protótipo simula pagamento pendente, falha e aprovação. Não cobra, não coleta cartão real e não realiza split ou repasse. Repetir a confirmação simulada não reinicia a data original de pagamento.

## 9. Logística, cobertura e prazos

- Entrega feita por cada loja, além da opção de retirada.
- Seller define área atendida por distância e tarifa por quilômetro.
- Distância da entrega medida pelo trajeto nas ruas.
- Cálculo proporcional permitido, com arredondamento monetário em centavos.
- Tempo de transporte seguirá uma regra única da plataforma baseada na distância. Fórmula e parâmetros ainda não definidos.

### Despacho

- Contagem a partir da confirmação do pagamento.
- Corte padrão às 15h, ajustável pelo seller.
- Antes do corte em dia útil: despacho no mesmo dia.
- Após o corte: próximo dia útil.
- Ajustar o corte não pode adiar o compromisso de pedidos existentes.
- Na implementação demonstrativa, exatamente às 15h já se aplica o próximo dia útil.

O cálculo do protótipo usa America/Sao_Paulo e segunda a sexta, ainda sem calendário de feriados. A mesma regra foi usada para preparação de retirada como proposta demonstrativa, a confirmar.

### Cenários fictícios existentes

| Loja | Cidade simulada | Tarifa/km | Cobertura simulada |
|---|---|---:|---:|
| Casa Aurora | Cianorte | R$ 2,50 | 10 km |
| Essencial Concept | Maringá | R$ 2,00 | 15 km |
| Verde & Vida | Cianorte | R$ 1,80 | 8 km |

Esses números servem apenas para teste. Não representam a nova regra de 15 km para descoberta de lojas com retirada, nem cobertura real. O checkout ainda recebe distância manual para simulação, sem serviço de mapas ou CEP.

## 10. Pedidos, estoque e pós-compra

### Estados demonstrativos

- Entrega: pagamento confirmado → em preparação → em entrega → concluído.
- Retirada: pagamento confirmado → em preparação → pronto para retirada → concluído.
- Exclusivamente digital: concluído após pagamento confirmado, sem despacho físico.

O seller visualiza os subpedidos da própria loja e atualiza as etapas. O comprador acompanha cada loja separadamente. A administração possui visão global.

Na demonstração, pedidos pendentes reservam saldo no cálculo local; pagos consomem esse saldo; falha libera a reserva. Uma nova tentativa verifica estoque novamente. A validação considera itens avulsos e componentes de kits juntos.

Ainda faltam reserva atômica no banco de dados, expiração, concorrência entre compradores, cancelamentos, devoluções e estornos. A vitrine do protótipo mostra estoque base; o checkout considera os pedidos locais.

### Chat

- Conversa apenas após a compra, vinculada ao subpedido.
- Texto e imagens de até 5 MB.
- Sem chat pré-venda.
- O protótipo permite chat após criar o pedido, mesmo pendente de pagamento; exigir pagamento antes de conversar é decisão pendente.
- No protótipo: PNG, JPEG e WEBP, texto até 2.000 caracteres, armazenamento local e sem envio a pessoas reais.

## 11. Classificação das lojas

| Classificação | Critérios definidos |
|---|---|
| Oficial | Documentação da empresa e da marca validada, além de alto volume |
| Indicada | Alto volume de pedidos |
| Comum | Sem enquadramento nos selos acima |

**Alto volume:** ultrapassar 200 pedidos em um único dia. Portanto, 201 atende; 200 não. Não é média diária e não precisa de repetição em vários dias.

Pendências: quais status de pedido entram na contagem, documentos exatos, validade, revisão e perda dos selos. Os selos no protótipo são fictícios.

## 12. Aparência e vitrines

Lojas Oficiais e Indicadas poderão configurar banners e posicionamento de vitrines da própria loja. A administração poderá configurar vitrines globais.

Vitrines modulares devem permitir escolher produtos, quantidade exibida e posição dos módulos. Não haverá acesso a código HTML, CSS ou JavaScript.

Na home foram construídos menus com subcategorias e imagens clicáveis, a seção Descobertas para você com cinco colunas no desktop em carrossel, um mosaico de banners, duas vitrines adicionais e outras posições de banners. O layout se adapta a telas menores.

O editor completo de personalização, publicação e ordenação de módulos ainda não está implementado; os painéis mostram a estrutura prevista.

## 13. O que existe no protótipo

| Área | Estado da entrega |
|---|---|
| Home, categorias, vitrines e banners | Navegáveis, com catálogo fictício |
| Busca e filtros | Demonstração de resultados, ordenação, filtros e estados vazios/erro |
| Página de produto e lojas | Navegáveis, com seleção de variações e kits |
| Cadastro dos quatro tipos | Editor local com rascunhos e envio demonstrativo à análise |
| Login do vendedor | Tela e sessão demonstrativas |
| Carrinho e checkout | Multiloja, modalidades por seller e pagamento simulado |
| Pedidos | Persistência local, subpedidos e histórico |
| Chat e downloads | Vinculados ao pedido; mensagens locais e arquivo de exemplo |
| Administração | Painéis e visualização de pedidos e produtos enviados localmente |
| Equipe, financeiro, regras, classificações e aparência | Telas de referência e controles demonstrativos; não são módulos operacionais completos |
| CEP e retirada em raio inicial de 15 km | Decisão documentada; implementação pendente |
| Backend, autenticação real, split, mapas e armazenamento privado | Não implementados |

## 14. Código, arquivos e forma de acesso

Pasta principal: `C:\Users\User\OneDrive\Documentos\ChatGPT\Marketplace`.

- `ABRIR-MARKETPLACE.html`: entrada para escolher comprador, vendedor ou administração.
- `prototype/`: telas, estilos e módulos do frontend.
- `docs/`: documentação temática, pesquisas e capturas de validação.
- `tests/`: testes de regras de negócio e tipos de produto.
- `scripts/build-standalone.mjs`: gera HTML com imagens, fontes, estilos e scripts incorporados.
- `server.mjs`: servidor local do protótipo.
- `entrega/Marketplace-Local/standalone/`: index.html, vender.html e painel.html para abrir no navegador.
- `entrega/Marketplace-Local/codigo-fonte/`: cópia do código e documentação da entrega.
- `entrega/Marketplace-Local-standalone.zip`: pacote de distribuição anterior a esta consolidação.

Para executar com servidor: `node server.mjs`, acessando `http://localhost:4173/`. Para abrir offline, usar o arquivo de entrada ou extrair o ZIP e abrir standalone/index.html no Chrome.

Os HTML de código-fonte foram ajustados para direcionar à versão standalone quando abertos por file:. O login foi simplificado com entrada pela conta demonstrativa em um clique.

Pedidos e rascunhos são armazenados no navegador. O compartilhamento entre páginas em file: depende do navegador; o servidor local oferece um ambiente mais consistente para testar as três áreas. Não há persistência compartilhada entre computadores nem autorização segura no backend.

## 15. Verificações registradas

Última execução registrada: **20 testes automatizados aprovados**, cobrindo frete proporcional, corte de despacho, comissão sem frete, comparação de preços, produto simples, variações, kits, estoque compartilhado, arquivos virtuais, matriz de combinações, multiloja, cobertura, endereço, reservas e transições de pedidos.

No navegador foram verificados compra com kit, físico e digital em duas lojas; frete por loja; retirada; falha e aprovação de pagamento; bloqueio/liberação de download; mensagem do comprador e resposta do seller; preparação, despacho e conclusão; checkout digital sem endereço e sem frete; entrada na Central e cadastro de produtos.

Layout de pedidos conferido em 390 px e 1280 px. Scripts standalone e links foram validados estaticamente. A execução por file: no Chrome não foi automatizada. Upload de imagem no chat não foi testado na última rodada. Esses são registros das verificações anteriores, não uma nova execução realizada em 08/10/2026.

## 16. Pendências prioritárias

1. Resolver nome e marca após a pesquisa preliminar do INPI.
2. Implementar descoberta por CEP e lojas com retirada a 15 km, com ampliação pelo comprador.
3. Definir a métrica de proximidade da retirada e a regra global de tempo de transporte.
4. Escolher provedor de pagamentos, comissão, taxas, parcelamento e prazos de repasse.
5. Definir cancelamento, reembolso, devolução, contestação e expiração de pedidos pendentes.
6. Detalhar feriados e compromissos de preparação para retirada.
7. Definir documentação, contagem de pedidos e ciclo de vida dos selos.
8. Confirmar políticas propostas para preço e composição de kits e entrega digital.
9. Desenvolver backend, banco de dados, autenticação, permissões individuais e isolamento entre sellers.
10. Implementar aprovação editorial real, auditoria, gestão financeira, proteção de arquivos e notificações.
11. Construir editor completo de aparência e vitrines.

## 17. Próxima sequência recomendada

Primeiro incorporar ao protótipo a decisão mais recente de CEP, cobertura e retirada próxima. Em paralelo, resolver a marca e as decisões comerciais pendentes. Depois, implementar a base transacional do sistema com autenticação, empresas, catálogo, estoque e pedidos; integrar mapas e pagamentos; finalizar operação administrativa e testar uma compra completa em ambiente de homologação.

A plataforma está na fase de **protótipo funcional e definição de regras**, não pronta para vendas reais. As decisões confirmadas neste documento devem orientar a implementação; propostas e parâmetros fictícios precisam permanecer identificados como tal.
