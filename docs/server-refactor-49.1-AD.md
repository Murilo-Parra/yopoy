# Etapa 49.1-AD — consulta admin de mappings de custom provider

## Objetivo

Extrair exclusivamente `GET /api/admin/custom-providers/:id/mappings` do `server.ts` para um módulo administrativo dedicado.

## Commit-base

`fa287fd refactor(server): extract admin custom provider query route`

## Arquivos

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderMappingQueryRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-mapping-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-AD.md`

## Rota extraída

- `GET /api/admin/custom-providers/:id/mappings`

## Rotas propositalmente não alteradas

Permaneceram inline as mutações de custom providers, mappings e templates, além da consulta de templates. Também não foram alteradas a consulta geral de custom providers já extraída, a quitação de comissão, a resposta de suporte, outras rotas admin já extraídas ou rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram mantidos `requireMasterAdmin`, método `GET`, path, leitura de `req.params.id`, resposta vazia sem pool, SQL e parâmetro `$1` originais, payload de `result.rows`, status code de erro, log, mensagem principal de erro e campo `details`. O registro permanece antes de `POST /api/admin/custom-providers/:id/mappings`.

## Dependências injetadas

O módulo recebe somente `requireMasterAdmin` e `getPgPool` por interfaces locais mínimas.

## Leitura dinâmica de pgPool

O pool é obtido no momento da requisição por `getPgPool: () => pgPool`, sem captura como valor fixo e sem importação direta do banco.

## Riscos evitados

Não foram movidas mutações, UUIDs, transações, fallback local, integrações externas, autenticação, banco global ou outros domínios administrativos e fiscais.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-mapping-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Auditar e, em uma etapa isolada, extrair `GET /api/admin/custom-providers/:id/templates`, preservando sua posição e mantendo todas as mutações inline.
