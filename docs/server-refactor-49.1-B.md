# Relatório de Refatoração do server.ts (Etapa 49.1-B)

## Objetivo

Extrair a rota perigosa `POST /api/system/factory-reset` do `server.ts` para um módulo próprio de DevTools, preservando o comportamento existente.

## Arquivos alterados

- `server.ts`

## Arquivos criados

- `src/backend/devtools/registerFactoryResetRoutes.ts`
- `src/backend/devtools/tests/factory-reset-routes-wiring.test.ts`
- `docs/server-refactor-49.1-B.md`

## Rota extraída

- `POST /api/system/factory-reset`

## Comportamento preservado

A rota preserva:
- path HTTP;
- método HTTP;
- status codes;
- payloads de sucesso e erro;
- guarda `canRunFactoryReset`;
- exigência de `YOPOY_FACTORY_RESET_ADMIN_PASSWORD_HASH`;
- fluxo de limpeza PostgreSQL;
- fallback em memória;
- remoção dos arquivos temporários já existentes.

## Dependências injetadas

O `server.ts` injeta no módulo:

- `isPostgresActive`
- `pgPool`
- `dbInMemoryLocal`
- `scheduleSaveLocalFallback`

## Riscos evitados

- A rota deixou de ficar inline no entrypoint principal.
- O `server.ts` ficou menos exposto a alterações acidentais em lógica perigosa.
- O guard estático impede que a rota volte para o `server.ts`.
- A extração não tocou em auth, fiscal, componentes, migrations, banco ou CI.

## Validações esperadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/devtools/tests/factory-reset-routes-wiring.test.ts`
- `git diff --check`

## Próxima etapa recomendada

49.1-C — extrair rotas Gemini/IA.
