# Etapa 49.1-Z — consulta admin de audit logs

## Objetivo

Extrair somente a rota de consulta `GET /api/admin/audit-logs` do `server.ts` para um módulo administrativo dedicado, sem alterar seu contrato ou comportamento.

## Commit-base

`08c78b3 refactor(server): extract admin commission query route`

## Arquivos

- `server.ts`
- `src/backend/admin/registerAdminAuditLogQueryRoutes.ts`
- `src/backend/admin/tests/admin-audit-log-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-Z.md`

## Rota extraída

- `GET /api/admin/audit-logs`

## Comportamento preservado

- middleware `requireMasterAdmin`;
- seleção do PostgreSQL por `isPostgresActive && pgPool`;
- SQL original para `audit_logs` e `system_logs`, com ordenação descendente e limite `200`;
- fallback em `dbInMemoryLocal`, incluindo `reverse().slice(0, 200)`;
- resposta `{ audit_logs, system_logs }`;
- status `500` e mensagem `"Erro interno ao obter logs."`;
- registro antes de `registerAdminSystemMonitoringRoutes`.

## Dependências injetadas

- `requireMasterAdmin`;
- `getIsPostgresActive: () => isPostgresActive`;
- `getPgPool: () => pgPool`;
- `dbInMemoryLocal`.

## Riscos evitados

- nenhuma rota mutável foi movida;
- nenhuma alteração em autenticação, banco, migrations ou contratos HTTP;
- nenhum acesso direto a `pgPool`, `db.ts` ou ao módulo de persistência local;
- nenhum domínio fiscal, SEFAZ, certificado, serviço externo ou rota administrativa adjacente foi alterado.

## Validações

- `npm run typecheck`;
- `npx vitest run src/backend/auth/tests`;
- `npx vitest run src/backend/admin/tests/admin-audit-log-query-routes-wiring.test.ts`;
- `git diff --check`;
- `git status --short --untracked-files=all`;
- `git diff --name-only`;
- `git diff --stat`.

## Próxima etapa recomendada

Selecionar uma única rota administrativa de consulta ainda presente no `server.ts`, aplicar uma allowlist própria e repetir o mesmo guard de wiring e preservação de contrato.
