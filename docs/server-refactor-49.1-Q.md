# Server refactor 49.1-Q

## Objetivo

Extrair do `server.ts` somente a rota de consulta NFS-e para um módulo próprio, preservando exatamente o comportamento atual.

## Commit-base

`2446baf refactor(server): extract NF-e download route`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/nfse/registerNfseQueryRoutes.ts`
- `src/backend/nfse/tests/nfse-query-routes-wiring.test.ts`
- `docs/server-refactor-49.1-Q.md`

## Rota extraída

- `GET /api/nfse/query`

## Comportamento preservado

Foram preservados o método, path, autenticação por `getSessionFromRequest`, status codes, mensagens HTTP, leitura dos query parameters, payload JSON, tratamento de erro e ordem relativa de registro no `server.ts`.

## Dependências injetadas

- `getSessionFromRequest`

Nenhuma dependência de banco, autenticação interna, provider, certificado ou serviço externo foi adicionada.

## Resposta simulada preservada

A string `<ConsultarNfseResposta><Sucesso>Consultado real via ${type}</Sucesso></ConsultarNfseResposta>` e o payload de sucesso permanecem inalterados.

## Divergência semântica observada

Os comentários da rota descrevem uma consulta real e mencionam seleção de provider, mas a implementação atual apenas monta uma resposta XML simulada. A divergência foi preservada, sem correção ou introdução de integração externa.

## Riscos evitados

- Nenhuma chamada a prefeitura, provider ou serviço externo.
- Nenhum acesso a `db.ts`, `pgPool` ou `dbInMemoryLocal`.
- Nenhum uso de certificado, SEFAZ, NF-e, NFC-e ou DANFE.
- Nenhuma alteração em outras rotas ou no bootstrap.
- Guard contra retorno da rota inline, inclusão de métodos mutáveis e dependências proibidas.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado, 13 arquivos e 98 testes. A primeira execução no sandbox foi bloqueada por `listen EPERM`; a repetição autorizada, sem essa restrição, passou integralmente.
- `npx vitest run src/backend/nfse/tests/nfse-query-routes-wiring.test.ts`: aprovado, 1 arquivo e 8 testes.
- `git diff --check`: aprovado.
- `git status --short`: executado.
- `git diff --name-only`: executado.
- `git diff --stat`: executado.

## Próxima etapa recomendada

Reavaliar uma rota de consulta isolada somente após revisão deste diff e definição explícita de uma nova allowlist.
