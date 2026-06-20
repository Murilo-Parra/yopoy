# Yopoy — modelo de cards inteligentes e estados

## Conceito

Tudo que entra no sistema vira um card inteligente. O card é a unidade visual de organização do Yopoy: reúne contexto, estado, vínculos, ações e histórico sem obrigar o usuário a completar de imediato todo o fluxo operacional, contábil ou fiscal.

O detalhamento de entidades, relações, transições, auditoria e isolamento multi-tenant está em `docs/product/yopoy-card-conceptual-data-model.md`. Os padrões visuais e os fluxos da Central estão em `docs/product/yopoy-mobile-first-design-system.md` e `docs/product/yopoy-central-visual-ux-blueprint.md`. Este arquivo permanece como visão curta de tipos, estados e experiência dos cards.

## Tipos de card

- `capture`: captura/OCR revisável;
- `command`: comanda;
- `sale`: venda;
- `payment`: pagamento;
- `expense`: despesa;
- `product`: produto;
- `stock_movement`: movimentação de estoque;
- `internal_invoice_draft`: pré-nota ou rascunho interno;
- `accountant_package`: pacote do contador;
- `pending`: pendência;
- `support`: suporte;
- `ai_alert`: alerta de IA;
- `archived_reference`: referência arquivada.

O tipo descreve a função atual do card. Conversões e arquivamentos preservam sua origem e seu histórico.

No V1, um card de preparação fiscal representa somente rascunho, pré-nota ou informação organizada para o contador. Ele não é documento fiscal autorizado, não possui efeito fiscal e não comprova emissão.

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

Nem todo estado se aplica a todo tipo. `issued`, `rejected` e `cancelled` ficam reservados para eventual fluxo fiscal real pós-MVP e não são estados operacionais do MVP.

## Ações universais

- revisar;
- corrigir;
- confirmar;
- vincular;
- desvincular;
- arquivar;
- desarquivar;
- transformar em venda;
- transformar em pré-nota;
- enviar ao contador;
- marcar como pronto para emitir futuramente;
- emitir fiscalmente somente no futuro e com confirmação;
- ignorar com justificativa.

As ações disponíveis dependem do tipo, do estado, da permissão do usuário e do contexto da empresa. Toda ação crítica deve ser explícita e auditável.

## Campos mínimos de um SmartCard

O catálogo de campos conceituais e entidades relacionadas está no modelo conceitual detalhado. Nomes físicos, formatos, nulabilidade e persistência serão decididos em etapa própria, sem antecipar migration ou banco.

## Regras de vínculo

- pagamento pode vincular a venda ou comanda;
- comanda pode virar venda;
- venda pode virar pré-nota;
- pré-nota pode ficar pronta para uma emissão fiscal futura;
- arquivar nunca apaga;
- desvincular preserva histórico.

Um vínculo deve registrar origem, responsável e momento da ação. Conversão não elimina o card anterior: mantém rastreabilidade entre os registros relacionados.

## Regras de confiança

- **Baixa confiança:** apresentar apenas como sugestão.
- **Média confiança:** pedir confirmação antes de aplicar.
- **Alta confiança:** permitir vínculo sugerido com opção clara de desfazer.
- **Ação crítica:** sempre exigir confirmação, independentemente da confiança.

A confiança é contexto para decisão humana, não autorização para ação irreversível.

## Limite fiscal do V1

- os estados internos são “sem nota”, “rascunho”, “pré-nota”, “enviar ao contador” e “pronto para emitir futuramente”;
- rascunho e pré-nota nunca devem ser apresentados como nota emitida;
- emitir e cancelar nota são ações futuras, fora do MVP e nunca automáticas;
- fiscal real, SEFAZ e certificado A1 operacional dependem de uma etapa pós-MVP específica;
- dados preparados agora devem preservar rastreabilidade para uma evolução futura, sem antecipar contrato técnico ou comercial.

## Segurança

A IA pode sugerir, classificar e alertar, mas não pode sozinha:

- emitir nota;
- cancelar nota;
- alterar certificado;
- alterar configuração fiscal crítica;
- alterar estoque definitivo;
- alterar preço;
- enviar ao contador;
- movimentar dinheiro real.

Confirmação, permissão e auditoria são obrigatórias nas ações críticas. O Yopoy não deve apresentar uma sugestão da IA como fato confirmado.

## Experiência mobile

- botões claros;
- ações em poucos toques;
- alternativa ao drag-and-drop;
- toque longo opcional;
- deslizar para arquivar apenas com desfazer;
- nada de depender exclusivamente de arrasto.

A ação principal do card deve permanecer visível e acessível. Estados e consequências precisam ser compreensíveis em tela pequena.

## Experiência desktop

- colunas;
- drag-and-drop;
- filtros;
- busca;
- ações em lote;
- revisão operacional.

O desktop amplia a capacidade de organização, mas mantém as mesmas regras, estados, confirmações e rastreabilidade da experiência mobile.
