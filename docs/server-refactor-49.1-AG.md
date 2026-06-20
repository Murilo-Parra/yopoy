# Etapa 49.1-AG — criação admin de custom provider

## Objetivo

Extrair exclusivamente `POST /api/admin/custom-providers` do `server.ts` para um módulo administrativo dedicado.

## Commit-base

`64cbe45 refactor(server): extract admin custom provider template query route`

## Arquivos

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderMutationRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-mutation-routes-wiring.test.ts`
- `docs/server-refactor-49.1-AG.md`

## Rota extraída

- `POST /api/admin/custom-providers`

## Rotas propositalmente não alteradas

Permaneceram inalteradas as consultas de custom providers, mappings e templates já extraídas; `PUT` e `DELETE` de custom providers; os `POST` de mappings e templates; quitação de comissão; resposta de suporte; demais rotas admin; e rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram mantidos `requireMasterAdmin`, método, path, validação de nome, SQL, parâmetros, geração de UUID, comportamento sem pool, payloads, status codes, logs, mensagens e campo `details`. O registro permanece depois da query de custom providers e antes do `PUT /api/admin/custom-providers/:id`.

## Dependências injetadas

O módulo recebe somente `requireMasterAdmin`, `getPgPool` e `generateUuid`, por interfaces locais mínimas.

## Leitura dinâmica de pgPool

O pool é obtido no momento da requisição por `getPgPool: () => pgPool`, sem captura fixa ou importação direta do banco.

## Geração de UUID preservada

O servidor injeta `generateUuid: () => crypto.randomUUID()`, preservando o gerador original sem acoplar o módulo a `crypto`.

## Riscos evitados

Não foram movidos `PUT`, `DELETE`, transações, fallback local, integrações externas, autenticação, banco global, outras tabelas ou outros domínios.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-mutation-routes-wiring.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Reforçar testes das mutações admin restantes antes de considerar qualquer extração sensível, destrutiva, com fallback ou financeira.
