# Tem Logo Ali — regras e Administração

Versão 0.13 · 08/10/2026. Decisões confirmadas pelo proprietário nesta etapa.

## 1. Domínio e abrangência

O domínio **temlogoali.com.br foi comprado**, conforme informado pelo proprietário. A operação usa um domínio único, com regiões identificadas pelo CEP. Não haverá subdomínios por cidade. A compra do domínio não altera o resultado de uma análise de marca; a situação de registro no INPI permanece um assunto separado.

Inicialmente: Cianorte e região e Maringá e região. O administrador cadastra cidades/regiões e respectivas faixas de CEP. O seller informa o CEP físico de origem e sua faixa de atendimento para entregas. Faixas globais não podem ser invertidas nem sobrepostas.

**Retirada:** mostrar a loja quando o CEP físico dela e o CEP do comprador pertencerem à mesma cidade/região cadastrada. Não aplicar limite de quilômetros. A regra anterior de 15 km foi substituída. Entrega continua sujeita à cobertura e à distância máxima do seller.

As faixas 87200000–87299999 e 87000000–87199999 presentes no protótipo são fixtures de teste, não uma base oficial de CEPs. Devem ser substituídas por uma base validada antes de operar.

## 2. Estados e status dos pedidos

Estado representa a dimensão geral da operação; status é a etapa específica nela. **Pagamento confirmado e Em separação podem coexistir:** o primeiro é o estado financeiro; o segundo é o andamento operacional. Não devolver um pedido para “aguardando pagamento” ao avançar a separação.

| Dimensão | Estados/etapas | Comportamento |
|---|---|---|
| Pagamento | Pendente, confirmado, não aprovado | Independente da preparação. Estorno/chargeback serão integrados ao provedor. |
| Pedido | Aberto, em atendimento, concluído | Derivado do pagamento e dos subpedidos. Compra multiloja tem andamento próprio por seller. |
| Operação de entrega | Em separação, pronto para envio, saiu para entrega, entregue | Um avanço por vez, somente após pagamento confirmado. |
| Operação de retirada | Em separação, pronto para retirada, pedido retirado | Não passa por envio ou transporte. |
| Digital | Aguardando pagamento, produto entregue | Após confirmação, acesso ao arquivo comprado. |
| Intervenção | Livre ou em análise administrativa | Marcador separado; preserva o último status e bloqueia avanço enquanto em análise. |

### Linha do tempo apresentada ao comprador

- **Entrega:** Pedido realizado → Pagamento confirmado → Em separação → Pronto para envio → Saiu para entrega → Entregue.
- **Retirada:** Pedido realizado → Pagamento confirmado → Em separação → Pronto para retirada → Pedido retirado.
- **Digital:** Pedido realizado → Pagamento confirmado → Produto entregue.

Falha de pagamento permite nova tentativa. Confirmação repetida não gera nova transição nem duplica notificações. Alterações financeiras posteriores não podem ser simuladas como simples regressões no fluxo logístico.

Carrinho misto: o item digital é liberado após pagamento; os físicos continuam na entrega/retirada. A notificação digital identifica o item e não comunica que todo o pedido físico já foi entregue.

O administrador **intervém apenas quando necessário**, sem aprovação manual obrigatória de todas as compras. Pode colocar em análise, liberar e avançar etapas válidas, sempre com motivo e registro local de auditoria. O protótipo não oferece uma aprovação de pagamento administrativa que dispense a confirmação do provedor.

### Exceções que ainda precisam de política detalhada

Cancelamento antes/depois da separação, pagamento expirado, entrega frustrada, retirada não realizada, devolução, troca, reembolso parcial/total, chargeback e falha na disponibilização de arquivo. Devem ser fluxos separados, com responsáveis, prazos, efeitos no estoque e no split. Não são equivalentes a “Entregue”. Não há estorno real implementado nesta etapa.

## 3. Notificações por e-mail e WhatsApp

Cada etapa registrada gera dois registros na fila de saída, um para cada canal. Contêm ID próprio, pedido/subpedido, etapa, data, destinatário e conteúdo. O checkout coleta contatos demonstrativos; os modelos são editáveis na Administração e aceitam `{pedido}` e `{status}`.

O e-mail de produto digital inclui a identificação do item e a referência ao acesso autenticado de downloads. No protótipo o arquivo baixado continua sendo um exemplo TXT, sem conteúdo comercial. Para produção, a proposta é usar link protegido e temporário, em vez de anexar arquivos privados sem controle de acesso. O item comprado precisa ser disponibilizado de fato antes de registrar a entrega definitiva.

