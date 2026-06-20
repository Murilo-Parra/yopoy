# Yopoy — modelo conceitual de dados dos cards

## Objetivo

Este documento define o modelo conceitual dos cards inteligentes que sustentam a Central Visual Inteligente/Mesa de Organização do Yopoy. Ele orienta futuras decisões de produto, migrations, APIs e telas, mas não representa migration, schema físico, API, contrato técnico ou implementação.

Nomes, tipos físicos, nulabilidade, índices, estratégia de persistência e contratos serão definidos somente nas etapas técnicas correspondentes.

## Princípios

- tudo que entra no Yopoy vira card;
- o card preserva origem e histórico;
- arquivar nunca apaga;
- conversão não destrói o registro anterior;
- todo vínculo preserva rastreabilidade;
- o usuário controla ações críticas;
- a IA sugere, mas não executa ação crítica sozinha;
- emissão fiscal real está fora do MVP.

O fluxo de produto permanece: registrar primeiro, organizar depois, conciliar quando possível, enviar ao contador se o usuário quiser e emitir nota somente no futuro, quando a função fiscal real existir e o usuário confirmar.

## Entidades conceituais

### `SmartCard`

- **Finalidade:** unidade visual comum da operação, usada para organizar entradas, registros, pendências e referências na Central Visual.
- **Campos conceituais mínimos:** `id`, `company_id`, `type`, `status`, `origin`, `title`, `description`, `total_amount`, `currency`, `occurred_at`, `created_by`, `updated_by`, `archived_at`, `confidence_score`, `metadata`, `created_at`, `updated_at`.
- **Relações:** pertence a uma `Company`; é criado e atualizado por `User`; pode representar ou referenciar um registro especializado; possui vínculos, anexos e eventos de auditoria; pode receber sugestões de IA.
- **Observações:** `metadata` acomoda contexto variável, mas não substitui campos estruturados que sejam necessários para integridade, busca ou auditoria. Tipo e estado são conceitos distintos.

### `SmartCardLink`

- **Finalidade:** representar uma relação rastreável entre dois cards, como origem, conversão, conciliação, composição ou referência.
- **Campos conceituais mínimos:** `id`, `company_id`, `source_card_id`, `target_card_id`, `link_type`, `status`, `created_by`, `removed_by`, `created_at`, `removed_at`, `reason`.
- **Relações:** conecta dois `SmartCard` da mesma `Company`; a criação ou remoção gera `SmartCardAuditEvent`.
- **Observações:** desvincular inativa o vínculo e preserva seu histórico; não apaga a relação anterior.

### `SmartCardAttachment`

- **Finalidade:** associar ao card uma foto, comprovante, imagem de produto ou documento de apoio.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `attachment_type`, `file_reference`, `original_name`, `content_type`, `size`, `checksum`, `uploaded_by`, `created_at`, `archived_at`, `metadata`.
- **Relações:** pertence a um `SmartCard`, uma `Company` e ao `User` que realizou o envio.
- **Observações:** o arquivo deve ser tratado como evidência de apoio, não como prova automática de liquidação ou emissão fiscal.

### `SmartCardAuditEvent`

- **Finalidade:** registrar de forma imutável o que ocorreu com um card ou entidade relacionada.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `event_type`, `actor_user_id`, `occurred_at`, `reason`, `previous_state`, `new_state`, `correlation_id`, `metadata`.
- **Relações:** pertence a uma `Company`; pode referenciar `SmartCard`, `UserAction`, `User` e entidades operacionais relacionadas.
- **Observações:** eventos não devem ser alterados para reescrever o passado; correções geram novos eventos.

### `CaptureRecord`

- **Finalidade:** preservar a entrada bruta ou interpretada de foto, texto manual, OCR ou outra captura que possa originar um card operacional.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `capture_type`, `raw_content_reference`, `extracted_content`, `confidence_score`, `review_status`, `captured_by`, `captured_at`, `metadata`.
- **Relações:** pertence a um card `capture`; pode originar card `command` ou `sale`; pode usar `SmartCardAttachment` e gerar `AiSuggestion`.
- **Observações:** conteúdo extraído é sempre rascunho revisável; OCR não define a verdade operacional.

### `SaleRecord`

- **Finalidade:** representar o registro operacional interno de uma venda.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `sale_number`, `occurred_at`, `subtotal`, `discount_amount`, `total_amount`, `currency`, `customer_reference`, `created_by`, `created_at`, `updated_at`.
- **Relações:** pertence a um card `sale`; pode vir de captura ou comanda; vincula produtos, pagamentos, movimentos de estoque e rascunho interno de nota.
- **Observações:** venda registrada não significa pagamento liquidado nem documento fiscal emitido.

### `PaymentRecord`

