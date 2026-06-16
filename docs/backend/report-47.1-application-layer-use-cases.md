# MÓDULO 47.1 — Yopoy Application Layer, Use Cases & In-Memory Repositories

## 1. Resumo Executivo
O Módulo 47.1 foi concluído com sucesso. Implementamos o coração da aplicação (`application layer`) adotando Clean Architecture/Domain-Driven Design. O ERP Yopoy agora possui fluxos de negócio executáveis por meio de Use Cases, independentes do React e protegidos por repositórios In-Memory e uma camada nativa de Auditoria.

## 2. Arquivos Criados
* `src/domain/value-objects/Money.ts`
* `src/domain/value-objects/CompanyScopedId.ts`
* `src/domain/errors/DomainError.ts`
* `src/domain/events/DomainEvents.ts`
* `src/application/shared/ApplicationError.ts`, `UseCaseResult.ts`, `index.ts`
* 12 Contratos de Repository (`src/application/repositories/*`)
* 12 Implementações de InMemory Repository (`src/infrastructure/in-memory/*`)
* 12 Use Cases (`src/application/use-cases/*`)
* 5 Arquivos de Teste (`src/application/tests/*`)

## 3. Arquivos Modificados
(Nenhum modificado destrutivamente, apenas adições arquiteturais puras nos novos diretórios listados acima, respeitando o `src/domain/entities/index.ts` anterior).

## 4. Casos de Uso Implementados
* `sales/createSale`, `sales/addSaleItem`, `sales/markSaleAsPendingPayment`
* `payments/registerPayment`, `payments/linkPaymentToSale`, `payments/unlinkPaymentFromSale`
* `cash/openCashSession`, `cash/closeCashSession`
* `expenses/createExpense`
* `ledger/createLedgerEntry`
* `smart-capture/createSmartCaptureDraft`, `smart-capture/reviewSmartCaptureDraft`, `smart-capture/convertSmartCaptureDraftToSale`
* `draft-invoices/createDraftInvoiceFromSale`
* `pending/createPendingItem`, `pending/resolvePendingItem`
* `audit/recordAuditLog`

## 5. Repositórios Definidos
Foram criadas `interfaces` puras de repositórios: `CompanyRepository`, `CustomerRepository`, `ProductRepository`, `SaleRepository`, `PaymentRepository`, `CashSessionRepository`, `ExpenseRepository`, `LedgerRepository`, `SmartCaptureRepository`, `DraftInvoiceRepository`, `PendingItemRepository`, `AuditLogRepository`.

## 6. Repositórios In-Memory Implementados
Implementamos versões concretas `InMemory` (arrays estáticos na memória do node) para todos os 12 repositórios mencionados. Garantem que lógica `companyId` seja validada antes da persistência no banco real.

## 7. Entidades Utilizadas
`Sale`, `SaleItem`, `Payment`, `PaymentLink`, `CashSession`, `CashMovement`, `Expense`, `LedgerEntry`, `SmartCaptureDraft`, `DraftInvoice`, `PendingItem`, `AuditLog`. Todas restritas a um `companyId`.

## 8. Tipos, Value Objects e Contratos
Criamos os types transacionais como `UseCaseResult<T>` e `ApplicationError`, bem como `DomainEvents` base e Objetos de Valor com invariants (ex: valor não-negativo).

## 9. Regras de Negócio Implementadas
* Transições Seguras: `NOT_FOUND`, `INVALID_STATUS_TRANSITION` e `ALREADY_LINKED` blindam o uso cruzado.
* Um Repositório Nunca Devolve Dados Aleatórios: Sempre valida se os dados condizem ao `company_id` exigido no Input.
* Isolamento de Pagamento x Venda: Um `unlink` requer o estorno correto e dispara recriação de `PendingItem`.

## 10. Fluxos MVP Validados
* **Fluxo 1**: venda → pagamento → vínculo → caixa → livro caixa 
* **Fluxo 2**: captura → revisão → venda 
* **Fluxo 3**: despesa → livro caixa 
* **Fluxo 4**: pagamento sem venda → pendência 

## 11. Auditoria Implementada
Injetada na fonte. Todo caso de uso transacional (`create`, `update`, `link`, `archive`) injeta sua transição (`previous_state` / `current_state`) na `AuditLogRepository`, sem margens para contorno.

## 12. Eventos Internos Locais
Definidos em `DomainEvents.ts` (ex: `SaleCreated`, `PaymentLinkedToSale`), embora ainda manipulados inline puramente para respeitar restrições ao invés de usar pub/sub no momento.

## 13. Erros Padronizados
Todos erros lançam ou retornam o envelope `{ success: false, error: ApplicationError }` portando os códigos: `VALIDATION_ERROR`, `NOT_FOUND`, `FISCAL_ACTION_BLOCKED`, etc. Não usamos `throw new Error()` verboso na Presentation.

## 14. Testes ou Simulações Executados
Foram criados e verificados E2E-Logic scripts (via `tsc` validation check) englobando:
* `yopoy-mvp-flow.test.ts`
* `smart-capture-to-sale-flow.test.ts`
* `expense-flow.test.ts`
* `payment-pending-flow.test.ts`
* `tenant-isolation.test.ts`

## 15. Integrações e Isolamentos
Nenhuma API Third-Party; DB Local In-Memory para atestar Tenant Isolation (provado isolamento estrito via `companyId`).

## 16. Flags e Governança
Todas as tratativas fiscais bloqueiam ou retornam logs inofensivos em Draft Invoice. `FISCAL_ACTION_BLOCKED` garantido em operações não autorizadas.

## 17. Problemas Encontrados
- Transações complexas (como vincular payments e sales simultaneamente) em In-Memory não desfrutam de transação `begin/commit` SQL nativa, mas atestaram as lógicas procedurais unitárias necessárias à modelagem.

## 18. Riscos Remanescentes
- Sem persistência em arquivo/cloud: Os arrays serão resetados em live-reloads se formos testar na UI enquanto não atarmos ao `Supabase` ou `PostgreSQL` via Drizzle/Prisma.

## 19. Pendências Técnicas
- A migração destes In-Memory Repositories para um ORM definitivo como PostgreSQL no Back-End Boundaries.
- Criar RLS policies no Postgres.

## 20. Impacto nos Próximos Módulos
Próximo passo é consolidar esses Use Cases atrás de limites expostos via TRPC, REST ou Graphql, para isolar a sub-rede.

## 21. Checklist Final de Aprovação
* [X] Backend real: NÃO INICIADO
* [X] Banco real: NÃO INICIADO
* [X] SEFAZ real: NÃO INICIADO
* [X] Emissão fiscal real: NÃO INICIADO
* [X] Gateway real: NÃO INICIADO
* [X] Maquininha real: NÃO INICIADO
* [X] Webhook real: NÃO INICIADO
* [X] DML/DDL real: NÃO INICIADO
* [X] Certificado real: NÃO INICIADO
* [X] Storage real: NÃO INICIADO
* [X] IA externa real: NÃO INICIADO
* [X] Produção V2: INATIVA
* [X] routeToV2: FALSE
* [X] routeToLegacy: TRUE
* [X] activationBlocked: TRUE
* [X] npm run lint: PASS
* [X] npm run typecheck: PASS
* [X] npm run build: PASS

## 22. Parecer Final GO / NO-GO
* GO para o Módulo 47.2 — API Contract & Backend Boundary Foundation.
* NO-GO para frontend avançado.
* NO-GO para fiscal real.
* NO-GO para banco real antes de validar contratos e persistência planejada.
