# Tem Logo Ali · versão 0.16

Atualizado em 14/10/2026. Confirmação inicial de cidade/CEP, preenchimento do cadastro, catálogo por cobertura e cotação de frete lateral implementados. Cadastro/login do comprador, perfil, endereços e recompra disponíveis. O index standalone incorpora as áreas de venda e inicia deslogado a cada abertura/recarga. Domínio adquirido: **temlogoali.com.br**.

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

60 testes aprovados. A revisão visual desta atualização não pôde ser executada: a automação do navegador falhou ao iniciar no ambiente Windows.


Catálogo demonstrativo ampliado: seis lojas e 28 produtos com imagens. Novas lojas: Lar & Luz e Jardim de Casa (Cianorte), Conecta Maringá (Maringá), com três produtos cada. Fotografias e ilustrações estão incorporadas no standalone para uso offline. Os cadastros existentes são preservados.




Central de Vendedores: quatro pedidos fictícios por loja, resumo financeiro simulado e seção Vitrine da loja exclusiva para Indicadas e Oficiais, com carrossel, grade, banners, mosaicos e categorias. Consulte docs/17-central-demonstrativa-e-vitrine.md.


Produtos e cadastro separados; edição do catálogo próprio; pedidos em tabela com filtros e paginação; chat pós-compra em tela própria. Detalhes em docs/18-produtos-pedidos-chat-vendedor.md.


Revisão de 21/10/2026: rotas de Produtos, Cadastrar produto, Edição, Pedidos e Chat verificadas em conjunto. Formulário de cadastro separado da listagem. A Central exibe a data desta revisão no topo. Inspeção visual via file:// bloqueada pela política da ferramenta; verificação por testes locais.

