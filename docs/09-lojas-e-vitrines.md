> **Atualização vigente — 08/10/2026:** consulte [Regras, pedidos e Administração](13-regras-pedidos-administracao.md). Retirada por CEP da cidade sem limite de km; Indicada com 100 pedidos/dia e revisão semestral; Oficial somente por documentos. Regras antigas conflitantes abaixo são histórico.

# Lojas Oficiais, Indicadas e vitrines modulares

Atualização: 03/10/2026. Requisitos comerciais confirmados pelo proprietário; regras operacionais abaixo identificadas como propostas precisam de validação.

## 1. Classificações confirmadas

| Classificação | Requisito |
|---|---|
| Loja comum | Cadastro e aprovação já definidos para sellers com CNPJ |
| Loja Indicada | Alto volume de vendas |
| Loja Oficial | Documentação da empresa e da marca, com validação, e alto volume de pedidos |

Alto volume significa **mais de 200 pedidos em um único dia**, conforme resposta expressa do proprietário. A partir de 201 pedidos naquele dia, o requisito de volume está atendido, sem média nem exigência de repetição em dias consecutivos. Exatamente 200 não ultrapassa o limite informado. Não confundir quantidade de pedidos com unidades vendidas ou faturamento. O limite é um critério de classificação, não uma estimativa de capacidade da plataforma.

Oficiais e Indicadas poderão configurar banners e posicionamento de vitrines na própria loja. A plataforma terá vitrines modulares com quantidade de produtos configurável. Não haverá acesso a HTML, CSS, JavaScript ou importação de temas executáveis.

## 2. Apuração e concessão — propostas pendentes

- Confirmado: basta ultrapassar 200 pedidos em um único dia. Proposta técnica: dia civil de 00h00 até antes de 00h00 do dia seguinte no fuso America/Sao_Paulo, registrando a data e o total qualificante.
- Contar um subpedido por loja por compra, a partir do pagamento confirmado. Uma compra em três lojas conta uma vez para cada loja; dez itens da mesma loja continuam sendo um subpedido. Eventos repetidos de pagamento não duplicam a contagem.
- Proposta: excluir cancelamentos e reembolsos integrais; reembolso parcial não elimina o subpedido com saldo de venda. Atribuir a venda à data da confirmação do pagamento e recalcular a métrica se houver reversão.
- Uma loja nova pode atender ao volume já no primeiro dia em que atingir 201 pedidos válidos. Não exigir histórico mínimo. A validade futura desse marco e regras de retirada do selo ainda não foram definidas; não presumir perda por queda de volume no dia seguinte.
- Proposta: sistema calcula elegibilidade, administração concede o selo com auditoria. Seller não edita sua classificação. Definir frequência de revisão, tolerância para queda de volume, expiração e retirada do selo antes de automatizar.
- Proposta de apresentação: exibir apenas Oficial quando a loja satisfizer ambos os critérios. Manter critérios e histórico separados internamente. A coexistência visual dos selos ainda precisa de decisão.
- Lista exata de documentos e evidências de vínculo/autorização da marca permanece pendente. Enviar documentos não equivale a aprovação. Cadastro comercial, validação de marca e habilitação financeira são processos separados.
- Documentos privados só podem ser vistos pelo seller autorizado e revisores globais autorizados. Exibir ao comprador o selo e sua explicação, nunca os arquivos.

Fluxo proposto: solicitação → análise de documentos e volume → complementação ou aprovação/rejeição → revisão periódica. Registrar revisor, data, justificativa, documentos examinados, período e regra de volume usados. Suspensão de loja prevalece sobre qualquer selo.

## 3. Escopo do editor visual

O administrador controla módulos disponíveis e a página principal do marketplace. Sellers elegíveis configuram apenas a página da própria loja. Equipe recebe permissões individuais. Lojas comuns continuam com página padrão; liberar o editor avançado para elas é uma decisão pendente.

Proposta inicial: editar a página inicial da loja. A referência também separa seções de página de produto; adotá-las futuramente depende de decisão específica. Identificação da loja, selo, navegação, preços, informações de compra e checkout permanecem componentes controlados pela plataforma.

Módulos propostos:

| Módulo | Configurações |
|---|---|
| Banner principal | Imagens desktop/celular, texto alternativo e destino interno |
| Banners em conjunto | Imagens, ordem e destinos por bloco |
| Vitrine de produtos | Título público, quantidade, seleção, ordenação e apresentação |
| Categorias da loja | Categorias selecionadas, imagens e ordem |
| Apresentação da loja | Texto e imagem em campos controlados |

Editor com adicionar, editar, duplicar, ativar/desativar, remover e reordenar módulos. Arrastar e soltar deve ter alternativa por botões e teclado. Nome interno separado do título público. Configurar visibilidade em desktop, celular ou ambos e pré-visualizar cada dispositivo.

## 4. Quantidade e seleção de produtos

**Quantidade total** é o máximo de produtos distintos carregados no módulo. **Produtos por linha** controla o layout por dispositivo; não altera a quantidade total. Exemplo ilustrativo: 12 produtos, quatro por linha no desktop e dois no celular.

