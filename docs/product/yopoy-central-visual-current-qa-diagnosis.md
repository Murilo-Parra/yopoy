# Yopoy — diagnóstico atual de QA da Central Visual

## Etapa, objetivo e limite da evidência

Este documento registra a etapa **52.0-A — diagnóstico documental da Central Visual atual contra o QA visual e a validação comercial definidos nas etapas 51.0-A a 51.0-D**.

O diagnóstico foi produzido por inspeção estática do front-end e da documentação. Ele não substitui sessão manual, teste em dispositivo real, observação de participante, medição de viewport nem validação comercial. Portanto:

- “estado observado” significa evidência encontrada no código ou nos documentos;
- “bom”, “parcial” e “fraco” indicam alinhamento aparente com os critérios de QA, não resultado de usuário;
- riscos de compreensão e uso são hipóteses que precisam ser confirmadas nas sessões;
- nenhum resultado, participante, frase, preço ou comportamento real foi inventado;
- esta etapa não autoriza implementação.

A direção preservada é: **registrar primeiro, organizar depois, conciliar quando possível e preparar resumo para o contador se quiser**, sem emissão fiscal real. A Central Visual permanece o coração do MVP e a pré-nota permanece uma preparação interna sem valor fiscal.

## Resumo executivo

A Central Visual isolada está conceitualmente próxima do QA: apresenta-se como mesa única, explicita dados fictícios e ações locais, organiza cards por situação, oferece ações por botão e repete de forma consistente que pré-nota não é nota fiscal. O card expõe tipo, estado, título, contexto, valor, etiquetas, momento e ações disponíveis.

O alinhamento geral, porém, é **parcial** por quatro motivos:

1. a tela contém oito seções sempre expandidas, vários cards e muitos botões, o que cria rolagem longa e densidade alta no celular;
2. a mesma entidade muda entre seções por tipo, estado, vínculo, arquivamento e pré-nota, sem uma explicação visual explícita desse modelo, abrindo conflito entre “o que é” e “em que etapa está”;
3. a Central comunica organização, mas não oferece uma ação visível para registrar algo novo; assim, “registrar primeiro” aparece no texto e nos exemplos, não como próximo passo executável;
4. o shell de `App.tsx` chama a Home de “Painel de Controle”/“Dashboard”, exibe navegação extensa, superfícies de emissão fiscal e linguagem de ERP complexo. Isso enfraquece o posicionamento de mesa simples e aumenta os riscos de dashboard genérico, fiscal real e complexidade percebida, embora a própria Central negue essas capacidades.

Não há registros preenchidos das sessões 51.0-B nem consolidação real 51.0-D entre os artefatos examinados. Falta, portanto, evidência para afirmar compreensão em 30 segundos, usabilidade durante o trabalho real, valor comercial, intenção de testar/pagar ou recorrência de qualquer confusão.

## Diagnóstico pelos critérios de QA