- **Finalidade:** registrar internamente um pagamento informado ou observado para posterior conferência e vínculo.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `payment_method`, `amount`, `currency`, `occurred_at`, `reference`, `reconciliation_status`, `created_by`, `created_at`, `updated_at`.
- **Relações:** pertence a um card `payment`; pode vincular-se a uma ou mais vendas conforme regra futura; pode permanecer sem vínculo ou ser desvinculado.
- **Observações:** não movimenta dinheiro. Comprovante anexo não confirma liquidação bancária.

### `CashSession`

- **Finalidade:** delimitar a abertura, os registros e o fechamento de uma jornada de caixa.
- **Campos conceituais mínimos:** `id`, `company_id`, `status`, `opened_at`, `opened_by`, `opening_amount`, `closed_at`, `closed_by`, `closing_amount`, `expected_amount`, `difference_amount`, `currency`, `metadata`.
- **Relações:** pertence a uma `Company`; agrega referências a vendas, pagamentos e movimentos internos do período; gera eventos de auditoria.
- **Observações:** fechamento e divergência exigem confirmação; a sessão é controle operacional, não extrato bancário.

### `ProductRecord`

- **Finalidade:** representar um item cadastrado para venda e controle básico de estoque.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `name`, `sku`, `barcode`, `unit`, `sale_price`, `active`, `created_by`, `created_at`, `updated_at`.
- **Relações:** pertence a um card `product`; pode participar de `SaleRecord` e `StockMovement`.
- **Observações:** preço e saldo definitivo não podem ser alterados apenas por sugestão de IA.

### `StockMovement`

- **Finalidade:** registrar entrada, saída ou ajuste rastreável de quantidade de produto.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `product_id`, `movement_type`, `quantity`, `occurred_at`, `source_reference`, `reason`, `created_by`, `created_at`.
- **Relações:** pertence a um produto e a um card `stock_movement`; pode referenciar uma venda ou ação manual; gera auditoria.
- **Observações:** movimentos são registros históricos; correções devem ser compensatórias ou auditáveis, nunca apagamentos silenciosos.

### `InternalInvoiceDraft`

- **Finalidade:** organizar dados internos de rascunho ou pré-nota para revisão, contador ou capacidade fiscal futura.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `source_sale_id`, `draft_number`, `status`, `party_data`, `items`, `totals`, `notes`, `created_by`, `reviewed_by`, `created_at`, `updated_at`.
- **Relações:** pertence a um card `internal_invoice_draft`; deriva de venda sem destruí-la; pode integrar `AccountantPackage`.
- **Observações:** não é NF-e, NFC-e ou NFS-e, não possui autorização fiscal e não deve imitar ou alegar ser DANFE fiscal real.

### `AccountantPackage`

- **Finalidade:** agrupar dados e documentos internos selecionados pelo usuário para exportação ao contador.
- **Campos conceituais mínimos:** `id`, `company_id`, `card_id`, `status`, `period_start`, `period_end`, `included_references`, `created_by`, `exported_by`, `created_at`, `exported_at`, `metadata`.
- **Relações:** pertence a um card `accountant_package`; agrega rascunhos, vendas e documentos de apoio da mesma empresa.
- **Observações:** exportar ou enviar ao contador exige ação humana e não representa emissão, transmissão ou autorização fiscal.

### `AiSuggestion`

- **Finalidade:** registrar uma recomendação revisável de classificação, vínculo, divergência ou próximo passo.
- **Campos conceituais mínimos:** `id`, `company_id`, `suggestion_type`, `target_card_ids`, `proposed_action`, `confidence_score`, `explanation`, `status`, `created_at`, `reviewed_by`, `reviewed_at`, `metadata`.
- **Relações:** pode apontar para um ou mais cards da mesma empresa; sua aceitação ou rejeição gera `UserAction` e auditoria.
- **Observações:** não altera dados definitivos por si; ações críticas sempre exigem confirmação explícita.

### `UserAction`

- **Finalidade:** representar a intenção e a confirmação humana por trás de uma mudança operacional.
- **Campos conceituais mínimos:** `id`, `company_id`, `user_id`, `action_type`, `target_type`, `target_id`, `confirmation_status`, `reason`, `occurred_at`, `correlation_id`, `metadata`.
- **Relações:** pertence a `User` e `Company`; pode confirmar `AiSuggestion` e produzir um ou mais eventos de auditoria.
- **Observações:** não substitui o evento de auditoria; conecta a decisão humana aos efeitos gerados.

### `Company`

- **Finalidade:** representar o tenant que possui e isola todos os dados operacionais.
- **Campos conceituais mínimos:** `id`, `name`, `status`, `created_at`, `updated_at`.
- **Relações:** possui usuários autorizados, cards e todas as entidades operacionais.
- **Observações:** dados operacionais da empresa permanecem separados dos dados administrativos do SaaS.

