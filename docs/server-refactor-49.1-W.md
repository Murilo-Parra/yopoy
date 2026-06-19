# server refactor 49.1-W

## Objetivo

Extrair somente a rota `GET /api/admin/affiliates` do `server.ts` para um módulo admin próprio, preservando o comportamento atual.

## Commit-base

`f5da252 refactor(server): extract SEFAZ event observation routes`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/admin/registerAdminAffiliateQueryRoutes.ts`
- `src/backend/admin/tests/admin-affiliate-query-routes-wiring.test.ts`

## Rota extraída

- `GET /api/admin/affiliates`

## Rotas propositalmente não alteradas

- `POST /api/admin/affiliates/create`
- `GET /api/admin/commissions`
- `POST /api/admin/commissions/:id/pay`
- rotas support
- rotas audit logs
- custom providers
- `GET /api/admin/system`
- rotas admin company/user

## Comportamento preservado

- middleware `requireMasterAdmin`
- path original
- método HTTP original
- leitura de `isPostgresActive` via getter dinâmico
- leitura de `pgPool` via getter dinâmico
- SQL original com `ORDER BY created_at DESC`
- fallback local em `dbInMemoryLocal.global["affiliates"]`
- payload JSON original
- status `500` original
- mensagem `Erro ao listar afiliados.`
- ordem antes de `POST /api/admin/affiliates/create`

## Dependências injetadas

- `requireMasterAdmin`
- `getIsPostgresActive: () => isPostgresActive`
- `getPgPool: () => pgPool`
- `dbInMemoryLocal`

## Leitura dinâmica preservada

O módulo novo não captura `isPostgresActive` nem `pgPool` como valor fixo. Ambos entram por getters, mantendo o estado atual de `server.ts` no momento da execução.

## Fallback local preservado

A consulta continua lendo `dbInMemoryLocal.global["affiliates"] || "[]"` quando o Postgres não está ativo ou não há pool disponível.

## Riscos evitados

- não houve mudança de contrato HTTP
- não houve alteração de SQL
- não houve introdução de mutação
- não houve uso de UUID, transação ou agendamento de persistência
- não houve acoplamento a auth, fiscal, SEFAZ, DANFE ou certificados

## Validações executadas

- `npm run typecheck` aprovado
- `npx vitest run src/backend/admin/tests/admin-affiliate-query-routes-wiring.test.ts` aprovado
- `npx vitest run src/backend/auth/tests` repetido com permissão fora da restrição após falha ambiental `listen EPERM` e aprovado
- `git diff --check` aprovado

## Próxima etapa recomendada

Extrair a próxima microconsulta admin mais simples e sem mutação, mantendo o mesmo padrão de wiring e guard.
