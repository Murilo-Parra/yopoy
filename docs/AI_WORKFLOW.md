# Fluxo de Trabalho com IA no Yopoy

## Objetivo

Evitar alterações fora do escopo, regressões silenciosas e entregas contaminadas por snapshots antigos.

## Regra principal

ZIP completo de ferramenta externa nunca é fonte de verdade.

A fonte de verdade é sempre:

- repositório local atual;
- `git diff`;
- testes locais;
- allowlist de arquivos da etapa.

## Fluxo seguro

1. Confirmar estado inicial:

```bash
git status --short
git log --oneline -6
```

2. Definir escopo exato da etapa.

3. Pedir alteração pequena, com uma responsabilidade.

4. Validar:

```bash
npm run typecheck
npx vitest run src/backend/auth/tests
git diff --check
git status --short
git diff --name-only
git diff --stat
```

5. Conferir se `git diff --name-only` bate exatamente com o escopo.

6. Só então commitar.

## Critérios de reprovação

Reprovar a entrega se:

- alterar arquivos fora do escopo;
- alterar auth sem autorização;
- alterar db/migrations/components sem autorização;
- alterar contrato HTTP sem autorização;
- criar teste que passa quando arquivo obrigatório não existe;
- usar `any`, `as any`, `Promise<any>`, `unknown as Request`, `unknown as Response`;
- remover teste/guard existente;
- enfraquecer teste estático.

## Uso recomendado do Codex

O Codex deve trabalhar localmente no repo e nunca substituir revisão humana.

Sempre pedir para ele:

- listar plano antes de editar;
- alterar somente arquivos permitidos;
- rodar validações;
- mostrar diff;
- não fazer commit sem confirmação.
