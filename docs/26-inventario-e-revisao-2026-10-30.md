# Tem Logo Ali — inventário e revisão em 30/10/2026

## Entrega

Protótipo local com três áreas: comprador, vendedor e administração. 33 produtos e seis lojas fictícias; 12 categorias. A entrega standalone abre no Chrome sem servidor. A versão com servidor usa node server.mjs e http://localhost:4173/. O domínio temlogoali.com.br foi informado como adquirido, mas publicação nesse domínio não foi verificada nem efetuada nesta etapa.

## Revisão

Abra REVISAO-PROJETO.html na raiz da pasta de entrega. Cada item possui seletor Pendente / Manter como está / Solicitar alteração e campo de observações. As decisões são locais ao navegador; exporte JSON para backup e para enviar ao responsável pelas alterações. Importação JSON restaura decisões. Exportação CSV permite abrir em planilha. Nenhuma decisão é transmitida automaticamente.

## O que funciona e o que falta

Navegação, catálogo, seleção de variações/kits, sacola, checkout demonstrativo, contas e endereços locais, pedidos, conversas locais, configurações administrativas, revisão editorial de produtos existentes e composição de vitrines estão implementados como protótipo. Equipe/permissões e cadastro público de seller são simulações. Existem textos e indicadores históricos ainda fixos. Integrações reais de pagamento/split, autenticação e permissões no servidor, banco de dados, envio de mensagens, distância pelas ruas, emissão fiscal, armazenamento de mídia e operação de downloads privados ainda precisam ser desenvolvidos. O provedor de pagamento e suas taxas não foram definidos.

## Regras atuais

Cobertura por CEP; retirada apenas na cidade da unidade física cadastrada. Comissão somente sobre produtos; frete destinado ao seller. Horário de corte visível apenas na operação. Indicada: 100 pedidos realizados em um dia e média diária de 100 na revisão dos últimos seis meses. Oficial: aprovação de Registro de Marca, cartão CNPJ e contrato social, sem volume mínimo. A contagem inclui pedidos realizados, mesmo não pagos.

Entrega: realizado → pagamento confirmado → em separação → pronto para envio → saiu para entrega → entregue. Retirada: realizado → pagamento confirmado → em separação → pronto para retirada → retirado. Digital: realizado → pagamento confirmado → entregue. Os eventos geram fila local de e-mail/WhatsApp, sem disparo real.

Vídeos na PDP: quadro vertical 9:16, preenchimento com recorte central sem distorção. Moda: capa 4:5; demais grades: 1:1. Não há transcodificação/CDN de produção. A política vertical e de preenchimento substitui a orientação horizontal histórica.

## Como acessar

Cianorte: CEP 87200000. Maringá: CEP 87000000. Essas faixas são demonstrativas. Seller: lojista@exemplo.com / Demo123!. Conta do comprador deve ser criada com dados fictícios; começa deslogada a cada abertura. Checkout e detalhes de pedidos precisam de dados criados durante a navegação. Não existem URLs independentes para os painéis internos da conta/sacola/checkout; o inventário explica a sequência de cliques.

Os links diretos do painel abrem painel.html; para testar o fluxo integrado em file://, prefira abrir o index e entrar pelas áreas incorporadas. O compartilhamento de armazenamento entre arquivos depende do navegador. As URLs localhost só funcionam com servidor iniciado. Links de produto podem mostrar fora da cobertura até escolher o CEP correspondente.

## Documentação histórica

Os documentos anteriores são preservados integralmente como histórico. As decisões mais recentes e o comportamento do código têm precedência sobre rascunhos antigos (por exemplo 200 pedidos/dia, vídeo horizontal ou limite geográfico de retirada). A pesquisa WDNA é referência externa, não lista de funcionalidades integralmente implementadas. Os prompts Stitch são históricos.

## Inventário página a página

