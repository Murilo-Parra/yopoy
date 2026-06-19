# Server refactor 49.1-S

## Objetivo

Extrair do `server.ts` somente as rotas de sincronização local para um módulo sync próprio, preservando exatamente o comportamento atual.

## Commit-base

`54d33ee refactor(server): extract admin system monitoring route`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/sync/registerSyncRoutes.ts`
- `src/backend/sync/tests/sync-routes-wiring.test.ts`
- `docs/server-refactor-49.1-S.md`

## Rotas extraídas

- `POST /api/sync/save`
- `GET /api/sync/load`

## Rotas propositalmente não alteradas

- `POST /api/audit/log`, mantida inline e imediatamente posterior ao registro de sync.
- Factory Reset, Gemini/IA, company audit logs e rotas estáticas de PDFs.
- Rotas fiscais, NF-e, NFC-e, NFS-e, SEFAZ, DANFE e certificados.
- Rotas admin, admin users router, admin company router e admin user router.

## Comportamento preservado

Foram preservados os métodos, paths, leitura de `key` e `value` do body, validação existente de `key`, status codes, mensagens HTTP, payloads JSON, chamadas de persistência, logs de erro e ordem relativa das duas rotas e da rota vizinha de audit log.

## Dependências injetadas

- `getSessionFromRequest`.
- `saveSyncKey`.
- `loadSyncData`.

O módulo não importa auth nem `db.ts` e não recebe dependências adicionais.

## Fallback `guest` preservado

As duas rotas continuam usando autenticação opcional por `getSessionFromRequest` e o identificador `"guest"` quando não há sessão ativa.

## Riscos evitados

- Nenhuma alteração no comportamento anônimo, na autenticação ou nas chaves salvas e carregadas.
- Nenhum acesso direto a `pgPool`, `dbInMemoryLocal`, audit log ou serviço externo.
- Nenhum acoplamento a fiscal, SEFAZ, DANFE, certificados ou admin.
- Nenhuma alteração de middleware, contratos HTTP ou rotas vizinhas.
- Guard contra retorno de qualquer rota sync inline, perda da ordem relativa, inclusão de outros métodos HTTP e dependências proibidas.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado, 13 arquivos e 98 testes. A primeira execução foi bloqueada pelo sandbox com `listen EPERM`; a repetição autorizada fora dessa restrição passou integralmente.
- `npx vitest run src/backend/sync/tests/sync-routes-wiring.test.ts`: aprovado, 1 arquivo e 9 testes.
- `git diff --check`: aprovado.
- `git status --short`: executado.
- `git diff --name-only`: executado.
- `git diff --stat`: executado.

## Próxima etapa recomendada

Revisar este diff e validar a preservação do contrato antes de selecionar outra responsabilidade isolada do `server.ts` sob uma nova allowlist.
