# Etapa 49.1-AJ — criação admin de custom provider template

## Objetivo

Extrair somente `POST /api/admin/custom-providers/:id/templates` do `server.ts` para um registrador dedicado.

## Commit-base

`565038c`

## Arquivos alterados

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderTemplateMutationRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-template-mutation-routes-wiring.test.ts`
- `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `docs/server-refactor-49.1-AJ.md`

## Rota extraída

- `POST /api/admin/custom-providers/:id/templates`

## Rotas propositalmente não alteradas

- `GET /api/admin/custom-providers`
- `POST /api/admin/custom-providers`
- `PUT /api/admin/custom-providers/:id`
- `DELETE /api/admin/custom-providers/:id`
- `GET /api/admin/custom-providers/:id/mappings`
- `POST /api/admin/custom-providers/:id/mappings`
- `GET /api/admin/custom-providers/:id/templates`
- `POST /api/admin/commissions/:id/pay`
- `POST /api/admin/support/:id/reply`
- Rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram preservados `requireMasterAdmin`, método, path, leitura de `req.params.id` e `req.body`, fallback sem pool, SQL e parâmetros, default `version || '1.0'`, status `201` e `500`, payloads, mensagens e campo `details`. O registro permanece depois de `registerAdminCustomProviderTemplateQueryRoutes`.

## Dependências injetadas

- `requireMasterAdmin`
- `getPgPool`
- `generateUuid`

O pool continua sendo lido dinamicamente por `getPgPool: () => pgPool`, sem captura fixa ou importação direta. A geração de UUID continua usando `crypto.randomUUID()` por meio de `generateUuid: () => crypto.randomUUID()` injetado pelo `server.ts`.

## Atualização do guard AH

O guard de mutações restantes passou a reconhecer `registerAdminCustomProviderTemplateMutationRoutes`, impedir o retorno inline da rota de templates e proteger a ordem completa do bloco de custom providers. Permanecem protegidos os riscos de comissão, suporte, `PUT` e `DELETE`; a verificação de `INSERT INTO custom_provider_templates` foi movida para o novo guard AJ.

## Riscos evitados

Não foram introduzidos transação, fallback local, estado em memória, serviço externo ou acesso direto a autenticação, `db.ts`, `pgPool` ou `crypto`. Nenhuma mutação fora de `custom_provider_templates` foi movida.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-template-mutation-routes-wiring.test.ts`
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Parar novas extrações automáticas e fazer diagnóstico/reforço específico antes de tocar `PUT`, `DELETE`, suporte ou comissão.
