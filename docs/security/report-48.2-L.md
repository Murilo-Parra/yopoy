# Relatório Módulo 48.2-L - Quarentena do Bearer Legado e Bloqueio de CompanyId por Query/Body

## Objetivo do Módulo
Neutralizar riscos de segurança legados referentes ao uso obsoleto do token `Authorization: Bearer` no `server.ts` e do extraction inseguro de `companyId` via `req.query` e `req.body` nas rotas do `AuthHttpHandlers.ts`.

## Risco Original Neutralizado
- **`Authorization: Bearer` legado:** Rotas não reescritas ainda possuíam suporte para tokens providos vi Bearer header.
- **Falha de Escopo do Tenant (`companyId via query`):** Handlers legados permitiam injeção arbitrária do ID do Tenant usando parâmetros da URL ou corpo da requisição de forma insegura.

## Arquivos Criados
- `src/backend/security/LegacyHttpAuthGuard.ts`: Lógica pura/isolada com regra estrita que bloqueia o fallback do Bearer.
- `src/backend/security/tests/legacy-http-auth-guard.test.ts`: Suite de testes para a regra estrita criada.
- `docs/security/report-48.2-L.md`: Este relatório de quarentena.

## Arquivos Alterados
- `server.ts`: Incluiu restrição de uso ao redor da palavra Bearer com o `legacyBearerAllowed`.
- `src/backend/auth/AuthHttpHandlers.ts`: Limpeza dos acessos a `companyId via query` e `companyId via body`.

## Comportamento Antes vs Depois
- **Antes**: Todos os ambientes permitiam `Bearer` Token de forma implícita e natural. Rotas aceitavam query strings suplantando o header oficial `x-yopoy-company-id`.
- **Depois**: Todos os ambientes em produção falham ou ignoram o token Bearer. Handlers refatorados buscam *única* e *exclusivamente* o ID do Tenant via `x-yopoy-company-id`.

## Regra de Quarentena do Bearer Legado
Bloqueio irrestrito (`false`) a menos que os requisitos sejam cumpridos:
- Ambiente seja categoricamente `development` ou `test`.
- Diretiva ambiental `YOPOY_ENABLE_LEGACY_BEARER_AUTH` esteja declarada como exatamente `"true"`.

## Regra de Bloqueio de CompanyId por Query/Body
Gatilho de cast via query parameters deletado. Obrigatória invocação estrita por `req.headers['x-yopoy-company-id']` e retornos de Unauthorized/Invalid Input nativos para mitigar account takeovers de tenant.

## Evidência de Não Modificação do Escopo Preservado
- A suíte de rotas `Admin Users` rodou e as execuções obtiveram pass. O `AdminUsersHttpHandlers.ts` segue inalterado com validação por Cookie HttpOnly.
- O Frontend não sofreu *commits* paralelos nesta rodada temporal.
- Endpoint de factory reset do `48.2-K` (`DangerousDevToolsGuard.ts`) não foi tocado.
- Contornos nativos de conexão PG ou módulos fiscais remotos SEFAZ nem mesmo foram ativados/injetados - o banco real está bloqueado. Gateways reais estão bloqueados.

## Pendências Futuras
1. **`pgPool` direto:** Retirada da invocação livre global à camada inferior em `AuthHttpHandlers.ts` ou rotas afins da primeira geração.
2. **Decomposição do `server.ts`:** Estrutura massiva precisa de divisão e designação correta para módulos independentes.
3. **Remoção definitiva do Bearer Legacy:** Abolição do `LegacyHttpAuthGuard.ts` após eliminação integral de `Authorization`.
4. **Remoção de `any`/`as any`:** O código antigo de `AuthHttpHandlers.ts` ainda mantém ocorrências legadas fora do escopo atual que não foram ampliadas e devem ser corrigidas.

## Comandos Executados
- `npm run security:all`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm audit`
- Vitest em suite paralela estrita de segurança.

## Status Final

GO
