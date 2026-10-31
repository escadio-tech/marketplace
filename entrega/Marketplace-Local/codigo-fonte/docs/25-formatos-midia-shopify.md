# Formatos e dimensões de mídia — Shopify e regra do marketplace

Consulta às fontes oficiais em 28/10/2026:

- https://help.shopify.com/en/manual/products/product-media/product-media-types
- https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads

## O que a Shopify estabelece

Imagens de produto: até 25 megapixels e arquivo menor que 20 MB. Para imagens quadradas, recomenda 2048 × 2048 px. A aparência depende do tema; manter proporção consistente nas capas evita diferenças na grade. JPEG, PNG e WebP estão entre os formatos suportados.

Vídeos: até 10 minutos, 1 GB, MOV/MP4/WebM. A documentação de arquivos informa dimensões de 100 a 4096 px e até 120 fps. Entre as proporções recomendadas estão 16:9, 9:16, 4:3, 3:4 e 1:1. Recomenda H.264, resoluções como 1920 × 1080 ou 1280 × 720 e 25/30/60 fps. A Shopify processa vídeos para distribuição; o protótipo não possui essa infraestrutura.

## Padrão adotado aqui

| Uso | Proporção | Orientação de envio |
| --- | --- | --- |
| Fotos de moda | 4:5 | 1600 × 2000 px |
| Outras fotos de produto | 1:1 | 2048 × 2048 px |
| Vídeo na página de produto | 9:16 vertical | MP4/H.264, 1080 × 1920 px; alternativa 720 × 1280 px, 30 fps |

A escolha obrigatória do quadro vertical na PDP é uma regra deste marketplace solicitada pelo usuário, não uma exigência da Shopify. Aplica-se ao vídeo principal, aos vídeos da coluna lateral e ao celular. A sequência de mídia continua configurável. O quadro usa contenção: não estica nem corta o conteúdo; vídeos horizontais existentes mostram faixas acima e abaixo.

Os cards de categorias conservam suas proporções anteriores. Banners e vídeos modulares de loja/categoria não são alterados nesta etapa.

O cadastro mostra as recomendações. O formato do arquivo não é convertido nem sua orientação rejeitada automaticamente: a regra implementada é o enquadramento vertical do player. O protótipo continua aceitando JPEG/PNG/WebP e MP4/WebM, até 8 MB por arquivo local; não suporta MOV nem reproduz os limites ou o processamento da Shopify. Esses limites maiores exigem backend e armazenamento de mídia.

Correção do usuário: o padrão desejado é vertical (9:16). Esta regra substitui a orientação horizontal anterior.


Revisão de enquadramento: a pedido do usuário, vídeos e capas passam a preencher o quadro com recorte central, preservando a proporção e sem faixas vazias. Esta regra substitui a contenção descrita anteriormente. Aplica-se à PDP, cards, carrosséis, vídeos de lojas/categorias e prévias. O quadro da PDP continua vertical 9:16; os demais espaços mantêm suas dimensões. O vídeo do blazer foi regenerado em 360 × 640 px sem distorção e recebeu capa extraída do próprio arquivo. Trata-se de mídia demonstrativa em baixa resolução, não de filmagem real.
