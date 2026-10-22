> **Atualização vigente — 08/10/2026:** consulte [Regras, pedidos e Administração](13-regras-pedidos-administracao.md). Retirada por CEP da cidade sem limite de km; Indicada com 100 pedidos/dia e revisão semestral; Oficial somente por documentos. Regras antigas conflitantes abaixo são histórico.

# Regras de operação comercial

As decisões comerciais confirmadas estão identificadas abaixo. Os demais detalhes são propostas de implementação; pendências estão em [decisões](06-decisoes-e-roadmap.md).

## 1. Adesão do seller

Confirmado: cadastro aberto a empresas, sempre com CNPJ, com aprovação dos primeiros sellers pelo marketplace. Fluxo proposto: cadastro da empresa → validação de contatos e informações comerciais → análise pelo marketplace → aceite das condições e comissão → configuração de recebimento e entrega → catálogo → liberação para vender. A política de aprovação após o piloto será decidida posteriormente.

Estados: solicitado, em análise, pendente de informação, aprovado, ativo, suspenso e encerrado. Suspensão de vendas não apaga obrigações existentes. Se houver provedor de pagamento com cadastro de recebedores, sua aprovação é uma condição separada da aprovação comercial do marketplace.

## 2. Carrinho e checkout

**Confirmado:** cliente compra de várias lojas ao mesmo tempo. Carrinho multiloja é requisito do lançamento, com seller identificado em cada item. Para o split, priorizar um pagamento com múltiplos recebedores, sujeito à habilitação e homologação do provedor; eventual proposta de cobranças separadas precisará de nova decisão de produto.

No modelo multiloja:

1. Cliente seleciona endereço ou retirada.
2. Sistema revalida sellers ativos, produtos, variações, preços, disponibilidade, cobertura e condições de cupom; calcula promessa de despacho conforme corte. Horário não fecha o checkout.
3. Agrupa itens por seller e origem de entrega; mostra separadamente subtotal, desconto, entrega, prazo e total de cada loja.
4. Cliente escolhe uma modalidade válida por grupo e vê produtos e frete discriminados por loja. O mesmo checkout cobra a soma dos produtos e dos fretes; cada frete pertence ao respectivo seller e não gera comissão.
5. Servidor gera pedido principal e subpedidos com valores congelados, sob uma operação de reserva consistente.
6. Sistema inicia pagamento conforme o modelo do provedor selecionado.
7. Confirmação ocorre por evento verificado do provedor e conciliação; a tela de retorno do navegador não confirma pagamento.

Ao mudar endereço, quantidade, cupom ou modalidade, recalcular a cotação inteira. Se uma loja não puder atender, apresentar quais itens impedem a compra e permitir removê-los; não removê-los silenciosamente.

Itens, taxas, endereço, identificação da loja e comissão são registrados como estavam na compra. Mudanças posteriores no cadastro não reescrevem esse histórico.

## 3. Estoque e concorrência

Unidade de controle: variação vendável e local de estoque. Quantidade vendável = saldo físico menos reservas válidas e bloqueios operacionais.

- Consultar carrinho não reserva estoque indefinidamente.
- Ao iniciar fechamento, reservar atomicamente por prazo configurável compatível com o pagamento. Registrar referência da reserva, pedido, variação, origem, quantidade e vencimento.
- Reservas dos itens de uma compra precisam ter resultado consistente: se uma falhar, liberar as demais e informar o problema antes de cobrar.
- Pagamento aprovado converte a reserva em compromisso confirmado. Despacho/retirada executa a saída física no evento definido, uma única vez.
- Expiração ou cancelamento antes de despacho libera reserva/compromisso sem duplicidade.
- Devolução só retorna ao estoque após recebimento e avaliação; reembolso financeiro sozinho não aumenta saldo físico.
- Ajuste de inventário exige motivo e histórico. Reduzir saldo abaixo dos compromissos existentes gera bloqueio e tratamento explícito.
- Última unidade concorrida só pode ser comprometida por uma compra.
- Pagamento recebido após vencimento tenta recompor disponibilidade. Se não conseguir, abre exceção e reembolso/solução acordada; não promete produto ausente.

