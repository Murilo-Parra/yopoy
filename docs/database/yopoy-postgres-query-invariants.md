# Invariantes de Queries Analisados

Todo o sistema PostgreSQL subjaz a um conceito de Multi-tenant Rígido via coluna `company_id`.

## O que foi testado?
O arquivo de teste `postgres-query-company-id-invariants.test.ts` valida que todos os repositórios dry-run instanciados formatam a cláusula `.toContain('company_id = $')`.

* `SaleRepository.findById/listByCompany`: Inspecionado & OK.
* `PaymentRepository.listByCompany/getLinksBySale`: Inspecionado & OK.
* `CashSessionRepository.findById/findActiveSession/listMovements`: Inspecionado & OK.
* `ExpenseRepository.findById/listByCompany`: Inspecionado & OK.
* `LedgerRepository.listByCompany`: Inspecionado & OK.

## Conclusões
O risco de vazamento de dados cruzados de locatários ao executar queries dinamicamente em backend NodeJS encontra-se mitigado no nível de infraestrutura por parametrizações invariantes.
