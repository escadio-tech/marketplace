# Conta do comprador e navegação — versão 0.14

Atualização de 08/10/2026, solicitada pelo proprietário.

## Abertura e navegação

O `index.html` da pasta standalone incorpora também as páginas Quero Vender, Central de Vendedores e Administração. Os links de venda abrem a área incorporada no próprio documento; não dependem de os outros HTML estarem ao lado do index. Os arquivos `vender.html` e `painel.html` continuam disponíveis como atalhos opcionais. Os links do código-fonte usam caminhos relativos.

Ao abrir ou recarregar a página, o comprador começa deslogado. O cadastro, os endereços e os pedidos permanecem salvos localmente, permitindo entrar novamente com o mesmo e-mail e senha demonstrativa. A sessão do comprador existe somente em memória. Retornar pelo cache de navegação também encerra o acesso. A Central de Vendedores limpa o acesso demonstrativo persistido ao iniciar sua página.

Navegar entre telas e abas internas durante uma mesma abertura não exige novo login. No standalone, as áreas incorporadas não substituem a sessão do comprador no documento principal; reabrir/recarregar o index encerra essa sessão.

## Cadastro e login do comprador

- Nome completo, e-mail, telefone com DDD, senha e confirmação de senha.
- Validação de e-mail duplicado, inclusive diferenças de maiúsculas/minúsculas.
- Login com o cadastro feito pelo usuário; não exige uma conta fixa de demonstração.
- Saudação no header: **Bem-vindo, [primeiro nome]!**, também no celular.
- Link do header abre Minha conta quando autenticado ou Entrar/Criar conta quando deslogado.
- Checkout exige login. O carrinho montado como visitante é preservado durante cadastro/login para continuar a compra.
- Sair encerra a sessão e limpa o carrinho da sessão. Não apaga cadastro, endereços ou histórico.

A senha não é persistida em texto: a demonstração usa PBKDF2-SHA256 com salt individual e 100.000 iterações. Isso não transforma o frontend em um sistema seguro de autenticação de produção: o navegador e o armazenamento local podem ser alterados pelo usuário. Usar apenas dados e senhas fictícios. Recuperação por e-mail, verificação de e-mail, sessões no servidor e proteção real de dados continuam pendentes do backend.

## Meu cadastro

Permite editar nome, telefone, CPF demonstrativo opcional, data de nascimento opcional, e-mail e senha. Alteração de e-mail ou senha exige a senha atual; nova senha exige confirmação. A saudação do header acompanha a alteração do nome. O identificador da conta não muda ao editar o e-mail, preservando o vínculo com os pedidos.

## Endereços

Vários endereços por comprador, com inclusão, edição e exclusão. Campos: identificação (ex.: Casa), destinatário, CEP, rua/avenida, número, bairro, cidade, UF e complemento. É possível definir padrões de entrega e de cobrança diferentes, ou usar o mesmo endereço para ambos.

O checkout permite selecionar o endereço de entrega salvo, preencher manualmente e selecionar endereço de cobrança. Os dados da conta preenchem nome, e-mail e telefone. O endereço de cobrança pode ser o mesmo informado para entrega. Não há consulta externa de CEP nesta etapa.

O pedido guarda cópias dos endereços utilizados. Editar/excluir posteriormente um endereço no cadastro não altera os registros históricos da compra. O endereço digitado manualmente no checkout pertence ao pedido; para reutilizá-lo, cadastrar em Meus endereços.

Para retirada, a validação por CEP continua obrigatória. Para produtos digitais, entrega física e frete continuam dispensados; dados de cobrança completos serão exigidos conforme o provedor e o fluxo fiscal de produção.

## Meus pedidos

- Lista exclusiva da conta autenticada, com identificação, data, total e andamento por loja.
- Botão **Ver pedido** abre detalhes, histórico, recebimento, cobrança, chat e downloads aplicáveis.
- Ao finalizar o checkout demonstrativo, o pedido é vinculado ao ID do comprador e seus detalhes são abertos para continuar a simulação de pagamento.
- Chat, pagamento simulado e download verificam o vínculo com o comprador atual.
- Pedidos antigos criados antes de existir cadastro de comprador não são atribuídos automaticamente a uma pessoa. Continuam visíveis na Administração e na loja correspondente.
- O protótipo filtra o acesso na interface/modelo local. Na produção, a autorização deverá ocorrer no servidor em cada requisição.

## Comprar novamente

Disponível na lista de pedidos e dentro dos detalhes. Recoloca os itens do pedido no carrinho preservando quantidades, variações e composição de kits, sem alterar a compra anterior.

Preços e estoque são consultados no catálogo atual. Itens equivalentes já presentes no carrinho têm suas quantidades somadas. A validação considera itens avulsos, kits e pedidos existentes que reservam saldo. Produto removido, tipo alterado, combinação sem estoque ou loja suspensa impedem a recompra e mostram uma mensagem. A operação não adiciona apenas parte do pedido silenciosamente: o carrinho permanece intacto quando houver erro.

Recompra não reutiliza preço antigo, desconto, frete, pagamento ou pedido anterior; exige nova revisão e nova finalização de compra.

## Verificação e entrega

38 testes automatizados aprovados: regras existentes, cadastro/login, alteração de credenciais, endereços, isolamento entre compradores, início deslogado em nova instância, recompra, scripts incorporados e roteamento dos links standalone. As verificações de navegação usam um ambiente simulado de eventos/DOM; não substituem teste visual no Chrome.

A automação do navegador continuou bloqueada por falha de inicialização do ambiente Windows. Não houve nova aprovação visual desktop/mobile nesta revisão. A versão standalone e a cópia do código/documentação foram regeneradas para a entrega.

Limites mantidos: armazenamento local, sem servidor de autenticação, cobrança real, split, envio real de e-mail/WhatsApp ou arquivos digitais comerciais. Usar `node server.mjs` para testar as três áreas sob a mesma origem; o compartilhamento de armazenamento entre arquivos locais/frames depende do Chrome. Ao mudar a pasta do arquivo, os cadastros locais anteriores podem não acompanhar a nova localização.


## Sacola lateral — 14/10/2026

Ao adicionar um produto, a sacola abre pela direita, substituindo o popup de confirmação central. Mostra o item, a quantidade adicionada, variações ou composição do kit, preço unitário, subtotal por item e subtotal dos produtos. Permite ajustar quantidades, remover itens, continuar comprando e ir ao checkout. A mesma seleção mantém quantidades acumuladas; variações distintas continuam em linhas separadas. A sacola fecha pelo botão, pela tecla Escape ou ao clicar fora. Layout adaptado ao celular e animação reduzida quando solicitada pelo sistema. Checkout e conta continuam em suas telas de diálogo próprias.
