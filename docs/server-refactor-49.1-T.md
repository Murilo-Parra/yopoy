# Server refactor 49.1-T

## Objetivo

Extrair do `server.ts` somente as rotas de consulta NFC-e para um módulo fiscal próprio, preservando exatamente o comportamento existente.

## Commit-base

`36b9e726a7182be7aaee21484ecc108ed589c127`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerNfceQueryRoutes.ts`
- `src/backend/fiscal/tests/nfce-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-T.md`

## Rotas extraídas

- `GET /api/nfce`
- `GET /api/nfce/dashboard`
- `GET /api/nfce/:id`

## Rotas propositalmente não alteradas

- `POST /api/nfce`
- `POST /api/nfce/:id/cancel`
- `POST /api/nfce/sync`
- Rotas NF-e, NFS-e, SEFAZ, DANFE e demais rotas fiscais.

## Comportamento preservado

Foram preservados os paths e métodos HTTP, a autenticação por `getSessionFromRequest`, o isolamento por `company_id`, os filtros `number`, `series`, `customer_document` e `status`, a ordenação fornecida por `getNfceDocuments`, os status codes, as mensagens HTTP, os payloads JSON, a resposta de documento não encontrado, os logs de erro e todos os cálculos do dashboard.

## Dependências injetadas

- `getSessionFromRequest`
- `getNfceDocuments`
- `getNfceDocumentById`
- `logAudit`

## Ordem dashboard antes de :id preservada

O módulo registra `GET /api/nfce/dashboard` antes de `GET /api/nfce/:id`, impedindo que o literal `dashboard` seja interpretado como identificador. A chamada do módulo permanece antes de `POST /api/nfce` no ponto original das consultas.

## Auditoria preservada

A listagem continua registrando `CONSULTA_NFCE_LISTA`, com os filtros serializados por `JSON.stringify(req.query)` e o mesmo critério de identificação do IP.

## Riscos evitados

- Nenhum acesso direto do módulo a autenticação ou `db.ts`.
- Nenhum acoplamento a banco, SEFAZ, DANFE, certificados, NF-e ou NFS-e.
- Nenhuma rota de emissão, cancelamento, contingência ou sincronização movida.
- Guard estático contra retorno das consultas inline, inversão da ordem de rotas e inclusão de métodos mutáveis.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/fiscal/tests/nfce-query-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Revisar o diff da etapa 49.1-T e, somente após aprovação, definir uma próxima extração fiscal isolada com allowlist e guard próprios.
