# Server refactor 49.1-I

## Objetivo

Extrair exclusivamente a rota `POST /api/fiscal/documents/validate-payload` do `server.ts` para um módulo fiscal próprio, sem alterar seu contrato HTTP ou comportamento.

## Commit-base

`26bb68e refactor(server): extract fiscal discovery route`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerFiscalValidationRoutes.ts`
- `src/backend/fiscal/tests/fiscal-validation-routes-wiring.test.ts`
- `docs/server-refactor-49.1-I.md`

## Rota extraída

- `POST /api/fiscal/documents/validate-payload`

## Comportamento preservado

A rota continua lendo `payload` de `req.body`, exigindo sua presença, chamando `XmlValidator.validate(payload)` e respondendo com os mesmos payloads de sucesso e erro. O retorno antecipado, o log, os status `400` e `500` e todas as mensagens HTTP foram mantidos sem alteração.

## Dependência movida

- O uso de `XmlValidator` pela rota extraída passou do `server.ts` para o novo registrador. O import no `server.ts` foi preservado porque outras rotas ainda usam essa dependência.

## Riscos evitados

- Nenhuma outra rota fiscal foi movida.
- Nenhuma autenticação, persistência, Fiscal Discovery, NF-e, NFC-e, NFS-e, SEFAZ, DANFE, certificado, Gemini/IA, Factory Reset, auditoria ou rota estática de PDF foi alterada.
- Nenhum path, status code, mensagem, payload HTTP ou regra de validação foi modificado.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado, 13 arquivos e 98 testes. A primeira tentativa foi bloqueada pelo sandbox ao abrir uma porta local (`EPERM`); a repetição autorizada fora do sandbox passou.
- `npx vitest run src/backend/fiscal/tests/fiscal-validation-routes-wiring.test.ts`: aprovado, 1 arquivo e 5 testes.
- `git diff --check`: aprovado.
- `git status --short`: executado para confirmar o escopo.
- `git diff --name-only`: executado para confirmar os arquivos rastreados alterados.
- `git diff --stat`: executado para revisar o tamanho da alteração rastreada.

## Próxima etapa recomendada

Definir a próxima extração unitária do `server.ts` somente após revisão deste diff, mantendo uma única responsabilidade por etapa.
