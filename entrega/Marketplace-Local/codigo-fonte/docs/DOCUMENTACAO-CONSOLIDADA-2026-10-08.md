# Tem Logo Ali — documentação consolidada

**Versão 0.15 · atualizada em 14/10/2026.** Referência vigente para o projeto. Reúne as regras confirmadas e a situação real do protótipo; substitui regras anteriores sobre raio de retirada, volume e documentação dos selos.

## Visão do negócio

Marketplace de varejo e comércio geral, inicialmente em Cianorte e região e Maringá e região. Compra multiloja em um checkout, operação 24 horas, entrega pela própria loja e retirada. Três áreas: comprador, Central de Vendedores e Administração do proprietário. Interface desenvolvida neste projeto, sem acesso do seller a HTML, CSS ou JavaScript.

## Requisitos de catálogo e acesso já definidos

### Perfis e permissões

| Perfil | Escopo |
|---|---|
| Dono do marketplace / administrador principal | Gestão global da plataforma, sellers, produtos, pedidos, financeiro, classificações, regras, vitrines e auditoria |
| Seller | Gestão da própria loja, catálogo, vendas, logística, financeiro, chat, equipe e aparência quando elegível |
| Equipe do seller | Permissões escolhidas individualmente, limitadas ao escopo da empresa e aos acessos que o autor pode delegar |
| Comprador | Busca, lojas, produtos, carrinho, checkout, pedidos, chat pós-compra, downloads e conta |

O seller poderá cadastrar usuários de nível igual ou inferior, sem conceder acesso superior ao que possui. Isolamento entre empresas e verificação de permissões precisam ser aplicados no servidor; ocultar menus não é controle de acesso suficiente.

### Entrada e gestão dos sellers

- Cadastro de empresas com CNPJ obrigatório.
- Aprovação dos primeiros sellers pela administração.
- Uma loja por seller no início.
- Central de Vendedores precedida de login.
- Aprovação comercial, habilitação financeira para split e classificação da loja são processos distintos.

O protótipo tem login demonstrativo. Dados: **lojista@exemplo.com / Demo123!**, ou botão **Entrar com conta de demonstração**. Isso não cria uma conta real nem autentica no servidor.

### Catálogo e aprovação editorial

Cada produto novo precisará de aprovação inicial. Alterações em títulos, descrições, atributos, especificações e imagens também deverão ser aprovadas.

Preço e estoque podem ser atualizados imediatamente pelo seller. A aprovação de uma revisão editorial não deve restaurar preços ou estoques antigos.

Ao alterar o preço, o seller deve receber informação de comparação com ofertas do mesmo produto em outras lojas de todo o marketplace, avisando se está acima ou abaixo dos concorrentes. É necessário identificar corretamente produtos e combinações equivalentes. O aviso é informativo; não foi definido bloqueio de preço ou obrigação de acompanhar o concorrente.

### Tipos de produto

#### Produto simples

Produto sem atributos variáveis. Não exibir seletor ou informação artificial como Variação Único. Pode ter características fixas na descrição e nas especificações. Possui preço, SKU e estoque próprios.

#### Produto com variações

Um ou mais atributos configuráveis pelo lojista, como cor, tamanho, voltagem ou modelo. Cada combinação tem SKU, preço, estoque e disponibilidade. O comprador deve selecionar os atributos necessários antes de adicionar o produto à sacola. Combinações indisponíveis não podem ser compradas.

O editor do protótipo permite gerar até 100 combinações. Esse é um limite técnico demonstrativo, não uma regra comercial definitiva.

#### Produto kit

Composto por dois ou mais produtos escolhidos pelo vendedor. O comprador seleciona as variações de cada componente.

- **Kit fechado:** todos os componentes são obrigatórios; o comprador escolhe apenas as opções de cada um.
- **Kit aberto:** o comprador pode escolher parte dos componentes ou todos, mas deve levar pelo menos dois produtos distintos. Duas unidades de um único produto não atendem ao mínimo.

Exemplo solicitado: Kit Dia dos Pais com camisa, cinto, calça, blazer e sapato. A demonstração usa um tênis já existente no catálogo como componente de calçado.

