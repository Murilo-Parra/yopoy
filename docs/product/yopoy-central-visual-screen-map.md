# Yopoy — mapa de telas da Central Visual

## Objetivo

Este documento define o mapa conceitual de telas, áreas e navegação da Central Visual Inteligente. Ele orienta um protótipo navegável e uma implementação futura, mas não representa tela real, componente, rota, backend, banco ou contrato técnico.

## Navegação principal mobile

As sete áreas formam a navegação conceitual. A barra inferior deve respeitar o limite de até cinco destinos do design system: **Central**, **Capturar** e os destinos de maior uso ficam diretos; áreas excedentes permanecem acessíveis por **Mais** ou por atalhos contextuais, sem perder descoberta.

| Área | Finalidade | Entrada principal | Ação primária | Ações secundárias | Cards exibidos | Estado vazio | O que não fazer |
|---|---|---|---|---|---|---|---|
| Central | organizar o trabalho diário por prioridade | abertura do produto e botão “Central” | resolver o primeiro item de “Atenção agora” | filtrar, buscar, revisar, vincular, converter e arquivar | capturas, comandas, vendas, pagamentos, despesas, pendências, pré-notas e referências arquivadas sob demanda | “Sua Central ainda está vazia. Crie o primeiro card ou capture uma comanda.” | virar painel genérico, esconder a próxima ação ou depender de arrastar |
| Capturar | registrar papel, foto, arquivo ou informação manual como rascunho | botão “Capturar” e ação rápida | capturar foto | anexar arquivo, criar card manual, revisar e arquivar | capturas e comandas em rascunho ou revisão | “Nenhuma captura aguardando revisão.” | transformar OCR automaticamente em venda definitiva ou tratar anexo como prova |
| Vendas | registrar e acompanhar vendas e seus vínculos | navegação, atalho da Central ou conversão de captura | criar venda | registrar pagamento, vincular, criar pré-nota, confirmar baixa de estoque e ver histórico | vendas abertas, sem pagamento, vinculadas, divergentes e prontas | “Nenhuma venda registrada hoje.” | emitir nota fiscal, assumir liquidação ou baixar estoque sem confirmação |
| Caixa | conduzir abertura, operação e fechamento do caixa diário | navegação e alerta de caixa | abrir ou fechar caixa conforme o estado | registrar pagamento manual, revisar divergências e ver relatório do dia | sessão de caixa, vendas e pagamentos do período, divergências | “Nenhum caixa está aberto.” | tratar como extrato bancário ou conciliar automaticamente |
| Estoque | controlar produtos e movimentos simples | navegação por “Mais” ou atalho de venda/produto | cadastrar produto ou registrar movimento | entrada, saída, baixa por venda, inventário simples e histórico | produtos e movimentos de estoque | “Cadastre um produto para começar o controle de estoque.” | incluir lote/validade ou sugestão automática de compra no MVP |
| Contador | preparar e exportar informações internas | navegação por “Mais”, atalho da Central ou conversão de venda | preparar/exportar pacote com confirmação | revisar rascunho, converter em pré-nota e ver histórico | rascunhos internos, pré-notas e pacotes do contador | “Ainda não há pré-notas. Você pode preparar uma a partir de uma venda.” | emitir, autorizar, cancelar ou imitar documento fiscal real |
| Mais | reunir destinos de menor frequência e gestão permitida | item “Mais” da navegação | abrir uma área auxiliar | acessar Estoque, Contador, Arquivados, empresa, usuários, plano, suporte e configurações | avisos de plano, suporte e referências administrativas permitidas | “Nenhuma configuração pendente.” | expor administração perigosa ou transformar configurações no centro do produto |

## Navegação principal desktop

