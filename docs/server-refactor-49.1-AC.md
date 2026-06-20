# Etapa 49.1-AC — consulta admin de custom providers

## Objetivo

Extrair exclusivamente `GET /api/admin/custom-providers` do `server.ts` para um módulo administrativo dedicado.

## Commit-base

`22af9ea refactor(server): extract admin affiliate mutation route`

## Arquivos

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderQueryRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-AC.md`

## Rota extraída

- `GET /api/admin/custom-providers`

## Rotas propositalmente não alteradas

Permaneceram inline todas as mutações de custom providers e as rotas de mappings e templates. Também não foram alteradas a quitação de comissão, a resposta de suporte, as rotas admin já extraídas ou rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram mantidos `requireMasterAdmin`, método, path, resposta vazia sem pool, SQL, ordenação por `created_at DESC`, payload de `result.rows`, status codes, log, mensagem principal de erro e campo `details`. A posição de registro permanece antes de `POST /api/admin/custom-providers`.

## Dependências injetadas

O módulo recebe somente `requireMasterAdmin` e `getPgPool` por interfaces locais mínimas.

## Leitura dinâmica de pgPool

O pool é obtido no momento da requisição por `getPgPool: () => pgPool`, sem captura como valor fixo e sem importação direta do banco.

## Riscos evitados

Não foram movidas mutações, UUIDs, transações, fallback local, integrações externas, autenticação, banco global ou outros domínios administrativos e fiscais.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Extrair isoladamente `GET /api/admin/custom-providers/:id/mappings`, preservando sua posição e mantendo todas as mutações inline.
