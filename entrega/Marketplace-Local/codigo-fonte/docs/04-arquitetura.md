# Arquitetura e qualidade

Proposta técnica inicial. Não há stack ou infraestrutura contratada. Escolhas de bibliotecas e serviços serão verificadas na documentação oficial quando selecionadas.

## 1. Estrutura proposta

Começar com uma aplicação modular: interface pública, painel seller e painel global compartilham serviços de negócio com autorização no servidor. Banco relacional mantém operações comerciais; armazenamento de objetos guarda mídias e documentos; fila processa notificações, arquivos e integrações. Separar ambientes de desenvolvimento, homologação e produção.

Isso permite construir por etapas sem introduzir serviços distribuídos desnecessariamente no início. A divisão lógica em identidade, sellers, catálogo, estoque, checkout, pedidos, pagamento, logística, financeiro e comunicação deve existir desde a primeira implementação.

O mecanismo de persistência precisa suportar transações e concorrência. Buscador dedicado, cache e múltiplas instâncias serão adicionados conforme volume e medições; não são garantias implícitas de escala. Camada de autorização é obrigatória mesmo se o banco tiver isolamento adicional por linha.

## 2. Modelo conceitual

| Entidades | Dados e vínculos principais |
|---|---|
| User, Session, IdentityVerification | Identidade, autenticação, verificação e revogação |
| Seller, Store, SellerApplication | Empresa, vitrine, aprovação e status |
| Membership, Role, Permission, Invitation | Vínculos e concessões no contexto global ou seller |
| Region, ServiceArea, DeliveryRate, DispatchPolicy, PickupHours | Região, cobertura, tarifas, corte de despacho e horário de retirada; nenhum fecha compras |
| CustomerProfile, Address, Consent | Dados de compra, endereços e preferências |
| Category, AttributeDefinition, Brand | Organização e atributos do catálogo |
| Product, Variant, ProductCategory, Media | Oferta do seller, unidades vendáveis e conteúdo |
| ProductRevision, ProductReview | Versão enviada, decisão, motivo e responsável pela aprovação |
| CatalogIdentity, OfferIdentityLink, PriceChangeEvent, PriceComparisonSnapshot | Equivalência entre ofertas, histórico e referência pública de preços |
| InventoryLocation, InventoryBalance, Reservation, StockMovement | Saldo, compromisso e histórico por origem |
| Price, PriceList, Promotion, Coupon, CouponRedemption | Regras e uso de preços/descontos |
| Cart, CartItem, CheckoutQuote | Seleções e cotação temporária validada |
| Order, SellerOrder, OrderItem, OrderStatusEvent | Compra, partes por seller e histórico congelado |
| Fulfillment, DeliveryOption, DeliveryEvent | Origem, modalidade, prazo e acompanhamento |
| DispatchDeadline, DispatchEvent | Data limite, política congelada, corte e comprovação de saída/coleta |
| DeliveryTimePolicy, DeliveryEstimate | Regra global única por vigência, parâmetros de tempo por distância, promessa original e previsão atualizada por subpedido |
| BusinessCalendar, Holiday | Dias úteis e feriados aplicáveis à origem, com versão e administração global |
| PaymentAttempt, PaymentAllocation, ProviderEvent | Cobranças, distribuição e eventos externos |
| Refund, ReturnRequest, Dispute | Pós-venda financeiro e físico |
| CommissionRule, LedgerEntry, Settlement, SettlementItem | Regra versionada, lançamentos e acertos |
| FiscalDocument | Documento, emissor, vínculo e situação |
| Review, SupportCase | Reputação e atendimento com escopo definido |
| Conversation, ConversationParticipant, Message, MessageRead, MessageAttachment | Chat pós-compra por subpedido, participantes, histórico e imagens privadas |
| ContentPage, Banner, ShowcaseSection | Conteúdo controlado sem código livre |
| IntegrationConnection, ImportJob, ExportJob, Notification | Credenciais protegidas e tarefas rastreáveis |
| AuditEvent | Autor, contexto, ação, recurso, motivo e data |

Carrinho multiloja é requisito confirmado do lançamento: um Order agrega os SellerOrders das empresas participantes. Uma compra de uma única loja usa a mesma estrutura. Cada seller tem uma única loja no início, com unicidade garantida no cadastro. Filiais ficam fora do lançamento; múltiplos CDs e tabelas adicionais continuam condicionais.

### Invariantes de dados