No protótipo, os kits usam produtos físicos simples ou com variações da própria loja, não incluem outros kits nem digitais e têm preço igual à soma dos componentes escolhidos. Essas limitações e a política de preço são propostas operacionais a confirmar. O estoque é compartilhado com os itens vendidos avulsos. O pedido guarda a composição e as escolhas realizadas.

#### Produto virtual

Arquivos para download, como e-books e infográficos. Cursos e hospedagem de aulas online em vídeo não são permitidos.

- Sem frete, despacho ou retirada física.
- Download após pagamento confirmado.
- O acesso deve pertencer ao comprador do pedido.
- Na operação real: armazenamento privado, validação do arquivo, autorização no servidor e links temporários.

No protótipo, o cadastro aceita metadados de PDF, EPUB, PNG, JPEG e WEBP, até 20 MB. São limites demonstrativos. Não há upload comercial real. O download entregue pelo fluxo de teste é um arquivo TXT de exemplo, e não o conteúdo comercial anunciado.

### Carrinho e checkout

- Carrinho com produtos de diferentes sellers, agrupados por loja.
- Preservar variações, quantidades e composição dos kits.
- Checkout único com escolha de recebimento por loja.
- Uma compra gera pedido principal e subpedidos por seller, com acompanhamento independente.
- Preços, itens e configurações são copiados para o pedido para preservar o que foi comprado.
- Mostrar subtotal de produtos, frete de cada loja e total geral.
- Produtos digitais de uma compra mista são liberados após pagamento, independentemente do despacho dos itens físicos.

Foi implementado um endereço de entrega por compra no protótipo, combinado com retirada em outras lojas quando escolhido. Endereços diferentes por seller não foram definidos.

### Pagamentos, comissão e repasses

- Receita do marketplace: comissão sobre o valor dos produtos.
- Percentual uniforme para os sellers; valor ainda a definir.
- Frete pago junto com a compra, destinado ao seller, sem comissão do marketplace.
- Taxa do meio de pagamento descontada do seller por pedido. Forma e valores de repasse dependem da negociação com o provedor.
- Pix e cartão de crédito são requisitos prioritários.
- Integração com split de pagamento desejada.
- Mercado Pago, Pagar.me ou outro provedor estável e competitivo serão avaliados posteriormente; nenhum foi escolhido.

O protótipo simula pagamento pendente, falha e aprovação. Não cobra, não coleta cartão real e não realiza split ou repasse. Repetir a confirmação simulada não reinicia a data original de pagamento.


## Revisão vigente: operação, selos e administração

Versão 0.13 · 08/10/2026. Decisões confirmadas pelo proprietário nesta etapa.

### 1. Domínio e abrangência

O domínio **temlogoali.com.br foi comprado**, conforme informado pelo proprietário. A operação usa um domínio único, com regiões identificadas pelo CEP. Não haverá subdomínios por cidade. A compra do domínio não altera o resultado de uma análise de marca; a situação de registro no INPI permanece um assunto separado.

Inicialmente: Cianorte e região e Maringá e região. O administrador cadastra cidades/regiões e respectivas faixas de CEP. O seller informa o CEP físico de origem e sua faixa de atendimento para entregas. Faixas globais não podem ser invertidas nem sobrepostas.

**Retirada:** mostrar a loja quando o CEP físico dela e o CEP do comprador pertencerem à mesma cidade/região cadastrada. Não aplicar limite de quilômetros. A regra anterior de 15 km foi substituída. Entrega continua sujeita à cobertura e à distância máxima do seller.

As faixas 87200000–87299999 e 87000000–87199999 presentes no protótipo são fixtures de teste, não uma base oficial de CEPs. Devem ser substituídas por uma base validada antes de operar.

### 2. Estados e status dos pedidos

Estado representa a dimensão geral da operação; status é a etapa específica nela. **Pagamento confirmado e Em separação podem coexistir:** o primeiro é o estado financeiro; o segundo é o andamento operacional. Não devolver um pedido para “aguardando pagamento” ao avançar a separação.

