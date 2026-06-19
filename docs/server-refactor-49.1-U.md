# Etapa 49.1-U — observabilidade de eventos SEFAZ

## Objetivo

Extrair exclusivamente os endpoints GET de observabilidade de distribuição, fila de eventos e auditoria SEFAZ do `server.ts` para um registrador fiscal próprio, sem alterar contratos ou comportamento.

## Commit-base

`94ba309fc06ccd7c9cce42c6ade6207a3dad1978`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerSefazEventObservationRoutes.ts`
- `src/backend/fiscal/tests/sefaz-event-observation-routes-wiring.test.ts`
- `docs/server-refactor-49.1-U.md`

## Rotas extraídas

- `GET /api/sefaz/distribuicao`
- `GET /api/sefaz/event-queue`
- `GET /api/sefaz/audit-logs`

## Rotas propositalmente não alteradas

Permaneceram inline `POST /api/sefaz/manifest`, `POST /api/sefaz/distribuicao`, `GET /api/sefaz/status`, `POST /api/sefaz/transmit`, `POST /api/sefaz/cancel`, `POST /api/sefaz/invalidate`, `POST /api/sefaz/cce` e `POST /api/sefaz/query`. As demais rotas fiscais, administrativas, estáticas e de sincronização também não foram modificadas.

## Comportamento preservado

Foram mantidos os métodos e paths HTTP, autenticação por `getSessionFromRequest`, status codes, mensagens, payloads JSON, fallback sem pool, queries e parâmetros SQL, isolamento por `company_id`, ordenação descendente, limite configurável com fallback 100 na distribuição, limite 50 da fila e limite 100 da auditoria.

## Dependências injetadas

- `getSessionFromRequest`
- `getPgPool`, que lê dinamicamente o binding mutável de `pgPool` no momento de cada requisição que consulta o banco
- `SefazEventAuditService`, injetado como `sefazEventAuditService`

## POSTs SEFAZ preservados inline

Os POSTs de manifestação, distribuição, transmissão, cancelamento, inutilização, CC-e e consulta permanecem no `server.ts`, sem mudança de método, path, lógica ou posição relativa relevante.

## Ausência de operações sensíveis no módulo

O novo registrador não transmite, cancela, inutiliza, registra CC-e, baixa XML, altera configuração ou ambiente e não acessa certificado. Ele registra somente os três GETs de observabilidade existentes.

## Riscos evitados

- Nenhum import direto de autenticação, banco ou serviço de auditoria.
- Leitura dinâmica do pool preservada por `getPgPool`, sem capturar o valor disponível no momento do registro das rotas.
- Nenhum acoplamento a `SefazConnector`, `SefazEventQueue`, certificados ou emissão fiscal.
- Nenhuma alteração em SQL, filtros, ordenação, limites ou respostas.
- Guard contra retorno dos GETs ao `server.ts` e contra inclusão de métodos mutáveis no módulo.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado, com 13 arquivos e 98 testes. A primeira execução foi bloqueada pelo sandbox ao abrir sockets locais do Supertest (`listen EPERM`); a repetição autorizada fora do sandbox passou integralmente.
- `npx vitest run src/backend/fiscal/tests/sefaz-event-observation-routes-wiring.test.ts`: aprovado, com 1 arquivo e 10 testes.
- `git diff --check`: aprovado.
- `git status --short`: executado.
- `git diff --name-only`: executado.
- `git diff --stat`: executado.

## Próxima etapa recomendada

Revisar o diff da etapa 49.1-U e, somente após aprovação humana, selecionar outra responsabilidade GET isolada do `server.ts` para uma etapa independente.