Estoque ilimitado e terceiros são condicionais; não habilitar por padrão. Kits reservam todos os componentes da própria loja, sem dupla baixa.

## 4. Estados separados

| Dimensão | Estados propostos |
|---|---|
| Pagamento | Criado, aguardando, aprovado, recusado, expirado, reembolso pendente, parcialmente reembolsado, reembolsado, contestado |
| Subpedido | Aguardando pagamento, recebido, em preparação, pronto, despachado, entregue/retirado, cancelado |
| Entrega | Aguardando preparo, pronta, coletada, em rota, concluída, tentativa sem sucesso, devolvida |
| Pós-venda | Solicitação aberta, em análise, autorizada, aguardando retorno, recebida, concluída, negada com motivo |
| Repasse | Não elegível, em retenção, disponível, programado, em processamento, realizado, falhou, revertido |

Solicitação de cancelamento não é cancelamento efetivo; reembolso solicitado não é reembolso confirmado. Contestação pode surgir depois da entrega.

O status do pedido principal é calculado a partir dos subpedidos e pagamentos. Deve mostrar conclusão/cancelamento parcial e detalhar cada loja. Seller nunca altera status das outras lojas. Substatus operacionais customizáveis não podem contornar pagamento, estoque ou financeiro.

Venda com pagamento na entrega/retirada, se adotada, permite preparação sem pagamento online, em fluxo explicitamente diferente e com limite de risco definido.

## 5. Entregas e retirada

**Confirmado para a primeira etapa:** entrega por cada seller e retirada em loja, atendendo Cianorte e região e Maringá e região. Proposta: cada empresa configura cobertura dentro dos municípios autorizados pelo marketplace. A lista de municípios vizinhos, tarifas e prazos ainda será definida. Logística central não integra esta etapa.

**Confirmado:** cada loja define a distância máxima atendida em metros/quilômetros e seu preço por quilômetro. A distância usada é a do trajeto pelas ruas entre a loja e o endereço de entrega.

**Cálculo proporcional confirmado:** `frete = arredondar_para_centavos((distância_do_trajeto_em_metros / 1000) × preço_por_km)`, sem arredondar previamente os quilômetros. Exemplo ilustrativo: 3,4 km a R$ 2/km resulta em R$ 6,80. Cobertura validada com a distância original, antes de arredondar a exibição. Tarifa mínima, taxa de saída ou cobrança por quilômetro inteiro não foram solicitadas.

Guardar origem, destino, distância, tarifa, versão e validade da cotação. Mudança de endereço ou expiração exige recotação antes da confirmação; alterações de tarifa não reescrevem pedidos pagos. Roteamento deve usar modo de transporte e critério de rota explícitos, ainda a definir. Endereço ambíguo, ausência de rota ou falha do serviço não deve virar frete grátis nem substituir automaticamente o trajeto por linha reta: informar impossibilidade temporária de cotar e permitir nova tentativa ou retirada. O provedor de mapas/rotas será escolhido posteriormente.

**Frete confirmado:** pago junto dos produtos no mesmo checkout, discriminado por loja e destinado ao seller. Comissão incide apenas sobre produtos. Retirada continua disponível independentemente da distância de entrega, conforme horários da loja; proposta: retirada sem frete. Cada seller tem uma única loja no lançamento.

Entrega multiloja não implica um único entregador ou prazo. Cada origem apresenta custo e previsão; agregação no resumo não esconde a separação operacional.

Retirada informa unidade, horário e quando o pedido está pronto. Proposta de confirmação por código de uso único ou validação registrada pelo funcionário. Falha de entrega registra tentativa, motivo e próxima ação. Endereço de pedido pago não pode ser alterado livremente sem recotação e revisão operacional.