| Área analisada | Estado atual observado | Alinhamento com QA | Risco | Evidência no código/documentação | Recomendação futura |
|---|---|---|---|---|---|
| Compreensão da Central | O cabeçalho nomeia “Central Visual do Yopoy” e descreve uma mesa única para registrar, organizar pendências e preparar informações. | bom | O shell a chama de Painel de Controle/Dashboard e pode dominar a primeira leitura. | `YopoyCentralDashboard.tsx:141-153`; `App.tsx:680-688`, `App.tsx:975-983`; critérios de leitura inicial da 51.0-A/51.0-B. | Testar a leitura sem explicação e registrar se a pessoa diz “mesa” ou “dashboard”. |
| Compreensão de cards | Tipo, estado, título, descrição, valor, etiquetas, horário e ações aparecem no mesmo bloco. | bom | O termo “card” não é explicado na interface e a mistura de tipos pode parecer uma lista heterogênea de alertas. | `SmartCard.tsx:31-49`, `SmartCard.tsx:85-132`; modelo de unidade organizável em `yopoy-smart-card-model.md`. | Pedir ao participante que explique dois cards de tipos diferentes e seu próximo passo. |
| Clareza das seções | Oito seções têm título, descrição, contagem e estado vazio. | parcial | Critérios simultâneos de tipo, estado e relação podem gerar sobreposição conceitual; todas as seções visíveis aumentam a carga. | `YopoyCentralDashboard.tsx:20-44`, `YopoyCentralDashboard.tsx:64-129`, `YopoyCentralDashboard.tsx:164-207`. | Medir quais nomes precisam de explicação e se o usuário prevê corretamente para onde um card vai. |
| Clareza das ações | Ações essenciais são botões textuais: revisar, marcar pronto, simular vínculo, preparar pré-nota, arquivar/desarquivar. O feedback explica o efeito local. | parcial | Vários botões têm o mesmo peso visual; “Revisar” muda apenas o estado e não abre revisão; “Marcar pronto” pode ser aplicado diretamente a quase todo card. | `SmartCard.tsx:134-158`; handlers em `YopoyCentralDashboard.tsx:191-195`. | Observar expectativa antes do toque, consequência percebida e ação principal escolhida. |
| Dados fictícios e ações locais | Há aviso no cabeçalho, feedback inicial, legenda em cada card e mensagens após ações. | bom | A repetição reduz ambiguidade, mas pode aumentar ruído; fora da Central, o shell contém outras simulações e linguagem operacional mais assertiva. | `YopoyCentralDashboard.tsx:47-48`, `YopoyCentralDashboard.tsx:149-161`; `SmartCard.tsx:130-132`; comentário e textos de `mockData.ts`. | Verificar se o participante ainda acredita que algo ficou salvo, conciliado ou enviado após agir e recarregar. |
| Clareza de pré-nota sem fiscal | Seção, tipos, descrições, etiquetas, botão e feedback repetem “visual”, “sem valor fiscal”, “não é nota” e “nenhum documento foi criado ou emitido”. | bom | “Rascunho de nota”, “Pré-nota” e o ícone de documento ainda podem ativar expectativa fiscal; o shell oferece superfícies explícitas de emissão. | `YopoyCentralDashboard.tsx:114-119`, `YopoyCentralDashboard.tsx:195`; `SmartCard.tsx:37-39`, `SmartCard.tsx:126`, `SmartCard.tsx:150-153`; `mockData.ts:109-145`. | Tratar a pergunta “o que acabou de ser criado?” como teste crítico e registrar qualquer menção a emissão. |
| Papel do contador | Existe pacote do contador, marcado como fictício e não enviado; a seção diz que não há envio externo. | parcial | A interface mostra a possibilidade, mas não explica de modo direto que enviar ao contador é opcional; não há ação de envio, seleção ou preparação do pacote. | `YopoyCentralDashboard.tsx:115-117`; `mockData.ts:135-145`; opção voluntária definida na 51.0-A. | Perguntar se, quando e por que enviaria; não inferir clareza apenas pela existência do pacote. |
| Valor comercial percebido | A tela materializa casos de venda, pagamento, captura, despesa, estoque, pendência, pré-nota e contador sem depender de fiscal real. | parcial | A variedade demonstra amplitude, mas pode esconder a dor principal e não comprova substituição/complemento de papel, WhatsApp ou planilha. | `mockData.ts:5-159`; roteiro comercial e critérios da 51.0-A. | Coletar exemplos recentes, intenção concreta e condição de pagamento nas sessões reais. |
| Adequação mobile | Central usa uma coluna antes de `lg`, cards empilham conteúdo, ações têm altura mínima de 44 px no mobile e viram duas colunas a partir de 420 px. | parcial | Oito seções, 12 cards, descrições, etiquetas e até cinco ações produzem rolagem longa; o shell acrescenta banner, topbar e navegação horizontal. | `YopoyCentralDashboard.tsx:133-185`; `SmartCard.tsx:79`, `SmartCard.tsx:89-134`; `App.tsx:612-615`, `App.tsx:970-1069`. | Executar em celular real/viewport estreita e registrar rolagem, truncamento, alcance e tempo para achar o próximo passo. |
| Hierarquia e prioridade | “Atenção agora” vem primeiro; valor, tipo e estado têm destaque; contagens ajudam a varredura. | parcial | Não existe campo ou marcador explícito de prioridade. “Atenção agora” é uma seção residual, e itens podem sair dela por regras que têm precedência. | `YopoyCentralDashboard.tsx:30-44`, `YopoyCentralDashboard.tsx:64-72`; estrutura de `SmartCardItem` em `types.ts:15-26`. | Testar qual item o usuário resolveria primeiro e por quê; não assumir prioridade pela ordem. |
| Risco de dashboard genérico | A Central em si usa narrativa de mesa e itens acionáveis, não indicadores agregados. | parcial | Navegação desktop diz “Painel de Controle”; navegação mobile diz “Dashboard”; o shell exibe Caixa e alertas no topo. | `YopoyCentralDashboard.tsx:144-147`; `App.tsx:680-688`, `App.tsx:946-965`, `App.tsx:975-983`. | Medir a interpretação espontânea na primeira leitura antes de propor microcopy. |
| Risco de parecer fiscal real | A Central contém limites fiscais explícitos e não cita SEFAZ, certificado, XML, DANFE ou autorização como ação própria. | fraco | No contexto completo, o shell oferece “Emitir Nota (Sebrae)”, “Terminal NFC-e”, “Emitir NF-e”, “NFS-e” e textos de emissão/autorização. A faixa de bloqueio não elimina a contradição. | Central: `YopoyCentralDashboard.tsx:152-153`; shell: `App.tsx:612-615`, `App.tsx:713-732`, `App.tsx:1005-1033`, `App.tsx:1174-1218`, `App.tsx:1277-1305`. | Nas sessões, registrar se o participante procura emissão ou acredita que ela faz parte da oferta atual. Manter qualquer mudança fora desta etapa. |
| Risco de sistema complexo demais | A Central usa blocos repetíveis e linguagem relativamente direta. | fraco | No contexto completo, o shell expõe muitos módulos, licenciamento, upgrade, indicadores, guia, tema, faixa legada e navegação horizontal extensa antes/ao redor da mesa. | `App.tsx:612-615`, `App.tsx:646-778`, `App.tsx:830-1065`, `App.tsx:1329-1785`. | Validar se a pessoa consegue focar a mesa e se percebe o produto como mais simples que seu método atual. |
| Proposta em até 30 segundos | O cabeçalho resume a função em uma frase e o primeiro grupo orienta atenção manual. | parcial | Não há evidência temporal de usuário; o cabeçalho não explicita “organizar depois”, conciliar quando possível e contador opcional na mesma narrativa. | `YopoyCentralDashboard.tsx:141-153`; apresentação de 30 segundos na 51.0-A. | Cronometrar e preservar a primeira frase do participante nas sessões. |
| Registrar primeiro, organizar depois | A seção “Novas capturas” diz “Registre rapidamente e organize quando fizer sentido”; os mocks mostram entradas incompletas revisáveis. | parcial | Não há ação visível de nova captura/novo registro na Central atual; o princípio aparece como explicação, não como fluxo iniciável na tela. | `YopoyCentralDashboard.tsx:73-80`; `mockData.ts:32-55`; ações disponíveis em `SmartCard.tsx:134-158`. | Perguntar onde o usuário tocaria para registrar algo e tratar ausência de ação como evidência, não ajuste automático. |

