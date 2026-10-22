# Tipos de produto

Decisão do proprietário: produtos simples, com variações, kits fechados/abertos e virtuais entram no escopo da plataforma. Esta especificação substitui as restrições anteriores que deixavam kits configuráveis e downloads como extensões futuras.

## 1. Requisitos confirmados

| Tipo | Configuração | Experiência do comprador |
|---|---|---|
| Simples | Uma oferta, sem atributos que gerem variações | Quantidade e compra direta, sem “Variação Único”, nem seleção de cor/tamanho quando não há escolha |
| Com variações | Um ou mais atributos configuráveis, como cor, tamanho, voltagem, modelo ou outros definidos pelo lojista | Escolha obrigatória dos atributos que identificam a combinação comprável |
| Kit fechado | Dois ou mais produtos definidos pelo vendedor, todos obrigatórios | Compra todos os componentes e escolhe as variações de cada um |
| Kit aberto | Dois ou mais produtos definidos pelo vendedor; comprador escolhe o subconjunto | Compra no mínimo dois produtos diferentes, podendo levar três, quatro ou todos; escolhe as variações de cada componente incluído |
| Virtual | Arquivo digital, como e-book ou infográfico | Recebe acesso a download; não inclui entrega física |

Cursos e aulas online em vídeo são proibidos. Não criar player, hospedagem de aulas, trilhas de curso ou acesso a curso externo como produto virtual.

Um produto simples ainda pode informar características fixas na descrição e nas especificações. Por exemplo, uma bolsa preta continua podendo informar “preto”; não deve exibir um seletor sem alternativas. Um conjunto vendido pelo fabricante como uma unidade pode ser simples mesmo que seu nome contenha “kit”; o tipo Kit desta especificação representa composição de produtos do catálogo.

## 2. Variações

Proposta técnica implementada no protótipo:

- Atributos têm nome e lista de opções, sem lista rígida de tipos: o seller pode criar os necessários.
- Gerar combinações a partir dos atributos e permitir SKU, preço, estoque e ativação por combinação.
- Todas as escolhas são obrigatórias. Combinação inexistente, inativa ou sem estoque não pode entrar na sacola.
- O preço exibido após seleção corresponde à combinação. Antes da seleção, usar preço de referência explicitamente identificado.
- SKU identifica a unidade de estoque, isolado por seller. Não usar o rótulo de uma variação como identificador global.
- Alterar atributos invalida a matriz anterior até sua regeneração e revisão. SKUs duplicados e opções duplicadas são rejeitados.
- O limite de 100 combinações é técnico e demonstrativo; não foi definido como limite comercial definitivo.

A sacola e o pedido devem guardar atributos selecionados, SKU, preço e nome no momento da compra. Alterar o catálogo não modifica compras existentes.

## 3. Kits

O seller escolhe os componentes ao configurar o produto do tipo Kit. Não é suficiente escrever a composição na descrição. Cada componente referencia um produto existente e uma quantidade por kit.

O cliente escolhe atributos de cada produto separadamente: uma camisa M/azul não determina a cor ou tamanho da calça. Produto simples não exige escolha. Componentes excluídos de kit aberto não exigem preenchimento de variações.

### Regras operacionais propostas

- Inicialmente, componentes físicos simples ou com variações, todos do mesmo seller. Kits entre sellers, kits aninhados e kits contendo virtuais ficam fora desta implementação inicial; dependem de decisão específica.
- Mínimo de dois produtos distintos, não duas unidades de um mesmo componente. Quantidade por componente é um inteiro positivo.
- Kit fechado não permite excluir um componente. Kit aberto só aceita inclusão a partir de dois componentes distintos.
- Preço inicial calculado pela soma dos preços dos componentes selecionados, multiplicados pelas respectivas quantidades. Descontos, preço fechado promocional e rateio de desconto ainda não foram definidos.
- Quantidade de kits multiplica cada componente. Dois kits com duas camisas cada consomem quatro camisas do SKU escolhido.
- O kit não cria estoque independente. Disponibilidade deriva dos componentes e de suas combinações.
- Agregar demanda de cada SKU em toda a sacola, somando kits e itens avulsos, para evitar aceitar quantidade acima da disponível.
- Se um componente obrigatório estiver indisponível, a composição fechada não pode ser comprada. No aberto, o cliente pode excluí-lo, mantendo o mínimo de dois produtos válidos.

O protótipo calcula a disponibilidade e preços na sacola. Produção precisa revalidar e reservar atomicamente os SKUs no checkout, tratar concorrência e liberar reserva na expiração/cancelamento. Adicionar à sacola não significa reserva real de estoque.

### Pedidos, entrega e devoluções

Preservar o agrupamento visual do kit e detalhar seus componentes no subpedido do seller, incluindo quantidades, SKUs, atributos e preços. Entrega, estoque e documento fiscal devem considerar os componentes. Comissão continua sobre produtos, excluindo frete.

Política de devolução parcial de kits, desconto condicionado à composição e recomposição do valor em reembolso são pendentes. Não inventar perda de direitos ou regras de reembolso a partir do tipo de kit. A implementação real depende dessas definições.

## 4. Produtos virtuais

Requisito confirmado: arquivos digitais para download, incluindo e-books e infográficos, excluindo cursos e aulas em vídeo.

Propostas técnicas:

- Separar capa pública, metadados e arquivo privado de entrega.
- Informar formato, tamanho e condições de uso/licença.
- Não apresentar frete, despacho ou retirada para itens exclusivamente virtuais. Em uma compra mista, apenas itens físicos participam da logística.
- Disponibilidade do arquivo não depende de estoque físico. Controle de licenças, limites por compra e prazo de acesso ainda serão definidos.
- Liberar acesso após pagamento confirmado, vinculado ao comprador e ao item comprado. Webhooks repetidos não criam concessões duplicadas.
- Backend emite links temporários após verificar usuário, compra e direito de acesso; não usar URL pública permanente do arquivo comercial.
- Cancelamento, estorno, substituição de arquivo e histórico de versões precisam de regras explícitas. Não apagar o histórico de compra.
- Validar conteúdo real do arquivo, tamanho, malware e política de conteúdo. Extensão ou declaração do vendedor não comprova que um arquivo é seguro ou que não é um curso.

No protótipo, os formatos do formulário são PDF, EPUB, PNG, JPEG e WEBP, com limite demonstrativo de 20 MB. Vídeos, executáveis, HTML e arquivos compactados não são aceitos nessa primeira interface. Outros formatos, arquivos múltiplos e limites de produção continuam pendentes.

O formulário apenas registra metadados locais: não envia nem guarda o conteúdo do arquivo. O produto demonstrativo oferece um `.txt` gerado localmente, claramente identificado como exemplo, depois de uma ação explícita de “simular pagamento”. Isso não é pagamento real, nem proteção de download. Arquivos comerciais nunca devem ser incorporados ao pacote standalone público.

## 5. Cadastro, aprovação e permissões

O editor da Central de Vendedores permite escolher o tipo, configurar atributos/matriz, escolher componentes/modo do kit ou selecionar arquivo virtual. É possível salvar rascunho, reabrir e enviar à fila demonstrativa de análise.

- Regras anteriores de aprovação de conteúdo continuam válidas: títulos, descrições, atributos, especificações e imagens.
- Composição de kit, tipo do produto e arquivo comercial devem passar por revisão antes da publicação — proposta para preservar integridade editorial e de entrega.
- Preço e estoque de SKUs ativos continuam independentes da revisão editorial, conforme decisões anteriores.
- `catalog.create/update` não concede aprovação global. Upload privado exige permissão específica; revisão e acesso aos documentos/arquivos privados são auditados.
- Só selecionar componentes pertencentes à loja e elegíveis para publicação. Um seller não pode montar kit usando o estoque de outra empresa.

O protótipo mantém rascunhos e metadados no navegador, quando o armazenamento local está disponível. Não há autorização real no servidor nem publicação automática desses rascunhos no catálogo público. Os exemplos públicos são fixtures demonstrativas separadas dos rascunhos.

## 6. Modelo de dados e serviços propostos para produção

- `Product.type`: `simple`, `variable`, `kit`, `virtual`.
- `ProductAttribute` e `AttributeOption`: nomes e opções administradas pelo seller dentro do escopo permitido.
- `ProductVariant`: combinação, SKU, preço em centavos, saldo/estado de estoque e ativação.
- `KitComponent`: kit, produto componente e quantidade mínima fixa por kit; modo `open` ou `closed` no kit.
- `CartLine`/`OrderLine`: produto, quantidade, atributos e componentes selecionados, com snapshot de preço.
- `InventoryReservation`: demanda agregada por seller/SKU, idempotência, expiração e transação atômica.
- `DigitalAssetVersion`: metadados e objeto privado de entrega; capa e amostra pública são objetos distintos.
- `DownloadEntitlement`: comprador, linha do pedido, versão do arquivo, estado e trilha de acessos.

O servidor deve recalcular preços e estoque a partir do catálogo autorizado, jamais confiar nos totais ou no selo de aprovação enviados pelo frontend. A seleção de kit deve ser validada tanto na cotação quanto no fechamento do pedido.

## 7. Validação realizada e exemplos

Exemplos públicos:

- Produto 4: bolsa simples, sem seletor de variação.
- Produtos 1 e 8: tamanho e cor.
- Produto 7: voltagem e modelo.
- Produtos 12–15: camisa, cinto, calça e blazer com tamanho e cor.
- Produto 16: Kit Dia dos Pais fechado, com cinco componentes.
- Produto 17: Kit Dia dos Pais aberto, com mínimo de dois componentes.
- Produto 18: e-book demonstrativo, sem logística física.

Testes automatizados em `tests/product-types.test.mjs`: produto simples sem rótulo de variação; atributos obrigatórios; combinação sem estoque; componentes obrigatórios de kit fechado; mínimo distinto de kit aberto; estoque compartilhado; item de outra loja/kit aninhado; quantidade fracionária; virtual sem estoque físico; vídeo rejeitado; matriz incompleta e SKUs duplicados.

Esses testes verificam a lógica do protótipo. Homologação de pagamentos, concorrência de estoque, aprovação real, armazenamento privado e entrega autenticada ainda precisam de implementação no backend.

## Verificação final — 06/10/2026

12 testes automatizados aprovados. No navegador foram verificados: produto simples sem variação; kit aberto com mínimo de dois itens; kit fechado com escolhas por componente e composição na sacola; acesso digital antes e após pagamento simulado; login do vendedor; cadastro simples enviado para análise e exibido na administração; novo cadastro com combinações e salvamento local. Scripts standalone passaram pela validação de sintaxe e recursos incorporados. A abertura por file: no Chrome não foi automatizada nesta sessão.

Atualização da etapa seguinte: o pagamento e os downloads passaram a fazer parte do checkout e dos pedidos. Consulte [Checkout e pedidos](12-checkout-pedidos.md); a simulação avulsa de liberação digital descrita anteriormente foi substituída pelo fluxo do pedido.