**Implementado:** geração e prévia dos eventos, modelos e fila persistida localmente; idempotência da confirmação; notificações digitais de pedidos mistos; eventos de análise administrativa.

**A integrar:** provedores de e-mail e WhatsApp, templates aprovados quando exigidos pelo provedor, preferências/autorizações aplicáveis, credenciais exclusivamente no servidor, worker de envio, tentativas com espera progressiva, IDs do provedor e callbacks de aceitação/entrega/falha. Falha de mensagem não deve regredir o pedido. A fila atual usa `awaiting_provider`; não é marcada falsamente como enviada.

## 4. Despacho e apresentação de estoque

O corte padrão é 15h, ajustável pelo seller para novos pedidos. O prazo é calculado a partir da confirmação do pagamento, considerando mesmo dia útil antes do corte e próximo dia útil no corte ou depois. Alterações de configuração não adiam compromissos já confirmados.

**O comprador não visualiza o horário de corte.** Vê a previsão e o andamento; somente seller e administração veem o parâmetro interno. Feriados locais/nacionais precisam de calendário de produção; o protótipo considera segunda a sexta-feira.

Estoque numérico permanece interno. O comprador vê disponibilidade, não o saldo. Quantidades compradas, quantidades dos componentes do kit e o seletor de quantidade continuam visíveis.

Opções de variação sem estoque/combinação ativa ficam translúcidas, com risco diagonal vermelho e desabilitadas. Não recebem a palavra “indisponível”. Um botão permite limpar escolhas para não prender o comprador em combinações incompatíveis. A validação do carrinho continua impedindo excesso, inclusive entre itens avulsos e kits que compartilham estoque.

## 5. Selos finais

### Loja Indicada

- Conquista: **100 ou mais pedidos realizados em um único dia**.
- Manutenção: **média diária de pelo menos 100 pedidos nos últimos 6 meses**, reavaliada semestralmente.
- Pedidos contam pela realização, independentemente de pagamento confirmado.
- Por loja: uma compra conta uma vez para aquele seller, não uma vez por item. Datas agrupadas no fuso America/Sao_Paulo; IDs repetidos não duplicam a contagem.
- A média inclui dias sem pedidos. No protótipo a janela contém os dias corridos entre o instante de avaliação e seis meses antes. A avaliação é manual na Administração; um agendador será necessário em produção.
- Não atingir a manutenção permite remover o selo administrativamente com motivo. O desenho do selo não é uma certificação de uma loja real.

### Loja Oficial

Exige apenas a aprovação de **Registro de Marca, cartão CNPJ e Contrato social**. Não exige volume mínimo de pedidos. Os três controles de aprovação são obrigatórios para conceder o selo pelo painel. Os documentos deverão ser recebidos e armazenados de forma privada na implementação de produção; o protótipo registra decisões, sem upload real de documentos.

“Validade” dizia respeito ao período de reavaliação da classificação. Não foi definida uma data de expiração automática dos documentos. Não aplicar a meta semestral da Indicada à Oficial. Revalidar a Oficial quando houver alteração/inconsistência documental conforme processo administrativo a detalhar.

### Arquivos visuais

- `prototype/assets/seals/loja-indicada.svg`: verde, identificação Loja Indicada.
- `prototype/assets/seals/loja-oficial.svg`: dourado, identificação Loja Oficial.

São desenhos vetoriais finais desta etapa, integrados em cards, produto, lojas e classificação. Os exemplos iniciais de concessão seguem fictícios. Semelhança com selo de outro sistema não implica vínculo ou garantia externa.

## 6. Administração do marketplace

Entrada separada: `painel.html#admin`. Continua sendo um protótipo local, sem autenticação/autorização no servidor.