### `User`

- **Finalidade:** representar a pessoa autenticada que consulta ou executa ações no contexto de uma empresa.
- **Campos conceituais mínimos:** `id`, `status`, `created_at`, `updated_at`; associação conceitual à empresa atual e às permissões aplicáveis.
- **Relações:** atua em uma `Company` autorizada; cria, atualiza, vincula, confirma e arquiva registros; aparece na auditoria.
- **Observações:** identidade global, associação a empresas e permissões serão detalhadas em modelo próprio; nenhuma ação operacional pode usar uma empresa fora do contexto autorizado.

## Tipos de `SmartCard`

- `capture`: entrada bruta ou rascunho de captura;
- `command`: comanda em revisão ou organização;
- `sale`: venda operacional interna;
- `payment`: pagamento informado para conferência;
- `expense`: despesa interna;
- `product`: referência visual de produto;
- `stock_movement`: movimentação de estoque;
- `internal_invoice_draft`: rascunho interno ou pré-nota;
- `accountant_package`: pacote preparado para contador;
- `pending`: pendência operacional genérica;
- `support`: item de suporte;
- `ai_alert`: alerta ou sugestão contextual de IA;
- `archived_reference`: referência arquivada preservada para consulta.

## Estados universais

- `draft`;
- `needs_review`;
- `unlinked`;
- `linked`;
- `divergent`;
- `ready`;
- `archived`;
- `converted_to_sale`;
- `converted_to_internal_invoice_draft`;
- `sent_to_accountant`;
- `ready_for_future_fiscal_issue`;
- `ignored_with_reason`.

Nem todo estado se aplica a todo tipo de card. `issued`, `rejected` e `cancelled` não são estados operacionais do MVP; ficam reservados para eventual fluxo fiscal real pós-MVP, com modelo e significado próprios.

## Relações principais

- um card `capture` pode originar um card `command` ou `sale`;
- uma comanda pode ser convertida em venda sem desaparecer;
- uma venda pode vincular-se a um pagamento;
- um pagamento pode permanecer sem vínculo;
- um pagamento pode ser desvinculado, preservando o vínculo inativo e a auditoria;
- uma venda pode ser convertida em rascunho interno de nota;
- um rascunho pode integrar um pacote do contador;
- um pacote do contador pode ser exportado por decisão do usuário;
- um produto pode vincular-se a vendas e movimentações de estoque;
- toda ação operacional gera evento de auditoria;
- uma sugestão de IA pode apontar para um ou mais cards, mas sua aplicação precisa de confirmação.

Conversões criam um novo registro e um vínculo de origem; nunca sobrescrevem nem apagam o registro anterior.

## Transições de estado

| De | Para | Ação | Quem pode executar | Exige confirmação? | Gera auditoria? | Observação |
|---|---|---|---|---|---|---|
| `draft` | `needs_review` | submeter para revisão | usuário autorizado ou fluxo de captura | Não para submissão manual; sim se automatizada | Sim | O conteúdo continua revisável. |
| `needs_review` | `ready` | revisar e confirmar | usuário autorizado | Sim | Sim | Confirma apenas o registro interno. |
| `ready` | `converted_to_sale` | converter em venda | usuário autorizado | Sim | Sim | Cria venda e vínculo; preserva o card de origem. |
| `unlinked` em card `sale` | `linked` | vincular venda e pagamento | usuário autorizado | Sim | Sim | Ambos devem pertencer à mesma empresa. |
| `linked` | `unlinked` | desvincular pagamento | usuário autorizado | Sim | Sim | O vínculo fica inativo e rastreável. |
| qualquer estado ativo | `archived` | arquivar | usuário autorizado | Sim, com desfazer acessível | Sim | Registra o estado anterior para restauração. |
| `archived` | estado anterior | desarquivar | usuário autorizado | Sim | Sim | Restaura o último estado ativo válido, não um estado inferido. |
| `ready` | `converted_to_internal_invoice_draft` | criar rascunho interno de nota | usuário autorizado | Sim | Sim | Cria novo rascunho sem efeito fiscal. |
| `converted_to_internal_invoice_draft` | `sent_to_accountant` | incluir/exportar ou confirmar envio ao contador | usuário autorizado | Sim | Sim | Registra conteúdo, responsável e momento. |
| `sent_to_accountant` | `ready_for_future_fiscal_issue` | marcar preparação como pronta | usuário autorizado | Sim | Sim | Não significa emissão nem autorização fiscal. |
| qualquer `AiSuggestion` pendente | ação confirmada pelo usuário | aceitar sugestão e aplicar ação proposta | usuário autorizado | Sempre | Sim | Registra sugestão, confirmação e efeitos separadamente. |