| Dimensão | Estados/etapas | Comportamento |
|---|---|---|
| Pagamento | Pendente, confirmado, não aprovado | Independente da preparação. Estorno/chargeback serão integrados ao provedor. |
| Pedido | Aberto, em atendimento, concluído | Derivado do pagamento e dos subpedidos. Compra multiloja tem andamento próprio por seller. |
| Operação de entrega | Em separação, pronto para envio, saiu para entrega, entregue | Um avanço por vez, somente após pagamento confirmado. |
| Operação de retirada | Em separação, pronto para retirada, pedido retirado | Não passa por envio ou transporte. |
| Digital | Aguardando pagamento, produto entregue | Após confirmação, acesso ao arquivo comprado. |
| Intervenção | Livre ou em análise administrativa | Marcador separado; preserva o último status e bloqueia avanço enquanto em análise. |

#### Linha do tempo apresentada ao comprador

- **Entrega:** Pedido realizado → Pagamento confirmado → Em separação → Pronto para envio → Saiu para entrega → Entregue.
- **Retirada:** Pedido realizado → Pagamento confirmado → Em separação → Pronto para retirada → Pedido retirado.
- **Digital:** Pedido realizado → Pagamento confirmado → Produto entregue.

Falha de pagamento permite nova tentativa. Confirmação repetida não gera nova transição nem duplica notificações. Alterações financeiras posteriores não podem ser simuladas como simples regressões no fluxo logístico.

Carrinho misto: o item digital é liberado após pagamento; os físicos continuam na entrega/retirada. A notificação digital identifica o item e não comunica que todo o pedido físico já foi entregue.

O administrador **intervém apenas quando necessário**, sem aprovação manual obrigatória de todas as compras. Pode colocar em análise, liberar e avançar etapas válidas, sempre com motivo e registro local de auditoria. O protótipo não oferece uma aprovação de pagamento administrativa que dispense a confirmação do provedor.

#### Exceções que ainda precisam de política detalhada

Cancelamento antes/depois da separação, pagamento expirado, entrega frustrada, retirada não realizada, devolução, troca, reembolso parcial/total, chargeback e falha na disponibilização de arquivo. Devem ser fluxos separados, com responsáveis, prazos, efeitos no estoque e no split. Não são equivalentes a “Entregue”. Não há estorno real implementado nesta etapa.

### 3. Notificações por e-mail e WhatsApp

Cada etapa registrada gera dois registros na fila de saída, um para cada canal. Contêm ID próprio, pedido/subpedido, etapa, data, destinatário e conteúdo. O checkout coleta contatos demonstrativos; os modelos são editáveis na Administração e aceitam `{pedido}` e `{status}`.

O e-mail de produto digital inclui a identificação do item e a referência ao acesso autenticado de downloads. No protótipo o arquivo baixado continua sendo um exemplo TXT, sem conteúdo comercial. Para produção, a proposta é usar link protegido e temporário, em vez de anexar arquivos privados sem controle de acesso. O item comprado precisa ser disponibilizado de fato antes de registrar a entrega definitiva.

**Implementado:** geração e prévia dos eventos, modelos e fila persistida localmente; idempotência da confirmação; notificações digitais de pedidos mistos; eventos de análise administrativa.

**A integrar:** provedores de e-mail e WhatsApp, templates aprovados quando exigidos pelo provedor, preferências/autorizações aplicáveis, credenciais exclusivamente no servidor, worker de envio, tentativas com espera progressiva, IDs do provedor e callbacks de aceitação/entrega/falha. Falha de mensagem não deve regredir o pedido. A fila atual usa `awaiting_provider`; não é marcada falsamente como enviada.

### 4. Despacho e apresentação de estoque

O corte padrão é 15h, ajustável pelo seller para novos pedidos. O prazo é calculado a partir da confirmação do pagamento, considerando mesmo dia útil antes do corte e próximo dia útil no corte ou depois. Alterações de configuração não adiam compromissos já confirmados.

**O comprador não visualiza o horário de corte.** Vê a previsão e o andamento; somente seller e administração veem o parâmetro interno. Feriados locais/nacionais precisam de calendário de produção; o protótipo considera segunda a sexta-feira.

Estoque numérico permanece interno. O comprador vê disponibilidade, não o saldo. Quantidades compradas, quantidades dos componentes do kit e o seletor de quantidade continuam visíveis.

