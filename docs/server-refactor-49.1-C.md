# Relatório de Refatoração do server.ts (Etapa 49.1-C)

## Objetivo

Extrair as rotas Gemini/IA do `server.ts` para um módulo próprio, preservando o comportamento existente.

## Arquivos alterados

- `server.ts`

## Arquivos criados

- `src/backend/ai/registerGeminiRoutes.ts`
- `src/backend/ai/tests/gemini-routes-wiring.test.ts`
- `docs/server-refactor-49.1-C.md`

## Rotas extraídas

- `POST /api/gemini/parse-receipt`
- `POST /api/gemini/chat-assistant`

## Comportamento preservado

As rotas preservam:

- paths e métodos HTTP;
- status codes e mensagens HTTP;
- payloads de request e response;
- modelos Gemini utilizados;
- prompts e instruções de sistema;
- schema JSON estruturado do recibo;
- inicialização lazy do cliente Gemini;
- logs de aviso e erro;
- ordem de registro após os middlewares globais;
- limite global de upload de `15mb` mantido no `server.ts`.

## Dependências movidas

O módulo de IA passou a concentrar:

- `GoogleGenAI`;
- `Type` e `Part` do SDK `@google/genai`;
- singleton `aiInstance`;
- função lazy `getGeminiClient`;
- narrowing seguro das exceções recebidas como `unknown`.

O `server.ts` depende apenas de `registerGeminiRoutes` para registrar os dois endpoints.

## Riscos evitados

- As rotas Gemini deixaram de ficar inline no entrypoint principal.
- O guard impede que os handlers retornem ao `server.ts`.
- O guard exige a existência dos arquivos obrigatórios.
- O módulo rejeita atalhos de tipagem proibidos e acoplamento com auth.
- Nenhum domínio fiscal, Factory Reset, banco, autenticação ou frontend foi alterado.

## Validações executadas

- `npm run typecheck`
- `npx vitest run src/backend/auth/tests`
- `npx vitest run src/backend/ai/tests/gemini-routes-wiring.test.ts`
- `git diff --check`
- `git status --short`
- `git diff --name-only`
- `git diff --stat`

## Próxima etapa recomendada

Definir a próxima extração unitária do `server.ts` em uma etapa separada, com allowlist própria e preservação integral dos contratos existentes.