### Comprador — Página inicial

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Localização por CEP, busca, menus com subcategorias, 12 categorias, vitrines, carrosséis por setas/arraste, mosaicos, banners e acesso às lojas.
- Acesso: Informe cidade e CEP para visualizar o catálogo.
- Limites: Catálogo ilustrativo; contagens e alguns textos antigos podem estar desatualizados.

### Comprador — Busca e listagem

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca
- Feito: Busca textual, ordenação, filtros e cobertura por CEP. Produtos de lojas fora da cobertura são ocultados.
- Acesso: Link direto.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Filtros laterais

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca
- Feito: Painel à direita com categoria, marca, cidade, loja, característica e faixa de preço.
- Acesso: Clique em Mostrar filtros. Não possui URL própria.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Cidade e CEP

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Localização persistida para cobertura, frete e preenchimento inicial do cadastro.
- Acesso: Clique na localização do cabeçalho. Não possui URL própria.
- Limites: Faixas de CEP e trajetos são demonstrativos; sem integração geográfica real.

### Comprador — Frete e prazo

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/0
- Feito: Consulta lateral, entrega local, retirada e regra administrativa de gratuidade.
- Acesso: Na página do produto, clique em calcular frete e prazo.
- Limites: Distância de teste e tempo parametrizado; não consulta rotas reais.

### Comprador — Sacola lateral

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/0
- Feito: Itens agrupados por loja, quantidade, opções selecionadas, remoção, subtotal e acesso ao checkout.
- Acesso: Adicione um produto ou clique na sacola. Não possui URL própria.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Checkout

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Endereço, entrega/retirada por loja, cupom, totais e pagamento demonstrativo. Produtos digitais dispensam frete.
- Acesso: Adicione itens → Sacola → Continuar para o checkout; faça login.
- Limites: Não cobra valores nem cria transações em provedores.

### Comprador — Pagamento e confirmação

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Simulação de confirmação/falha e criação de pedidos separados por loja, com tratamento de estoque.
- Acesso: Avance pelo checkout.
- Limites: Sem Pix real, cartão real ou split bancário.

### Comprador — Login e cadastro

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Cadastro local, login, nome de boas-vindas no cabeçalho e início deslogado ao reabrir.
- Acesso: Clique em Conta; escolha Entrar ou Criar conta.
- Limites: Autenticação de demonstração; use informações fictícias.

### Comprador — Minha conta e perfil

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Edição de dados pessoais e troca de e-mail/senha com confirmação da senha atual.
- Acesso: Conta → Meu cadastro, após login.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Endereços

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Inclusão, edição e exclusão de endereços; padrões independentes para entrega e cobrança.
- Acesso: Conta → Endereços de entrega e cobrança.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Meus pedidos

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Pedidos associados à conta, situação, recompra e acesso aos detalhes.
- Acesso: Conta → Pedidos e downloads.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Detalhes do pedido

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Itens, opções, modalidade, valores, situação e ações do pedido.
- Acesso: Abra um pedido da sua conta; é necessário concluir uma compra de demonstração.
- Limites: Protótipo funcional local; dados demonstrativos.

### Comprador — Chat pós-compra

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Conversa associada ao pedido e à loja, com imagens conforme limites do protótipo.
- Acesso: Meus pedidos → Pedido → Chat.
- Limites: Mensagens locais; não há comunicação em tempo real com terceiros.

### Comprador — Downloads

- Link: ../entrega/Marketplace-Local/standalone/index.html
- Feito: Área para pedidos digitais e metadados de arquivos, com liberação simulada após pagamento.
- Acesso: Compre o e-book e consulte Pedidos e downloads.
- Limites: Não entrega um acervo real nem arquivos privados por servidor.

### Comprador — Favoritos

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?favorites=1
- Feito: Produtos marcados com coração, com filtro de cobertura.
- Acesso: Marque produtos como favoritos para preencher esta listagem.
- Limites: Protótipo funcional local; dados demonstrativos.