| Área | Disponível no protótipo |
|---|---|
| Visão geral | Domínio comprado, lojas, pedidos e composição global |
| Sellers | Incluir empresa com CNPJ, editar cadastro, aprovar/suspender, selecionar loja para administrar |
| Aprovação de produtos | Inspecionar rascunho, aprovar/rejeitar com motivo, preservar dados comerciais sem restaurar snapshots antigos |
| Pedidos | Visão multiloja, histórico, avançar etapas válidas, colocar/liberar análise |
| Financeiro | Valores de produtos, frete, desconto, comissão e pagamento dos pedidos locais |
| Pagamentos | Seleção do provedor pretendido, habilitação de Pix/cartão; sem captura ou split real |
| Envio e retirada | CEP físico, cobertura, tarifa por km, máximo de entrega e corte por loja |
| Cupons | Código global, percentual, mínimo por loja, ativação/desativação |
| Frete grátis | Valor mínimo em produtos por loja, sem ampliar cobertura |
| Classificações | Métricas, conferência documental, concessão e revisão manual |
| Vitrines globais | Criar, ordenar e remover módulos; publicar automaticamente no navegador |
| Regras | Regiões/faixas de CEP, comissão uniforme, parâmetro global demonstrativo de transporte |
| E-mail e WhatsApp | Configuração nominal dos provedores, textos e prévia da fila |
| Auditoria | Autor, data, ação, escopo quando aplicável e motivo; histórico local |

Administrar a loja selecionada usa um contexto demonstrativo, registrado em auditoria. Produtos/rascunhos e pedidos são filtrados por essa loja. O seller pode alterar a logística própria. A equipe e suas permissões ainda são uma prévia, sem usuários reais. Isolamento de empresas e delegação de acessos precisam ser aplicados no backend, não apenas na interface.

## 7. Vitrines, banners e aparência

Módulos suportados: vitrine de produtos, banner horizontal e mosaico. Cada módulo define título, ordem, quantidade e seleção de IDs de produtos. Banner aceita imagem HTTPS e destino interno; mosaico usa as imagens dos produtos escolhidos. Sem imagem própria usa-se a imagem do catálogo. A quantidade é limitada ao catálogo disponível. Seletores de produto visual e upload de assets podem substituir o campo de IDs na evolução da interface.

Vitrines mostram cinco colunas no desktop, com carrossel. A home usa a composição demonstrativa até publicar módulos próprios; ao publicar, a composição personalizada passa a organizar essa área. Lojas Indicadas e Oficiais podem configurar seus módulos próprios. Lojas comuns não recebem o editor de aparência.

Não há edição de HTML, CSS ou JavaScript pelo seller. Imagens HTTPS configuradas depois da geração do standalone precisam de internet; as imagens iniciais do catálogo são incorporadas para uso offline.

## 8. Regras comerciais aplicadas e hipóteses explícitas

Comissão uniforme somente sobre produtos; percentual definitivo ainda pendente. Zero no protótipo significa configuração inicial ainda não definida. Frete pertence ao seller, não integra a base da comissão.

O checkout aceita cupom configurado e calcula benefícios por loja. Nesta etapa, cupom percentual e frete grátis são regras globais **custeadas pelo seller**, hipótese demonstrativa que deve ser validada comercialmente. Comissão é calculada sobre produtos após desconto. Ainda faltam validade por data, limites por comprador, usos totais, categorias/lojas elegíveis, combinação entre campanhas e custeio pelo marketplace.

Distância por ruas e frete proporcional são regras confirmadas. O parâmetro inicial de 5 minutos/km para a prévia de transporte é **apenas demonstrativo**, editável pelo administrador, não um prazo contratado. A consulta de rota é simulada; integração geográfica e fórmula final permanecem pendentes.

## 9. Entrega técnica e limites

- Código-fonte na pasta `prototype`; documentação na pasta `docs`.
- Versão offline em `entrega/Marketplace-Local/standalone`; ZIP atualizado em `entrega/Marketplace-Local-standalone.zip`.
- `ABRIR-MARKETPLACE.html` abre a versão standalone. Para compartilhar configurações consistentemente entre comprador e painel, iniciar `node server.mjs` e abrir `http://localhost:4173/`.
- Pedidos, configurações, rascunhos e auditoria ficam no armazenamento do navegador. Arquivos `file://` podem ter comportamento diferente de compartilhamento de armazenamento no Chrome. Não é uma base de produção ou backup seguro.
- Não há pagamento real, disparo real de mensagens, consulta oficial de CEP, rotas reais, upload seguro, armazenamento comercial de arquivos digitais ou publicação real de produto aprovado. A aprovação editorial registra o resultado localmente.
- Testes automatizados cobrem os modelos e a composição textual das telas. A revisão visual automatizada desta etapa foi bloqueada pela inicialização do ambiente Windows; não foi apresentada como concluída.

Próxima etapa de implementação de produção: backend, autenticação/permissões, banco de dados, publicação de catálogo, armazenamento privado e workers de notificações; depois conectar pagamentos/split e rotas. Provedores e credenciais ainda precisam ser definidos.
