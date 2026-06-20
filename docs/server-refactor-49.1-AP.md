# Etapa 49.1-AP — contrato da quitação admin de comissão

## Objetivo

Reforçar os guards do contrato real atual de `POST /api/admin/commissions/:id/pay`, sem extrair a rota ou alterar seu comportamento.

## Commit-base

`47dc540 test(admin): guard support reply contract`

## Arquivos alterados

- `src/backend/admin/tests/admin-commission-payment-contract.test.ts`
- `docs/server-refactor-49.1-AP.md`

`server.ts` não foi alterado. O guard agregado de mutações restantes também não precisou de alteração: ele já mantém comissão, suporte e DELETE inline, o PUT extraído, impede o retorno inline das rotas extraídas, proíbe novos registradores dessas três mutações e marca a quitação financeira como risco.

## Contrato real atual congelado

A rota permanece inline, protegida por `requireMasterAdmin`, depois de `registerAdminCommissionQueryRoutes` e antes de `registerAdminSupportQueryRoutes`. Ela usa `isPostgresActive`, `pgPool`, `dbInMemoryLocal` e `scheduleSaveLocalFallback`; não usa relógio, UUID, serviço externo ou integração fiscal.

O sucesso real usa o status padrão 200 de `res.json` e o payload `{ success: true, message: "Comissão quitada e registrada financeiramente com sucesso!" }`. Erros retornam HTTP 500 com `{ error: "Erro ao dar baixa em comissão." }`, sem `details`.

ID inexistente e comissão já marcada como `Pago` mantêm o sucesso silencioso atual. Não há resposta 404 nem lançamento explícito para esses casos.

## Comportamento PostgreSQL

Quando `isPostgresActive && pgPool`, a rota executa `BEGIN`, busca `SELECT * FROM affiliate_commissions WHERE id = $1` com `[id]` e, se a comissão existir e o status não for `Pago`, executa na ordem:

1. `UPDATE affiliate_commissions SET status = 'Pago' WHERE id = $1`, com `[id]`;
2. `UPDATE affiliates SET commission_paid = commission_paid + $1, commission_pending = commission_pending - $1 WHERE id = $2`, com `[comm.commission_amount, comm.affiliate_id]`.

Depois executa `COMMIT`. Os campos financeiros alterados são `commission_paid` e `commission_pending`; no PostgreSQL, a rota não limita `commission_pending` a zero.

Não há verificação de `rowCount` em nenhum comando. Assim, afiliado inexistente também não é detectado, e a comissão pode ser marcada como paga sem atualização financeira do afiliado.

## Comportamento fallback local

O fallback desserializa `dbInMemoryLocal.global['affiliate_commissions']` e `dbInMemoryLocal.global['affiliates']`, busca a comissão por `id` e só entra no bloco de persistência quando ela existe e ainda não está `Pago`.

Nesse bloco, primeiro define o status como `Pago`; depois busca o afiliado por `affiliate_id`. Quando o afiliado existe, soma `commission_amount` a `commission_paid`, usando `0.00` como fallback, e subtrai o valor de `commission_pending`, também com fallback `0.00`, limitando o resultado a zero com `Math.max`.

As duas coleções são serializadas novamente e `scheduleSaveLocalFallback()` é chamado mesmo quando o afiliado não existe, desde que a comissão exista e não esteja paga. Se a comissão não existir ou já estiver paga, não há persistência nem agendamento, mas a resposta continua sendo sucesso.

## Risco financeiro

O fluxo altera o status da comissão e os saldos `commission_paid` e `commission_pending`. O PostgreSQL não verifica se o afiliado foi atualizado, não protege saldo pendente contra valor negativo e não trata comissão inexistente ou já paga como erro. O fallback local diverge ao limitar `commission_pending` a zero.

## Risco transacional

A transação usa `pgPool.query` diretamente para `BEGIN`, consultas e `COMMIT`, sem reservar um client dedicado. Portanto, não há garantia explícita no código de que todos os comandos usem a mesma conexão do pool.

Não existe `ROLLBACK` no bloco de erro. Também não há lock explícito (`FOR UPDATE` ou equivalente), condição por versão ou outro controle de concorrência. Quitações concorrentes podem observar a mesma comissão ainda não paga e aplicar a atualização financeira mais de uma vez.

## Por que não extrair nesta etapa

Esta etapa apenas congela o comportamento existente. Extrair agora levaria para um módulo separado riscos financeiros e transacionais ainda sem teste comportamental real, tornando mais difícil distinguir uma mudança estrutural de uma correção de atomicidade.

## Validações

- `npm run typecheck`: passou.
- `npx vitest run src/backend/admin/tests/admin-commission-payment-contract.test.ts`: passou, 10 testes.
- `npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`: passou, 9 testes.
- `npx vitest run src/backend/auth/tests`: falhou no sandbox por `listen EPERM`; repetido fora da restrição, passou com 98 testes.
- `git diff --check`: passou.
- `git status --short --untracked-files=all`: apenas os dois arquivos da allowlist criados nesta etapa.
- `git diff --name-only` e `git diff --stat`: sem saída porque os arquivos novos permanecem não rastreados; nenhum `git add` foi executado.

## Próxima etapa recomendada

Não extrair comissão ainda. Antes, criar teste comportamental real e/ou corrigir a atomicidade em etapa separada, usando client dedicado, `ROLLBACK` explícito e proteção concorrente. Não combinar qualquer trabalho nessa rota com alterações na resposta de suporte ou no DELETE de custom provider.