Entregas agendadas exigem janelas, capacidade, antecedência e indisponibilidades. Se adotadas, entram no escopo antes da primeira venda desse segmento.

### Venda contínua e prazo de despacho

**Confirmado:** marketplace vende 24 horas, como e-commerce. Horário de corte não impede compras. O prazo de despacho começa na confirmação do pagamento e usa dias úteis. Corte padrão às 15h, ajustável pelo seller na Central de Vendedores. O seller deve cumprir a data de despacho comprometida; alterar o corte não permite adiar pedidos existentes. Isso é prazo de despacho, não promessa de entrega no mesmo dia.

Regra de prazo: pagamento confirmado em dia útil antes do corte → despachar naquele dia; após o corte → próximo dia útil. Proposta para a fronteira exata: confirmação às 15h00 já usa o próximo dia útil no corte padrão. Pagamento em dia não útil usa o próximo dia útil, independentemente do horário. Usar fuso America/Sao_Paulo e registrar horário confirmado pelo provedor, recebimento do evento, corte vigente, versão da política e data limite por subpedido. Reenvio ou atraso do webhook não reinicia a contagem.

Definição técnica proposta de calendário: segunda a sexta, excluindo feriados nacionais, estaduais e municipais da origem do seller. Manter calendário administrado pelo marketplace, com dados verificáveis antes do lançamento; seller não pode inventar feriados ou dias bloqueados para postergar obrigações. Não presumir a entrega/retirada física disponível 24 horas só porque o checkout funciona continuamente.

Exemplos com corte padrão e sem feriados: terça 14h59 → terça; terça 15h00 → quarta; sexta após 15h → segunda; sábado → segunda. Se segunda for feriado aplicável à origem, o despacho passa para terça. Antecipar o despacho é permitido.

Ao ajustar o corte, mostrar prévia do efeito na data de despacho de novas compras, registrar autor e vigência, e recalcular cotações ainda não confirmadas. Proposta: alterações valem prospectivamente; uma cotação com promessa apresentada tem versão e validade e não pode ser piorada silenciosamente. Pedidos pagos preservam compromisso congelado. Novo corte pode antecipar ou postergar a passagem de novas compras ao próximo dia útil, sem alterar prazos já assumidos. Limites administrativos para os valores de corte ainda podem ser definidos, sem presumir restrição às 15h.

Não depender de um aceite manual para começar a contar o prazo. Proposta: pedido pago entra automaticamente na fila do seller; início de preparação é evento operacional. Pagamento confirmado tardiamente e indisponibilidade do seller geram tratamento explícito, nunca ocultação de atraso.

Exibir ao seller fila com data de despacho e alertas de aproximação/atraso. Proposta: registrar despacho por evento de saída/coleta, com responsável e evidência disponível; imprimir etiqueta não comprova despacho. Cancelamento ou penalidade por atraso não será automático sem regra definida. Horário de retirada física e disponibilidade de atendimento são assuntos distintos da compra 24 horas e permanecem a detalhar.

### Prazo de entrega por distância

**Confirmado:** calcular o prazo de transporte conforme a distância da entrega, usando o trajeto pelas ruas de cada loja ao endereço do cliente. A regra é única para toda a plataforma, administrada pelo marketplace; seller não altera os parâmetros de tempo. O prazo total considera preparação/despacho e transporte, com previsão independente para cada subpedido. Regra única não significa prazo idêntico para distâncias ou despachos diferentes.

Proposta de regra parametrizada: `tempo de transporte = função(distância do trajeto, parâmetros globais de tempo aprovados)`. Uma opção inicial é tempo base mais minutos por quilômetro; os valores, margens e limites não estão definidos. Tarifa em R$/km, definida pelo seller, calcula preço do frete e não determina o tempo em minutos/km. Distância para cobrança e para prazo deve vir da mesma cotação de rota.

