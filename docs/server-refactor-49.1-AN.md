# Etapa 49.1-AN — contrato do DELETE admin custom provider

## Objetivo

Reforçar testes e guards do contrato atual de `DELETE /api/admin/custom-providers/:id`, sem extrair a rota e sem alterar comportamento.

## Commit-base

`8e67c01 refactor(server): extract admin custom provider update route`

## Arquivos alterados

- `src/backend/admin/tests/admin-custom-provider-delete-contract.test.ts`
- `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `docs/server-refactor-49.1-AN.md`

`server.ts` não foi alterado.

## Contrato atual congelado do DELETE

A rota continua inline, protegida por `requireMasterAdmin`, depois de `registerAdminCustomProviderUpdateRoutes` e antes de `registerAdminCustomProviderMappingQueryRoutes`. Ela depende somente de `pgPool` e executa `DELETE FROM custom_nfse_providers WHERE id = $1` com `req.params.id` em `[id]`.

Sem `pgPool`, responde `500` com `Banco de dados não conectado.`. Em sucesso, responde `Provedor removido com sucesso`. Em erro, responde `500` com `Falha ao remover provedor` e `details: err.message`. A ausência de verificação de `rowCount` mantém sucesso silencioso para ID inexistente.

O guard também congela a ausência de fallback local, estado em memória, UUID, relógio, transação, serviços externos e integrações fiscais.

## Risco destrutivo e cascata

O schema atual usa os nomes `custom_provider_mappings`, `custom_provider_templates` e `custom_provider_logs`. Mappings e templates referenciam `custom_nfse_providers(id)` com `ON DELETE CASCADE`; portanto, remover um provider também remove seus mappings e templates. Logs referenciam o provider com `ON DELETE SET NULL`, portanto são preservados, mas perdem a associação direta ao provider excluído.

A rota não consulta dependências, não solicita confirmação, não abre transação explícita e não diferencia ID inexistente. O teste congela esse risco atual; não o corrige nem altera o contrato HTTP.

## Por que não extrair nesta etapa

Esta etapa adiciona proteção estática para o handler inline e para as relações destrutivas do schema. Ela ainda não comprova o comportamento real do DELETE com `pgPool` nem os efeitos de cascata em execução. Modularizar agora combinaria mudança estrutural com um contrato destrutivo coberto apenas estaticamente.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/admin/tests/admin-custom-provider-delete-contract.test.ts`
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `npx vitest run src/backend/auth/tests`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Não extrair o DELETE ainda. A próxima opção segura é diagnosticar e reforçar o contrato da resposta de suporte ou da quitação de comissão, ou criar um teste comportamental real do DELETE antes de qualquer modularização.
