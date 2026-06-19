# Server refactor 49.1-L

## Objetivo

Extrair do `server.ts` somente as rotas simples de consulta SEFAZ para um módulo fiscal próprio, preservando integralmente o comportamento existente.

## Commit-base

`c735ade64d112cf5ea044ec3f9237dd9fa26515a`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerSefazQueryRoutes.ts`
- `src/backend/fiscal/tests/sefaz-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-L.md`

## Rotas extraídas

- `GET /api/sefaz/protocols`
- `GET /api/sefaz/events`
- `GET /api/sefaz/events/:docId`

## Comportamento preservado

Foram preservados paths, autenticação por `getSessionFromRequest`, isolamento por `company_id`, consultas por `getSefazProtocols` e `getFiscalEvents`, filtro opcional por `docId`, payloads de resposta, mensagens HTTP, status codes, logs de erro e tratamento de exceções. As demais rotas fiscais permanecem no `server.ts` sem alterações funcionais.

## Dependências injetadas

- `getSessionFromRequest`
- `getSefazProtocols`
- `getFiscalEvents`

## Riscos evitados

- Nenhum acesso direto do novo módulo a `db.ts` ou ao domínio de autenticação.
- Nenhum uso de `SefazConnector`, pool, banco local, auditoria, filas, mutação, transmissão, download ou serviço externo.
- Nenhuma alteração nas demais rotas fiscais ou em contratos HTTP existentes.
- Guard estático contra o retorno dos três handlers inline ao `server.ts` e contra métodos mutáveis no módulo.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/fiscal/tests/sefaz-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Selecionar uma única responsabilidade fiscal de consulta ainda inline para uma etapa independente, com allowlist e guard próprios, sem ampliar o escopo desta extração.