## Mapa das seções atuais

O agrupamento segue uma precedência fixa: arquivado; pré-nota/contador; revisão; pronto; captura; pagamento sem vínculo; venda sem pagamento; por fim atenção. Assim, cada card aparece em somente uma seção, mas o usuário não vê essa regra.

| Ordem | Seção | Função aparente | Clareza do nome | Conflito ou duplicidade de interpretação |
|:---:|---|---|---|---|
| 1 | Atenção agora | Concentrar decisões e conferências manuais prioritárias. | Boa como chamada operacional. | É o destino residual de itens que não entram nas regras anteriores, não uma prioridade modelada. Um alerta pode deixar de aparecer aqui quando seu estado muda. |
| 2 | Novas capturas | Receber fotos e anotações registradas rapidamente para classificar depois. | Parcial: “captura” pode exigir explicação para usuário sem repertório de sistema. | Compete conceitualmente com “Em revisão”: ambos contêm algo incompleto a conferir. |
| 3 | Pagamentos sem vínculo | Mostrar recebimentos ainda não associados a uma venda. | Boa, desde que “vínculo” seja entendido. | Faz par com vendas sem pagamento, mas a ação “Simular vínculo” não mostra a contraparte escolhida. |
| 4 | Vendas sem pagamento | Mostrar venda ainda sem recebimento associado. | Boa e concreta. | Pode ser interpretada como inadimplência, embora o mock descreva apenas ausência de associação manual. |
| 5 | Em revisão | Agrupar registros que começaram a ser organizados e precisam de conferência. | Boa isoladamente. | É transversal a todos os tipos; ao revisar pagamento ou venda, o item sai da seção específica, ocultando que o vínculo ainda pode estar pendente. |
| 6 | Prontos | Mostrar registros conferidos para um próximo passo manual. | Parcial: “pronto” não informa pronto para quê. | Um estoque, venda ou pré-nota pode exigir próximos passos distintos; itens com pré-nota têm precedência e não ficam aqui. |
| 7 | Pré-notas e contador | Agrupar preparação interna e pacote opcional para contador. | Parcial: junta rascunho, pré-nota e pacote, que representam momentos e objetos diferentes. | Pode sugerir que toda pré-nota vai ao contador ou que o contador é etapa obrigatória. |
| 8 | Arquivados | Mostrar itens retirados da mesa e restauráveis. | Boa. | Fica permanentemente na tela mesmo vazio e amplia a rolagem; sua função reversível está explicada. |