Manter uma versão global vigente por instante. Alteração requer permissão administrativa específica, prévia de resultados para distâncias de exemplo, registro do responsável e data de vigência. Sellers consultam a regra e a previsão aplicada a seus pedidos, sem exceções individuais de tempo. O corte ajustável continua sendo configuração de despacho, sem sobrescrever a regra global de transporte.

Antes da compra, apresentar uma janela de entrega por loja que combine a janela prevista de despacho com o tempo de transporte. A regra atual define o dia de despacho, não uma hora exata: não inventar horário de chegada enquanto não houver janela operacional definida. Após saída/coleta real, atualizar a previsão de chegada com o instante efetivo, preservando a promessa original para identificar atrasos. Atualização de previsão não apaga descumprimento.

Guardar distância, parâmetros/versão do cálculo, janela de despacho, previsão original e previsões atualizadas. Alterações de parâmetros valem para novas cotações; não ampliam silenciosamente prazos de pedidos confirmados. Sem rota válida, não prometer um prazo calculado. Retirada não recebe tempo de transporte; informar disponibilidade para retirada separadamente. Horários de entrega e passagem para dias não úteis precisam ser definidos antes da operação real.

## 6. Pagamentos, comissão e repasses

Pix e cartão de crédito são requisitos da futura seleção. O proprietário adiou a escolha do provedor; condições, parcelamento, boleto e pagamento presencial permanecem pendentes. A homologação futura deve verificar cadastro de recebedores, distribuição entre sellers, estornos parciais, webhooks, contestação, taxas e ambiente de testes.

**Confirmado:** distribuição por split entre marketplace e sellers. A receita será apenas comissão sobre produtos, com o mesmo percentual para todos os sellers; frete não gera comissão. Taxa de pagamento descontada do seller por pedido. Percentual da comissão, valores das taxas, tratamento dos descontos e prazo de disponibilidade seguem pendentes. O demonstrativo separará comissão e custo de pagamento para evitar dupla cobrança, mesmo se futuramente forem apresentados como um desconto total ao seller.

Mercado Pago, Pagar.me e Asaas constam no [comparativo inicial de split](07-pagamentos-split.md), preservado para retomada posterior. Nenhum foi selecionado ou contratado. A implementação pode avançar com um contrato de integração e simulação em homologação; venda real depende do provedor escolhido e homologado.

A arquitetura deve modelar tentativas e alocações de pagamento. Não supor que um split suporta qualquer quantidade de sellers nem que uma única cobrança será permitida pelo fornecedor.

### Fórmulas comerciais propostas

Para cada subpedido:

`produtos líquidos = soma dos itens - descontos atribuídos aos itens`

`total cobrado no checkout = soma dos produtos líquidos de todos os sellers + soma dos fretes selecionados`

`base comissão = valor dos produtos conforme tratamento de descontos a definir; excluir frete`

`comissão = base comissão × percentual global vigente na compra`

`valor devido ao seller = parcelas pertencentes ao seller - comissão - taxas atribuídas ao seller - reembolsos/contestações atribuídos + ajustes/subsídios devidos ao seller`

O frete integra o valor capturado e a parcela comercial do seller, sem comissão. Isso não significa isenção de taxa do provedor: o custo de processamento do pedido, incluindo eventual incidência sobre frete, será descontado do seller conforme a contratação futura. O tratamento de descontos financiados pelo marketplace precisa preservar o acordo do seller. Guardar a versão da regra e o responsável por cada custo em cada venda.

No carrinho multiloja, o desconto de taxa deve ser atribuído ao subpedido de cada seller. Usar a atribuição real do provedor quando disponível; eventual rateio de custo comum da cobrança precisa de regra aprovada, reconciliada em centavos. Não multiplicar uma tarifa fixa de uma única cobrança pelo número de sellers sem base contratual. Alterações no percentual global valem para novas compras e não reescrevem pedidos anteriores.

