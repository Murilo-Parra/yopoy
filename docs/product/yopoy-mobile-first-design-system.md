# Yopoy — design system mobile-first

## Objetivo

Este documento define padrões visuais e de interação para orientar telas futuras do Yopoy. Ele é uma especificação conceitual de design/UX: não representa tela implementada, componente React, rota, contrato técnico ou decisão de persistência.

A aplicação conceitual destes padrões à Central está em `docs/product/yopoy-central-visual-screen-map.md` e `docs/product/yopoy-central-visual-prototype.md`.

## Princípios de UX

- **Mobile-first:** o fluxo completo deve funcionar primeiro em tela pequena.
- **Ações em poucos toques:** a ação principal deve estar visível e próxima do contexto.
- **Linguagem comum:** evitar termos técnicos quando uma frase cotidiana explicar melhor.
- **Card como unidade principal:** entradas, trabalho e histórico são organizados em cards.
- **Estado sempre visível:** cor nunca é o único indicador; usar também texto e, quando útil, ícone.
- **Ação crítica sempre confirmada:** explicar o efeito antes da confirmação.
- **Desfazer sempre que possível:** oferecer reversão imediata para ações reversíveis.
- **Arquivar nunca apaga:** informar que o item continua no histórico e pode ser recuperado.
- **Arrastar é opcional:** drag-and-drop nunca pode ser a única forma de ação.
- **IA contextual:** aparece como sugestão explicável no card ou no fluxo, não como chat central.
- **Limite fiscal:** fiscal real está fora do MVP; rascunho e pré-nota são controles internos.

## Fundações visuais

- **Cores:** usar papéis semânticos — fundo, superfície, texto, texto secundário, ação principal, informação, atenção, sucesso e perigo — com contraste acessível. O estado não pode depender apenas da cor.
- **Tipografia:** priorizar fonte legível de interface, hierarquia curta e números fáceis de comparar; evitar mais de três níveis simultâneos no card.
- **Espaçamento:** adotar escala consistente baseada em múltiplos de 4, com 16 como respiro padrão de conteúdo.
- **Forma:** superfícies e cards devem compartilhar raio e elevação coerentes; elevação comunica camada, não decoração.
- **Ícones:** sempre acompanhados por rótulo em ações críticas ou pouco familiares.

Valores finais de tokens visuais serão validados no protótipo 48.1 antes de implementação.

## Plataformas-alvo

| Plataforma | Uso principal | Interação | Limitações | Prioridade no MVP |
|---|---|---|---|---|
| Celular/navegador mobile | capturar, registrar, revisar e resolver a rotina no local de trabalho | toque, câmera, teclado virtual e ações fixas | pouco espaço, uso com uma mão, conexão instável e menor precisão | Máxima; todo fluxo essencial nasce aqui |
| PWA instalável | acesso recorrente com sensação de aplicativo e atalho na tela inicial | toque e recursos web instaláveis quando disponíveis | depende do navegador e não deve pressupor recursos nativos ou funcionamento offline | Alta, sem bloquear o MVP se a instalação não estiver disponível |
| Notebook/balcão | operação contínua de caixa, busca e revisão de vários cards | mouse, teclado e atalhos futuros | espaço compartilhado, uso rápido e possível distância da tela | Alta como extensão operacional do mobile |
| Desktop administrativo | revisão ampla, filtros, lotes e acompanhamento | mouse, teclado, múltiplas colunas e painel lateral | não representa o contexto principal de captura no chão da operação | Média; complementa, não redefine, o fluxo mobile |

## Layout mobile

- **Cabeçalho:** mostra empresa atual, título da área e acesso a busca/filtros; não compete com a ação principal.
- **Atenção agora:** primeiro bloco após o cabeçalho, ordenado por urgência e com contagem clara; não vira mural de alertas genéricos.
- **Lista de cards:** uma coluna, resumo escaneável, estado textual, valor/data quando relevantes e uma ação principal aparente.
- **Ações rápidas fixas:** barra acessível ao polegar para criar, capturar e registrar operações frequentes; não encobre o último card.
- **Navegação inferior:** até cinco destinos estáveis, com rótulo e indicação da área atual; “Central” é o destino principal.
- **Filtros simples:** chips de seleção única ou múltipla, com “Limpar” visível e resumo do filtro aplicado.
- **Botões grandes:** alvo de toque mínimo de 44 × 44 px; ação principal tem rótulo direto e largura confortável.
- **Estado vazio:** explica o que a área mostra e oferece uma próxima ação útil, sem sugerir erro.
- **Loading:** preserva a estrutura da tela, indica progresso e evita duplicar ações durante salvamento.
- **Erro:** usa linguagem acionável, preserva dados preenchidos e oferece tentar novamente quando seguro.
- **Confirmação:** folha inferior ou diálogo curto com ação, consequência e botões inequívocos; perigo não é a opção padrão.
- **Desfazer:** toast persistente pelo tempo suficiente para leitura, com ação “Desfazer” e confirmação do resultado.

