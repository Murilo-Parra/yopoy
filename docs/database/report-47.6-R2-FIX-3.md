# Módulo 47.6-R2-FIX-3 — Corrigir RLS Real e Unit of Work no PostgreSQL Local Nativo

## 1. Arquivos alterados
- `src/infrastructure/postgres/schema/local/002_init_local_rls.sql`
- `src/infrastructure/postgres-native/tests/native-rls-isolation.test.ts`
- `src/infrastructure/postgres-native/tests/native-unit-of-work.test.ts`
- `src/infrastructure/postgres/scripts/reset-native-local-db.ts`
- `src/infrastructure/postgres/scripts/run-native-local-migrations.ts`
- `src/infrastructure/postgres/scripts/assert-native-local-db.ts`
- Testes foram parametrizados com `override: true` no carregamento via `dotenvx`.

## 2. Como o RLS foi corrigido
Reescrevemos o arquivo de inicialização de RLS `002_init_local_rls.sql`, utilizando um loop via bloco dinâmico (`DO $$`) do Postgres para garantir a criação limpa tanto das policies por tenant (`company_id`) quanto nas tabelas roots de company.

## 3. FORCE ROW LEVEL SECURITY foi aplicado?
**SIM**. Aplicado individualmente para cada tabela multi-tenant no `002_init_local_rls.sql`.

## 4. Quais tabelas receberam RLS
`companies`, `users`, `sales`, `payments`, `payment_links`, `audit_logs`, `customers`, `products`, `services`, `sale_items`, `cash_sessions`, `cash_movements`, `expenses`, `ledger_entries`, `pending_items`, `smart_capture_drafts`, `draft_invoices`, `attachments`.

## 5. Como o contexto app.current_company_id é aplicado
As policies utilizam `USING (company_id::text = current_setting('app.current_company_id', true))` com `WITH CHECK` simétrico. A inicialização de cada transação nativo via UoW manda um `SELECT set_config('app.current_company_id', $1, true)`.

## 6. Como o executor garante a mesma conexão
O `LocalPostgresUnitOfWork` cria um `localizedExecutor` que é um wrapper que passa `cmd` para a mesma subclasse internalizada de `PoolClient` após seu `BEGIN` de transação. Isso inviabiliza conexões em paralelo rompendo o isolamento de pool.

## 7. Como o UnitOfWork preserva contexto e transação
`LocalPostgresUnitOfWork` invoca explicitamente as queries de `BEGIN` seguido pela parametrização de contexto e aguarda a função de callback (onde os repositórios atuam na connection referenciada). Após o retorno seguro, executa `COMMIT`; caso um erro seja retornado, dispara `ROLLBACK` e invalida a transação.

## 8. Como o teste de RLS garante isolamento real
O teste foi modificado para injetar um passo de `TRUNCATE TABLE sale_items, payments, sales, users, companies RESTART IDENTITY CASCADE;` antes do runtime. Isso apaga restos de outros testes; além de executar `withoutContextResult` usando o próprio owner do banco (`pool.query`) que, mediante o mecanismo `FORCE RLS`, agora atesta falha silenciosa devolvendo `0` registros, comprovando a efetividade das policies até para os admins.

## 9. Como o teste de UnitOfWork evita FK inválida
Foi removido o ID fixo de query direta e instanciado com `RETURNING id` tanto para empresas filhas, quanto para um default user setado em `created_by` como Admin, sanando as Foreign Keys. Adicionalmente, as checagens fora do UoW (`pool.query`) foram substituídas por instâncias nativas via callback do UnitOfWork, evitando colisão por conta do FORCE RLS.

## 10. Como os testes evitam interferência entre si
Pelo uso explícito de `TRUNCATE CASCADE` e escopo fechado das transações locais com `RESTART IDENTITY`. Além disto, IDs são instanciados por via dos inserts nativos a cada Run (sem chaves mockadas colidindo).

## 11. Resultado de db:native:test
**PASS**. Todos os 15 testes finalizados de modo local transacional.

## 12. Resultado de lint
**PASS**.

## 13. Resultado de typecheck
**PASS**.

## 14. Resultado de build
**PASS**.

## Confirmações de Restrições
15. **Banco remoto não foi usado**: CONFIRMADO.
16. **Supabase cloud não foi usada**: CONFIRMADO.
17. **Service_role não foi usado**: CONFIRMADO.
18. **SEFAZ real não chamada**: CONFIRMADO. (Mocks foram criados para `SefazReal` não ser injetado em compilacação de teste local nativo).
19. **Produção V2 não foi ativada**: CONFIRMADO.

## 20. Parecer
**GO** para 47.7 somente caso testes de notebook host atestem PASS total (`db:native:test`, `lint`, `typecheck` e `build`). **NO-GO** para produção, fiscal real e gateways.
