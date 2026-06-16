# Matriz de Paridade: Em Memória vs PostgreSQL Dry-Run

| Repository             | Métodos Essenciais                                                      | Status In-Memory | Status PostgreSQL Dry-Run | Ocorrências / Risco                  |
| ---------------------- | ----------------------------------------------------------------------- | ---------------- | ------------------------- | ------------------------------------ |
| SaleRepository         | create, update, findById, listByCompany, addSaleItem                    | Total            | Implementado              | parity_ok                            |
| PaymentRepository      | create, update, findById, listByCompany, createLink, ...                | Total            | Implementado              | parity_ok                            |
| CashSessionRepository  | create, update, findById, findActiveSession, addMovement ...            | Total            | Implementado              | parity_ok                            |
| ExpenseRepository      | create, update, findById, listByCompany, addAttachment                  | Total            | Implementado              | parity_ok                            |
| LedgerRepository       | create, listByCompany                                                   | Total            | Implementado              | parity_ok                            |
| AuditLogRepository     | create, listByCompany                                                   | Total            | Implementado              | parity_ok                            |
| CompanyRepository      | findById, update                                                        | Total            | Parcial/Placeholder       | deferred_to_real_db_setup (Baixo)    |
| CustomerRepository     | findById, list                                                          | Total            | Parcial/Placeholder       | deferred_to_real_db_setup (Baixo)    |
| ProductRepository      | findById, list                                                          | Total            | Parcial/Placeholder       | deferred_to_real_db_setup (Baixo)    |
| PendingItemRepository  | create, flagFinished                                                    | Total            | Parcial/Placeholder       | deferred_to_real_db_setup (Baixo)    |
| SmartCaptureRepository | create, loadDraft                                                       | Total            | Parcial/Placeholder       | deferred_to_real_db_setup (Baixo)    |
| DraftInvoiceRepository | create, load                                                            | Total            | Parcial/Placeholder       | deferred_to_real_db_setup (Baixo)    |

## Status Legend
* **parity_ok**: O repositório Dry-Run cumpre integralmente o contrato de interface esperado.
* **partial**: Implementação dry-run possui algumas respostas omitidas ou falsificadas mas o contrato TypeScript é preenchido.
* **deferred_to_real_db_setup**: Optou-se por focar nas tabelas transacionais cruciais no milestone 47.5 e postergar CRUDs periféricos para 47.6.