### Entrada de vendedores — Quero vender

- Link: ../entrega/Marketplace-Local/standalone/vender.html
- Feito: Apresentação comercial, explicação dos perfis e formulário para empresa.
- Acesso: Link direto.
- Limites: Protótipo funcional local; dados demonstrativos.

### Entrada de vendedores — Cadastro da empresa

- Link: ../entrega/Marketplace-Local/standalone/vender.html#cadastro
- Feito: Formulário e validação demonstrativa de CNPJ; mensagem de cadastro em análise.
- Acesso: Role até o formulário.
- Limites: O formulário não envia nem cria um seller real.

### Central de Vendedores — Login

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller
- Feito: Barreira de login antes do painel e opção de conta demonstrativa.
- Acesso: Conta: lojista@exemplo.com / Demo123!
- Limites: Sessão local; não é proteção de produção.

### Central de Vendedores — Visão geral

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/inicio
- Feito: Resumo demonstrativo da operação e atalhos.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Alguns indicadores/textos são fixos.

### Central de Vendedores — Produtos

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/produtos
- Feito: Listagem do catálogo próprio com busca, SKU, tipo, preço, estoque, situação e edição.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Protótipo funcional local; dados demonstrativos.

### Central de Vendedores — Cadastrar produto

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/novo-produto
- Feito: Formulário separado: simples, variação, kit aberto/fechado e digital; fotos/vídeos ordenáveis, capa e autoplay.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Rascunhos locais; não há upload para servidor. Publicação integral de novos produtos ainda depende da integração do catálogo.

### Central de Vendedores — Editar produto

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/editar-produto/32
- Feito: Edição de produto existente, cinco visualizações demonstrativas, mídia reordenável e aprovação editorial.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Preço/estoque podem atualizar antes da aprovação; conteúdo aprovado é aplicado ao produto existente.

### Central de Vendedores — Pedidos

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/pedidos
- Feito: Tabela com filtros, paginação, detalhes e avanço das etapas compatíveis com entrega/retirada/digital.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Protótipo funcional local; dados demonstrativos.

### Central de Vendedores — Logística

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/logistica
- Feito: CEP da unidade, cobertura de entrega, tarifa/km, distância máxima, trajeto de teste e horário de corte.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Sem geocodificação ou transportadoras integradas.

### Central de Vendedores — Financeiro

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/financeiro
- Feito: Vendas, comissões, taxas, líquido, disponível/a liberar e movimentações fictícias.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Valores simulados; não há conciliação ou repasse bancário.

### Central de Vendedores — Chat pós-compra

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/chat
- Feito: Lista de conversas e mensagens por pedido, independente da tela de pedidos.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Persistência local.

### Central de Vendedores — Equipe

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/equipe
- Feito: Prévia de colaboradores e seleção individual de permissões.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Tela de simulação: permissões não são gravadas nem aplicadas como controle de acesso real.

### Central de Vendedores — Classificação

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/classificacao
- Feito: Exibição de selo, critérios e informações de documentos/volume.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Sem verificação automática de documentos.

### Central de Vendedores — Vitrine da loja

- Link: ../entrega/Marketplace-Local/standalone/painel.html#seller/aparencia
- Feito: Módulos ordenáveis: banners, mosaicos, vídeos, vitrines em grade/carrossel e categorias.
- Acesso: Faça login para acessar. Ao abrir em arquivo local separado, o armazenamento pode variar em relação à área incorporada no index.
- Limites: Disponível apenas para Indicadas/Oficiais. Configuração local; URLs externas dependem de internet.