Opções de variação sem estoque/combinação ativa ficam translúcidas, com risco diagonal vermelho e desabilitadas. Não recebem a palavra “indisponível”. Um botão permite limpar escolhas para não prender o comprador em combinações incompatíveis. A validação do carrinho continua impedindo excesso, inclusive entre itens avulsos e kits que compartilham estoque.

### 5. Selos finais

#### Loja Indicada

- Conquista: **100 ou mais pedidos realizados em um único dia**.
- Manutenção: **média diária de pelo menos 100 pedidos nos últimos 6 meses**, reavaliada semestralmente.
- Pedidos contam pela realização, independentemente de pagamento confirmado.
- Por loja: uma compra conta uma vez para aquele seller, não uma vez por item. Datas agrupadas no fuso America/Sao_Paulo; IDs repetidos não duplicam a contagem.
- A média inclui dias sem pedidos. No protótipo a janela contém os dias corridos entre o instante de avaliação e seis meses antes. A avaliação é manual na Administração; um agendador será necessário em produção.
- Não atingir a manutenção permite remover o selo administrativamente com motivo. O desenho do selo não é uma certificação de uma loja real.

#### Loja Oficial

Exige apenas a aprovação de **Registro de Marca, cartão CNPJ e Contrato social**. Não exige volume mínimo de pedidos. Os três controles de aprovação são obrigatórios para conceder o selo pelo painel. Os documentos deverão ser recebidos e armazenados de forma privada na implementação de produção; o protótipo registra decisões, sem upload real de documentos.

“Validade” dizia respeito ao período de reavaliação da classificação. Não foi definida uma data de expiração automática dos documentos. Não aplicar a meta semestral da Indicada à Oficial. Revalidar a Oficial quando houver alteração/inconsistência documental conforme processo administrativo a detalhar.

#### Arquivos visuais

- `prototype/assets/seals/loja-indicada.svg`: verde, identificação Loja Indicada.
- `prototype/assets/seals/loja-oficial.svg`: dourado, identificação Loja Oficial.

São desenhos vetoriais finais desta etapa, integrados em cards, produto, lojas e classificação. Os exemplos iniciais de concessão seguem fictícios. Semelhança com selo de outro sistema não implica vínculo ou garantia externa.

### 6. Administração do marketplace

Entrada separada: `painel.html#admin`. Continua sendo um protótipo local, sem autenticação/autorização no servidor.

| Área | Disponível no protótipo |
|---|---|
| Visão geral | Domínio comprado, lojas, pedidos e composição global |
| Sellers | Incluir empresa com CNPJ, editar cadastro, aprovar/suspender, selecionar loja para administrar |
| Aprovação de produtos | Inspecionar rascunho, aprovar/rejeitar com motivo, preservar dados comerciais sem restaurar snapshots antigos |
| Pedidos | Visão multiloja, histórico, avançar etapas válidas, colocar/liberar análise |
| Financeiro | Valores de produtos, frete, desconto, comissão e pagamento dos pedidos locais |
| Pagamentos | Seleção do provedor pretendido, habilitação de Pix/cartão; sem captura ou split real |
| Envio e retirada | CEP físico, cobertura, tarifa por km, máximo de entrega e corte por loja |
| Cupons | Código global, percentual, mínimo por loja, ativação/desativação |
| Frete grátis | Valor mínimo em produtos por loja, sem ampliar cobertura |
| Classificações | Métricas, conferência documental, concessão e revisão manual |
| Vitrines globais | Criar, ordenar e remover módulos; publicar automaticamente no navegador |
| Regras | Regiões/faixas de CEP, comissão uniforme, parâmetro global demonstrativo de transporte |
| E-mail e WhatsApp | Configuração nominal dos provedores, textos e prévia da fila |
| Auditoria | Autor, data, ação, escopo quando aplicável e motivo; histórico local |

Administrar a loja selecionada usa um contexto demonstrativo, registrado em auditoria. Produtos/rascunhos e pedidos são filtrados por essa loja. O seller pode alterar a logística própria. A equipe e suas permissões ainda são uma prévia, sem usuários reais. Isolamento de empresas e delegação de acessos precisam ser aplicados no backend, não apenas na interface.

### 7. Vitrines, banners e aparência