- SKU único por seller; variação e estoque pertencem à mesma empresa.
- Toda referência de item/subpedido deve impedir vínculos comerciais indevidos entre sellers.
- Quantidades de estoque finito não ficam negativas por venda concorrente.
- Endereço, preço, identificação comercial e condições de comissão têm snapshots no pedido.
- Dados financeiros usam valor exato e moeda explícita. Lançamentos corrigidos recebem reversão, não sobrescrita.
- ID de evento do provedor é único no contexto de sua conexão; chave idempotente identifica a tentativa de operação.
- Somatório de itens, fretes, descontos e alocações corresponde ao total capturado e aos reembolsos.
- Frete integra o total capturado e a parcela do seller, com registro separado; comissão nunca incide sobre frete.
- Percentual de comissão é global e versionado por vigência; taxa de pagamento é atribuída por subpedido sem duplicar custo comum da cobrança.
- Distâncias de trajetos pelas ruas são normalizadas em metros, com modo de rota, tarifa por km e versão da cotação; conversão para km não perde precisão antes do cálculo.
- Produtos precisam de versão aprovada para publicação; seller não pode autoaprovar, inclusive por importação ou API.
- Título, descrição, atributos, especificações e imagens exigem revisão; aprovação não sobrescreve preço ou estoque, mantidos separadamente.
- Comparação de preços só usa ofertas públicas equivalentes de outros sellers; valor em edição não é divulgado antes da publicação.
- Participantes e mensagens de chat respeitam o contexto do seller; vínculo com um pedido principal não concede acesso às outras lojas.
- Chat exige compra do subpedido correspondente, com pagamento confirmado como gatilho proposto; imagens têm limite de 5.000.000 bytes e acesso privado.
- Checkout funciona 24 horas; corte de despacho só calcula data limite, sem bloquear venda ou estender prazo de pedido existente.
- Corte padrão 15h, ajustável por seller; confirmação do pagamento inicia o prazo. Eventos repetidos não reiniciam contagem; calendário aplicável determina o próximo dia útil.
- Prazo de transporte usa distância da mesma rota cotada para frete e parâmetros temporais próprios; preço por km não representa duração. Guardar promessa original separada de previsões atualizadas.
- Parâmetros de tempo são globais e só podem ser alterados pela administração autorizada; configuração do seller não os sobrescreve. Existe apenas uma política global vigente por instante.
- Comparação de preços abrange ofertas equivalentes públicas em todo o marketplace, sem limitar à cidade da loja que edita.
- Excluir/arquivar catálogo não elimina registros de pedidos.
- Datas internas com referência temporal inequívoca; apresentação usa o fuso configurado da operação.

## 3. Contratos de serviço/API propostos

| Domínio | Operações |
|---|---|
| Identidade | Entrar, sair, recuperar acesso, verificar contato, revogar sessões |
| Empresas | Solicitar adesão, analisar, ativar, suspender, consultar perfil |
| Equipe | Convidar, aceitar, conceder/revogar papel, listar permissões efetivas |
| Catálogo | Pesquisar, cadastrar, revisar, publicar, arquivar, importar |
| Estoque | Consultar, reservar, confirmar, liberar, ajustar com motivo |
| Checkout | Cotar, validar, fechar com chave idempotente |
| Pedidos | Consultar, aceitar, preparar, despachar, confirmar retirada, solicitar cancelamento |
| Pagamento | Criar tentativa, receber evento verificado, reconciliar, reembolsar |
| Financeiro | Consultar extrato, calcular elegibilidade, gerar/confirmar acerto |
| Conteúdo | Editar campos permitidos, visualizar, publicar versão |
| Moderação de produtos | Enviar revisão, aprovar, rejeitar com motivo, suspender publicação |
| Preços comparáveis | Resolver equivalência, consultar referências públicas e retornar avisos ao atualizar |
| Chat | Validar compra, abrir conversa, enviar texto/imagem validada, carregar histórico, marcar leitura e denunciar |

Paginação, filtros limitados, validação, erros consistentes e autorização por recurso são comuns a todos os contratos. API externa para parceiros virá depois, com escopos, rotação e revogação de credenciais.

## 4. Segurança e privacidade como requisitos de engenharia

Senhas protegidas por algoritmo adequado e atual; cookies/sessões protegidos; proteção contra ataques comuns de navegador; limite de tentativas; autenticação reforçada para administração e ações financeiras. O mecanismo específico será escolhido e verificado na implementação.

Upload valida tipo real, tamanho e extensão, rejeita conteúdo executável e separa objetos públicos de privados. Texto rico é sanitizado. Integrações permitidas são implementadas por conectores: nenhum campo aceita script arbitrário. Credenciais não são retornadas em logs, exportações ou API comum.

Registrar finalidade e acesso aos dados. Coletar somente campos necessários; gênero, nascimento e documentos extras não são obrigatórios por herança da referência. Política de retenção/anonymização, tratamento de solicitações do titular e preservação de registros comerciais será definida e validada antes da operação real.

## 5. Operação e desempenho

- HTTPS e domínio configurado; mídia otimizada e possibilidade de CDN.
- Backups automatizados com teste real de restauração, migrações versionadas e procedimento de recuperação.
- Métricas, logs e alertas para erros, pagamentos sem conciliação, reservas expiradas, reembolsos pendentes e falhas em filas.
- Tarefas com repetição controlada, limite de tentativas, fila de falhas e reprocessamento auditado.
- Homologação usa pagamentos de teste e destinatários controlados; não replica dados pessoais reais sem necessidade e proteção.
- Publicação com verificação de saúde e procedimento de reversão compatível com migrações de dados.
- Separar orçamento de infraestrutura de custo de provedor de pagamento, mensagens, mapas e integrações.

