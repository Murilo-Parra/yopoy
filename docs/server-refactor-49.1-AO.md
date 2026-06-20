# Etapa 49.1-AO — contrato da resposta admin de suporte

## Objetivo

Reforçar os guards do contrato real atual de `POST /api/admin/support/:id/reply`, sem extrair a rota ou alterar seu comportamento.

## Commit-base

`3a5a5fe test(admin): guard custom provider delete contract`

## Arquivos alterados

- `src/backend/admin/tests/admin-support-reply-contract.test.ts`
- `docs/server-refactor-49.1-AO.md`

`server.ts` não foi alterado. O guard agregado de mutações restantes também não precisou de alteração, pois já protege suporte, comissão e DELETE inline, PUT extraído e a ausência de novos registradores.

## Contrato real congelado

A rota permanece inline, protegida por `requireMasterAdmin`, depois de `registerAdminSupportQueryRoutes` e antes de `registerAdminAuditLogQueryRoutes`.

Ela lê `message` e `status` de `req.body`. Mensagem ausente retorna HTTP 400 com `{ error: "A mensagem de resposta não pode estar em branco." }`. O reply criado tem `{ date, sender, message }`, com `date` gerado por `new Date().toISOString()` e `sender` igual a `Suporte Elparrar SaaS`.

O sucesso real é `{ success: true, message: "Resposta transmitida e status do chamado atualizado comercialmente!" }`. Erros retornam HTTP 500 com `{ error: "Erro ao responder chamado." }`, sem `details`.

Esse contrato difere da suposição anterior: não usa a mensagem curta de validação, não cria `{ from, timestamp }`, não usa `dbInMemoryLocal.supportTickets`, não fixa o status como `responded` e não inclui detalhes no erro.

## PostgreSQL

Quando `isPostgresActive && pgPool`, a rota lê o ticket com `SELECT * FROM support_tickets WHERE id = $1`, normaliza `replies`, acrescenta o reply em memória e executa `UPDATE support_tickets SET status = $1, replies = $2::jsonb WHERE id = $3`. O status vem do body. Não há verificação de `rowCount`; ticket inexistente mantém sucesso silencioso.

## Fallback local

O fallback desserializa `dbInMemoryLocal.global['support_tickets']`, localiza o índice pelo `id`, acrescenta o reply, atribui o status recebido, serializa novamente e chama `scheduleSaveLocalFallback`. Ticket inexistente também mantém sucesso silencioso.

## Risco de concorrência

O fluxo PostgreSQL faz read-modify-write de todo o campo `replies`. Não há append atômico SQL, transação, lock explícito ou condição por versão/`updated_at`. Respostas concorrentes podem sobrescrever replies adicionados entre o `SELECT` e o `UPDATE`.

## Por que não extrair nesta etapa

A etapa apenas cria uma linha de base verificável do comportamento existente. Extrair agora preservaria também o risco concorrente sem evidência comportamental suficiente para uma mudança posterior segura.

## Validações

- `npm run typecheck`: passou.
- `npx vitest run src/backend/admin/tests/admin-support-reply-contract.test.ts`: passou, 9 testes.
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`: passou, 9 testes.
- `npx vitest run src/backend/auth/tests`: falhou no sandbox por `listen EPERM`; repetido fora da restrição, passou com 98 testes.
- `git diff --check`: passou.
- `git status --short --untracked-files=all`: apenas os dois arquivos da allowlist criados nesta etapa.
- `git diff --name-only` e `git diff --stat`: sem saída porque os arquivos novos permanecem não rastreados; nenhum `git add` foi executado.

## Próxima etapa recomendada

Não extrair suporte ainda. Antes, criar teste comportamental real ou refatorar o armazenamento para append concorrente seguro. Como próxima opção, diagnosticar e reforçar o contrato de comissão antes de qualquer extração financeira.
