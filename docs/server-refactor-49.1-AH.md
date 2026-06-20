# Etapa 49.1-AH — guard das mutações admin restantes

## Objetivo

Inventariar e proteger as seis mutações administrativas que permanecem inline no `server.ts`, sem extrair ou alterar nenhuma rota.

## Commit-base

`2b1f4f1 refactor(server): extract admin custom provider mutation route`

## Arquivos alterados

- `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `docs/server-refactor-49.1-AH.md`

## Confirmação sobre o servidor

O arquivo `server.ts` não foi alterado. Métodos, paths, middlewares, SQL, fallbacks, payloads, mensagens e status codes permanecem exatamente como estavam no commit-base.

## Mutações restantes inline

- `POST /api/admin/commissions/:id/pay`
- `POST /api/admin/support/:id/reply`
- `PUT /api/admin/custom-providers/:id`
- `DELETE /api/admin/custom-providers/:id`
- `POST /api/admin/custom-providers/:id/mappings`
- `POST /api/admin/custom-providers/:id/templates`

## Riscos principais

- Quitação de comissão: transação explícita com `BEGIN` e `COMMIT`, atualização coordenada de `affiliate_commissions` e `affiliates`, fallback em memória e persistência agendada.
- Resposta de suporte: atualização de `support_tickets`, manipulação do array JSON de `replies`, fallback em memória e persistência agendada.
- Atualização de provider: `UPDATE` de múltiplos campos em `custom_nfse_providers`.
- Exclusão de provider: operação destrutiva `DELETE FROM custom_nfse_providers`.
- Criação de mapping: geração de UUID e `INSERT INTO custom_provider_mappings` com defaults de campos.
- Criação de template: geração de UUID e `INSERT INTO custom_provider_templates` com versão padrão.

## Motivo para não extrair nesta etapa

Esta etapa estabelece uma linha de base verificável antes de novas mudanças. Separar o guard da extração mantém uma única responsabilidade, documenta dependências sensíveis e permite detectar alteração de ordem, retorno de rotas já extraídas ou movimentação antecipada das mutações.

## Validações

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`
- `git diff --check`
- `git status --short --untracked-files=all`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Se o guard passar, recomendar `49.1-AI — extrair POST /api/admin/custom-providers/:id/mappings`, apenas em etapa isolada e sem tocar templates, `PUT`, `DELETE`, suporte ou comissão.
