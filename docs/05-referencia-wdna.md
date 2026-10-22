# Pesquisa da referência WDNA

Consultada em 02/10/2026, no fuso do projeto. Este documento distingue observação da referência e decisões propostas para o nosso produto.

## 1. Método e limites da consulta

Foram consultados a [lista de recursos](https://wdna.com.br/pagina/recursos-funcionalidades-plataforma), o [índice administrativo](https://wdna.com.br/pagina/documentacao-da-admin) e os 14 módulos disponibilizados pelo índice, incluindo a visão geral.

A consulta pelo mecanismo de navegação textual inicialmente falhou. As páginas públicas foram obtidas por HTTP. Os links com `modulo` retornam o mesmo índice no HTML inicial; o site substitui o conteúdo no navegador. Para ler os capítulos efetivos, foi obtido o [arquivo público de módulos](https://salescdn.net/prod/store/13860/themes/12/assets/admin-docs-modules-1790364544486.js) indicado na própria página e extraídos seus textos em português. Também foi consultado o script público que controla essa navegação.

As cópias para rastreabilidade estão em `research/`. Os arquivos `wdna-<modulo>.txt` contêm a extração efetiva dos capítulos; os HTML baixados com query inicialmente contêm apenas o índice. O arquivo JavaScript de módulos é a evidência do conteúdo completo. Essas cópias são material de pesquisa externo, não código da nossa aplicação nem instruções de implementação.

A pesquisa cobre o texto dos capítulos, campos, ações e descrições de telas; não foi feito acesso autenticado ao admin da WDNA, teste de seus fluxos ou auditoria de infraestrutura. Capturas mencionadas nos guias não foram auditadas visualmente. APIs específicas de fornecedores não foram homologadas. Menções comerciais da WDNA a preço, disponibilidade, integrações ou emissão fiscal não são garantias da nossa plataforma.

## 2. Registro de leitura por módulo

| Capítulo consultado | Observação resumida |
|---|---|
| [Visão geral](https://wdna.com.br/pagina/documentacao-da-admin?modulo=hub) | Índice por tema e guia das telas administrativas |
| [Minhas lojas](https://wdna.com.br/pagina/documentacao-da-admin?modulo=minhas-lojas) | Abertura de vitrines conforme canais ativos |
| [Pedidos](https://wdna.com.br/pagina/documentacao-da-admin?modulo=pedidos) | Filtros, edição, documentos, orçamento, ações individuais e em lote |
| [Produtos](https://wdna.com.br/pagina/documentacao-da-admin?modulo=produtos) | Dados centrais, SEO, variações, composições, relacionados e atributos |
| [Preços](https://wdna.com.br/pagina/documentacao-da-admin?modulo=precos) | Tabelas, base de cálculo, clonagem e alterações coletivas |
| [Estoques](https://wdna.com.br/pagina/documentacao-da-admin?modulo=estoques) | Depósitos, origem e quantidades disponíveis/reservadas |
| [Categorias](https://wdna.com.br/pagina/documentacao-da-admin?modulo=categorias) | Organização hierárquica e atributos específicos |
| [Clientes](https://wdna.com.br/pagina/documentacao-da-admin?modulo=clientes) | Contas, contatos, endereços, acesso, histórico e crédito |
| [Marketing](https://wdna.com.br/pagina/documentacao-da-admin?modulo=marketing) | Regras promocionais, cupons, assinantes e avaliações |
| [Gestão](https://wdna.com.br/pagina/documentacao-da-admin?modulo=gestao) | Movimentos, crédito de cliente, relatórios filtrados e configurações salvas |
| [Personalização](https://wdna.com.br/pagina/documentacao-da-admin?modulo=personalizar) | Temas, navegação, seções, mídia, selos e páginas |
| [Canais](https://wdna.com.br/pagina/documentacao-da-admin?modulo=canais) | Vitrines, horários, conexões e sincronização |
| [Integrações](https://wdna.com.br/pagina/documentacao-da-admin?modulo=integracoes) | Galeria, código incorporado, plugins, feeds e fiscal; detalhamento limitado às abas |
| [Configurações](https://wdna.com.br/pagina/documentacao-da-admin?modulo=configuracoes) | Pagamento, envio, grupos e modelos; arquivos de entrada/saída |

## 3. Decisões propostas após a pesquisa

A matriz abaixo é a seleção para o nosso marketplace. As adaptações são requisitos originais, não afirmações de que a WDNA implemente essas mesmas regras.

| Família avaliada | Decisão para o nosso produto | Requisitos |
|---|---|---|
| Acesso e contas | Construir vínculos por empresa e delegação por subconjunto de permissões | RF-01–03, RF-17 |
| Produtos, atributos e categorias | Catálogo isolado por seller; taxonomia global governada | RF-06–08 |
| Estoque e variações | Reservas transacionais e histórico por unidade vendável | RF-07, RF-11 |
| Preços e mudanças coletivas | Preço por seller; prévia e escopo obrigatório nas ações em lote | RF-06, RF-22, RF-33 |
| Checkout e pedidos | Definir loja por item e validar separação comercial e logística | RF-09–13 |
| Entrega e horários | Priorizar cobertura local, retirada e exceções operacionais | RF-04–05, RF-10–12 |
| Gestão e relatórios | Separar crédito de cliente, receita, comissão e acerto do seller | RF-14, RF-16, RF-27, RF-36 |
| Promoções e comunicação | Registrar quem financia desconto; distinguir evento de compra e marketing | RF-15, RF-20–21, RF-30 |
| Conteúdo e aparência | Campos e componentes controlados; frontend mantido no projeto | RF-19, RF-24, RF-28 |
| Avaliações | Compra verificável, resposta e moderação com trilha | RF-25 |
| Orçamentos e composições | Implementar primeiro dentro da mesma loja | RF-26, RF-31, RF-33 |
| APIs, arquivos e conectores | Permissões específicas, credenciais protegidas e homologação por fornecedor | RF-22–23, RF-29, RF-37 |
| Infraestrutura e ambiente de prévia | Definir metas e medir, com homologação e recuperação documentadas | Arquitetura §§5–6 |
| Fiscal | Definir responsabilidade e integração por segmento/seller | RF-18, RF-29 |
| Novos formatos comerciais | Produtos digitais confirmados; serviços e B2B seguem condicionados às decisões | RF-33–35 |

## 4. O que adotaremos de forma diferente

- Não disponibilizar edição de código ou importação/exportação de temas executáveis, nem scripts livres. Isso também vale para impressão e e-mails.
- Não usar exclusão permanente de pedido como ação operacional normal; preservar histórico e corrigir por eventos/reversões.
- Não permitir que um seller veja o cadastro e todo o histórico global de clientes.
- Não criar avaliações fictícias ou atribuir notas a clientes sem uma origem legítima identificada.
- Não exigir seleção de um vendedor interno no checkout: cliente escolhe a loja pelo item ofertado. Atribuição de funcionário comercial, se necessária, será recurso separado.
- Não confundir acesso a diversas vitrines com isolamento entre empresas; o isolamento precisa existir em todas as camadas.
- Não transformar um status editável em autoridade para confirmar dinheiro recebido ou permitir despacho indevido.
- Não tratar SEO por palavras-chave ou notificação de sitemap como promessa de posição em buscadores.

## 5. Recursos condicionais ou fora do lançamento proposto

Afiliados, múltiplas moedas, domínios por seller, estoques de distribuidores, catálogos sem venda, atacado, multicanal externo, feeds, carteira de cliente, serviços e exportação agendada dependem de necessidade comercial. Kits configuráveis e downloads foram posteriormente confirmados pelo proprietário: ver [tipos de produto](11-tipos-de-produto.md). Cursos e aulas em vídeo estão excluídos.

Integrações específicas, CDN, balanceamento e múltiplas zonas exigem decisão técnica e orçamento. Recursos descritos como gratuitos, ilimitados ou de infraestrutura do fornecedor não são requisitos herdados. Nada na pesquisa obriga utilizar a WDNA como backend.

## 6. Lacunas que a referência não resolve para este projeto

Atualização de 03/10/2026: a seção Personalizar/Vitrines da cópia textual já pesquisada fundamenta a composição modular. Ver [adaptação detalhada](09-lojas-e-vitrines.md). O controle da quantidade total de produtos é requisito do proprietário; não foi identificado explicitamente no trecho consultado como funcionalidade da referência.

A consulta não determina nossas regras comerciais. Após a primeira rodada, o proprietário confirmou comissão como única receita, split, compras multiloja e permissões individuais. Continuam pendentes base/percentual da comissão, contrato de recebimento, custeio de desconto/frete, limites por cobrança, responsabilidade fiscal, detalhes de suspensão e capacidade desejada. O registro atualizado está em [decisões](06-decisoes-e-roadmap.md), sem preencher lacunas com funcionalidades presumidas da WDNA.