Metas de latência, quantidade de sellers/SKUs, usuários simultâneos, disponibilidade, recuperação e retenção estão pendentes. Serão definidas com volume e orçamento, testadas antes de declarar capacidade.

## 6. Critérios de aceite do primeiro lançamento

| Cenário | Evidência necessária |
|---|---|
| Compra completa com Pix/cartão escolhido | Reserva, confirmação real em homologação, subpedido, entrega e demonstrativo |
| Duas compras disputam a última unidade | Apenas uma consegue comprometê-la |
| Duplo clique/reenvio de fechamento | Mesmo resultado lógico, sem cobrança duplicada |
| Webhook repetido ou fora de ordem | Histórico consistente, sem duplicar efeitos |
| Pagamento aprovado após reserva expirar | Tratamento explícito de disponibilidade/reembolso |
| Seller acessa dado de concorrente por ID | Nenhum dado exposto ou alterado |
| Usuário de nível igual recebe acesso | Mesmo seller e apenas permissões delegáveis |
| Revogação com sessão e exportação pendentes | Acesso bloqueado e arquivo não entregue indevidamente |
| Cancelamento parcial e taxa rateada | Demais lojas preservadas, centavos conciliados |
| Reembolso falha no provedor | Pendência visível; não consta como devolvido |
| Retirada e entrega fora de cobertura | Opções corretas; fechamento inválido bloqueado |
| Distância fracionária e limite de cobertura | Preço por km calculado sem arredondamento prévio; fora do limite impede entrega |
| Mesmo pedido com alteração apenas do frete | Comissão sobre produtos permanece igual |
| Produto aguardando aprovação via página, API ou importação | Não pode ser publicado ou comprado |
| Aprovação de texto após mudança de preço/estoque | Publica apenas conteúdo aprovado; mantém valores e saldo atuais |
| Preço maior/menor/igual em produtos equivalentes | Aviso correto e salvamento imediato; variantes distintas excluídas |
| Concorrente com preço em rascunho | Nenhum valor não publicado exposto |
| Compra antes/no/depois do corte e à noite | Checkout aberto; prazo conforme política versionada e calendário definido |
| Alteração posterior do horário de corte | Não altera prazo do pedido anterior |
| Sexta após corte, fim de semana e feriado aplicável | Próximo dia útil correto por calendário da origem |
| Webhook de pagamento atrasado/repetido | Usa confirmação original, sem renovar prazo; atraso de evento fica rastreável |
| Produtos equivalentes de Cianorte e Maringá | Entram na mesma comparação global de preços |
| Entrega em distâncias diferentes | Tempo calculado pela política configurada e combinado com despacho por loja |
| Atraso no despacho e recálculo de chegada | Previsão atualiza sem apagar compromisso original ou atraso |
| Retirada em loja | Sem tempo de transporte; disponibilidade de retirada separada |
| Sellers com mesma distância e mesma condição de despacho | Mesma regra de tempo; tarifas diferentes não mudam duração |
| Seller tenta alterar parâmetros globais de entrega por API | Rejeitado no servidor |
| Seller tenta cadastrar segunda loja | Bloqueio coerente com limite inicial |
| Funcionário sem permissão tenta abrir chat por ID | Histórico e eventos em tempo real inacessíveis |
| Cliente sem compra tenta abrir chat/anexo | Acesso rejeitado no servidor |
| Imagem de chat excede 5 MB ou não é imagem válida | Upload recusado, inclusive por acesso direto à API |
| Reenvio de mensagem após queda de conexão | Uma mensagem persistida; acesso revalidado |
| Seller suspenso com pedidos em andamento | Sem novas vendas, pós-venda continua controlado |
| Conteúdo tenta inserir script | Rejeitado ou sanitizado, sem execução |
| Backup restaurado | Dados recuperados e procedimento documentado |
| Celular, teclado e leitor de tela | Fluxo essencial utilizável e sem erros impeditivos |

Testar obrigatoriamente compra em duas lojas, split com parcela do marketplace, falha em um recebedor, entregas diferentes e reembolso parcial antes de liberar produção. Critérios são cenários de validação futura, não testes já executados.

## Extensão — classificações e páginas modulares

Incorporar entidades, permissões e critérios de aceite de [Lojas e vitrines](09-lojas-e-vitrines.md). Volume confirmado: mais de 200 pedidos em um único dia. Proposta técnica usa subpedidos por loja, com deduplicação e política versionada. Versões de layout referenciam produtos sem congelar seu preço/estoque. Validar módulos e escopo no servidor; mídias públicas e documentos privados têm armazenamento e autorização separados. Políticas de concessão/publicação e status contados ainda precisam de definição.

## Extensão — tipos, composição e entrega digital

Incorporar o modelo de [tipos de produto](11-tipos-de-produto.md): ProductVariant, KitComponent, snapshots de escolhas, reservas agregadas por SKU, DigitalAssetVersion e DownloadEntitlement. Recalcular no servidor preços/composição/estoque. Arquivos comerciais privados não podem integrar o frontend público. A lógica disponível hoje é de protótipo e não substitui transações atômicas, armazenamento privado ou autorização no backend.

