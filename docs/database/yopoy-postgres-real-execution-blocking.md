# Contenção de Execução Real (Real Execution Blocking)

Assegurar que transições estáticas de estado para base de dados não furem e abram pools de conexão precocemente.

## Métodos Efetivos
No backend core, o script `createAppContainer.ts` intercepta mode `'postgres'` explícito lançando barreira severa:
`POSTGRES_ADAPTER_NOT_IMPLEMENTED: Postgres mode is blocked. Use in-memory or postgres-dry-run`

E dentro de instâncias isoladas caso um Executor for instanciado indevidamente com `{ mode: 'real' }`, o `BlockedSqlExecutor` lança imediatamente uma exceção severante customizada baseada em classe genérica: `PostgresInfrastructureError('DATABASE_EXECUTION_BLOCKED')`.

Estes gatilhos constam nos conjuntos de asserções do `vitest` passantes no file `postgres-real-execution-block.test.ts` e `postgres-no-real-db-connection.test.ts`.

NENHUM cliente `pg` foi trazido na modelagem base, provando desconexão hard fail com o exterior.
