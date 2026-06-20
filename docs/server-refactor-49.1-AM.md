# Etapa 49.1-AM — extração do PUT admin custom provider

## Objetivo

Extrair somente `PUT /api/admin/custom-providers/:id` de `server.ts` para um registrador administrativo dedicado, sem alterar seu contrato.

## Commit-base

`1b03e4c test(admin): guard custom provider update contract`

## Arquivos alterados

- `server.ts`
- `src/backend/admin/registerAdminCustomProviderUpdateRoutes.ts`
- `src/backend/admin/tests/admin-custom-provider-update-contract.test.ts`
- `src/backend/admin/tests/admin-custom-provider-update-routes-wiring.test.ts`
- `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `docs/server-refactor-49.1-AM.md`

## Rota extraída

- `PUT /api/admin/custom-providers/:id`

O registro continua depois de `registerAdminCustomProviderMutationRoutes` e antes do `DELETE /api/admin/custom-providers/:id` inline.

## Rotas propositalmente não alteradas

As rotas já extraídas de consulta, criação, mappings e templates não foram modificadas. Também permaneceram inline e intactas:

- `DELETE /api/admin/custom-providers/:id`
- `POST /api/admin/support/:id/reply`
- `POST /api/admin/commissions/:id/pay`

Rotas fiscais, SEFAZ, NF-e, NFC-e, NFS-e, DANFE, certificados e sync não foram alteradas.

## Comportamento preservado

Foram preservados `requireMasterAdmin`, método, path, `req.params.id`, os nove campos de `req.body`, SQL e ordem dos dez parâmetros, `updated_at = CURRENT_TIMESTAMP`, status, mensagens, payloads e `details`. A ausência de `rowCount` foi mantida; portanto, ID inexistente continua retornando sucesso silencioso. Sem pool, a rota continua respondendo `500` com `Banco de dados não conectado.`.

## Dependências injetadas

- `requireMasterAdmin`
- `getPgPool`

O módulo usa interfaces locais mínimas e não importa autenticação, `db.ts`, `pgPool` ou `crypto` diretamente.

## Leitura dinâmica de pgPool

`server.ts` injeta `getPgPool: () => pgPool`. O handler resolve o pool a cada requisição e não captura seu valor no registro da rota.

## Atualização dos guards

O contrato existente passou a congelar o PUT no novo módulo. O novo guard verifica wiring, posição, dependências, SQL, parâmetros, respostas e limites. O guard de mutações restantes agora trata o PUT como extraído e mantém comissão, suporte e DELETE como rotas inline.

## Riscos evitados

Não foram introduzidos transação, fallback local, `isPostgresActive`, UUID, serviço externo, verificação de `rowCount` ou acesso a outro domínio/tabela. Nenhuma mensagem HTTP, status, path ou contrato foi alterado.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-update-contract.test.ts`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-update-routes-wiring.test.ts`
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Parar novas extrações automáticas e fazer diagnóstico/reforço específico antes de tocar:

- `DELETE /api/admin/custom-providers/:id`;
- `POST /api/admin/support/:id/reply`;
- `POST /api/admin/commissions/:id/pay`.
