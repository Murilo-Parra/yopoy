# Yopoy — modelo de cards inteligentes e estados

## Conceito

Tudo que entra no sistema vira um card inteligente. O card é a unidade visual de organização do Yopoy: reúne contexto, estado, vínculos, ações e histórico sem obrigar o usuário a completar de imediato todo o fluxo operacional, contábil ou fiscal.

## Tipos de card

- Comanda fotografada;
- Captura/OCR;
- Venda;
- Pagamento;
- Despesa;
- Produto/estoque;
- Pré-nota;
- Documento fiscal;
- Pendência;
- Arquivado;
- Suporte;
- Alerta de IA.

O tipo descreve a função atual do card. Conversões e arquivamentos preservam sua origem e seu histórico.

## Estados universais

- `rascunho`;
- `revisar`;
- `sem_vinculo`;
- `vinculado`;
- `divergente`;
- `pronto`;
- `arquivado`;
- `convertido_em_venda`;
- `convertido_em_pre_nota`;
- `enviado_ao_contador`;
- `emitido`;
- `rejeitado`;
- `cancelado`.

Nem todo estado se aplica a todo tipo. Cada fluxo futuro deverá declarar as transições válidas, sem alterar o significado universal dos estados.

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
- preparar emissão fiscal;
- emitir fiscalmente somente com confirmação;
- ignorar com justificativa.

As ações disponíveis dependem do tipo, do estado, da permissão do usuário e do contexto da empresa. Toda ação crítica deve ser explícita e auditável.

## Campos mínimos de um SmartCard

- `id`;
- `company_id`;
- `tipo`;
- `origem`;
- `status`;
- `título`;
- `descrição`;
- `valor_total`;
- `data/hora`;
- `anexos`;
- `vínculos`;
- `confiança`;
- `criado_por`;
- `atualizado_por`;
- `audit_log`;
- `metadata`.

Esta é uma definição conceitual. Nomes físicos, formatos, nulabilidade e persistência serão decididos em etapa própria, sem antecipar migration ou banco.

## Regras de vínculo

- pagamento pode vincular a venda ou comanda;
- comanda pode virar venda;
- venda pode virar pré-nota;
- pré-nota pode virar documento fiscal;
- arquivar nunca apaga;
- desvincular preserva histórico.

Um vínculo deve registrar origem, responsável e momento da ação. Conversão não elimina o card anterior: mantém rastreabilidade entre os registros relacionados.

## Regras de confiança

- **Baixa confiança:** apresentar apenas como sugestão.
- **Média confiança:** pedir confirmação antes de aplicar.
- **Alta confiança:** permitir vínculo sugerido com opção clara de desfazer.
- **Ação crítica:** sempre exigir confirmação, independentemente da confiança.

A confiança é contexto para decisão humana, não autorização para ação irreversível.

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