Transições inválidas devem ser recusadas no domínio futuro, não apenas escondidas na interface. Permissão, tipo do card, estado atual e contexto da empresa participam da decisão.

## Auditoria

Eventos mínimos:

- `card_created`;
- `card_updated`;
- `card_archived`;
- `card_unarchived`;
- `card_converted`;
- `link_created`;
- `link_removed`;
- `attachment_added`;
- `payment_marked_divergent`;
- `cash_session_opened`;
- `cash_session_closed`;
- `stock_movement_created`;
- `invoice_draft_created`;
- `accountant_package_created`;
- `accountant_package_exported`;
- `ai_suggestion_created`;
- `ai_suggestion_accepted`;
- `ai_suggestion_rejected`.

Cada evento deve identificar empresa, momento, ator ou origem sistêmica, alvo, correlação e dados suficientes para explicar a mudança. Valores anteriores e novos devem ser registrados quando relevantes, respeitando minimização e proteção de dados sensíveis.

## Regras multi-tenant

- toda entidade operacional tem `company_id`;
- nenhum card pode ser vinculado a card de outra empresa;
- anexos pertencem à empresa do card;
- auditoria pertence à empresa da operação;
- o usuário só age dentro da empresa atual e autorizada;
- dados de administração do SaaS ficam separados dos dados operacionais das empresas;
- nunca se deve confiar apenas no front-end para isolamento;
- toda consulta, mutação, vínculo, exportação e acesso a arquivo deve validar o tenant no backend e na persistência futura;
- referências compostas e ações em lote também devem preservar o mesmo `company_id`.

## Regras de arquivamento

- arquivar não apaga;
- o arquivado sai da visualização principal, mas permanece consultável;
- deve ser possível restaurar o estado anterior válido;
- o motivo pode ser opcional ou obrigatório conforme o tipo e o risco da ação;
- o histórico permanece íntegro;
- vínculos podem ser mantidos ou marcados como inativos, mas nunca desaparecem sem auditoria;
- registros necessários à auditoria, conciliação ou pacote do contador não podem ser eliminados por arquivamento do card.

## Regras de anexos

Anexos aceitos conceitualmente incluem:

- foto de comanda;
- comprovante;
- imagem de produto;
- documento de apoio.

Um anexo não comprova pagamento liquidado e não comprova nota fiscal emitida. OCR ou extração sobre anexo gera rascunho e confiança estimada, não verdade definitiva. Correção, descarte e arquivamento devem preservar autoria e histórico.

## Regras de IA

- IA cria sugestão, não alteração definitiva;
- toda sugestão possui nível de confiança e explicação suficiente para revisão;
- baixa confiança: apenas exibir;
- média confiança: pedir confirmação;
- alta confiança: sugerir com opção clara de desfazer;
- ações críticas exigem confirmação sempre, independentemente da confiança;
- IA não emite nota, não altera estoque definitivo, não envia ao contador e não movimenta dinheiro;
- aceitação, rejeição e efeitos de uma sugestão são auditados separadamente.

## Limite fiscal do MVP

- `InternalInvoiceDraft` é somente rascunho e preparação interna;
- pré-nota não é nota fiscal;
- pacote do contador não é emissão fiscal;
- `ready_for_future_fiscal_issue` significa “pronto para emitir futuramente”, não “emitido”;
- NF-e, NFC-e e NFS-e reais ficam fora do MVP;
- SEFAZ, certificado A1 operacional, XML/DANFE fiscal real e cancelamento fiscal real ficam para pós-MVP/add-on futuro;
- estados de emissão, rejeição e cancelamento fiscal real são reservados para um modelo pós-MVP próprio;
- nenhuma entidade deste documento implica autorização, transmissão ou validade fiscal.

## Riscos a validar antes de implementação

- excesso de tipos de card prejudicar a compreensão;
- usuário confundir pré-nota com nota fiscal;
- drag-and-drop funcionar mal no mobile ou virar a única forma de interação;
- arquivamento ser usado ou percebido como exclusão;
- IA gerar confiança falsa;
- vínculo incorreto entre venda e pagamento;
- estoque ser alterado sem revisão;
- mistura entre dados operacionais e dados de administração do SaaS.

Esses riscos devem ser validados com protótipos e fluxos manuais antes de definir schema físico ou automações.

## Próxima etapa recomendada

Validar este modelo no protótipo conceitual `48.1 — Protótipo da Central Visual`, seguindo `docs/product/yopoy-mobile-first-design-system.md` e `docs/product/yopoy-central-visual-ux-blueprint.md`, antes de definir banco, API ou código de interface.