### Ordem versus o princípio “registrar primeiro, organizar depois”

A ordem começa pela urgência e só depois apresenta novas capturas. Isso favorece triagem do trabalho existente, mas não torna o registro a primeira ação. A seção de capturas materializa o princípio, porém não existe controle para criar captura. Depois dela, a ordem separa problemas de vínculo, revisão, conclusão e preparação contábil, o que forma uma progressão razoável de organização.

O principal conflito não é a sequência nominal, e sim a combinação de taxonomias: “Capturas”, “Pagamentos” e “Vendas” são tipos; “Atenção”, “Em revisão”, “Prontos” e “Arquivados” são estados/visões; “Pré-notas e contador” mistura tipo e destino. A regra técnica impede duplicação visual, mas não impede duplicidade de interpretação.

## Avaliação dos cards atuais

### Card como item organizável

O card parece organizável porque possui fronteira visual própria, etiquetas de tipo e estado, contexto textual, momento e botões que o movem entre situações. Arquivar e restaurar reforçam que o item permanece manipulável. Isso está alinhado ao modelo conceitual de card como unidade visual comum.

### Tipo, estado, contexto e próxima ação

- **Tipo:** explícito em etiqueta textual e ícone; alinhamento bom.
- **Estado:** explícito em uma segunda etiqueta; alinhamento bom, embora os estados de apresentação sejam mais simples que o modelo conceitual.
- **Contexto:** título, descrição, valor, tags e horário fornecem contexto suficiente para os exemplos; alinhamento bom.
- **Próxima ação:** há ações disponíveis, mas nenhuma é destacada como principal e algumas aparecem simultaneamente; alinhamento parcial.

### Prioridade

Não há prioridade no tipo `SmartCardItem`, marcador de urgência nem ordenação explícita dentro das seções. A seção “Atenção agora”, a posição do card e palavras como “possível” ou “falta” comunicam prioridade indiretamente. Isso não permite concluir que o usuário saberá o que fazer primeiro.

