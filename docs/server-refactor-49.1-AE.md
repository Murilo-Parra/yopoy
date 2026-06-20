# Etapa 49.1-AE — consulta admin de templates de custom provider

## Objetivo

Extrair exclusivamente `GET /api/admin/custom-providers/:id/templates` do `server.ts` para um módulo administrativo dedicado.

## Commit-base

`a470255 refactor(server): extract admin custom provider mapping query route`

## Arquivos

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderTemplateQueryRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-template-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-AE.md`

## Rota extraída

- `GET /api/admin/custom-providers/:id/templates`

## Rotas propositalmente não alteradas

Permaneceram inline todas as mutações de custom providers, mappings e templates. Também não foram alteradas as consultas geral e de mappings já extraídas, a quitação de comissão, a resposta de suporte, outras rotas admin já extraídas ou rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram mantidos `requireMasterAdmin`, método `GET`, path, leitura de `req.params.id`, resposta vazia sem pool, SQL e parâmetro `$1` originais, payload de `result.rows`, status code de erro, log, mensagem principal de erro e campo `details`. O registro permanece antes de `POST /api/admin/custom-providers/:id/templates`.

## Dependências injetadas

O módulo recebe somente `requireMasterAdmin` e `getPgPool` por interfaces locais mínimas.

## Leitura dinâmica de pgPool

O pool é obtido no momento da requisição por `getPgPool: () => pgPool`, sem captura como valor fixo e sem importação direta do banco.

## Riscos evitados

Não foram movidas mutações, UUIDs, transações, fallback local, integrações externas, autenticação, banco global ou outros domínios administrativos e fiscais.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-template-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Auditar a próxima consulta administrativa ainda inline e, se for somente leitura, extraí-la em uma etapa isolada, sem mover mutações.
