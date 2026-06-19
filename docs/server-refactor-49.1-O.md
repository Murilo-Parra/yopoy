# Server refactor 49.1-O

## Objetivo

Extrair do `server.ts` somente a rota de download XML da NF-e para um módulo fiscal próprio, preservando integralmente o comportamento existente.

## Commit-base

`ec7d3dd6c554dd5001b2cbda309d8c8516777654`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerNfeDownloadRoutes.ts`
- `src/backend/fiscal/tests/nfe-download-routes-wiring.test.ts`
- `docs/server-refactor-49.1-O.md`

## Rota extraída

- `GET /api/nfe/:id/download`

## Rotas propositalmente não alteradas

- `GET /api/nfe`
- `GET /api/nfe/:id`
- `POST /api/nfe`
- `POST /api/nfe/:id/status`
- Todas as rotas de NFC-e, NFS-e, SEFAZ, DANFE, certificados e demais domínios.

## Comportamento preservado

Foram preservados o path, a autenticação por `getSessionFromRequest`, o isolamento por `company_id`, a consulta por `getNfeDocumentById`, os status codes, as mensagens HTTP, o payload de resposta, os logs de erro, a captura de IP e a ordem relativa de registro no `server.ts`.

## Dependências injetadas

- `getSessionFromRequest`
- `getNfeDocumentById`
- `logAudit`

## Seleção de XML preservada

A prioridade continua sendo `xml_authorized`, seguida de `xml_signed` e `xml_original`, sem validações adicionais ou simplificação da lógica.

## Headers preservados

- `Content-Type: application/xml`
- `Content-Disposition: attachment; filename=NFe_<número>_Serie_<série>_<status>.xml`

O XML continua sendo enviado por `res.send(xmlContent)`.

## Auditoria preservada

A ação `DOWNLOAD_XML_NFE`, o texto de detalhes, os identificadores de empresa e usuário e a captura do IP por `req.ip`, `x-forwarded-for` ou fallback local foram mantidos.

## Riscos evitados

- Nenhum import direto de autenticação, `db.ts` ou auditoria no novo módulo.
- Nenhuma alteração nas consultas JSON ou escritas da NF-e.
- Nenhuma mistura com SEFAZ, DANFE, NFC-e, NFS-e, certificados ou outros domínios.
- Nenhuma alteração em mensagens, status codes, headers, nome do arquivo ou seleção do XML.
- Guard estático contra o retorno da rota inline e contra a inclusão de métodos mutáveis ou dependências proibidas.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/fiscal/tests/nfe-download-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Reavaliar o próximo bloco fiscal isolado somente após revisão deste diff e definição explícita de uma nova allowlist.
