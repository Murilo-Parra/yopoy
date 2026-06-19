# AGENTS.md — Yopoy

## Projeto

Yopoy é um ERP brasileiro multi-tenant para empresas físicas, com módulos de autenticação, administração, estoque/logística, financeiro e fiscal em construção.

## Regras obrigatórias para agentes

- Trabalhe sempre sobre o estado atual do Git local.
- Nunca altere arquivos fora do escopo informado na tarefa.
- Nunca altere `src/backend/auth` sem autorização explícita.
- Nunca altere `db.ts`, migrations, componentes React, `package.json`, `package-lock.json`, README ou CI sem autorização explícita.
- Nunca altere mensagens HTTP, status codes, paths ou contratos existentes sem autorização explícita.
- Nunca use `any`, `as any`, `Promise<any>`, `unknown as Request` ou `unknown as Response`.
- Nunca crie teste que passa se o arquivo esperado não existir.
- Testes/guards devem falhar se a regressão voltar.
- Prefira mudanças pequenas, uma responsabilidade por etapa.
- Não faça commit automaticamente sem o usuário revisar `git diff`.

## Comandos obrigatórios de validação

Para mudanças TypeScript/backend:

```bash
npm run typecheck
npx vitest run src/backend/auth/tests
git diff --check
git status --short
git diff --name-only
git diff --stat
```

Quando a etapa criar teste próprio, rode também o teste específico da etapa.

## Fluxo de entrega

Antes de finalizar qualquer tarefa, mostre:

- arquivos alterados;
- resumo do comportamento preservado;
- comandos executados;
- resultado dos testes;
- `git diff --name-only`;
- `git diff --stat`.

## Regra de segurança

Se a tarefa pedir alteração em `server.ts`, não altere nenhum outro domínio fora do escopo. Refatorações do `server.ts` devem mover uma única responsabilidade por etapa.