Módulos suportados: vitrine de produtos, banner horizontal e mosaico. Cada módulo define título, ordem, quantidade e seleção de IDs de produtos. Banner aceita imagem HTTPS e destino interno; mosaico usa as imagens dos produtos escolhidos. Sem imagem própria usa-se a imagem do catálogo. A quantidade é limitada ao catálogo disponível. Seletores de produto visual e upload de assets podem substituir o campo de IDs na evolução da interface.

Vitrines mostram cinco colunas no desktop, com carrossel. A home usa a composição demonstrativa até publicar módulos próprios; ao publicar, a composição personalizada passa a organizar essa área. Lojas Indicadas e Oficiais podem configurar seus módulos próprios. Lojas comuns não recebem o editor de aparência.

Não há edição de HTML, CSS ou JavaScript pelo seller. Imagens HTTPS configuradas depois da geração do standalone precisam de internet; as imagens iniciais do catálogo são incorporadas para uso offline.

### 8. Regras comerciais aplicadas e hipóteses explícitas

Comissão uniforme somente sobre produtos; percentual definitivo ainda pendente. Zero no protótipo significa configuração inicial ainda não definida. Frete pertence ao seller, não integra a base da comissão.

O checkout aceita cupom configurado e calcula benefícios por loja. Nesta etapa, cupom percentual e frete grátis são regras globais **custeadas pelo seller**, hipótese demonstrativa que deve ser validada comercialmente. Comissão é calculada sobre produtos após desconto. Ainda faltam validade por data, limites por comprador, usos totais, categorias/lojas elegíveis, combinação entre campanhas e custeio pelo marketplace.

Distância por ruas e frete proporcional são regras confirmadas. O parâmetro inicial de 5 minutos/km para a prévia de transporte é **apenas demonstrativo**, editável pelo administrador, não um prazo contratado. A consulta de rota é simulada; integração geográfica e fórmula final permanecem pendentes.

### 9. Entrega técnica e limites

- Código-fonte na pasta `prototype`; documentação na pasta `docs`.
- Versão offline em `entrega/Marketplace-Local/standalone`; ZIP atualizado em `entrega/Marketplace-Local-standalone.zip`.
- `ABRIR-MARKETPLACE.html` abre a versão standalone. Para compartilhar configurações consistentemente entre comprador e painel, iniciar `node server.mjs` e abrir `http://localhost:4173/`.
- Pedidos, configurações, rascunhos e auditoria ficam no armazenamento do navegador. Arquivos `file://` podem ter comportamento diferente de compartilhamento de armazenamento no Chrome. Não é uma base de produção ou backup seguro.
- Não há pagamento real, disparo real de mensagens, consulta oficial de CEP, rotas reais, upload seguro, armazenamento comercial de arquivos digitais ou publicação real de produto aprovado. A aprovação editorial registra o resultado localmente.
- Testes automatizados cobrem os modelos e a composição textual das telas. A revisão visual automatizada desta etapa foi bloqueada pela inicialização do ambiente Windows; não foi apresentada como concluída.

Próxima etapa de implementação de produção: backend, autenticação/permissões, banco de dados, publicação de catálogo, armazenamento privado e workers de notificações; depois conectar pagamentos/split e rotas. Provedores e credenciais ainda precisam ser definidos.

## Chat e relacionamento

Chat apenas após a compra, por subpedido e loja. Texto e imagens PNG, JPEG ou WEBP até 5 MB por imagem no protótipo. Os participantes são comprador e equipe autorizada da loja. Arquivos privados, moderação e envio real de notificações dependem do backend.

## Referências funcionais

A pesquisa anterior da WDNA permanece nos documentos temáticos. Referências fornecidas pelo proprietário: https://wdna.com.br/pagina/recursos-funcionalidades-plataforma e https://wdna.com.br/pagina/documentacao-da-admin?modulo=personalizar#vitrines. Esta atualização aplica as decisões do proprietário, sem alegar uma nova consulta a esses sites.

## Verificação desta entrega

38 testes automatizados aprovados, abrangendo regras existentes e novas regras de CEP, etapas, fila de mensagens, digitais mistos, selos, cupons e configurações. Scripts verificados sintaticamente; geração standalone validada. A automação do navegador não iniciou por falha do ambiente Windows, portanto esta revisão não possui nova validação visual. Os registros visuais anteriores permanecem históricos.


