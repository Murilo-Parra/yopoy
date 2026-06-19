# Server refactor 49.1-H

## Objetivo

Extrair exclusivamente a rota `POST /api/fiscal/discover` do `server.ts` para um módulo fiscal próprio, sem alterar seu contrato HTTP ou comportamento.

## Commit-base

`22c6c86 refactor(server): extract static PDF routes`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/fiscal/registerFiscalDiscoveryRoutes.ts`
- `src/backend/fiscal/tests/fiscal-discovery-routes-wiring.test.ts`
- `docs/server-refactor-49.1-H.md`

## Rota extraída

- `POST /api/fiscal/discover`

## Comportamento preservado

A rota continua lendo `city`, `state_uf` e `ibge_code` de `req.body`, chamando `FiscalProviderResolver` com a mesma ordem de argumentos e respondendo com o mesmo payload de sucesso. O tratamento de erro, o log, o status `500` e a mensagem HTTP foram mantidos sem alteração.

## Dependência movida

- `FiscalProviderResolver`, importado de `src/utils/locationResolver`, passou do `server.ts` para o novo registrador.

## Riscos evitados

- Nenhuma outra rota fiscal foi movida.
- Nenhuma autenticação, persistência, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificado, auditoria ou rota estática foi alterada.
- Nenhum path, status code, mensagem ou payload HTTP foi modificado.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado, 13 arquivos e 98 testes. A primeira tentativa foi bloqueada pelo sandbox ao abrir uma porta local (`EPERM`); a repetição autorizada fora do sandbox passou.
- `npx vitest run src/backend/fiscal/tests/fiscal-discovery-routes-wiring.test.ts`: aprovado, 1 arquivo e 5 testes.
- `git diff --check`: aprovado.
- `git status --short`: executado para confirmar o escopo.
- `git diff --name-only`: executado para confirmar os arquivos rastreados alterados.
- `git diff --stat`: executado para revisar o tamanho da alteração rastreada.

## Próxima etapa recomendada

Extrair isoladamente `POST /api/fiscal/documents/validate-payload`, pois também não usa autenticação nem persistência, mas pertence a uma responsabilidade distinta de validação XML.
