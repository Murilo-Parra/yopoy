# ERP Yopoy - PostgreSQL Schema Map (DRAFT)

Este documento descreve o mapeamento de alto nível entre as entidades do domínio da aplicação e as tabelas relacionais do PostgreSQL. Não representa um banco de dados em produção, sendo exclusivamente um artefato de planejamento.

## Diretrizes Fundamentais
* Toda tabela terá um `id` UUID como Primary Key.
* Toda tabela multi-tenant (praticamente todas as tabelas de negócio do ERP) *obrigatoriamente* possuirá uma coluna `company_id` UUID, que será avaliada pelo Row Level Security (RLS) do Supabase/PostgreSQL.
* Campos de rastreabilidade operacionais padrão: `created_at`, `updated_at`, `created_by`, `updated_by`.
* Hard deletes não serão recomendados pelas melhores práticas fiscais. Onde necessário, implementaremos `deleted_at`, `deleted_by` e `archived_at` (soft deletes).
* Colunas de metadados não estruturados utilizarão o tipo genérico JSONB.

## Mapeamento de Entidades para Tabelas

| Entidade de Domínio | Tabela PostgreSQL | Propósito Principal |
| :--- | :--- | :--- |
| `Company` | `companies` | Registro de instâncias do ERP mantendo as credenciais raiz (CNPJ). |
| `User` | `users` | Operadores e donos acessando as contas via Auth. Relacionados à empresa de atuação. |
| `Role` | `roles` | Definição de permissões baseadas em RBAC. |
| `Customer` | `customers` | Clientes finais cadastrados para emissão de vendas vinculadas e notas. |
| `Product` | `products` | Itens estocáveis para comercialização e composição de vendas. |
| `Service` | `services` | Referências de serviços intangíveis com definições fiscais próprias. |
| `Sale` | `sales` | Cabeçalho das vendas. É o epicentro da captura do evento comercial. |
| `SaleItem` | `sale_items` | Linhas atômicas de produto/serviço que compõem uma venda. |
| `Payment` | `payments` | Registros de transação financeira recebida da venda, PIX, Cartão, com datas. |
| `PaymentLink` | `payment_links` | Tabela associativa n:m rastreando qual pagamento liquidou qual venda. |
| `CashSession` | `cash_sessions` | Turno de caixa aberto e operado por um dado usuário até fechamento. |
| `CashMovement`| `cash_movements` | Suprimentos e sangrias vinculados a uma sessão de caixa aberta. |
| `Expense` | `expenses` | Custos fixos/variáveis lançados para afetar relatórios financeiros (DRE/Caixa). |
| `Attachment` | `attachments` | Referências para buckets contendo comprovantes PDF/Imagens. |
| `SmartCaptureDraft` | `smart_capture_drafts` | Log e status de extrações de imagem para ticket (AI Vision). |
| `DraftInvoice` | `draft_invoices` | Rascunhos pre-nota que serão futuramente assinados/integrados à Sefaz. |
| `LedgerEntry` | `ledger_entries` | Razão contábil para registro imutável do balanço e liquidez geral. |
| `PendingItem` | `pending_items` | Problemas de backoffice criados por discrepâncias assíncronas do negócio. |
| `AuditLog` | `audit_logs` | Trilha append-only das mutações do ERP (Crucial para auditoria legal). |
| `AccountantPackage` | `accountant_packages` | Lotes de exportações XMLs/PDFs consolidadas ao contador mensalmente. |
