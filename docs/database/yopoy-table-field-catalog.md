# ERP Yopoy - Catálogo de Tabelas e Campos (DRAFT)

Este catálogo documenta a estrutura detalhada das principais tabelas do ERP, projetadas para banco PostgreSQL. A arquitetura reflete necessidades contábeis, multi-tenancy rigorosa (company_id) e modelagem preparada para concorrências financeiras robustas.

---

## 1. sales
Cabeçalho do evento de venda.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Not Null | Identificador Global da Venda. |
| `company_id` | `uuid` | FK, Not Null, Indexed | Chave principal de Multi-tenancy (RLS base). |
| `customer_id` | `uuid` | FK, Nullable | Cliente associado à Venda. |
| `status` | `varchar` | Not Null | Estado da venda (ex: OPEN, CLOSED, CANCELLED). |
| `total_amount` | `numeric(12,2)` | Not Null, Default 0 | Valor bruto/final do cabeçalho da venda. |
| `currency` | `char(3)` | Not Null, Default 'BRL' | Código da moeda. |
| `created_by` | `uuid` | FK, Not Null | Usuário criador da ordem. |
| `updated_by` | `uuid` | FK, Nullable | Último usuário a alterar o estado. |
| `created_at` | `timestamptz` | Not Null, Default now() | Data/hora exata do registro comercial. |
| `updated_at` | `timestamptz` | Nullable | Data/hora de alteração temporal. |
| `cancelled_at` | `timestamptz`| Nullable | Timestamp de cancelamento efetivo. |
| `cancelled_by` | `uuid` | FK, Nullable | Usuário responsável pelo cancelamento. |
| `metadata` | `jsonb` | Nullable | Informações arbitrárias extras. |

---

## 2. sale_items
Itens acoplados obrigatoriamente a uma venda existente em Cascade.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Not Null | ID do item inserido. |
| `company_id` | `uuid` | FK, Not Null, Indexed | RLS enforcement - Redundante, mas essencial para queries e segregações. |
| `sale_id` | `uuid` | FK, Not Null, Indexed | Venda pai associada. |
| `product_id` | `uuid` | FK, Nullable | Identificador de mercadoria no estoque. |
| `service_id` | `uuid` | FK, Nullable | Identificador de serviço em tabela de serviços. |
| `description` | `varchar` | Nullable | Sobrescrição textual da descrição. |
| `quantity` | `numeric(10,3)` | Not Null | Volume comercializado (Permite inteiros ou decimais pra peso). |
| `unit_price` | `numeric(12,2)` | Not Null | Preço congelado no momento da venda (imutável nesta tabela pós fechamento). |
| `total_amount` | `numeric(12,2)` | Not Null | `quantity * unit_price` já calculado por performance. |
| `created_at` | `timestamptz` | Not Null, Default now() | Quando adicionado no carrinho/pdv. |
| `updated_at` | `timestamptz` | Nullable |  |

---

## 3. payments
Documento isolado que atesta uma promessa ou transação líquida de valor no ERP. Pode existir livre e órfão até conciliação. 

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Not Null | - |
| `company_id` | `uuid` | FK, Not Null, Indexed | RLS tenant enforcement. |
| `status` | `varchar` | Not Null | PENDING, PROCESSED, REJECTED, REFUNDED |
| `amount` | `numeric(12,2)` | Not Null | Montante recebido ou transacionado. |
| `currency` | `char(3)` | Not Null, Default 'BRL' | - |
| `method` | `varchar` | Not Null | PIX, CREDIT_CARD, BOLETO, MONEY |
| `paid_at` | `timestamptz` | Nullable | Quando liquidez confirmou (vazia se pending payment). |
| `source` | `varchar` | Nullable | "MANUAL", "TEF", "WEBHOOK" |
| `external_reference` | `varchar` | Nullable, Indexed | Transaction ID do provedor/gateway. |
| `created_by` | `uuid` | FK, Not Null | - |
| `updated_by` | `uuid` | FK, Nullable | - |
| `created_at` | `timestamptz` | Not Null | - |
| `updated_at` | `timestamptz` | Nullable | - |
| `metadata` | `jsonb` | Nullable | Webhook bodies brutos temporários, etc. |

---

## 4. payment_links
Ligação de Quitação e Conciliação entre pagamento livre e vendas pendentes. Essa é uma ponte imutável e geradora de passivo.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Not Null | - |
| `company_id` | `uuid` | FK, Not Null, Indexed | RLS tenant enforcement. |
| `payment_id` | `uuid` | FK, Not Null, Indexed | O recebimento financeiro. |
| `sale_id` | `uuid` | FK, Not Null, Indexed | O título mercantil (Venda). |
| `status` | `varchar` | Not Null | ACTIVE / REVERSED. |
| `linked_at`| `timestamptz` | Not Null | Quando foi vinculado. |
| `linked_by`| `uuid` | FK, Not Null | Quem ordenou o vínculo (Usuário/Sistema). |
| `unlinked_at` | `timestamptz`| Nullable | Caso revertido manual ou disputa de estorno. |
| `unlinked_by` | `uuid` | Nullable | Quem rompeu a ligação financeira. |
| `reason` | `varchar` | Nullable | Motivo inserido quando desfeito. |
| `created_at` | `timestamptz` | Not Null | - |
| `updated_at` | `timestamptz` | Nullable | - |

---

## 5. smart_capture_drafts & draft_invoices
Essas tabelas representam objetos interinos sem peso fiscal validado. NELA É PROIBIDO CHAVES DA SEFAZ e Assinaturas Fiscais (Módulo MVP bloqueia tributação exposta).

A `smart_capture_drafts` tem life cycle voltado pra parse LMM / OCR:
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `raw_text` | `text` | Prompt puro original injetado (Ex "Uma coca e 2 pães"). |
| `image_attachment_id` | `uuid` | FK pra anexos se for leitura OCR/Visão. |
| `recognized_items` | `jsonb` | Resultado cru estruturado retornado da IA/parser. |
| `converted_to_type`| `varchar` | O que ele formou após aprovação ("SALE", "EXPENSE"). |
| `converted_to_id` | `uuid` | FK dinâmico pro ticket criado pela IA. |

A `draft_invoices` é uma pré-visualização contábil ou "proforma" pronta pra gerar NF num módulo posterior liberado.

---

## 6. audit_logs
A trilha de Append-Only suprema. Não deve possuir foreign keys estritas a `entity_id` já que dados arquivados fariam a FK violar restrições caso fossem removidos. O `entity_id` deve ser puramente UUID lógico acompanhado do Snapshot para eternização da string contextual no tempo. `before_snapshot` e `after_snapshot` guardam JSON puro do estado antes/depois da mutação.

## 7. ledger_entries
Todo comportamento do sistema que mova capital ou crie passivos se baseia e se encerra escrevendo linhas cumulativas tipo balancete na Ledgers Entries.

| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `uuid` | - |
| `company_id` | `uuid` | - |
| `source_type` | `varchar` | SALE, REFUND, EXPENSE, CASH_DEPOSIT |
| `source_id` | `uuid` | Identificador dinâmico atrelando a ação à fonte origintária do lançamento. |
| `direction` | `varchar` | CREDITO / DEBITO |
| `amount` | `numeric(12,2)` | Montante. |
| `currency` | `char(3)` | BRL |
| `category` | `varchar` | PLANO_CONTAS categorizador da origem mercantil. |
| `occurred_at` | `timestamptz`| Event Time comercial. |
