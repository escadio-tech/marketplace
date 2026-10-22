# Localização, frete lateral e cobertura por CEP

Versão 0.15 · 14/10/2026.

## Entrada e persistência

No primeiro acesso sem localização salva, o protótipo pede cidade e CEP da rua do comprador. A cidade é escolhida entre as regiões cadastradas pelo administrador, com opção de outra cidade. O CEP aceita pontuação e é salvo com oito dígitos. Se o CEP corresponder a uma região conhecida diferente da cidade escolhida, a confirmação pede correção.

A escolha fica neste navegador, mesmo deslogado. Fechar a confirmação sem informar CEP não libera o catálogo completo: uma mensagem orienta a escolher a localização. CEP fora das regiões atendidas leva a um estado sem ofertas, com opção para alterar a localização.

Na criação de conta, CEP e cidade já vêm preenchidos. O comprador confirma os dados e completa rua, número, bairro, UF e complemento. Esse primeiro endereço é salvo como padrão de entrega e cobrança. O cadastro só é salvo após validar os dados obrigatórios do endereço informado.

Ao entrar em uma conta existente, o endereço padrão de entrega determina a localização e os resultados. Alterar o endereço padrão também atualiza a localização. O cadastro permanece salvo entre aberturas, mas a sessão continua iniciando deslogada, conforme a decisão anterior.

## Página do produto

O formulário antigo de endereço, cidade e cenários foi substituído pelo botão **Calcule seu frete e prazo**. O botão abre um painel lateral direito, seguindo a interação das referências fornecidas, com a identidade visual verde do marketplace.

O painel permite confirmar cidade/CEP, calcular e recalcular. Apresenta somente as opções elegíveis: entrega pela loja e/ou retirada. Informa valor, estimativa de despacho e tempo de transporte. Se o frete calculado for zero, exibe **Frete grátis**; a retirada aparece separadamente como grátis, sem se confundir com entrega gratuita.

Com localização salva, a página já apresenta a cotação automaticamente, mesmo antes de abrir o painel. Alterações de quantidade e de seleção de variações/itens de kit atualizam a prévia. Para seleção incompleta, não se presume que o mínimo da campanha foi atingido; a interface pede completar as escolhas para verificar a gratuidade.

O horário interno de corte continua oculto do comprador. A estimativa considera pagamento confirmado no momento da consulta e o calendário demonstrativo de dias úteis. O prazo definitivo depende da confirmação efetiva do pagamento.

## Regras de cobertura e catálogo

Uma regra comum é utilizada nos cards, buscas, vitrines globais/personalizadas, banners vinculados a ofertas, imagens dos submenus, lojas e acessos diretos a páginas de produto/loja.

Uma loja precisa estar ativa e atender ao CEP por pelo menos uma modalidade:

- **Entrega:** CEP dentro da região habilitada pelo administrador e da faixa de entrega configurada pelo seller. A cotação também respeita a distância máxima de entrega.
- **Retirada:** CEP do comprador e CEP físico da loja pertencem à mesma região/cidade cadastrada. Não há limite de quilômetros, preservando a regra anteriormente confirmada.

Assim, uma loja sem entrega naquele CEP ainda pode aparecer para retirada na mesma cidade. Fora de ambas as modalidades, a oferta não aparece. Links diretos de produtos/lojas não atendidos mostram aviso em lugar do conteúdo comercial. Produtos digitais também seguem o filtro de loja da região no catálogo; não recebem cotação de frete físico.

Trocar o CEP recalcula a listagem. Itens já adicionados à sacola não são excluídos silenciosamente: são sinalizados quando não atendem à nova região, e o checkout revalida a cobertura. Histórico de pedidos não é filtrado geograficamente, pois corresponde a compras já realizadas.

## Gratuidade e consistência com o checkout

O mínimo global de frete grátis configurado pelo administrador continua sendo aplicado ao subtotal de produtos por loja. A regra não amplia a cobertura geográfica. A prévia considera o produto e a quantidade/variações escolhidas; o checkout considera todos os itens daquela loja, podendo atingir o mínimo com a soma do carrinho.

O checkout usa o mesmo trajeto demonstrativo da cotação, permite selecionar endereços salvos e desabilita modalidades que não atendem ao CEP digitado. O endereço salvo selecionado é preferido quando corresponde ao CEP de navegação; caso contrário, CEP/cidade vêm da localização atual e os demais dados precisam ser confirmados.

## O que ainda é demonstrativo

Não existe integração com base oficial de CEP, geocodificação ou cálculo de trajetos por ruas. As faixas iniciais de Cianorte e Maringá são fixtures, não limites municipais oficiais. Informar CEP não consulta automaticamente rua/bairro nesta etapa; esses dados são confirmados manualmente no cadastro.

Cada seller possui um **trajeto de teste** editável em Logística, inicialmente 3,4 km, usado para simular os CEPs de sua cobertura. Valor = trajeto de teste × tarifa por km, com arredondamento em centavos. Tempo de transporte = trajeto de teste × parâmetro global de minutos/km. Não é uma distância real inferida do CEP. A interface identifica a estimativa como demonstrativa.

Para produção, substituir esse trajeto por uma consulta de rota usando origem e endereço completo, validar a base de CEPs/cidades, configurar feriados e recalcular antes de cobrar. Não foram adicionados Correios ou transportadoras dos anexos: a operação inicial continua sendo entrega da própria loja e retirada.

## Verificação

45 testes automatizados: regras anteriores mais persistência de localização, CEP inválido/cidade incompatível, cobertura e retirada, frete grátis, coerência entre prévia e checkout, filtros de vitrines/banners e endereço criado no cadastro. Scripts standalone compilados e áreas incorporadas preservadas.

A revisão visual automatizada desta etapa não foi concluída: o processo de automação do navegador falhou ao iniciar no Windows. O código-fonte, os HTML standalone e o pacote ZIP foram atualizados.
