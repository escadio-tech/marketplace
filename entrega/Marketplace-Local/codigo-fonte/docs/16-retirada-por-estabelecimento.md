# Retirada por estabelecimento físico

Decisão de 14/10/2026. Esta regra substitui a limitação inicial de uma loja por seller e esclarece as regras anteriores de retirada.

- O administrador cadastra as faixas de CEP de cada cidade atendida pelo marketplace.
- Cada loja ou filial possui cadastro próprio, cidade, CEP físico, razão social, CNPJ e endereço completo da unidade. Novas unidades passam por aprovação própria.
- A retirada é oferecida somente quando o CEP do comprador e o CEP físico da unidade pertencem à mesma cidade cadastrada. Não há limite de quilômetros dentro dessa cidade.
- Ampliar a cobertura de entrega não amplia a retirada. Marca, empresa ou existência de outra unidade fora da plataforma não habilitam retirada em outra cidade.
- Uma unidade de Cianorte não oferece retirada para compradores de Maringá. Para isso, é necessário cadastrar e aprovar a unidade de Maringá; o pedido deve pertencer a essa unidade.
- A configuração logística não permite trocar o endereço físico. Uma unidade em outra cidade exige novo cadastro; ajustes cadastrais do endereço passam pela administração.
- Cada subpedido conserva os dados da unidade responsável no momento da compra. Alterações futuras no cadastro não modificam o endereço registrado no pedido anterior.

## Requisito fiscal e limites do protótipo

Por definição do projeto, o documento fiscal deve corresponder ao estabelecimento que vende e atende o pedido, com sua identidade e endereço. A futura integração fiscal deverá usar esse vínculo, sem substituir os dados por uma matriz ou filial de outra cidade.

O protótipo salva os dados cadastrais e o vínculo do subpedido; não emite notas nem valida cadastros tributários. Unidades adicionais são cadastradas pelo administrador em Vendedores → Cadastrar loja ou filial. A solicitação de filial pelo próprio seller, publicação de catálogo novo e operação multiunidade com autenticação real continuam dependentes da implementação de produção.

As faixas de CEP iniciais são demonstrativas, definidas no painel, e precisam de validação operacional antes da publicação.