### Exemplo ilustrativo, não aprovado

Produtos de R$ 100, frete de R$ 8, sem desconto, comissão hipotética de 10% sobre produtos e taxa hipotética de pagamento de R$ 3 sobre a operação: cliente paga R$ 108, seller recebe R$ 95, marketplace R$ 10 e provedor R$ 3. O frete aumenta a parcela do seller, sem aumentar a comissão. Números apenas ilustrativos; não são percentual aprovado ou tarifa contratada.

Valores monetários usam centavos/decimal exato. Descontos globais e taxas são rateados com regra determinística de arredondamento, de modo que as partes sempre somem o total.

### Controles obrigatórios

- Livro financeiro imutável com lançamentos e reversões vinculados à operação de origem.
- Separar venda, pagamento recebido, disponibilidade no provedor, valor devido, repasse solicitado e repasse confirmado.
- Reprocessar webhook não duplica estoque, confirmação, comissão, reembolso nem repasse.
- Validar assinatura/autenticidade de eventos, manter identificadores e tratar eventos fora de ordem.
- Reconciliar operações com o provedor, registrar diferenças e permitir reprocessamento controlado.
- Seller visualiza demonstrativo por pedido e período; marketplace visualiza pendências e valores consolidados.
- Dados bancários alterados exigem autenticação reforçada, registro e notificação. Regra de validação/retensão será definida.
- Não guardar dados completos de cartão; usar componentes/tokenização do provedor.

Carteira de crédito do cliente não é saldo a repassar ao seller. Se adotada, precisa de regras próprias de validade, financiamento, uso e reversão. Não substituir automaticamente reembolso por crédito.

## 7. Cancelamentos, devoluções e disputas

Cliente solicita por loja/item. Seller responde dentro do prazo operacional a definir; marketplace trata divergências. Registrar motivo, evidências, responsável, quantidades, valores, prazos e decisão.

Pedido multiloja permite cancelar somente uma parte, recalculando o rateio quando aplicável e preservando as demais compras. Estorno nunca ultrapassa o valor capturado menos valores já devolvidos, considerando operações pendentes. Falha de reembolso gera pendência visível e nova tentativa controlada.

Não apagar pedidos pagos. Arquivar mantém histórico comercial. Documentos fiscais e correções seguem fluxo do emissor escolhido, sem editar silenciosamente documento emitido.

Políticas de consumidor, privacidade, responsabilidade fiscal e intermediação precisam de validação específica antes do lançamento. Este documento define comportamentos de produto, não conclui enquadramentos jurídicos ou tributários.

## 8. Promoções, comunicação e reputação

Cupom pertence ao marketplace ou seller e tem validade, elegibilidade, limite total/por cliente, mínimo e limite de desconto. Seller só promove os próprios itens. Contador de uso deve resistir a concorrência; tentativa expirada libera uso reservado conforme política. Definir acumulação e efeito de reembolso na elegibilidade.

Promoções com quantidade e kits devem comunicar composição e desconto antes do pagamento. Campanhas programadas usam fuso da operação e valores congelados na compra.

E-mails essenciais: convite, recuperação de acesso, confirmação de compra/pagamento, preparação/retirada, entrega, cancelamento e reembolso. Cada notificação usa destinatário e dados do escopo correto, com fila, histórico e deduplicação. Alerta sonoro é opção pessoal do operador. WhatsApp automático depende de integração e condições do provedor; botão de contato pode existir antes disso.

Avaliação corresponde a uma compra e a um item/loja. Seller pode responder, não alterar a nota do cliente. Moderação registra motivo; rejeição por ser negativa não é regra permitida. Conteúdo importado legítimo, se usado, terá origem identificada e não será apresentado como compra verificada na plataforma.

## 9. Aprovação de produtos

