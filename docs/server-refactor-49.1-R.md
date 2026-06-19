# Server refactor 49.1-R

## Objetivo

Extrair do `server.ts` somente a rota de monitoramento administrativo para um módulo admin próprio, preservando exatamente o comportamento atual.

## Commit-base

`83c300d refactor(server): extract NFS-e query route`

## Arquivo alterado

- `server.ts`

## Arquivos criados

- `src/backend/admin/registerAdminSystemMonitoringRoutes.ts`
- `src/backend/admin/tests/admin-system-monitoring-routes-wiring.test.ts`
- `docs/server-refactor-49.1-R.md`

## Rota extraída

- `GET /api/admin/system`

## Rotas propositalmente não alteradas

- Demais rotas admin, incluindo admin users, admin company, admin user, affiliates, commissions, support, audit logs e custom providers.
- Factory Reset, Gemini/IA, company audit logs, rotas estáticas de PDFs e rotas fiscais.
- NF-e, NFC-e, NFS-e, SEFAZ, DANFE, certificados e sync.

## Comportamento preservado

Foram preservados o método, path, middleware `requireMasterAdmin`, status code e mensagem de erro, payload JSON, campos retornados, valores das tarefas agendadas, tratamento de erro e ordem relativa de registro no `server.ts`.

## Dependências injetadas

- `requireMasterAdmin`, tipado como `RequestHandler`.
- `getIsPostgresActive`, função que lê `isPostgresActive` no momento da requisição para preservar seu comportamento dinâmico.

O módulo não importa auth nem `db.ts` e não recebe dependências adicionais.

## Métricas preservadas

- Estado do Postgres.
- Configuração Supabase derivada de `process.env.DATABASE_URL`.
- Uptime do processo.
- Heap usado e total em MB.
- Estimativa aleatória de tempo de resposta.
- Lista estática de tarefas agendadas.

## Riscos evitados

- Nenhum acesso a banco, `pgPool` ou `dbInMemoryLocal`.
- Nenhum uso de sessão, auditoria ou alteração de dados.
- Nenhum acoplamento a fiscal, serviço externo, SEFAZ, DANFE ou certificados.
- Nenhuma alteração de middleware, contratos HTTP ou rotas admin adjacentes.
- Guard contra retorno da rota inline, perda da ordem relativa e inclusão de métodos mutáveis ou dependências proibidas.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado, 13 arquivos e 98 testes. A primeira execução foi bloqueada pelo sandbox com `listen EPERM`; a repetição autorizada fora dessa restrição passou integralmente.
- `npx vitest run src/backend/admin/tests/admin-system-monitoring-routes-wiring.test.ts`: aprovado, 1 arquivo e 9 testes.
- `git diff --check`: aprovado.
- `git status --short`: executado.
- `git diff --name-only`: executado.
- `git diff --stat`: executado.

## Próxima etapa recomendada

Revisar este diff e validar a preservação do contrato antes de selecionar outra responsabilidade isolada do `server.ts` sob uma nova allowlist.
