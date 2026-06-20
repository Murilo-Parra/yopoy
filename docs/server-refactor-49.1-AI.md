# Etapa 49.1-AI — criação admin de custom provider mapping

## Objetivo

Extrair somente `POST /api/admin/custom-providers/:id/mappings` do `server.ts` para um registrador dedicado.

## Commit-base

`40e005d test(admin): guard remaining admin mutation routes`

## Arquivos alterados

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderMappingMutationRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-mapping-mutation-routes-wiring.test.ts`
- `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `docs/server-refactor-49.1-AI.md`

## Rota extraída

- `POST /api/admin/custom-providers/:id/mappings`

## Rotas propositalmente não alteradas

- `PUT /api/admin/custom-providers/:id`
- `DELETE /api/admin/custom-providers/:id`
- `POST /api/admin/custom-providers/:id/templates`
- `POST /api/admin/commissions/:id/pay`
- `POST /api/admin/support/:id/reply`
- Todas as rotas admin já extraídas e todas as rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram preservados `requireMasterAdmin`, método, path, leitura de `req.params.id` e `req.body`, fallback sem pool, SQL e parâmetros, defaults `required || false` e `data_type || 'string'`, status `201` e `500`, payloads, mensagens e campo `details`.

## Dependências injetadas

- `requireMasterAdmin`
- `getPgPool`
- `generateUuid`

O pool continua sendo lido dinamicamente por `getPgPool: () => pgPool`, sem captura fixa ou importação direta. A geração de UUID continua usando `crypto.randomUUID()` por meio de `generateUuid: () => crypto.randomUUID()` injetado pelo `server.ts`.

## Atualização do guard AH

O guard de mutações restantes passou a reconhecer o novo registrador, impedir o retorno inline da rota de mappings e proteger a ordem entre a query de mappings e a query de templates. Os riscos restantes de comissão, suporte, `PUT`, `DELETE` e criação de template continuam protegidos.

## Riscos evitados

Não foram introduzidos transação, fallback local, estado em memória, serviço externo ou acesso direto a autenticação, `db.ts`, `pgPool` ou `crypto`. Nenhuma mutação fora de `custom_provider_mappings` foi movida.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-mapping-mutation-routes-wiring.test.ts`
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

`49.1-AJ — extrair POST /api/admin/custom-providers/:id/templates`, somente em etapa isolada e sem tocar PUT, DELETE, suporte ou comissão.