### Dados fictícios

Os dados são sinalizados como fictícios em quatro níveis: comentário do fixture, cabeçalho, feedback global e legenda de cada card. Nomes e identificadores usam “Exemplo”/`EX`, e descrições repetem “fictício” ou “demonstração”. O alinhamento é bom e não há dado que se apresente como pertencente ao usuário da sessão.

### Ações locais e risco de falsa persistência

As ações atualizam somente `useState` da Central. O feedback inicial informa que mudanças serão perdidas ao sair ou recarregar; cada card diz “sem persistência ou operação externa”; feedbacks de vínculo e pré-nota negam conciliação, criação ou emissão real.

O risco residual existe porque:

- mensagens como “movido”, “marcado”, “criado” ou “adicionada” podem ser lidas antes do complemento demonstrativo;
- “Simular vínculo” não pede nem exibe contraparte, portanto representa uma mudança de estado mais do que um vínculo compreensível;
- não há confirmação para arquivar, marcar pronto ou preparar pré-nota, apesar do modelo conceitual prever confirmação em transições relevantes;
- o shell possui outras áreas com persistência local e linguagem de operação, tornando inconsistente a expectativa geral do produto.

A inspeção de código indica mitigação forte, mas somente recarregar a tela durante sessão pode confirmar se o usuário entendeu que nada foi salvo ou enviado.

## Avaliação da pré-nota visual

### Limite fiscal dentro da Central

Dentro da Central, o limite é explícito e consistente:

- o aviso geral diz que ações nunca emitem nota fiscal;
- a seção diz “sem valor fiscal, emissão ou envio externo”;
- o tipo do rascunho diz “sem valor fiscal”;
- os exemplos dizem “não é documento fiscal” e “não é nota fiscal”;
- o botão diz “Preparar pré-nota visual”;
- o feedback diz que nenhum documento fiscal foi criado ou emitido.

O texto da Central não promete SEFAZ, XML, certificado A1, DANFE, autorização, transmissão ou cancelamento. O papel de preparação interna está razoavelmente claro.

### Riscos de confusão

O risco permanece **alto no contexto completo do app**, não pelo conteúdo isolado da Central. A navegação e as telas adjacentes de `App.tsx` usam “Emitir Nota”, “Terminal NFC-e”, “Emissão de Notas Fiscais”, “DANFE”, “emissões oficiais” e até feedback de NFC-e “autorizada e emitida”. A faixa “ações fiscais reais estão bloqueadas” sinaliza limite, mas ao mesmo tempo confirma que superfícies fiscais fazem parte do ambiente visível.

Também há três conceitos juntos — rascunho de nota, pré-nota e pacote do contador — sem uma sequência explicada. O pacote afirma “sem envio externo” e “Não enviado”, mas a opcionalidade do contador não é declarada literalmente na tela. Assim, a relação com contador é visível, porém apenas parcialmente clara.

## Avaliação mobile-first

### Pontos favoráveis

- uma coluna no mobile e duas apenas em `lg`;
- conteúdo do card empilha antes de `sm`;
- botões ocupam a largura e têm `min-h-11` no mobile;
- grade de ações só cria duas colunas a partir de 420 px;
- textos de tipo, estado e ações não dependem apenas de cor;
- não há drag-and-drop nem ação essencial apenas em hover;
- o container limita largura no desktop sem impor largura mínima no mobile.

### Riscos a validar

- 12 cards distribuídos em oito seções produzem uma página longa mesmo antes de qualquer interação;
- cada card pode carregar etiquetas, valor, descrição, horário, aviso demonstrativo e até cinco ações;
- títulos de seção e descrições usam texto pequeno (`11px`/`12px`), e etiquetas usam `10px`;
- todos os blocos, inclusive vazios e arquivados, permanecem na sequência;
- mover um card entre seções pode provocar mudança distante na rolagem e perda de contexto;
- o shell adiciona faixa vermelha, topbar de 64 px, navegação horizontal e `main` com `p-6`, reduzindo área útil em celular estreito;
- a topbar combina boas-vindas, plano, tema, guia, caixa e alertas em uma linha sem uma evidência estática suficiente de acomodação em larguras pequenas;
- a navegação horizontal expõe muitos destinos, inclusive fiscais, e pode parecer mais importante que a própria mesa.

