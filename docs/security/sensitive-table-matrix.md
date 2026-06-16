# Sensitive Table Matrix

| Tabela | Company ID? | RLS? | FORCE RLS? | USING | WITH CHECK | Múltiplos Tenants? | View Frontend? | Pessoais?| Financeiros? |
| - | - | - | - | - | - | - | - | - | - |
| companies | Não (id = próprio tenant) | Sim | Sim | Sim | Sim | Não | Sim | Sim | Não |
| users | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não |
| customers | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não |
| products | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Não |
| services | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Não |
| sales | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| sale_items | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| payments | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| payment_links| Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| cash_sessions| Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| cash_movements| Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| expenses | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| ledger_entries| Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| pending_items| Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Não |
| audit_logs | Sim | Sim | Sim | Sim | Sim | Sim | Não | Não | Sim |
| smart_capture_drafts| Sim | Sim | Sim | Sim | Sim | Sim | Não | Não | Não |
| draft_invoices| Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Sim |
| attachments | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Não | Não |
