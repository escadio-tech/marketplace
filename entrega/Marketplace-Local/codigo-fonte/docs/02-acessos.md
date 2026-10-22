# Acessos, equipes e isolamento

## 1. Modelo proposto

**Confirmado:** o seller escolhe individualmente as permissões de cada funcionário. Usar permissões por recurso e ação, vinculadas ao contexto da empresa. Hierarquia sozinha é insuficiente: alguém que gerencia catálogo não deve conseguir conceder acesso financeiro só porque os dois perfis têm o mesmo nível.

Uma identidade pode ter múltiplos vínculos. Cada vínculo inclui usuário, seller, papel, permissões efetivas, nível de delegação, status, criador e datas. O contexto ativo é mostrado no painel, mas verificado no servidor em toda requisição.

Papéis iniciais propostos:

- Proprietário do marketplace: administração global e governança.
- Equipe do marketplace: funções de operação, suporte, conteúdo ou financeiro explicitamente concedidas pelo proprietário.
- Responsável do seller: administra a própria empresa e delega o conjunto permitido a ela.
- Gestor do seller: perfil configurável; pode receber acesso igual ao responsável para tarefas delegáveis.
- Operador: pedidos, catálogo ou estoque, conforme concessão.
- Financeiro: relatórios e acertos autorizados da própria empresa.
- Cliente: própria conta e compras.

Esses nomes são padrões de conveniência, não pacotes obrigatórios de acesso. No formulário de cada membro, o seller marca as ações permitidas; modelos de papel podem apenas preencher uma seleção inicial revisável. As permissões efetivas daquele vínculo são explícitas, sem concessões ocultas por soma de papéis. Novos papéis podem ser criados sem alterar a regra de isolamento.

## 2. Matriz padrão

| Ação | Proprietário | Equipe global | Responsável seller | Equipe seller | Cliente |
|---|---|---|---|---|---|
| Aprovar/suspender empresas | Sim | Se concedido | Não | Não | Não |
| Alterar comissão contratada | Sim | Se concedido | Consultar própria | Consultar se concedido | Não |
| Configurar região global | Sim | Se concedido | Não | Não | Não |
| Configurar cobertura da loja | Sim | Se concedido | Própria | Se concedido | Não |
| Configurar regra global de prazo de transporte | Sim | Se concedido | Somente consultar | Consultar se concedido | Consultar previsão da compra |
| Administrar catálogo | Global auditado | Se concedido | Próprio | Se concedido | Não |
| Aprovar publicação de produtos | Sim | Se concedido | Não | Não | Não |
| Acessar/responder chat | Suporte autorizado e auditado | Se concedido | Conversas da própria loja | Se concedido | Próprias conversas |
| Operar pedidos | Global auditado | Se concedido | Próprios subpedidos | Se concedido | Consultar próprios |
| Consultar dados de compradores | Conforme finalidade | Se concedido | Necessários às próprias vendas | Se concedido | Próprios |
| Convidar funcionários | Própria administração | Se concedido | Própria empresa | Se delegação concedida | Não |
| Solicitar reembolso | Sim | Se concedido | Próprios subpedidos | Se concedido | Solicitar dos próprios pedidos |
| Consultar financeiro | Global | Se concedido | Próprio | Se concedido | Próprios pagamentos |
| Confirmar repasse manual | Sim | Se concedido | Não | Não | Não |
| Alterar dados bancários | Gerir processo auditado | Se concedido | Próprios, com autenticação reforçada | Não por padrão | Não |
| Exportar dados | Conforme permissão e finalidade | Se concedido | Escopo próprio | Se concedido | Solicitar próprios dados |
| Editar conteúdo institucional | Sim | Se concedido | Só conteúdo da loja | Se concedido | Não |
| Acessar código no painel | Não | Não | Não | Não | Não |

Proprietário também usa a aplicação e os conectores; possuir autoridade global não implica poder ver senhas, dados completos de cartão ou segredos recuperáveis de autenticação.

## 3. Delegação igual ou inferior

Para convidar ou alterar outro membro, todas as condições devem ser verdadeiras:

1. O autor está ativo, sua empresa está autorizada e ele tem `team.invite` ou `team.update`.
2. O alvo pertence à mesma empresa.
3. O nível do alvo não supera o nível delegável do autor.
4. As permissões do alvo são um subconjunto das permissões delegáveis atuais do autor.
5. A concessão respeita o teto imposto pelo marketplace à empresa.
6. A ação não altera o próprio nível, transfere propriedade ou elimina o último responsável ativo.