## Layout desktop/notebook

- **Colunas:** representam etapas operacionais estáveis e aceitam rolagem horizontal controlada; contagem e nome permanecem visíveis.
- **Kanban visual:** mostra cards compactos e comparáveis, sem esconder ações essenciais em gestos.
- **Drag-and-drop:** acelera mudanças válidas, mas a mesma transição existe em botão ou menu; ação crítica ainda exige confirmação.
- **Painel lateral de detalhes:** abre sem perder o contexto das colunas e reúne dados, vínculos, anexos, ações e histórico resumido.
- **Filtros:** combináveis, nomeados e reversíveis; filtros ativos ficam explícitos.
- **Busca:** procura por linguagem e referências úteis ao usuário, com estado sem resultado orientativo.
- **Ações em lote:** somente para operações permitidas pelo plano e seguras para seleção múltipla; exibir quantidade, consequência e confirmação.
- **Revisão operacional:** privilegia comparação, pendências e próxima ação, sem transformar a Central em painel analítico genérico.
- **Atalhos de teclado futuros:** poderão acelerar busca, navegação e revisão, mas nunca serão requisito para operar.

## Componentes conceituais

Estes nomes descrevem responsabilidades de UX, não componentes implementados.

| Componente | Função | Quando aparece | Principais estados | Regra mobile | Regra desktop |
|---|---|---|---|---|---|
| `SmartCard` | resumir uma unidade de trabalho, contexto e próxima ação | listas, colunas, resultados e relações | padrão, selecionado, carregando, erro, bloqueado e todos os estados operacionais aplicáveis | uma coluna, ação principal visível e detalhes por toque | compacto em coluna; seleção abre detalhes sem perder contexto |
| `StatusChip` | nomear o estado operacional | cabeçalho e resumo do card | cada estado visual do MVP | texto curto e legível; não depender de hover | pode apoiar filtro e comparação, sem substituir o texto |
| `ConfidenceBadge` | indicar confiança de OCR ou sugestão | somente quando há inferência revisável | baixa, média e alta | rótulo compreensível e acesso à explicação por toque | explicação no painel ou popover acessível |
| `ActionButton` | executar uma ação explícita | card, formulário, diálogo e barra rápida | padrão, pressionado, foco, carregando, desabilitado e perigo | alvo mínimo de 44 × 44 px e rótulo direto | mantém rótulo; pode ter atalho futuro indicado |
| `QuickActionBar` | concentrar ações recorrentes | base da Central e contextos operacionais | padrão, ação ativa e recolhida durante teclado | fixa e alcançável, sem cobrir conteúdo | pode integrar cabeçalho ou painel contextual |
| `BottomNavigation` | alternar destinos principais | navegação global mobile | ativo, inativo e aviso por contagem | até cinco destinos com ícone e texto | substituída por navegação lateral ou superior |
| `CardDetailDrawer` | mostrar dados, vínculos, anexos, ações e histórico | abertura de um card | visualização, edição, carregando e erro | ocupa tela ou folha ampla, com retorno claro | painel lateral persistente e redimensionamento futuro opcional |
| `AttachmentPreview` | visualizar evidência de apoio | cards com foto ou documento | miniatura, carregando, indisponível e erro | toque abre visualização adequada à tela | prévia no painel com acesso ao original permitido |
| `LinkSuggestion` | explicar um vínculo possível sem aplicá-lo | venda/pagamento ou relação sugerida | baixa, média, alta confiança, aceita e recusada | botões “Revisar”, “Vincular” e “Ignorar”; nunca gesto implícito | permite comparar cards lado a lado antes de confirmar |
| `AuditTrailPreview` | resumir mudanças e responsáveis | detalhe de card e confirmação de contexto | recente, expandido e sem eventos adicionais | mostra eventos essenciais e abre histórico completo | linha do tempo no painel lateral |
| `EmptyState` | orientar quando não há conteúdo | listas, filtros e módulos vazios | início, concluído e sem resultado | mensagem curta e uma ação útil | pode incluir orientação secundária sem ocupar o quadro inteiro |
| `UpgradeNotice` | explicar limite do plano | ação ou capacidade não contratada | informativo, limite atingido e futuro | não bloquear navegação nem parecer erro técnico | mostra comparação ou caminho de upgrade sem interromper revisão |
| `ConfirmationDialog` | confirmar ação crítica e sua consequência | antes de fechar caixa, converter, exportar e outras ações críticas | padrão, perigo, processando e falha | diálogo/folha com ação principal inequívoca | diálogo focado, sem permitir confirmação acidental por atalho |
| `UndoToast` | reverter ação recente e reversível | após arquivar, vincular, desvincular ou converter | disponível, processando, concluído e falhou | visível acima da navegação e acessível por leitor de tela | visível sem encobrir painel ou seleção |

