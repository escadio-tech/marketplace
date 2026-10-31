# Banners e vídeos nas lojas e categorias

## Página da loja

Central de Vendedores → Vitrine da loja: novo tipo de módulo Vídeo, junto aos banners, mosaicos, grades, carrosséis e categorias. Informe URL HTTPS MP4/WebM ou deixe vazia para usar um vídeo dos produtos vinculados. A imagem informada funciona como capa; sem imagem, usa a foto do primeiro produto visível. Os módulos podem ser reordenados e removidos.

A personalização continua exclusiva das lojas Indicadas e Oficiais. O seller só configura a própria loja. A apresentação padrão de lojas com selo ganha vídeo demonstrativo quando o catálogo contém vídeo, preservando os banners anteriores; uma composição personalizada substitui a demonstração, conforme regra existente.

## Página da categoria

Administração → Vitrines → Banners e vídeos das categorias. Configuração independente por categoria, em `categoryModules`:

- Banner ou vídeo, título, imagem/capa, destino interno e produtos vinculados.
- Topo, entre os produtos (antes do número informado) ou após a listagem.
- Conteúdos intercalados ocupam a largura da grade, sem esticar os cards de produtos.
- Ordenação e remoção por categoria. Para trocar dados de um módulo, remova-o e cadastre a nova versão.

A categoria Moda inclui banner de topo e módulo de vídeo ao final como demonstração inicial. O vídeo aparece somente quando há vídeo no catálogo filtrado. As composições respeitam CEP, loja, filtros e vínculos com produtos: destinos de produtos/lojas fora da cobertura não são mostrados. Sem produtos visíveis, os módulos não aparecem. Os blocos promocionais não entram na contagem de produtos.

## Reprodução e limites

Início automático configurável, sem som, somente quando visível; pausa ao sair da área visível ou ocultar a aba. Botão de reproduzir/pausar e controles nativos. Respeita preferência de movimento reduzido. Falha de vídeo mostra a capa.

As configurações são locais. Vídeos demonstrativos são incorporados no standalone; URLs de mídia inseridas pelo usuário dependem de conexão e disponibilidade externa. Integração de armazenamento e publicação em servidor permanece fora deste protótipo.

Testes cobrem renderização, posição, cobertura por CEP, persistência por categoria e bloqueio de alteração de categorias por sellers. Nenhuma alteração na descrição ou na composição da PDP nesta etapa.