Por inspeção, os alvos de toque e o empilhamento são adequados. Densidade, legibilidade, rolagem, estabilidade do contexto e uso durante atendimento real continuam **não observados** e exigem dispositivo/viewport registrados.

## Discurso comercial embutido na interface

### O que a tela comunica rapidamente

O cabeçalho explica que a Central é uma mesa única para registrar movimento, organizar pendências e preparar informações. Os primeiros exemplos concretizam problemas comuns: foto de comprovante, anotação, PIX, venda, despesa e estoque. Isso mostra valor operacional mesmo sem fiscal real.

### O que ainda não pode ser afirmado

Não há evidência de que um usuário representativo entenda a proposta em até 30 segundos. A narrativa “registrar primeiro, organizar depois” aparece na descrição de “Novas capturas”, mas não há CTA de registro. “Conciliar quando possível” aparece indiretamente como vínculo visual. “Contador se quiser” não está escrito; apenas existe um pacote não enviado.

O shell concorre com essa narrativa ao se apresentar como ERP amplo, com módulos contábil, logística, fiscal, PDV, tarefas, IA, configurações, licenças e upgrade. Para alguns participantes isso pode sugerir valor; para o público com baixa paciência para ERP tradicional, pode elevar a percepção de complexidade antes que a mesa prove sua utilidade.

Valor comercial, substituição/complemento de método atual, uso durante trabalho, preço e intenção concreta permanecem **sem evidência**. Esses resultados só podem vir das sessões definidas em 51.0-A a 51.0-D.

## Achados que NÃO autorizam implementação imediata

Os achados acima são hipóteses sustentadas por código e documentação, não padrões observados em usuários. Eles não autorizam alteração da Central, do shell, de microcopy, navegação, ações, tipos ou fixtures.

Qualquer melhoria futura precisa:

- nascer em etapa própria, com uma única responsabilidade;
- ter allowlist curta, nominal e compatível com a responsabilidade;
- apontar evidência real das sessões, idealmente recorrente em pelo menos três sessões conforme 51.0-C/51.0-D;
- definir o comportamento que deve ser preservado;
- definir critério de sucesso observável e validação posterior;
- preservar a Central como mesa única, sem dashboard paralelo;
- preservar dados fictícios e a natureza local/mockada enquanto não houver escopo de persistência;
- não reabrir infraestrutura congelada nem fiscal real.

Confusão grave sobre pré-nota deve ser priorizada como risco de comunicação, mas ainda exige etapa própria. Evidência estática de contradição no shell também não amplia a allowlist desta etapa.

## Backlog candidato

Os itens abaixo são candidatos para validação e classificação. Não estão autorizados para execução.

### Microcopy

- validar “captura”, “vínculo”, “pronto” e “pré-nota” com linguagem do público real;
- testar se “Pronto” precisa explicar o próximo passo específico;
- testar se “Vendas sem pagamento” é entendido como falta de associação, não inadimplência;
- avaliar se a opcionalidade “contador se quiser” precisa aparecer de modo literal;
- medir se a repetição de “fictício/demonstração” esclarece ou gera ruído;
- confrontar “Central Visual” com “Painel de Controle” e “Dashboard” na leitura inicial.

### Hierarquia visual

- validar se “Atenção agora” deve preceder “Novas capturas” para a rotina real;
- medir se oito seções sempre abertas prejudicam varredura e foco;
- testar se tipo, estado e destino precisam de agrupamentos mais distinguíveis;
- verificar se a ação principal e a prioridade do card são reconhecidas;
- observar se mover card entre seções faz o usuário perder contexto.

### Clareza de ações

