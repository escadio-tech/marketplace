# Categorias e mídia nas vitrines

> Revisão de layout: a regra abaixo de 9:16 na grade foi substituída por docs/20-proporcoes-de-midia.md. Grades de moda usam 4:5; demais grades e vitrines mistas usam 1:1.

Atualização: 27/10/2026.

A seção “O que combina com seu dia?” tem 12 categorias. As novas são Mercado & alimentos, Pet shop, Brinquedos & jogos, Papelaria & escritório e Ferramentas & construção. Categorias sem produtos para o CEP apresentam o estado vazio existente.

As vitrines horizontais ocultam a barra de rolagem. A navegação permanece disponível pelos botões superiores, pelo arraste e pelo teclado. Um arraste não deve abrir o produto ao soltar. Os controles de vídeo permanecem independentes do arraste.

Nas páginas filtradas por categoria, há um banner demonstrativo inserido após o segundo produto (ou ao final de listas menores). Ele ocupa uma coluna da grade e aponta para um produto da seleção, respeitando os filtros e o CEP. Não é incluído na contagem de produtos. Sua imagem vem do catálogo; um gerenciador de campanhas de categoria ainda não foi implementado.

O seller pode informar uma URL HTTPS direta de vídeo MP4/WebM e escolher Imagem ou Vídeo vertical (9:16) como primeira mídia. Essa escolha vale para os cartões na home e na categoria e para a ordem visual da galeria. O vídeo tem controles, inicia sem áudio e só carrega o conteúdo ao ser acionado. A imagem permanece como capa e alternativa em caso de falha. Mudanças de vídeo e ordem das mídias seguem aprovação editorial, assim como as imagens.

O produto Poltrona de madeira com estofado, da Casa Aurora, demonstra vídeo primeiro. O arquivo incorporado tem 360 × 640 pixels e 6 segundos, produzido como animação de aproximação da fotografia ilustrativa existente. Funciona offline; URLs de vídeos cadastradas pelo seller dependem de internet. Esta implementação não faz upload, transcodificação nem validação automática das dimensões de vídeos externos. O seller deve fornecer o arquivo em 9:16. Vídeos são apresentação do produto, não cursos ou arquivos digitais vendidos.