### Administração — Visão geral

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/inicio
- Feito: Resumo global e atalhos.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Sellers e filiais

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/sellers
- Feito: Inclusão/edição de estabelecimentos, status, dados da unidade e acesso ao contexto de uma loja.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Aprovação de produtos

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/aprovacao
- Feito: Revisão editorial local, prévias numeradas das mídias, aprovação/rejeição com motivo.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Pedidos globais

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/pedidos
- Feito: Listagem e intervenção administrativa nas etapas dos pedidos.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Financeiro global

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/financeiro
- Feito: Consulta e resumo de vendas e valores simulados.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Pagamentos

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/pagamentos
- Feito: Seleção do provedor pretendido e habilitação demonstrativa de Pix/cartão.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Envio e retirada

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/logistica
- Feito: Configuração de origem, CEP, cobertura, tarifa e corte por loja.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Cupons e frete grátis

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/cupons
- Feito: Cupons percentuais, mínimo por loja e limiar de gratuidade.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — E-mail e WhatsApp

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/notificacoes
- Feito: Modelos de mensagens e fila de eventos de mudanças de status.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Classificações

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/classificacao
- Feito: Concessão e revisão dos selos, documentos e métricas de pedidos.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Vitrines globais e categorias

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/vitrines
- Feito: Composição modular da home e banners/vídeos por categoria, no topo, entre produtos ou ao final.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Regras e regiões

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/regras
- Feito: Faixas de CEP, cidades, comissão uniforme e parâmetro de tempo por quilômetro.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Administração — Auditoria

- Link: ../entrega/Marketplace-Local/standalone/painel.html#admin/auditoria
- Feito: Registro local de autor, data, motivo e alterações administrativas.
- Acesso: Área administrativa demonstrativa.
- Limites: Sem autenticação administrativa segura, integrações externas ou auditoria inviolável.

### Categorias — Casa & decoração

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Casa%20%26%20decora%C3%A7%C3%A3o
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Moda & acessórios

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Moda%20%26%20acess%C3%B3rios
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Beleza & cuidados

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Beleza%20%26%20cuidados
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Eletrônicos

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Eletr%C3%B4nicos
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Esporte & lazer

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Esporte%20%26%20lazer
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Jardim & plantas

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Jardim%20%26%20plantas
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Livros & digitais

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Livros%20%26%20digitais
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Mercado & alimentos

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Mercado%20%26%20alimentos
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Pet shop

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Pet%20shop
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Brinquedos & jogos

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Brinquedos%20%26%20jogos
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Papelaria & escritório

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Papelaria%20%26%20escrit%C3%B3rio
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Categorias — Ferramentas & construção

- Link: ../entrega/Marketplace-Local/standalone/index.html#/busca?category=Ferramentas%20%26%20constru%C3%A7%C3%A3o
- Feito: Grade com filtros laterais, ordenação e módulos promocionais configuráveis. Moda usa fotos 4:5; demais categorias usam quadro 1:1.
- Acesso: Escolha um CEP atendido.
- Limites: Algumas categorias não têm produtos de exemplo e mostram estado vazio.

### Lojas — Casa Aurora · Cianorte

- Link: ../entrega/Marketplace-Local/standalone/index.html#/loja/0
- Feito: Perfil, informações, busca interna, categorias e produtos da unidade. Lojas com selo admitem composição personalizada e vídeos.
- Acesso: CEP de teste: 87200000. A retirada é restrita à cidade da unidade.
- Limites: Loja fictícia, sem operação comercial real.

### Lojas — Essencial Concept · Maringá

- Link: ../entrega/Marketplace-Local/standalone/index.html#/loja/1
- Feito: Perfil, informações, busca interna, categorias e produtos da unidade. Lojas com selo admitem composição personalizada e vídeos.
- Acesso: CEP de teste: 87000000. A retirada é restrita à cidade da unidade.
- Limites: Loja fictícia, sem operação comercial real.

### Lojas — Verde & Vida · Cianorte

- Link: ../entrega/Marketplace-Local/standalone/index.html#/loja/2
- Feito: Perfil, informações, busca interna, categorias e produtos da unidade. Lojas com selo admitem composição personalizada e vídeos.
- Acesso: CEP de teste: 87200000. A retirada é restrita à cidade da unidade.
- Limites: Loja fictícia, sem operação comercial real.