## Atualização vigente — conta do comprador e navegação


Atualização de 08/10/2026, solicitada pelo proprietário.

### Abertura e navegação

O `index.html` da pasta standalone incorpora também as páginas Quero Vender, Central de Vendedores e Administração. Os links de venda abrem a área incorporada no próprio documento; não dependem de os outros HTML estarem ao lado do index. Os arquivos `vender.html` e `painel.html` continuam disponíveis como atalhos opcionais. Os links do código-fonte usam caminhos relativos.

Ao abrir ou recarregar a página, o comprador começa deslogado. O cadastro, os endereços e os pedidos permanecem salvos localmente, permitindo entrar novamente com o mesmo e-mail e senha demonstrativa. A sessão do comprador existe somente em memória. Retornar pelo cache de navegação também encerra o acesso. A Central de Vendedores limpa o acesso demonstrativo persistido ao iniciar sua página.

Navegar entre telas e abas internas durante uma mesma abertura não exige novo login. No standalone, as áreas incorporadas não substituem a sessão do comprador no documento principal; reabrir/recarregar o index encerra essa sessão.

### Cadastro e login do comprador

- Nome completo, e-mail, telefone com DDD, senha e confirmação de senha.
- Validação de e-mail duplicado, inclusive diferenças de maiúsculas/minúsculas.
- Login com o cadastro feito pelo usuário; não exige uma conta fixa de demonstração.
- Saudação no header: **Bem-vindo, [primeiro nome]!**, também no celular.
- Link do header abre Minha conta quando autenticado ou Entrar/Criar conta quando deslogado.
- Checkout exige login. O carrinho montado como visitante é preservado durante cadastro/login para continuar a compra.
- Sair encerra a sessão e limpa o carrinho da sessão. Não apaga cadastro, endereços ou histórico.

A senha não é persistida em texto: a demonstração usa PBKDF2-SHA256 com salt individual e 100.000 iterações. Isso não transforma o frontend em um sistema seguro de autenticação de produção: o navegador e o armazenamento local podem ser alterados pelo usuário. Usar apenas dados e senhas fictícios. Recuperação por e-mail, verificação de e-mail, sessões no servidor e proteção real de dados continuam pendentes do backend.

### Meu cadastro

Permite editar nome, telefone, CPF demonstrativo opcional, data de nascimento opcional, e-mail e senha. Alteração de e-mail ou senha exige a senha atual; nova senha exige confirmação. A saudação do header acompanha a alteração do nome. O identificador da conta não muda ao editar o e-mail, preservando o vínculo com os pedidos.

### Endereços

Vários endereços por comprador, com inclusão, edição e exclusão. Campos: identificação (ex.: Casa), destinatário, CEP, rua/avenida, número, bairro, cidade, UF e complemento. É possível definir padrões de entrega e de cobrança diferentes, ou usar o mesmo endereço para ambos.

O checkout permite selecionar o endereço de entrega salvo, preencher manualmente e selecionar endereço de cobrança. Os dados da conta preenchem nome, e-mail e telefone. O endereço de cobrança pode ser o mesmo informado para entrega. Não há consulta externa de CEP nesta etapa.

O pedido guarda cópias dos endereços utilizados. Editar/excluir posteriormente um endereço no cadastro não altera os registros históricos da compra. O endereço digitado manualmente no checkout pertence ao pedido; para reutilizá-lo, cadastrar em Meus endereços.

Para retirada, a validação por CEP continua obrigatória. Para produtos digitais, entrega física e frete continuam dispensados; dados de cobrança completos serão exigidos conforme o provedor e o fluxo fiscal de produção.

### Meus pedidos

- Lista exclusiva da conta autenticada, com identificação, data, total e andamento por loja.
- Botão **Ver pedido** abre detalhes, histórico, recebimento, cobrança, chat e downloads aplicáveis.
- Ao finalizar o checkout demonstrativo, o pedido é vinculado ao ID do comprador e seus detalhes são abertos para continuar a simulação de pagamento.
- Chat, pagamento simulado e download verificam o vínculo com o comprador atual.
- Pedidos antigos criados antes de existir cadastro de comprador não são atribuídos automaticamente a uma pessoa. Continuam visíveis na Administração e na loja correspondente.
- O protótipo filtra o acesso na interface/modelo local. Na produção, a autorização deverá ocorrer no servidor em cada requisição.