- observar a expectativa causada por “Revisar” quando não existe detalhe/formulário de revisão;
- validar o significado de “Marcar pronto” por tipo de card;
- testar se “Simular vínculo” é compreendido sem seleção de contraparte;
- confirmar se arquivar é percebido como reversível e não exclusão;
- verificar se mensagens de feedback impedem expectativa de persistência e operação externa;
- medir excesso de ações simultâneas por card.

### Mobile

- testar viewports estreitas e celulares reais, registrando largura;
- medir rolagem até capturas, prontos, pré-notas e arquivados;
- verificar legibilidade dos textos de 10–12 px e truncamentos;
- observar alcance e sequência dos botões durante trabalho em balcão;
- verificar topbar, faixa legada e navegação horizontal no espaço disponível;
- registrar poluição visual e tempo para localizar o próximo passo.

### Pré-nota/fiscal

- perguntar o que foi criado após preparar a pré-nota;
- registrar procura espontânea por emissão e menções a SEFAZ, XML, certificado, DANFE ou autorização;
- validar diferença entre rascunho, pré-nota e pacote do contador;
- confirmar que pacote não enviado não parece envio automático;
- medir o efeito das superfícies fiscais legadas do shell sobre a interpretação do MVP.

### Validação comercial

- executar 5 a 8 sessões conforme 51.0-C, começando por simulação interna não contabilizada como validação externa;
- cronometrar a interpretação inicial de até 30 segundos;
- coletar casos reais, método atual, frequência da dor e primeiro card útil;
- separar curiosidade de intenção concreta de teste, piloto ou pagamento;
- registrar preço e condição associada sem transformar amostra pequena em percentual;
- consolidar padrões somente depois da rodada.

### Fora de escopo

- persistência real, API, backend ou automação de ações;
- conciliação automática, OCR real ou IA que execute ação crítica;
- emissão, transmissão, autorização ou cancelamento fiscal;
- remodelagem ampla do shell ou limpeza do legado;
- novos módulos, dashboard paralelo ou ampliação do MVP;
- mudança estrutural em autenticação, cadastro, tenant ou dados.

## Itens proibidos de virar ajuste nesta fase

- auth;
- cadastro mínimo;
- tenant provisório;
- banco;
- RLS;
- migration;
- fiscal real;
- SEFAZ;
- certificado A1;
- XML/DANFE real;
- dashboard paralelo;
- módulos novos antes de validar a mesa.

Esses itens permanecem congelados ou fora do MVP. Nenhum feedback ou risco descrito neste diagnóstico permite reabri-los.

## Próxima etapa recomendada

Recomenda-se **52.0-B — execução real das primeiras sessões manuais**.

Justificativa:

- as etapas 51.0-A a 51.0-D já definem plano, template individual, guia operacional e template de consolidação;
- o diagnóstico estático encontrou alinhamentos e riscos concretos, mas não encontrou resultados reais preenchidos;
- compreensão em 30 segundos, densidade mobile, valor comercial e confusão fiscal dependem de comportamento observado;
- a própria regra 51.0-C/51.0-D exige recorrência em pelo menos três sessões para propor ajuste visual;
- abrir agora um plano de ajustes mínimos confundiria hipótese de inspeção com evidência de usuário e prolongaria a sequência documental sem decisão de execução.

A 52.0-B recomendada deve usar o estado atual sem alterações entre sessões, priorizar celular, executar a amostra de 5 a 8 sessões, preservar registros individuais e consolidar os resultados antes de qualquer etapa de ajuste. Somente a consolidação poderá justificar uma etapa posterior de ajustes visuais mínimos, com allowlist e critérios próprios.

## Arquivos de front-end examinados

- `src/features/yopoy-central-do-dia/YopoyCentralDashboard.tsx`;
- `src/features/yopoy-central-do-dia/SmartCard.tsx`;
- `src/features/yopoy-central-do-dia/mockData.ts`;
- `src/features/yopoy-central-do-dia/types.ts`;
- `src/App.tsx`.

Nenhum arquivo em `src/` foi alterado.
