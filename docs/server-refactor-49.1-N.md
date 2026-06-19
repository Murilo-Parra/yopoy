# Server refactor 49.1-N

## Objetivo

Extrair do `server.ts` somente as rotas JSON de consulta NF-e para um módulo fiscal próprio, preservando integralmente o comportamento existente.

## Commit-base

`e620510a2208bc27c66343e75295875863c18f50`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerNfeQueryRoutes.ts`
- `src/backend/fiscal/tests/nfe-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-N.md`

## Rotas extraídas

- `GET /api/nfe`
- `GET /api/nfe/:id`

## Rota propositalmente não extraída

- `GET /api/nfe/:id/download`

## Comportamento preservado

Foram preservados os paths, a autenticação por `getSessionFromRequest`, o isolamento por `company_id`, os filtros `invoice_number`, `series`, `customer_id` e `status`, as consultas, os payloads JSON, os status codes, as mensagens HTTP, a captura de IP, os logs de erro e o tratamento de exceções. A ordem relativa das consultas em relação ao download XML também foi mantida.

## Dependências injetadas

- `getSessionFromRequest`
- `getNfeDocuments`
- `getNfeDocumentById`
- `logAudit`

## Auditoria preservada

As ações `CONSULTA_NFE_LISTA` e `CONSULTA_NFE_INDIVIDUAL`, seus detalhes, o uso de `JSON.stringify(req.query)` e a identificação do IP por `req.ip`, `x-forwarded-for` ou fallback local foram mantidos.

## Riscos evitados

- Nenhum acesso direto do módulo a autenticação ou `db.ts`.
- Nenhuma alteração nas rotas de escrita, status ou download XML da NF-e.
- Nenhum header ou payload de download transportado para o módulo de consultas JSON.
- Nenhuma mistura com NFC-e, NFS-e, SEFAZ, DANFE, certificados ou outros domínios fiscais.
- Guard estático contra o retorno dos handlers inline, inclusão de métodos mutáveis ou incorporação do download XML.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/fiscal/tests/nfe-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Avaliar a extração isolada de `GET /api/nfe/:id/download`, com guard próprio para preservar a seleção do XML, os headers de arquivo, o nome dinâmico e a auditoria de download.
