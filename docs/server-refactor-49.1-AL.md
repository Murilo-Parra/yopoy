# Etapa 49.1-AL — contrato do PUT admin custom provider

## Objetivo

Congelar com um guard específico o contrato atual de `PUT /api/admin/custom-providers/:id`, sem extrair a rota ou alterar seu comportamento.

## Commit-base

`1efb949 refactor(server): extract admin custom provider template mutation route`

## Arquivos alterados

- `src/backend/admin/tests/admin-custom-provider-update-contract.test.ts`
- `docs/server-refactor-49.1-AL.md`

`server.ts` não foi alterado.

## Contrato atual congelado

A rota permanece inline, protegida por `requireMasterAdmin` e posicionada entre o registrador de criação e o `DELETE` de custom provider. Ela depende somente de `pgPool`, atualiza os nove campos atuais e `updated_at` em `custom_nfse_providers`, preservando a ordem dos dez parâmetros SQL.

Sem `pgPool`, responde `500` com `Banco de dados não conectado.`. Em sucesso, responde `Provedor atualizado com sucesso`. Erros SQL continuam respondendo `500`, `Falha ao atualizar provedor` e `details: err.message`. Como não há verificação de `rowCount`, ID inexistente continua produzindo sucesso silencioso.

## Riscos preservados

- Ausência de validação explícita dos campos recebidos.
- Ausência de verificação de existência do provider.
- Retorno de sucesso quando o `UPDATE` não encontra linhas.
- Exposição de `err.message` em `details` no erro SQL.

O guard também confirma que a rota não ganhou fallback local, transação, relógio, UUID ou dependências fiscais e externas.

## Por que não extrair nesta etapa

Esta etapa reduz o risco de mudança acidental por meio de verificação estática. Ela não demonstra o comportamento em execução nem a interação real com `pgPool`; portanto, ainda não oferece cobertura suficiente para mover o handler.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-update-contract.test.ts`
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `npx vitest run src/backend/auth/tests`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Decidir entre:

1. criar teste comportamental real do PUT com mock de `pgPool`, se a arquitetura permitir sem subir listener; ou
2. somente depois extrair `PUT /api/admin/custom-providers/:id` em uma etapa isolada.
