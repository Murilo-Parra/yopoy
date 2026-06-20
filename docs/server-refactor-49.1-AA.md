# Etapa 49.1-AA — mutação de criação de afiliado

## Objetivo

Extrair exclusivamente a rota `POST /api/admin/affiliates/create` do `server.ts` para um módulo administrativo dedicado.

## Commit-base

`c0b4ad0 refactor(server): extract admin audit log query route`

## Arquivos

- `server.ts`
- `src/backend/admin/registerAdminAffiliateMutationRoutes.ts`
- `src/backend/admin/tests/admin-affiliate-mutation-routes-wiring.test.ts`
- `docs/server-refactor-49.1-AA.md`

## Rota extraída

- `POST /api/admin/affiliates/create`

## Rotas propositalmente não alteradas

Permaneceram fora do escopo as consultas de afiliados e comissões, a quitação de comissão e as rotas de support, audit logs, system, custom providers, empresas, usuários, fiscal, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync.

## Comportamento preservado

Foram mantidos `requireMasterAdmin`, método, path, validação obrigatória de nome, e-mail e código, status codes, mensagens, SQL, valores padrão, coerções, identificador com `Date.now()`, data ISO com `Date`, resposta de sucesso e tratamento de erro.

## Dependências injetadas

O módulo recebe `requireMasterAdmin`, `getIsPostgresActive`, `getPgPool`, `dbInMemoryLocal` e `scheduleSaveLocalFallback` por interfaces locais mínimas.

## Leitura dinâmica de PostgreSQL

`isPostgresActive` e `pgPool` continuam sendo lidos no momento da requisição pelos getters `() => isPostgresActive` e `() => pgPool`; o pool não é capturado como valor fixo.

## Fallback local preservado

O fallback continua lendo e gravando `dbInMemoryLocal.global['affiliates']`, inicializando a mesma estrutura e chamando `scheduleSaveLocalFallback` somente no ramo local.

## Riscos evitados

Não foram movidas transações, pagamentos, comissões financeiras, integrações externas, autenticação, banco global, rotas fiscais ou outros domínios administrativos. A ordem de registro permanece entre a query de afiliados e a query de comissões.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-affiliate-mutation-routes-wiring.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Selecionar uma única rota administrativa simples remanescente, com nova allowlist e sem misturar a mutação financeira `POST /api/admin/commissions/:id/pay` nesta extração.
