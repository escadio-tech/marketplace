# Proporções de mídia e altura dos cards

Esta decisão substitui a apresentação 9:16 nas grades descrita no documento 19.

Referência: o [card de produto do tema Dawn, da Shopify](https://github.com/Shopify/dawn/blob/main/snippets/card-product.liquid) oferece proporção quadrada (1) e retrato (0,8, equivalente a 4:5), além da adaptação ao arquivo. O marketplace utiliza caixas fixas para não deixar a altura do arquivo determinar a altura da linha.

- Categoria Moda & acessórios: imagens, vídeos e banner em espaço 4:5. Recomendação ao seller: imagens verticais de 1600 × 2000 px.
- Outras categorias e vitrines mistas da home: imagens quadradas 1:1. Recomendação: 1600 × 1600 px.
- Vídeo primeiro nos cards: apenas produtos de moda. Nas vitrines mistas, ocupa caixa quadrada; na categoria de moda, caixa 4:5. O vídeo usa ajuste interno sem corte para preservar os controles e a apresentação da peça. Não aumenta a altura do card conforme a proporção original.
- Nas outras categorias o vídeo continua disponível na página do produto, mas o cartão utiliza sua imagem.
- O banner intercalado aparece apenas em moda, com proporção 4:5 e sem altura mínima fixa.
- Cards alinham pelo topo e não se esticam para preencher a altura do maior card da linha. Área de mídia e área de informações têm dimensões independentes.

O formulário orienta os formatos de imagem. A validação automática das dimensões de URLs externas e um serviço real de processamento de mídias permanecem pendentes.