### Comprar novamente

Disponível na lista de pedidos e dentro dos detalhes. Recoloca os itens do pedido no carrinho preservando quantidades, variações e composição de kits, sem alterar a compra anterior.

Preços e estoque são consultados no catálogo atual. Itens equivalentes já presentes no carrinho têm suas quantidades somadas. A validação considera itens avulsos, kits e pedidos existentes que reservam saldo. Produto removido, tipo alterado, combinação sem estoque ou loja suspensa impedem a recompra e mostram uma mensagem. A operação não adiciona apenas parte do pedido silenciosamente: o carrinho permanece intacto quando houver erro.

Recompra não reutiliza preço antigo, desconto, frete, pagamento ou pedido anterior; exige nova revisão e nova finalização de compra.

### Verificação e entrega

38 testes automatizados aprovados: regras existentes, cadastro/login, alteração de credenciais, endereços, isolamento entre compradores, início deslogado em nova instância, recompra, scripts incorporados e roteamento dos links standalone. As verificações de navegação usam um ambiente simulado de eventos/DOM; não substituem teste visual no Chrome.

A automação do navegador continuou bloqueada por falha de inicialização do ambiente Windows. Não houve nova aprovação visual desktop/mobile nesta revisão. A versão standalone e a cópia do código/documentação foram regeneradas para a entrega.

Limites mantidos: armazenamento local, sem servidor de autenticação, cobrança real, split, envio real de e-mail/WhatsApp ou arquivos digitais comerciais. Usar `node server.mjs` para testar as três áreas sob a mesma origem; o compartilhamento de armazenamento entre arquivos locais/frames depende do Chrome. Ao mudar a pasta do arquivo, os cadastros locais anteriores podem não acompanhar a nova localização.


## Sacola lateral — 14/10/2026

Ao adicionar um produto, a sacola abre pela direita, substituindo o popup de confirmação central. Mostra o item, a quantidade adicionada, variações ou composição do kit, preço unitário, subtotal por item e subtotal dos produtos. Permite ajustar quantidades, remover itens, continuar comprando e ir ao checkout. A mesma seleção mantém quantidades acumuladas; variações distintas continuam em linhas separadas. A sacola fecha pelo botão, pela tecla Escape ou ao clicar fora. Layout adaptado ao celular e animação reduzida quando solicitada pelo sistema. Checkout e conta continuam em suas telas de diálogo próprias.


## Atualização vigente — localização, frete e cobertura


Versão 0.15 · 14/10/2026.

### Entrada e persistência

No primeiro acesso sem localização salva, o protótipo pede cidade e CEP da rua do comprador. A cidade é escolhida entre as regiões cadastradas pelo administrador, com opção de outra cidade. O CEP aceita pontuação e é salvo com oito dígitos. Se o CEP corresponder a uma região conhecida diferente da cidade escolhida, a confirmação pede correção.

A escolha fica neste navegador, mesmo deslogado. Fechar a confirmação sem informar CEP não libera o catálogo completo: uma mensagem orienta a escolher a localização. CEP fora das regiões atendidas leva a um estado sem ofertas, com opção para alterar a localização.

Na criação de conta, CEP e cidade já vêm preenchidos. O comprador confirma os dados e completa rua, número, bairro, UF e complemento. Esse primeiro endereço é salvo como padrão de entrega e cobrança. O cadastro só é salvo após validar os dados obrigatórios do endereço informado.

Ao entrar em uma conta existente, o endereço padrão de entrega determina a localização e os resultados. Alterar o endereço padrão também atualiza a localização. O cadastro permanece salvo entre aberturas, mas a sessão continua iniciando deslogada, conforme a decisão anterior.

### Página do produto

O formulário antigo de endereço, cidade e cenários foi substituído pelo botão **Calcule seu frete e prazo**. O botão abre um painel lateral direito, seguindo a interação das referências fornecidas, com a identidade visual verde do marketplace.