### Lojas — Lar & Luz · Cianorte

- Link: ../entrega/Marketplace-Local/standalone/index.html#/loja/100
- Feito: Perfil, informações, busca interna, categorias e produtos da unidade. Lojas com selo admitem composição personalizada e vídeos.
- Acesso: CEP de teste: 87200000. A retirada é restrita à cidade da unidade.
- Limites: Loja fictícia, sem operação comercial real.

### Lojas — Jardim de Casa · Cianorte

- Link: ../entrega/Marketplace-Local/standalone/index.html#/loja/101
- Feito: Perfil, informações, busca interna, categorias e produtos da unidade. Lojas com selo admitem composição personalizada e vídeos.
- Acesso: CEP de teste: 87200000. A retirada é restrita à cidade da unidade.
- Limites: Loja fictícia, sem operação comercial real.

### Lojas — Conecta Maringá · Maringá

- Link: ../entrega/Marketplace-Local/standalone/index.html#/loja/102
- Feito: Perfil, informações, busca interna, categorias e produtos da unidade. Lojas com selo admitem composição personalizada e vídeos.
- Acesso: CEP de teste: 87000000. A retirada é restrita à cidade da unidade.
- Limites: Loja fictícia, sem operação comercial real.

### Produtos — Poltrona de madeira com estofado

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/0
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem, vídeo na posição 1.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Tênis casual urbano

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/1
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Fone de ouvido sem fio

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/2
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Vaso de cerâmica com folhagem

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/3
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Verde & Vida; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Bolsa casual preta

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/4
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Câmera fotográfica compacta

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/5
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Kit de cuidados essenciais

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/6
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Luminária de mesa minimalista

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/7
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Tênis esportivo para caminhada

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/8
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Cadeira contemporânea em madeira

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/9
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Óculos de sol clássico

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/10
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Kit para cuidar do jardim

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/11
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Verde & Vida; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Camisa social

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/12
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Cinto casual

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/13
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Calça de alfaiataria

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/14
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Blazer clássico

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/15
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Kit Dia dos Pais — completo

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/16
- Feito: Tipo: kit fechado. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Kit Dia dos Pais — monte o seu

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/17
- Feito: Tipo: kit aberto. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Essencial Concept; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — E-book — Guia para uma casa acolhedora

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/18
- Feito: Tipo: digital. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Luminária de mesa Lar & Luz

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/19
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Lar & Luz; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Poltrona aconchego

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/20
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Lar & Luz; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Cadeira de madeira natural

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/21
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Lar & Luz; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Planta em vaso de cerâmica

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/22
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Jardim de Casa; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Ferramentas para jardinagem

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/23
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Jardim de Casa; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Vaso verde para decorar

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/24
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Jardim de Casa; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Fone sem fio Conecta

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/25
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Conecta Maringá; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Câmera para registrar momentos

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/26
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Conecta Maringá; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Fone para música e trabalho

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/27
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Conecta Maringá; cidade: Maringá; CEP de teste: 87000000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Camisa social

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/28
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem, vídeo na posição 3.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Calça de alfaiataria

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/29
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Blazer clássico

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/30
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Bolsa casual preta

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/31
- Feito: Tipo: simples. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

### Produtos — Blazer social azul-marinho — no modelo

- Link: ../entrega/Marketplace-Local/standalone/index.html#/produto/32
- Feito: Tipo: com variações. Galeria ordenada, preço, compra e disponibilidade; 5 visualizações de imagem, vídeo na posição 1.
- Acesso: Loja: Casa Aurora; cidade: Cianorte; CEP de teste: 87200000.
- Limites: Fotos ilustrativas; visualizações adicionais são recortes da mesma imagem. Vídeos são animações demonstrativas. A descrição/PDP aguarda próxima revisão.