- Permitir seleção manual com ordenação ou seleção automática por categoria/coleção da própria loja, com ordenação definida, como novidades ou mais vendidos.
- Mais vendidos requer período explícito de apuração, proposto em 30 dias; não usar ranking sem informar sua regra no editor.
- Proposta de formatos: grade ou carrossel. O carrossel respeita o total configurado; a quantidade visível simultaneamente varia com a largura.
- Campo numérico de quantidade validado como inteiro positivo no servidor, com limites globais definidos pela plataforma. Valores máximos ainda pendentes; não prometer quantidade ilimitada.
- Na loja de um seller, selecionar somente produtos dele. Na página global, administrador poderá compor vitrines com várias lojas.
- Exibir somente produtos publicados e aprovados. Proposta: excluir itens sem estoque comprável. Usar conteúdo editorial aprovado e preço/estoque atuais, sem expor revisões pendentes.
- Se forem pedidos 12 produtos e existirem sete elegíveis, exibir sete, sem duplicação nem espaços vazios. Seleção manual não deve incluir substitutos não escolhidos. Módulo sem produtos elegíveis fica oculto na página pública e recebe aviso no editor.
- Oferecer botão opcional “Ver todos” com destino coerente. Não prometer frete ou atendimento de região sem a validação logística já definida.

## 5. Mídia e publicação — proposta

Biblioteca de imagens isolada por loja, com prévia, identificação e reutilização. Validar formato, conteúdo, dimensão e tamanho no servidor. Limites de banners serão próprios e ainda precisam de definição; os 5 MB do chat não são automaticamente o limite de banners. Destinos devem ser rotas internas validadas, sem scripts ou URLs arbitrárias.

Salvar rascunho, pré-visualizar, publicar uma versão completa e restaurar versão anterior. A prévia não torna público um rascunho. Alterações de layout não revertem preços, estoque ou revisões de produtos.

A aprovação editorial já confirmada continua aplicada a produtos. Aprovação de banners e layouts é uma política separada e ainda pendente; o projeto deve suportar revisão sem apresentá-la como decisão confirmada.

Proposta para perda de elegibilidade: preservar rascunhos e versões, retirar o selo conforme decisão administrativa e aplicar página padrão caso o direito ao editor seja revogado. Definir tolerância e efeito sobre página já publicada antes de ativar essa rotina. Nunca apagar conteúdo ou afetar pedidos existentes automaticamente.

## 6. Permissões e dados propostos

Permissões de seller: `storefront.read`, `storefront.edit`, `storefront.publish`, `storefront.media.manage`, `store.credentials.submit`. Permissões globais: `store.credentials.review`, `store.classification.manage`, `storefront.policy.manage`, `marketplace.storefront.publish`. Publicar e editar são concessões distintas; a elegibilidade da loja também deve ser validada no servidor.

Entidades propostas: `StoreClassification`, `ClassificationApplication`, `PrivateCredentialDocument`, `StoreVolumeSnapshot`, `ClassificationPolicyVersion`, `StorefrontPage`, `StorefrontVersion`, `StorefrontModule`, `StoreMedia`. Guardar escopo da loja, autoria, revisão e auditoria. Selos públicos devem derivar de concessão válida; cache público não pode continuar mostrando selo revogado.

## 7. Critérios de aceite

1. Loja com volume suficiente, mas sem documentação de marca aprovada, não recebe Oficial.
2. Loja com documentos aprovados e volume insuficiente não recebe Oficial.
3. Um subpedido com várias unidades e notificações repetidas conta uma única vez.
4. Exatamente 200 pedidos em um dia não atende; 201 em um único dia atende ao volume, mesmo sem vendas nos dias anteriores. Oficial continua dependendo da documentação aprovada.
5. Seller não consegue atribuir selo nem editar a página de outra loja pela interface ou API.
6. Alterar ordem e quantidade de um módulo aparece na prévia; público só muda após publicação válida.
7. Quantidade total e itens por linha funcionam independentemente em desktop e celular.
8. Produto rejeitado, suspenso ou de outra loja não entra na vitrine do seller.
9. Falta de produtos elegíveis reduz a quantidade exibida sem duplicação; módulo vazio não deixa espaço público vazio.
10. Restauração de layout não restaura preço ou estoque antigos.
11. Documentação privada não aparece no banco de imagens público.
12. Funcionário com edição, mas sem publicação, não publica; revogação de acesso vale também na API.

## 8. Referência consultada

[WDNA — Personalizar / Vitrines](https://wdna.com.br/pagina/documentacao-da-admin?modulo=personalizar#vitrines), com conteúdo previamente extraído em [wdna-personalizar.txt](research/wdna-personalizar.txt). A nova tentativa de abrir o endereço pelo navegador de pesquisa em 03/10/2026 falhou; esta atualização usa a cópia textual disponível no projeto.

A referência descreve seções reordenáveis, galeria de modelos, seleção por dispositivo e imagens desktop/mobile, além de biblioteca de mídia. Quantidade de produtos, elegibilidade por selo, isolamento entre sellers e publicação versionada são requisitos/adaptações deste projeto, sem afirmar que a referência implementa essas regras.
