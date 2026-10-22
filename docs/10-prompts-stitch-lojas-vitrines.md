> **Atualização vigente — 08/10/2026:** consulte [Regras, pedidos e Administração](13-regras-pedidos-administracao.md). Retirada por CEP da cidade sem limite de km; Indicada com 100 pedidos/dia e revisão semestral; Oficial somente por documentos. Regras antigas conflitantes abaixo são histórico.

# Prompts complementares — Google Stitch

Usar após os prompts das três áreas já enviados. Manter identidade visual e fluxos existentes. As propostas de interface não confirmam regras comerciais pendentes.

## 1. Loja pública e selos

```text
Atualize o projeto do marketplace local de Cianorte e Maringá com lojas Oficiais e Indicadas. Preserve o design existente e crie versões desktop e mobile.

Loja Oficial precisa de documentação da empresa e da marca validada e alto volume de pedidos. Loja Indicada precisa de alto volume. O critério confirmado é MAIS DE 200 pedidos em UM ÚNICO DIA: 201 atende, 200 não. Não exigir média, histórico mínimo ou dias consecutivos. Não invente notas de qualidade, garantia de entrega, taxas especiais ou posição privilegiada na busca.

Crie três exemplos de página de loja: comum, Indicada e Oficial. Use selo com ícone e texto e explicação acessível por clique/teclado. A apresentação de apenas um selo por loja é uma proposta visual. Não exponha documentos privados ao comprador.

Nas lojas Oficial e Indicada, demonstre uma página composta por banner principal, banners em conjunto, categorias, vitrine de novidades e vitrine com seleção manual. Mantenha nome da loja, selo e identificação sob controle da plataforma. Não crie editor de código.

Mostre uma vitrine com total de 12 produtos: quatro por linha no desktop e dois no celular. Diferencie a quantidade total de produtos da quantidade por linha. Inclua exemplo de carrossel com total limitado. Use produtos fictícios, cada um com preço e disponibilidade, e conecte à página de produto e ao carrinho existentes.

Chat continua disponível apenas após compra. Carrinho multiloja, frete calculado por trajeto e retirada em loja permanecem como definidos. Não acrescente chat pré-venda.
```

## 2. Central do seller — editor modular

```text
Acrescente à Central de Vendedores a área “Aparência da loja”, para lojas Oficiais e Indicadas, mantendo os componentes visuais do projeto. Crie um editor visual responsivo da página inicial da própria loja.

Layout desktop: lista de módulos à esquerda, prévia ao centro e configurações do módulo à direita. No celular, use etapas/painéis navegáveis. Permita adicionar, duplicar, ativar, ocultar, remover e reordenar módulos por arrastar e também por botões acessíveis.

Galeria de módulos: banner principal, conjunto de banners, vitrine de produtos em grade, vitrine em carrossel, categorias e apresentação da loja. Exibição por desktop, celular ou ambos. Banners com imagens específicas por dispositivo, texto alternativo e destino interno. Biblioteca de mídia exclusiva da loja; documentos de certificação não aparecem nela. Limites de arquivos ainda em definição, sem inventar um valor aprovado.

Na vitrine, configure nome interno, título público, quantidade TOTAL de produtos, produtos por linha para desktop/celular, formato grade/carrossel, seleção manual ou por categoria e ordenação. Exemplo ilustrativo: total 12, quatro por linha no desktop, dois no celular. Quantidade deve ser inteiro positivo dentro do limite global, cujo valor ainda está em definição.

Permita escolher somente produtos aprovados da própria loja. Mostre cenário com 12 solicitados e apenas sete elegíveis: aviso no editor e sete exibidos, sem repetir produtos. Módulo vazio recebe aviso no editor e fica oculto na página pública. Revisões editoriais pendentes não aparecem ao público; preço e estoque continuam atuais.

Inclua “Salvar rascunho”, “Pré-visualizar” e “Publicar”, histórico e restauração de layout. Não trate restauração como reversão de preço ou estoque. Separe estados de permissão: pode editar, pode publicar, acesso restrito. Para loja comum, mostre página padrão e informação de que acesso ao editor avançado depende da política ainda em definição.

Crie também “Classificação da loja”: selo atual, total de pedidos e data do dia qualificante, solicitação de Oficial e envio privado de documentação da empresa/marca. Basta atingir 201 pedidos em um único dia. Lista de documentos e status dos pedidos contados estão em definição. Estados: análise, complementação, aprovada e rejeitada com motivo. Volume suficiente sozinho não concede Oficial. Não permita seller escolher seu selo.

Conecte editor, prévia e página pública. Publicação é simulada no protótipo. Não crie campos de HTML, CSS, JavaScript, scripts ou importação de temas.
```

## 3. Administração — classificações e vitrines

```text
Amplie a administração do marketplace com “Classificações de lojas” e “Vitrines”, preservando o projeto existente.

Classificações: tabela com loja, CNPJ, classificação atual, total e data do dia qualificante, situação documental e solicitação. Oficial requer documentos da empresa e da marca validados MAIS alto volume. Indicada requer alto volume. Regra confirmada: basta atingir 201 pedidos em um único dia, sem média ou repetição obrigatória. Inclua exemplos com 200 pedidos (insuficiente) e 201 (volume atendido). Não retire automaticamente elegibilidade por queda de volume no dia seguinte; validade e retirada ainda estão em definição.

Detalhe da análise: documentos privados em área restrita, histórico, evidências de volume, motivo e ações de aprovar, pedir complementação ou rejeitar. Exiba casos de volume suficiente com documentos pendentes e documentos aprovados com volume insuficiente. Não confunda certificação com habilitação do provedor de pagamento. Preveja revisão/retirada com motivo, sem inventar prazos automáticos ou período de tolerância.

Vitrines: editor modular da página inicial global, que pode usar produtos de várias lojas. Administração configura modelos disponíveis e limites de módulos e produtos; valores ainda não decididos devem aparecer como pendentes, sem números tratados como aprovados. Editor de seller continua restrito aos produtos e página da própria loja.

Separe quantidade total da vitrine e itens por linha por dispositivo. Ofereça módulos de banners, produtos, categorias e seleção editorial de lojas. Um selo não deve criar prioridade comercial automaticamente.

Inclua rascunho, prévia desktop/mobile, publicação e histórico com autor/data. Moderação de banners e layouts é política pendente: não a apresente como obrigatória já aprovada. Aprovação de conteúdo editorial de produtos continua obrigatória e independente.

Mostre permissões individuais para editar, publicar, gerir mídia, analisar documentos e conceder classificação. Nenhum painel dá acesso a código. Conecte a análise de loja à classificação pública e o editor à prévia, usando dados fictícios e estados claros de sucesso, erro, vazio e acesso negado.
```
