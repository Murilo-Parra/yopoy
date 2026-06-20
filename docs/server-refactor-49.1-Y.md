# Etapa 49.1-Y — Extração da consulta admin de comissões

## Objetivo

Extrair exclusivamente a rota `GET /api/admin/commissions` de `server.ts` para um módulo administrativo próprio, sem alterar o contrato HTTP ou o comportamento existente.

## Commit-base

`ef33a57 refactor(server): extract admin support query route`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/admin/registerAdminCommissionQueryRoutes.ts`
- `src/backend/admin/tests/admin-commission-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-Y.md`

## Rota extraída

- `GET /api/admin/commissions`

## Rotas propositalmente não alteradas

Permaneceram na posição e implementação anteriores todas as demais rotas admin, inclusive `POST /api/admin/affiliates/create`, `POST /api/admin/commissions/:id/pay`, o registro de `GET /api/admin/support`, `POST /api/admin/support/:id/reply` e `GET /api/admin/audit-logs`. Rotas de company/user, sistema, afiliados e domínios fiscais também não foram alteradas.

## Comportamento preservado

Foram preservados o path, método GET, middleware `requireMasterAdmin`, resposta JSON, status HTTP 500, mensagem `Erro ao consultar comissões.`, log de erro, SQL, joins, ordenação e nomes de campos. O registro do módulo ocupa exatamente o ponto da rota removida.

## Dependências injetadas

O módulo recebe `requireMasterAdmin`, `getIsPostgresActive`, `getPgPool` e `dbInMemoryLocal`. Ele usa interfaces locais mínimas e não importa auth, `db.ts` ou o pool diretamente.

## Leitura dinâmica de PostgreSQL

`server.ts` injeta `getIsPostgresActive: () => isPostgresActive` e `getPgPool: () => pgPool`, preservando a leitura dinâmica dos bindings em vez de capturá-los no registro.

## Fallback local preservado

O fallback continua lendo `affiliate_commissions`, `affiliates` e `companies`, enriquecendo cada comissão com os mesmos campos e valores padrão: `Parceiro Avulso`, `N/A` e `Nova Empresa Premium`.

## Risco financeiro evitado

`POST /api/admin/commissions/:id/pay` continua inline, sem movimentação ou alteração. Assim, a etapa não toca na transação nem na mutação financeira de quitação de comissões.

## Riscos evitados

Não foram alterados contratos HTTP, SQL, joins, ordenação, persistência, autenticação, banco, migrations, fiscal, SEFAZ, documentos fiscais, certificados, sync ou providers. O módulo extraído contém somente o registro GET e nenhuma transação ou mutação.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-commission-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Selecionar outra rota de consulta isolada de `server.ts` em etapa independente, após revisão deste diff, sem incluir rotas financeiras de mutação.