## Estados visuais obrigatórios

| Estado | Rótulo visível | Orientação visual e próxima ação |
|---|---|---|
| `draft` | Rascunho | neutro; continuar preenchimento ou enviar para revisão |
| `needs_review` | Revisar | atenção; abrir e conferir dados |
| `unlinked` | Sem vínculo | atenção; localizar ou criar relação correspondente |
| `linked` | Vinculado | informativo/positivo; ver vínculo ou desvincular com confirmação |
| `divergent` | Divergente | destaque de problema; explicar a diferença e revisar |
| `ready` | Pronto | positivo; indicar próxima ação disponível |
| `archived` | Arquivado | neutro e recolhido; consultar histórico ou desarquivar |
| `converted_to_sale` | Convertido em venda | positivo; abrir a venda originada e manter acesso à origem |
| `converted_to_internal_invoice_draft` | Convertido em pré-nota | informativo; revisar a pré-nota interna |
| `sent_to_accountant` | Enviado ao contador | positivo; mostrar quando, por quem e o conteúdo enviado |
| `ready_for_future_fiscal_issue` | Pronto para emitir futuramente | informativo; declarar que não houve emissão fiscal |
| `ignored_with_reason` | Ignorado com justificativa | neutro; mostrar motivo, responsável e possibilidade aplicável de revisão |

“Emitido”, “cancelado” e “rejeitado” não são estados visuais do MVP, pois sugerem operação fiscal real.

## Linguagem do produto

Frases preferenciais:

- “Esse pagamento parece ser desta venda.”
- “Essa comanda precisa de revisão.”
- “Esse pagamento ainda está sem vínculo.”
- “Essa venda ainda não tem pagamento.”
- “Essa pré-nota está pronta para o contador.”
- “Esse item foi arquivado, mas não apagado.”
- “Esse recurso estará disponível em uma fase futura.”
- “Rascunho de nota não é nota fiscal emitida.”

Evitar no MVP, exceto em documentação técnica ou ao explicar uma fase futura:

- NSU;
- TID;
- conciliação bancária;
- XML fiscal;
- DANFE;
- SEFAZ;
- certificado A1;
- emissão autorizada;
- cancelamento fiscal.

## Acessibilidade e clareza

- **Contraste:** textos, controles, foco e estados devem atender no mínimo WCAG 2.1 AA; cor não comunica sozinha.
- **Tamanho mínimo de toque:** 44 × 44 px, com separação que evite acionamento acidental.
- **Espaçamento:** separar grupos por função e manter densidade compatível com leitura e toque.
- **Textos curtos:** começar pela informação útil e usar expansão para detalhes.
- **Feedback visual:** toda ação mostra recebimento, progresso, sucesso ou falha sem duplicidade.
- **Foco:** ordem lógica, foco visível e retorno ao elemento de origem após fechar diálogo ou painel.
- **Tela pequena:** evitar tabelas largas e informação essencial apenas em tooltip; valores e estados precisam ser escaneáveis.
- **Ações perigosas:** confirmação explícita, consequência descrita e distinção clara entre cancelar e prosseguir.

## Regras de upgrade

- recurso bloqueado não é erro;
- mostrar o motivo e o caminho de upgrade de forma clara;
- não prometer recurso futuro como disponível;
- não bloquear fluxo essencial do plano contratado;
- fiscal real aparece apenas como futuro ou add-on futuro, nunca como recurso do MVP.

## Critério de aprovação

O design system está aprovado quando:

- toda ação principal tem padrão mobile e desktop;
- drag-and-drop tem alternativa por botão;
- estados dos cards são claros;
- fiscal real não aparece como função disponível;
- o usuário entende o fluxo sem conhecer termos técnicos de ERP.
