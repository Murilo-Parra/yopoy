# Refatoração do server — Etapa 49.1-E

## Objetivo

Extrair exclusivamente as rotas estáticas de PDFs do `server.ts` para um módulo próprio, sem alterar o comportamento HTTP existente.

## Arquivos alterados/criados

- Alterado: `server.ts`.
- Criado: `src/backend/static/registerStaticPdfRoutes.ts`.
- Criado: `src/backend/static/tests/static-pdf-routes-wiring.test.ts`.
- Criado: `docs/server-refactor-49.1-E.md`.

## Rotas extraídas

- `GET /manual.pdf`.
- `GET /relatorio-eventos.pdf`.
- `GET /relatorio-nfse.pdf`.

## Comportamento preservado

Foram preservados os paths, os nomes dos arquivos PDF, o uso de `process.cwd()`, a verificação com `fs.existsSync`, os headers de resposta, o envio com `res.sendFile` e os fallbacks com status 404 e suas mensagens originais. A ordem de registro existente também foi mantida: manual, relatório NFSE e relatório de eventos.

## Dependências movidas

O módulo novo passou a concentrar `fs`, `path` e os tipos `Express`, `Request` e `Response` necessários aos três handlers. O import de `path` permaneceu no `server.ts` porque ainda é usado pelo bootstrap do frontend.

## Riscos evitados

- Nenhum contrato HTTP, path, status code ou mensagem foi alterado.
- Nenhuma lógica de fallback ou de `res.sendFile` foi simplificada.
- Nenhum domínio fora da responsabilidade de PDFs estáticos foi modificado.
- O guard reprova rotas PDF inline no `server.ts`, ausência de arquivos obrigatórios, atalhos de tipagem proibidos e imports de domínios vedados.

## Validações executadas

- `npm run typecheck`: concluído sem erros.
- `npx vitest run src/backend/auth/tests`: a execução no sandbox foi bloqueada por `listen EPERM`; repetida com permissão para listener local, concluiu com 13 arquivos e 98 testes aprovados.
- `npx vitest run src/backend/static/tests/static-pdf-routes-wiring.test.ts`: concluído com 1 arquivo e 5 testes aprovados.
- `git diff --check`: concluído sem erros.
- `git status --short`: conferido contra a allowlist da etapa.
- `git diff --name-only`: conferido.
- `git diff --stat`: conferido.

## Próxima etapa recomendada

Definir uma próxima extração pequena e independente do `server.ts`, com allowlist própria e guard específico, após revisão humana do diff desta etapa.