**Igual** significa igual no contexto do seller e dentro das permissões delegáveis. Exemplo: um seller pode criar dois gestores com as mesmas permissões de vendas e equipe. Nenhum deles recebe acesso a outras empresas ou à administração global.

Transferência do vínculo de responsável legal, fechamento da empresa e troca bancária são processos especiais, não decorrências de criar um gestor de nível igual. A escolha de quem pode executá-los será definida com o proprietário.

O convite expira, é de uso único e exige aceite pelo destinatário. Um e-mail já cadastrado recebe um novo vínculo autorizado, não uma nova conta nem uma alteração na identidade existente. Redução de privilégios e suspensão invalidam acessos e tokens relevantes imediatamente. Concessões anteriores devem ser reavaliadas para não ultrapassar o teto vigente; alterações de papel compartilhado também passam pela validação de todos os membros afetados.

## 4. Permissões exemplificadas

`catalog.read/create/update/archive`, `price.update`, `stock.read/adjust`, `orders.read/accept/prepare/dispatch`, `refunds.request/approve`, `finance.read/export`, `team.invite/update/revoke`, `store.update`, `support.read/reply`, `integrations.manage`.

Chat interno: `chat.read/reply/manage`, sempre restrito às conversas da empresa. Aprovação editorial usa `catalog.review` no contexto global, sem delegação pelo seller.

Recursos globais usam permissões distintas, como `sellers.approve`, `commission.update`, `settlements.confirm` e `marketplace.settings.update`. Permissão de leitura não concede exportação. Alterar pedido não autoriza marcar pagamento online como recebido.

## 5. Isolamento obrigatório

Para selos e editor modular, aplicar também as [permissões e condições de elegibilidade](09-lojas-e-vitrines.md). Editar, publicar e gerir mídia são concessões distintas. Apenas administração autorizada concede classificações; documentos de marca/empresa são privados e separados da biblioteca pública de banners.

- Consulta, alteração, arquivo, relatório, busca, cache, fila, notificação e exportação aplicam o escopo do seller.
- Nunca confiar no `seller_id` enviado pelo navegador; cruzá-lo com o vínculo autenticado.
- Seller vê seus itens, valores e dados mínimos do comprador necessários ao próprio subpedido, sem histórico de compras de outras lojas.
- Operação global deve registrar autor, motivo e escopo de ações sensíveis. Acesso de suporte não deve exigir compartilhar a senha do cliente.
- Mídias públicas de catálogo podem ser abertas; documentos privados e exportações têm autorização e URL temporária.
- Ao suspender um seller, impedir novas vendas, mantendo um fluxo controlado para tratar pedidos existentes, reembolsos e disputas.
- Pagamentos, comissões e lançamentos financeiros não podem ser apagados pelo seller.

## 6. Critérios de aceite

| Caso | Resultado obrigatório |
|---|---|
| Seller A tenta abrir URL ou API de produto/pedido do B | Sem leitura nem alteração; tentativa registrada quando pertinente |
| Operador com catálogo tenta conceder financeiro | Rejeição no servidor |
| Gestor com delegação convida outro com mesmo nível e permissões | Permitido na própria empresa |
| Usuário altera seu papel pelo navegador/API | Rejeitado |
| Papel editado passa a conceder acesso além do autor | Rejeitado, mesmo com membros já associados |
| Funcionário suspenso continua com sessão aberta | Requisições administrativas deixam de ser autorizadas |
| Exportação ou tarefa em fila perde autorização | Não entrega arquivo ao usuário revogado; processamento revalida escopo |
| Último responsável é removido | Operação bloqueada até existir substituto autorizado |
| Cliente com vínculo seller troca de área | Cada área usa seu contexto e permissões; compras não concedem privilégios |

## Extensão — tipos e arquivos digitais

Configuração de atributos, combinações e kits usa permissões de catálogo da própria loja. Proposta: separar digital.assets.upload, digital.assets.review e digital.downloads.support. Arquivo comercial é privado e não deve ser incluído na biblioteca de banners. Download de comprador exige autorização por pedido/item. Ver [tipos de produto](11-tipos-de-produto.md).

