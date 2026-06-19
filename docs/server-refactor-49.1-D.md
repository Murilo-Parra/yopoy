# Server refactor 49.1-D

## Objetivo

Extrair exclusivamente a rota `GET /api/auth/company-audit-logs` do `server.ts` para um módulo próprio de audit, sem alterar seu comportamento.

## Arquivos alterados/criados

- `server.ts`: substitui a rota inline pelo registro modular.
- `src/backend/audit/registerCompanyAuditLogRoutes.ts`: registra e implementa a rota extraída.
- `src/backend/audit/tests/company-audit-log-routes-wiring.test.ts`: protege o wiring, a localização da rota, a tipagem e o desacoplamento de auth.
- `docs/server-refactor-49.1-D.md`: documenta a etapa.

## Rota extraída

- `GET /api/auth/company-audit-logs`

## Comportamento preservado

- A mesma validação de sessão e a mesma resposta `401` quando ela não existe.
- A mesma seleção entre PostgreSQL e fallback em memória.
- A mesma query SQL, parâmetros, ordenação e limite de 50 registros.
- O mesmo filtro, ordenação e limite no fallback em memória.
- Os mesmos payloads, mensagens HTTP e resposta `500` em falha.

## Dependências injetadas

- Estado dinâmico `isPostgresActive`.
- Pool dinâmico `pgPool`.
- Armazenamento `dbInMemoryLocal`.
- Função existente `getSessionFromRequest`.

## Riscos evitados

- Nenhum acoplamento do novo módulo com `src/backend/auth`.
- Nenhuma alteração em contrato HTTP, autenticação, query SQL ou fallback.
- Getters no wiring preservam as bindings atualizadas pelo bootstrap do banco.
- Guard impede o retorno da rota inline e atalhos de tipagem proibidos.

## Validações executadas

- `npm run typecheck`: aprovado.
- `npx vitest run src/backend/auth/tests`: aprovado fora do sandbox, com 13 arquivos e 98 testes aprovados. A primeira tentativa no sandbox foi bloqueada por `listen EPERM 0.0.0.0` do Supertest.
- `npx vitest run src/backend/audit/tests/company-audit-log-routes-wiring.test.ts`: aprovado.
- `git diff --check`: aprovado.
- `git status --short`: conferido contra a allowlist.
- `git diff --name-only`: executado.
- `git diff --stat`: executado.

## Próxima etapa recomendada

Selecionar uma única rota legada adicional de `server.ts` para uma nova etapa independente, mantendo uma responsabilidade por extração.
