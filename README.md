# Tem Logo Ali · versão 0.16

Inventário e documentação atualizados em 30/10/2026. Confirmação inicial de cidade/CEP, preenchimento do cadastro, catálogo por cobertura e cotação de frete lateral implementados. Cadastro/login do comprador, perfil, endereços e recompra disponíveis. O index standalone incorpora as áreas de venda e inicia deslogado a cada abertura/recarga. Domínio adquirido: **temlogoali.com.br**.

- [Retirada por estabelecimento](docs/16-retirada-por-estabelecimento.md)
- [Localização, frete lateral e cobertura](docs/15-localizacao-frete-e-cobertura.md)
- [Conta do comprador e navegação](docs/14-conta-comprador-e-navegacao.md)
- [Documentação consolidada](docs/DOCUMENTACAO-CONSOLIDADA-2026-10-08.md)
- [Regras novas, estados dos pedidos e Administração](docs/13-regras-pedidos-administracao.md)
- [Abrir o projeto standalone](ABRIR-MARKETPLACE.html)

Execute `node server.mjs` e abra `http://localhost:4173/`. Administração: `http://localhost:4173/painel.html#admin`. Central de Vendedores: `http://localhost:4173/painel.html#seller`. Login de demonstração: `lojista@exemplo.com` / `Demo123!`.

As configurações administrativas, pedidos, revisões e fila de mensagens são locais. Não há backend, autenticação real, cobrança ou envio real de e-mail/WhatsApp. Não use dados pessoais ou segredos reais. Compartilhamento de armazenamento entre arquivos file:// depende do navegador; use o servidor local para testar as três áreas juntas.

Nesta revisão: retirada por CEP sem limite de distância, corte oculto para comprador, variações indisponíveis riscadas, novos fluxos de pedido, fila de mensagens, selos vetoriais e painel administrativo configurável (sellers, pedidos, logística, pagamentos, cupons, frete grátis, vitrines e auditoria).

Testes: `node --test tests/*.test.mjs`. Versão offline: `node scripts/build-standalone.mjs`.

80 testes de funcionalidades e 2 verificações automatizadas do índice de revisão. A inspeção visual via file:// está bloqueada pela política da ferramenta; a verificação desta revisão usa testes locais.


Catálogo demonstrativo ampliado: seis lojas e 33 produtos com imagens. Novas lojas: Lar & Luz e Jardim de Casa (Cianorte), Conecta Maringá (Maringá), com três produtos cada. Fotografias e ilustrações estão incorporadas no standalone para uso offline. Os cadastros existentes são preservados.




Central de Vendedores: quatro pedidos fictícios por loja, resumo financeiro simulado e seção Vitrine da loja exclusiva para Indicadas e Oficiais, com carrossel, grade, banners, mosaicos e categorias. Consulte docs/17-central-demonstrativa-e-vitrine.md.


Produtos e cadastro separados; edição do catálogo próprio; pedidos em tabela com filtros e paginação; chat pós-compra em tela própria. Detalhes em docs/18-produtos-pedidos-chat-vendedor.md.


Revisão de 21/10/2026: rotas de Produtos, Cadastrar produto, Edição, Pedidos e Chat verificadas em conjunto. Formulário de cadastro separado da listagem. A Central exibe a data desta revisão no topo. Inspeção visual via file:// bloqueada pela política da ferramenta; verificação por testes locais.


Atualização de 27/10/2026: 12 categorias, vitrines sem barra visível e com arraste, banner entre produtos da categoria e vídeo vertical como primeira mídia. Consulte docs/19-categorias-e-midias.md.


Revisão das proporções: categoria de moda em 4:5; demais categorias e vitrines mistas em 1:1. Banner intercalado apenas em moda. Cards não esticam para acompanhar vídeos. Orientações e referência Shopify em docs/20-proporcoes-de-midia.md.


Moda disponível também em Cianorte: quatro produtos demonstrativos na Casa Aurora (camisa, calça, blazer e bolsa). A cobertura por CEP permanece ativa.


Mídias de moda: fotografias locais de camisa, calça e blazer, incorporadas ao standalone. A camisa em Cianorte e Maringá inclui vídeo MP4 demonstrativo de seis segundos, animado a partir da fotografia, reproduzido pelos controles do card.


Revisão de 28/10/2026: categoria de moda com cinco colunas, filtros recolhidos e vídeo promocional na terceira posição, alinhado à altura total dos cards. Banner intercalado e imagens 4:5. Consulte docs/21-categoria-moda-referencia.md.

Galeria modular: fotos e vídeos ordenáveis pelo vendedor, revisão com prévias, capa de vídeo em todos os departamentos e filtros em painel lateral direito. Esta revisão substitui a duplicação de vídeo promocional descrita anteriormente. Consulte docs/22-galeria-modular-e-filtros.md.

Galerias ampliadas: cinco visualizações demonstrativas por produto; poltrona com vídeo na posição 1 e camisa de Cianorte com vídeo na posição 3. Rolagem pela página. Consulte docs/23-galerias-demonstrativas.md.

Produto de moda com modelo: blazer em Cianorte, vídeo com autoplay sem som e botão de pausa; controle de autoplay no editor de mídias. Catálogo atual: 33 produtos.

Banners e vídeos modulares nas páginas de lojas e categorias: configuração, posição e autoplay. Consulte docs/24-midias-lojas-categorias.md.

Vídeos na PDP exibidos sempre em quadro vertical 9:16, também no celular. Orientações de formatos e tamanhos da Shopify registradas em docs/25-formatos-midia-shopify.md.


## Revisão do projeto

Abra entrega/Marketplace-Local/REVISAO-PROJETO.html para consultar todas as páginas e documentos, marcar Manter/Solicitar alteração e exportar suas decisões. O resumo atualizado está em docs/26-inventario-e-revisao-2026-10-30.md. A pesquisa histórica permanece preservada.
