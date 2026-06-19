# Server refactor 49.1-X

## Objetivo

Extrair exclusivamente a rota de consulta `GET /api/admin/support` de `server.ts` para um módulo admin próprio, sem alterar o contrato HTTP nem o comportamento existente.

## Commit-base

`80b8145 refactor(server): extract admin affiliate query route`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/admin/registerAdminSupportQueryRoutes.ts`
- `src/backend/admin/tests/admin-support-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-X.md`

## Rota extraída

- `GET /api/admin/support`

## Rotas propositalmente não alteradas

Permaneceram inline e na ordem original `POST /api/admin/support/:id/reply` e `GET /api/admin/audit-logs`. As demais rotas admin, incluindo system, affiliates, commissions e company/user, não foram movidas nem modificadas. Rotas fiscais e integrações relacionadas a NF-e, NFC-e, NFS-e, SEFAZ, DANFE, certificados e sync permaneceram fora do escopo.

## Comportamento preservado

A rota mantém o mesmo path, método GET, middleware `requireMasterAdmin`, payload JSON, status 500, mensagem `Erro ao listar chamados de suporte.`, log de erro, SQL, join, ordenação PostgreSQL, nomes de campos e fallback local.

## Dependências injetadas

O módulo recebe `requireMasterAdmin`, `getIsPostgresActive`, `getPgPool` e `dbInMemoryLocal`. Ele usa interfaces locais mínimas e não importa tipos internos de auth nem `db.ts`.

## Leitura dinâmica de isPostgresActive e pgPool

`server.ts` injeta `getIsPostgresActive: () => isPostgresActive` e `getPgPool: () => pgPool`. O pool não é capturado no registro da rota e só é lido após o estado PostgreSQL ativo, preservando o curto-circuito da lógica original.

## Fallback local preservado

O fallback continua lendo `support_tickets` e `companies` de `dbInMemoryLocal`, associando a empresa por `company_id` e acrescentando `company_name`, com `Não Autenticado` quando não há correspondência.

## Diferença entre PostgreSQL e fallback local preservada

PostgreSQL mantém o `LEFT JOIN` e a ordenação por prioridade de status e `created_at DESC`. O fallback local continua sem ordenação adicional equivalente.

## Riscos evitados

Não houve alteração de dados, SQL, join, ordenação, middleware, contratos HTTP, auth, banco, migrations, rotas de mutação, rotas fiscais ou serviços externos. `POST /api/admin/support/:id/reply` não foi movido.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-support-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Selecionar uma única rota admin de consulta ainda inline, diagnosticar suas dependências e aplicar outra extração isolada com guard específico.
