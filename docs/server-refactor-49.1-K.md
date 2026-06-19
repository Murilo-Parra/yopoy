# Server refactor 49.1-K

## Objetivo

Extrair do `server.ts` somente as rotas de consulta de documentos fiscais assinados para um módulo fiscal próprio, preservando integralmente o comportamento existente.

## Commit-base

`aa1d5be73ba122384ae4670291f7ed6ce24f2765`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerSignedFiscalDocumentQueryRoutes.ts`
- `src/backend/fiscal/tests/signed-fiscal-document-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-K.md`

## Rotas extraídas

- `GET /api/fiscal/documents/signed`
- `GET /api/fiscal/documents/signed/:id`

## Comportamento preservado

Foram preservados paths, ordem de registro, autenticação por `getSessionFromRequest`, consulta por `getSignedDocuments`, busca por `id` ou `document_id`, payloads de resposta, mensagens HTTP, status codes, logs de erro e tratamento de exceções. As demais rotas fiscais permanecem no `server.ts` sem alterações funcionais.

## Dependências injetadas

- `getSessionFromRequest`
- `getSignedDocuments`

## Riscos evitados

- Nenhum acesso direto do novo módulo a `db.ts` ou ao domínio de autenticação.
- Nenhuma alteração em certificados, assinatura, documentos fiscais especializados ou demais rotas fiscais.
- Nenhuma nova validação, dependência ou mudança de contrato HTTP.
- Guard estático contra o retorno dos dois handlers inline ao `server.ts`.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/fiscal/tests/signed-fiscal-document-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Selecionar uma única responsabilidade fiscal ainda inline para uma etapa independente, com allowlist e guard próprios, sem ampliar o escopo desta extração.
