# Auditoria da Camada de Aplicação (src/application)

Os Casos de Uso formam a regra central das operações no ERP. Foram auditados os requisitos sob todos os arquivos listados em `use-cases`.

## Verificações Universais Realizadas:
- **Nome do caso de uso**: Clara representação de ação (ex. `openCashSession`, `createSale`).
- **Entrada / Saída**: Possuem Interfaces injetadas com Retorno fixo de `Promise<UseCaseResult<T>>`.
- **Erros**: Padronizados no Retorno Failure via construtor custom `error(ErrorCode)`. Extensa de `ApplicationError`.
- **Repositórios, Audit Log e Injeções**: Total suporte à DI nativa em runtime sendo transacionadas via interface (sem import de infraestrutura no Usecase). Audit logs disparados.
- **Segurança (companyId/userId)**: Estão fixos em validação condicional pregressa: `if(!req.companyId){...}` protegendo cross-tenant injection.
- **Regras / Sem External**: Repositórios simulam e Usecase trata apenas business flow. Zero chamadas HTTP/Gateway/SEFAZ diretas em Use cases puristas.

## Classificações dos Use Cases Auditados:
- **cash (`openCashSession`, `closeCashSession`)**: PRONTO 
- **draft-invoices (`createDraftInvoiceFromSale`)**: PRONTO (Lida com simulação in-memory com retorno imune, fiscal bloqueado é delegado à Boundary layer).
- **expenses (`createExpense`)**: PRONTO
- **ledger (`createLedgerEntry`)**: PRONTO (Registra os impactos reais).
- **payments (`registerPayment`, `linkPaymentToSale`, `unlinkPaymentFromSale`)**: PRONTO
- **pending (`createPendingItem`, `resolvePendingItem`)**: PRONTO
- **sales (`createSale`, `addSaleItem`, `markSaleAsPendingPayment`)**: PRONTO
- **smart-capture (`createSmartCaptureDraft`, `convertSmartCaptureDraftToSale`, `review...`)**: PRONTO
- **audit (`recordAuditLog`)**: PRONTO.

Nenhum use case foi identificado como perigoso, duplicado ou mal nomeado. Todos operam sob a base de abstração de interface, validando a ausência de SQL hardcoded nos repositórios.