**Confirmado:** cada produto precisa de aprovação do marketplace no início. Proposta de fluxo: seller salva rascunho → envia para análise → administrador aprova ou devolve com motivo → seller corrige e reenvia. Apenas versão aprovada pode ser comprada; prévias não publicadas exigem acesso autorizado. Importação, clonagem, ações em lote e API seguem a mesma exigência.

**Confirmado para alterações:** título, descrição, atributos, especificações e imagens exigem aprovação; estoque e preço atualizam imediatamente. O preço recebe aviso comparativo no momento da edição, conforme [monitoramento](08-monitoramento-precos.md).

Proposta de versionamento: conteúdo alterado gera revisão; versão aprovada anterior permanece pública até aprovação. Preço e estoque ficam separados da revisão editorial: aprovar um texto não restaura preço ou saldo antigos. Inclusão de nova variação/composição e mudança de categoria também passam por análise na proposta técnica. Alterar atributos de identidade invalida comparações incompatíveis; publicar uma revisão exige vínculo correto de produto equivalente. Administrador pode suspender publicação imediatamente; suspensão preserva pedidos anteriores.

## 10. Chat interno comprador–loja

**Confirmado:** atendimento direto entre comprador e loja dentro do marketplace, somente após a compra, com texto e imagens; recurso obrigatório no lançamento.

Proposta inicial: histórico persistente, indicação de envio e leitura, contador de não lidas e notificações no painel. Conversa obrigatoriamente vinculada a um subpedido do comprador autenticado, liberada após confirmação de pagamento como definição proposta de compra concluída. Carrinho ou pedido sem pagamento não libera chat. Em pedidos multiloja, cada conversa e seus dados pertencem apenas à loja correspondente. Proposta: manter atendimento após entrega, cancelamento ou reembolso, para pós-venda.

Somente comprador participante e equipe autorizada daquele seller acessam a conversa. Separar permissões `chat.read`, `chat.reply` e `chat.manage`; seller concede individualmente. Validar autorização também na conexão em tempo real, na busca e no carregamento do histórico. Suspender funcionário revoga esse acesso. Acesso de suporte do marketplace, quando necessário, será permissionado e auditado.

Mensagem reenviada por falha de rede não pode duplicar no histórico. Loja offline mantém mensagens pendentes, sem fechar a possibilidade de comprar ou escrever no pós-venda; chat não promete resposta imediata. Proposta de recurso de denúncia para abuso e encaminhamento ao suporte. Mensagens não modificam preço de pedido, pagamento, frete ou status: essas operações usam seus fluxos próprios.

**Definição técnica inicial de imagens:** máximo de 5 MB (5.000.000 bytes) por arquivo, validado antes do envio e no servidor; formatos JPEG, PNG e WebP. Decodificar e validar conteúdo real, limitar dimensões/pixels (proposta: 20 megapixels), gerar versão otimizada e remover metadados desnecessários. Arquivo acima do limite é recusado com instrução para reduzir tamanho; processamento só termina em mensagem disponível após validação. Guardar mídias privadas e entregar por URL temporária com autorização da conversa, sem reutilizar o banco público de fotos de produtos. Aplicar limites de frequência e quantidade de anexos, ainda a dimensionar.

Áudio, arquivos de outros tipos, edição/exclusão de mensagens, retenção, prazo de resposta e mediação detalhada ainda não foram definidos. O chat pode ser especificado e prototipado sem depender da escolha do provedor de pagamento.

## Extensão — tipos de produto

[Tipos de produto](11-tipos-de-produto.md) substitui a suposição de que todo item é físico e simples. Kits guardam composição e escolhas por componente; sua reserva soma SKUs com os itens avulsos da sacola. Virtuais não participam do frete, despacho ou retirada. Compras mistas mantêm linhas digitais e físicas distintas. Entrega digital exige pagamento confirmado e autorização por comprador. Preço promocional de kit, devolução parcial e prazo de acesso digital permanecem pendentes.

