# Server refactor 49.1-J

## Objetivo

Extrair do `server.ts` somente as rotas básicas de consulta de documentos fiscais para um módulo fiscal próprio, preservando integralmente o comportamento existente.

## Commit-base

`38af88e9fbc217693a9502e668be876de5c48165`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerFiscalDocumentQueryRoutes.ts`
- `src/backend/fiscal/tests/fiscal-document-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-J.md`

## Rotas extraídas

- `GET /api/fiscal/documents`
- `GET /api/fiscal/documents/:id`

## Comportamento preservado

Foram preservados paths, autenticação por `getSessionFromRequest`, paginação, consultas, payloads de resposta, mensagens HTTP, status codes, logs de erro e tratamento de exceções. As demais rotas fiscais permanecem no `server.ts` sem alterações funcionais.

## Dependências injetadas

- `getSessionFromRequest`
- `getFiscalDocuments`
- `getFiscalDocumentById`

## Riscos evitados

- Nenhum acesso direto do novo módulo a `db.ts` ou ao domínio de autenticação.
- Nenhuma alteração em rotas fiscais de escrita, validação, assinatura ou documentos especializados.
- Nenhuma nova validação, dependência ou mudança de contrato HTTP.
- Guard estático contra o retorno dos dois handlers inline ao `server.ts`.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/fiscal/tests/fiscal-document-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Selecionar uma única responsabilidade fiscal ainda inline para uma etapa independente, com allowlist e guard próprios, sem ampliar o escopo desta extração.