- **Central em colunas:** visão inicial com Entradas, Pendências, Em revisão, Prontos, Contador e Arquivados.
- **Busca global:** encontra cards por título, tipo, valor, data e referência compreensível; preserva o contexto do quadro.
- **Filtros:** combinam tipo, estado, período e responsável; filtros ativos ficam visíveis e podem ser limpos.
- **Painel lateral de detalhes:** abre o card sem retirar o usuário do quadro e reúne revisão, vínculo, anexo, histórico e ações.
- **Revisão em lote:** disponível apenas para ações compatíveis, permissões e planos que a suportem; mostra quantidade e consequência antes de confirmar.
- **Atalhos futuros:** poderão abrir busca, mover foco e acelerar revisão, mas nunca serão necessários para operar.
- **Módulos auxiliares:** Vendas, Caixa, Estoque, Contador e Mais ficam acessíveis por navegação lateral ou superior, sem competir com a Central.

## Tela Central — mobile

Ordem conceitual dos blocos:

1. **Cabeçalho:** empresa atual, título “Central”, busca e filtros simples.
2. **Atenção agora:** divergências, itens sem vínculo, vendas sem pagamento, revisão e caixa aberto, em ordem explicável.
3. **Novas capturas:** fotos, comandas e entradas recém-registradas.
4. **Pagamentos sem vínculo:** pagamentos que precisam de correspondência manual.
5. **Vendas sem pagamento:** vendas sem pagamento associado.
6. **Em revisão:** cards que exigem conferência humana.
7. **Prontos:** cards sem pendência imediata.
8. **Pré-notas/contador:** preparação interna e pacotes aguardando ação.
9. **Arquivados sob demanda:** acesso por filtro ou área própria, nunca ocupando a rotina principal.
10. **Barra de ação rápida:** “Novo card”, “Capturar” e ação operacional contextual.
11. **Navegação inferior:** destinos mais frequentes, com “Mais” dando acesso aos demais.

Cada bloco mostra contagem, poucos cards prioritários e “Ver todos”. Um bloco vazio usa mensagem curta e não ocupa espaço excessivo.

## Tela Central — desktop

| Coluna | Cards que entram | Ação principal | Estado vazio | Riscos de UX |
|---|---|---|---|---|
| Entradas | capturas, comandas e cards manuais recém-criados | revisar | “Nenhuma entrada nova.” | acumular itens sem prioridade ou sugerir que OCR já confirmou dados |
| Pendências | pagamentos sem vínculo, vendas sem pagamento e divergências | resolver pendência | “Nenhuma pendência agora.” | misturar causas diferentes sem rótulo ou esconder urgência |
| Em revisão | rascunhos e cards submetidos à conferência | revisar e marcar pronto | “Nada aguardando revisão.” | revisão superficial em lote ou confiança visual falsa |
| Prontos | cards revisados e sem pendência imediata | abrir próxima ação aplicável | “Nenhum card pronto.” | parecer etapa final para tipos que ainda exigem ação operacional |
| Contador | rascunhos internos, pré-notas e pacotes | revisar ou exportar com confirmação | “Nenhum item para o contador.” | confundir preparação interna com emissão fiscal |
| Arquivados | cards removidos da visão principal com histórico preservado | consultar ou desarquivar | “Nenhum item arquivado.” | parecer lixeira, exclusão ou destino irreversível |

O drag-and-drop pode acelerar uma transição válida, mas a mesma ação deve existir por botão ou menu e manter confirmação quando crítica.

## Tela Detalhe do Card

- **Resumo:** tipo, título, origem, valor e data relevantes.
- **Status:** rótulo textual e orientação sobre a próxima ação; cor nunca é o único indicador.
- **Dados principais:** conteúdo editável ou somente leitura conforme estado e permissão.
- **Anexos:** fotos e arquivos como evidência de apoio, nunca como prova automática.
- **Vínculos:** cards relacionados, origem de conversão e opção de vincular/desvincular quando válida.
- **Sugestões:** recomendação contextual com explicação e confiança; o usuário decide aplicar ou ignorar.
- **Histórico:** mudanças, responsáveis, datas, motivos e ações desfeitas.
- **Ações disponíveis:** somente ações válidas para tipo, estado, empresa, permissão e plano.
- **Bloqueio/upgrade:** limite do plano é apresentado como upgrade; função futura é identificada como futura, não como erro.
- **Confirmação/desfazer:** ações críticas abrem confirmação; ações reversíveis mostram “Desfazer” após conclusão.