O painel permite confirmar cidade/CEP, calcular e recalcular. Apresenta somente as opções elegíveis: entrega pela loja e/ou retirada. Informa valor, estimativa de despacho e tempo de transporte. Se o frete calculado for zero, exibe **Frete grátis**; a retirada aparece separadamente como grátis, sem se confundir com entrega gratuita.

Com localização salva, a página já apresenta a cotação automaticamente, mesmo antes de abrir o painel. Alterações de quantidade e de seleção de variações/itens de kit atualizam a prévia. Para seleção incompleta, não se presume que o mínimo da campanha foi atingido; a interface pede completar as escolhas para verificar a gratuidade.

O horário interno de corte continua oculto do comprador. A estimativa considera pagamento confirmado no momento da consulta e o calendário demonstrativo de dias úteis. O prazo definitivo depende da confirmação efetiva do pagamento.

### Regras de cobertura e catálogo

Uma regra comum é utilizada nos cards, buscas, vitrines globais/personalizadas, banners vinculados a ofertas, imagens dos submenus, lojas e acessos diretos a páginas de produto/loja.

Uma loja precisa estar ativa e atender ao CEP por pelo menos uma modalidade:

- **Entrega:** CEP dentro da região habilitada pelo administrador e da faixa de entrega configurada pelo seller. A cotação também respeita a distância máxima de entrega.
- **Retirada:** CEP do comprador e CEP físico da loja pertencem à mesma região/cidade cadastrada. Não há limite de quilômetros, preservando a regra anteriormente confirmada.

Assim, uma loja sem entrega naquele CEP ainda pode aparecer para retirada na mesma cidade. Fora de ambas as modalidades, a oferta não aparece. Links diretos de produtos/lojas não atendidos mostram aviso em lugar do conteúdo comercial. Produtos digitais também seguem o filtro de loja da região no catálogo; não recebem cotação de frete físico.

Trocar o CEP recalcula a listagem. Itens já adicionados à sacola não são excluídos silenciosamente: são sinalizados quando não atendem à nova região, e o checkout revalida a cobertura. Histórico de pedidos não é filtrado geograficamente, pois corresponde a compras já realizadas.

### Gratuidade e consistência com o checkout

O mínimo global de frete grátis configurado pelo administrador continua sendo aplicado ao subtotal de produtos por loja. A regra não amplia a cobertura geográfica. A prévia considera o produto e a quantidade/variações escolhidas; o checkout considera todos os itens daquela loja, podendo atingir o mínimo com a soma do carrinho.

O checkout usa o mesmo trajeto demonstrativo da cotação, permite selecionar endereços salvos e desabilita modalidades que não atendem ao CEP digitado. O endereço salvo selecionado é preferido quando corresponde ao CEP de navegação; caso contrário, CEP/cidade vêm da localização atual e os demais dados precisam ser confirmados.

### O que ainda é demonstrativo

Não existe integração com base oficial de CEP, geocodificação ou cálculo de trajetos por ruas. As faixas iniciais de Cianorte e Maringá são fixtures, não limites municipais oficiais. Informar CEP não consulta automaticamente rua/bairro nesta etapa; esses dados são confirmados manualmente no cadastro.

Cada seller possui um **trajeto de teste** editável em Logística, inicialmente 3,4 km, usado para simular os CEPs de sua cobertura. Valor = trajeto de teste × tarifa por km, com arredondamento em centavos. Tempo de transporte = trajeto de teste × parâmetro global de minutos/km. Não é uma distância real inferida do CEP. A interface identifica a estimativa como demonstrativa.

Para produção, substituir esse trajeto por uma consulta de rota usando origem e endereço completo, validar a base de CEPs/cidades, configurar feriados e recalcular antes de cobrar. Não foram adicionados Correios ou transportadoras dos anexos: a operação inicial continua sendo entrega da própria loja e retirada.

### Verificação

45 testes automatizados: regras anteriores mais persistência de localização, CEP inválido/cidade incompatível, cobertura e retirada, frete grátis, coerência entre prévia e checkout, filtros de vitrines/banners e endereço criado no cadastro. Scripts standalone compilados e áreas incorporadas preservadas.

A revisão visual automatizada desta etapa não foi concluída: o processo de automação do navegador falhou ao iniciar no Windows. O código-fonte, os HTML standalone e o pacote ZIP foram atualizados.
