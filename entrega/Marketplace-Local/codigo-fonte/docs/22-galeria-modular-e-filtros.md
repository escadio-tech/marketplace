# Galeria modular e filtros laterais — 28/10/2026

Referências: três gravações fornecidas pelo usuário (produto Arion Dry, categoria Black Friday e categoria Mochilas). Foram observadas a imagem principal ampla, a coluna de fotos e vídeos, a grade alinhada e os banners intercalados. As gravações não foram adicionadas como conteúdo comercial.

## Galeria em todos os departamentos

A página de produto apresenta a primeira mídia em destaque e as demais em uma coluna ao lado. Fotos abrem ampliação; vídeos possuem controles e tela cheia do navegador. Em telas pequenas, as mídias ficam em uma faixa horizontal navegável. A antiga duplicação da mesma foto como suposto detalhe foi removida.

O campo `media` é uma lista ordenada de objetos `{type, src, alt?, poster?}`. A sequência é a mesma no cadastro, na revisão administrativa e na galeria. Cadastros antigos são compatíveis por meio dos campos `image`, `videoUrl` e `firstMedia`.

A primeira mídia define a capa em categorias e vitrines, incluindo a home e páginas de lojas. Vídeo como capa funciona em todos os departamentos. O quadro permanece 4:5 em moda e 1:1 nas demais categorias e vitrines mistas; vídeos preservam a proporção, sem alongar o card. O vídeo de um produto não é mais duplicado como campanha independente na terceira posição: essa regra substitui o documento 21. Os banners de moda continuam como posições promocionais próprias.

## Cadastro e aprovação

Central de Vendedores → Produtos → Editar, ou Cadastrar produto: adicionar fotos e vídeos por URL HTTPS ou arquivo local, ordenar por arraste ou botões de subir/descer e remover individualmente. Até 20 mídias; arquivo local de até 8 MB, JPEG/PNG/WebP ou MP4/WebM. Ao menos uma foto deve acompanhar o produto para representação em sacola e pedidos. A imagem de capa pode ser um vídeo.

A ordem e os arquivos são conteúdo editorial: aguardam aprovação. Administração → Aprovação apresenta prévias numeradas para revisão. A aprovação do produto existente publica a sequência no catálogo local. Preço e estoque preservam suas regras anteriores.

Arquivos locais são incorporados como data URLs no armazenamento do protótipo. O limite total de armazenamento do navegador pode ser menor que a soma dos arquivos; o formulário informa se a persistência falhar. URLs remotas exigem conexão e disponibilidade do servidor. Em produção, os arquivos precisarão de upload e armazenamento próprios; não há backend nesta entrega.

## Categorias e filtros

Grades usam até cinco colunas no desktop, com adaptação para telas menores. Mostrar filtros abre painel lateral direito, reutilizando o comportamento da sacola: fechamento pelo botão, Escape ou fundo externo, rolagem interna e aplicação dos filtros existentes. A expressão “página do produto” no pedido foi interpretada como listagem de produtos/categoria para esse botão, pois detalhes de um produto não possuem filtros de catálogo.

## Verificação

Testes de ordenação, compatibilidade, capa em diferentes categorias, galeria com mídia intercalada e publicação somente após aprovação. Suíte completa e geração standalone verificadas. A inspeção automatizada do navegador via file:// permanece bloqueada pela ferramenta.