No mobile, o detalhe ocupa uma tela com retorno claro. No desktop, abre em painel lateral sem perder o quadro.

## Tela Capturar

- ação principal **Capturar foto**;
- alternativa **Anexar arquivo**;
- alternativa **Criar card manual**;
- etapa obrigatória de **Revisar captura** antes de qualquer conversão;
- ação **Transformar em venda** com confirmação e preservação da origem;
- ação **Arquivar** com mensagem de que o item não será apagado e opção de desfazer;
- OCR, quando disponível, gera somente rascunho revisável e nunca venda definitiva automática.

## Tela Vendas

- **Criar venda:** registro manual com dados mínimos e estado de rascunho quando incompleto.
- **Vendas abertas:** lista operacional por data e estado.
- **Vendas sem pagamento:** destaque de pendência e ação “Registrar pagamento” ou “Vincular”.
- **Criar pré-nota:** conversão interna confirmada, preservando venda e histórico.
- **Vínculo com pagamento:** comparação manual, confirmação, desvincular e desfazer.
- **Baixa de estoque:** resumo dos itens e quantidades antes da confirmação.
- **Limite fiscal:** nenhuma emissão fiscal real; pré-nota e rascunho são internos.

## Tela Caixa

- **Abrir caixa:** informar valor inicial e confirmar.
- **Caixa aberto:** mostrar horário, responsável, totais operacionais e pendências do período.
- **Registrar pagamentos manuais:** cria registros internos, sem movimentar dinheiro.
- **Divergências:** destacar diferença e permitir revisão, sem ajuste autônomo.
- **Fechar caixa:** apresentar resumo e exigir confirmação explícita.
- **Relatório do dia:** consolidar operação interna e histórico.
- **Limite:** caixa não é extrato bancário nem comprovação de liquidação.

## Tela Estoque

- **Produtos:** cadastro e consulta de itens simples.
- **Entrada:** movimento manual com quantidade, origem e confirmação.
- **Saída:** movimento manual com motivo e confirmação.
- **Baixa por venda:** consequência apresentada e confirmada no fluxo da venda.
- **Inventário simples:** contagem e ajuste auditável quando disponível no plano.
- **Histórico:** movimentos em ordem temporal, sem apagamento silencioso.
- **Fora do MVP:** lote/validade e sugestão automática de compra.

## Tela Contador

- **Rascunhos de nota:** preparação interna editável, sem validade fiscal.
- **Pré-notas:** itens revisados para organização e contador.
- **Pacotes do contador:** agrupamentos por período e conteúdo selecionado.
- **Exportar:** revisão do conteúdo e confirmação antes de gerar a exportação.
- **Histórico:** responsável, momento e conteúdo de cada exportação ou envio confirmado.
- **Limite:** não emitir nota fiscal; nenhuma tela deve imitar DANFE ou autorização fiscal.

## Tela Arquivados

- buscar cards arquivados;
- filtrar por tipo, período, motivo ou responsável;
- abrir o histórico e o estado anterior;
- desarquivar com confirmação e retorno ao último estado ativo válido;
- deixar explícito que arquivar não apaga.

## Tela Mais/Admin

- **Empresa:** identificação e configurações operacionais permitidas.
- **Usuários:** lista e acessos conforme plano e permissão.
- **Plano:** limites atuais, recursos contratados e caminhos de upgrade.
- **Suporte:** ajuda e chamados disponíveis.
- **Configurações:** preferências não críticas e informações do produto.
- **Auditoria básica:** consulta compatível com permissão e plano.
- **Segurança:** funções administrativas perigosas, internas ou excepcionais não aparecem ao usuário comum.

## Regras de navegação

- toda ação crítica tem confirmação;
- toda ação reversível oferece desfazer;
- mobile não depende de arrastar;
- desktop pode usar drag-and-drop, sempre com alternativa por botão ou menu;
- recurso futuro aparece como futuro, não como erro;
- recurso bloqueado aparece como upgrade claro;
- fiscal real aparece apenas como futuro/pós-MVP/add-on futuro.
