# Etapa 49.1-AQ — diagnóstico final das rotas admin críticas restantes

## Objetivo

Diagnosticar as três mutações admin críticas ainda inline, sem alterar comportamento, extrair rotas ou editar código de produção.

## Commit-base e estado inicial

- Commit confirmado: `2e3bdb8 test(admin): guard commission payment contract`.
- Worktree confirmado limpo antes da análise.
- As três rotas permanecem inline em `server.ts`.
- Os quatro guards exigidos existem:
  - `src/backend/admin/tests/admin-custom-provider-delete-contract.test.ts`;
  - `src/backend/admin/tests/admin-support-reply-contract.test.ts`;
  - `src/backend/admin/tests/admin-commission-payment-contract.test.ts`;
  - `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`.

## Arquivos analisados

- `AGENTS.md` e `docs/AI_WORKFLOW.md`;
- `server.ts`;
- `db.ts` e `infrastructure/database/bootstrap.ts`, somente para conferir FKs, cascatas, tabelas e campos;
- os quatro guards listados acima;
- `docs/server-refactor-49.1-AN.md`, `docs/server-refactor-49.1-AO.md` e `docs/server-refactor-49.1-AP.md`;
- testes admin de wiring encontrados pela busca das três rotas.

Nenhum código de produção foi alterado. O único arquivo criado nesta etapa é este relatório; `server.ts` não foi alterado.

## 1. `DELETE /api/admin/custom-providers/:id`

### Implementação atual

- Posição: `server.ts:2194-2209`, depois de `registerAdminCustomProviderUpdateRoutes` e antes de `registerAdminCustomProviderMappingQueryRoutes`.
- Proteção e dependências: middleware `requireMasterAdmin`, `req.params.id` e `pgPool`. Não usa `isPostgresActive`, fallback local, relógio, UUID ou serviço externo.
- SQL: `DELETE FROM custom_nfse_providers WHERE id = $1`, com `[id]`.
- Tabela diretamente afetada: `custom_nfse_providers`.
- Efeitos indiretos do schema: exclusão em cascata de `custom_provider_mappings` e `custom_provider_templates`; em `custom_provider_logs`, `provider_id` passa a `NULL` por `ON DELETE SET NULL`, preservando o log sem a associação.
- Transação: não há transação explícita. O único `DELETE`, incluindo seus efeitos de FK, é uma instrução SQL atômica no PostgreSQL.
- Fallback local: ausente.
- `rowCount`: não é consultado.

### Respostas e casos-limite

- Sem `pgPool`: HTTP 500, `{ error: "Banco de dados não conectado." }`.
- Sucesso: HTTP 200 implícito, `{ message: "Provedor removido com sucesso" }`.
- Erro: HTTP 500, `{ error: "Falha ao remover provedor", details: err.message }`.
- ID inexistente: o `DELETE` afeta zero linhas, mas a ausência de `rowCount` produz o mesmo HTTP 200 e payload de sucesso.

### Riscos, cobertura e decisão de extração

- Risco de produção: exclusão irreversível do provider, mappings e templates sem pré-checagem, confirmação ou indicação da quantidade removida; logs perdem a referência ao provider. O contrato também mascara ID inexistente.
- Testes existentes: `admin-custom-provider-delete-contract.test.ts` congela posição, proteção, dependências, SQL, payloads, sucesso silencioso e relações destrutivas; `admin-remaining-mutation-routes-safety.test.ts` mantém a rota inline e bloqueia extração antecipada. Testes de wiring de módulos vizinhos também conferem sua presença/ordem.
- Testes ainda necessários: teste comportamental do handler com `pgPool` para ausência de pool, bind do ID, sucesso, zero linhas e erro; teste de integração PostgreSQL para comprovar cascatas e `SET NULL` com dados reais.
- Extração na próxima etapa: **não**. A cobertura atual inspeciona texto e schema, mas não caracteriza a execução destrutiva real.

## 2. `POST /api/admin/support/:id/reply`

### Implementação atual

- Posição: `server.ts:2105-2157`, depois de `registerAdminSupportQueryRoutes` e antes de `registerAdminAuditLogQueryRoutes`.
- Proteção e dependências: `requireMasterAdmin`, `req.params.id`, `req.body.message`, `req.body.status`, `new Date`, `isPostgresActive`, `pgPool`, `dbInMemoryLocal` e `scheduleSaveLocalFallback`.
- Reply real: `{ date: new Date().toISOString(), sender: 'Suporte Elparrar SaaS', message }`.
- Validação: `message` falsy retorna HTTP 400 com `{ error: "A mensagem de resposta não pode estar em branco." }`.

### PostgreSQL e fallback local

- PostgreSQL: faz `SELECT * FROM support_tickets WHERE id = $1`; se o ticket existe, aceita `replies` como string JSON ou array, usa `[]` nos demais formatos, acrescenta o reply em memória e executa `UPDATE support_tickets SET status = $1, replies = $2::jsonb WHERE id = $3` com `[status, JSON.stringify(replies), id]`.
- Fallback: desserializa `dbInMemoryLocal.global['support_tickets']`, busca o ticket por ID, usa o array de replies existente ou `[]`, acrescenta o reply, atribui o `status`, serializa a coleção e chama `scheduleSaveLocalFallback()`.
- Ticket inexistente: nenhuma persistência em ambas as branches, mas retorna o mesmo sucesso.
- Sucesso: HTTP 200 implícito, `{ success: true, message: "Resposta transmitida e status do chamado atualizado comercialmente!" }`.
- Erro: HTTP 500, `{ error: "Erro ao responder chamado." }`, sem `details`.
- Transação, lock e append atômico: ausentes. Também não há `rowCount`, versão ou condição por `updated_at`.

### Riscos, cobertura e decisão de extração

- Risco de concorrência: o PostgreSQL faz read-modify-write do JSONB inteiro. Duas respostas podem ler o mesmo array e a última atualização sobrescrever a anterior, causando perda de reply. O fallback tem o mesmo padrão sem sincronização entre requisições/processos.
- Outros riscos: `status` é persistido diretamente do body; ticket inexistente é reportado como sucesso; string JSON inválida em `replies` gera erro 500.
- Testes existentes: `admin-support-reply-contract.test.ts` congela posição, dependências, validação, reply, SQL, fallback, payloads e ausência de proteção concorrente; `admin-remaining-mutation-routes-safety.test.ts` mantém a rota inline e bloqueia extração antecipada. O wiring da query de suporte preserva sua posição.
- Testes ainda necessários: testes comportamentais das branches PostgreSQL e local, validação, ticket inexistente, formatos de `replies`, erro e persistência; teste concorrente/integrado que demonstre o lost update antes de corrigir o append.
- Extração na próxima etapa: **não**. Primeiro é necessário caracterizar o comportamento executável e, em etapa própria, tratar a concorrência sem misturar correção e modularização.

## 3. `POST /api/admin/commissions/:id/pay`

### Implementação atual

- Posição: `server.ts:2056-2094`, depois de `registerAdminCommissionQueryRoutes` e antes de `registerAdminSupportQueryRoutes`.
- Proteção e dependências: `requireMasterAdmin`, `req.params.id`, `isPostgresActive`, `pgPool`, `dbInMemoryLocal` e `scheduleSaveLocalFallback`.
- Tabelas/campos financeiros: `affiliate_commissions.status`; `affiliates.commission_paid`; `affiliates.commission_pending`. O valor aplicado vem de `affiliate_commissions.commission_amount` e o vínculo de `affiliate_id`.

### PostgreSQL

A ordem real é:

1. `pgPool.query("BEGIN")`;
2. `SELECT * FROM affiliate_commissions WHERE id = $1`;
3. se a comissão existe e `status !== 'Pago'`, atualizar seu status para `Pago`;
4. depois somar `commission_amount` a `commission_paid` e subtrair o mesmo valor de `commission_pending` no afiliado;
5. `pgPool.query("COMMIT")`.

Há `BEGIN` e `COMMIT`, mas não há `ROLLBACK`. Todos os comandos usam `pgPool.query` diretamente; não há `pgPool.connect()`, client dedicado ou `release()`. Assim, o código não garante que as instruções da suposta transação usem a mesma conexão. Não há lock, compare-and-set, versão nem `rowCount` em `SELECT`/`UPDATE`. O PostgreSQL também não limita `commission_pending` a zero.

### Fallback local

Desserializa `affiliate_commissions` e `affiliates`; se a comissão existe e não está `Pago`, primeiro marca a comissão como paga, depois procura o afiliado. Se o afiliado existe, soma o valor pago e reduz o pendente com `Math.max(0, ...)`. Por fim, persiste as duas coleções e agenda o salvamento. Mesmo sem afiliado, a comissão alterada é persistida como paga.

### Respostas e casos-limite

- Sucesso: HTTP 200 implícito, `{ success: true, message: "Comissão quitada e registrada financeiramente com sucesso!" }`.
- Erro: HTTP 500, `{ error: "Erro ao dar baixa em comissão." }`, sem `details`.
- Comissão inexistente ou já paga: nenhum ajuste financeiro, `COMMIT` no PostgreSQL e sucesso silencioso; no fallback não há persistência, mas a resposta também é sucesso.
- Afiliado inexistente: no PostgreSQL, o update pode afetar zero linhas e a comissão já marcada continua reportada como paga; no fallback, a comissão é igualmente persistida como paga. Não há `rowCount` nem erro específico.

### Riscos, cobertura e decisão de extração

- Risco financeiro: crítico. É possível registrar comissão como paga sem atualizar o afiliado, produzir saldo pendente negativo no PostgreSQL e divergir do fallback, que limita o saldo a zero.
- Risco transacional: crítico. `BEGIN`/`COMMIT` pelo pool sem client reservado não formam uma fronteira transacional confiável; falhas não executam `ROLLBACK` e podem deixar alteração parcial ou uma conexão em transação, conforme a conexão escolhida pelo pool.
- Risco de concorrência: crítico. Duas requisições podem ler `Pendente`, ambas marcar `Pago` e ambas aplicar os valores ao afiliado. Não há lock nem atualização condicional por status.
- Testes existentes: `admin-commission-payment-contract.test.ts` congela posição, dependências, SQL, ordem, fallback, payloads e os riscos de transação; `admin-remaining-mutation-routes-safety.test.ts` mantém a rota inline e bloqueia extração antecipada. O wiring da query de comissões preserva sua posição.
- Testes ainda necessários: teste comportamental das duas branches e de todos os casos-limite; verificação de ordem, falha entre updates e ausência de afiliado; integração PostgreSQL com rollback verificável e duas quitações concorrentes. Esses testes devem caracterizar o contrato atual antes da correção transacional.
- Extração na próxima etapa: **não**. Nem a extração nem a correção financeira deve ser combinada com a primeira caracterização comportamental.

## Comparação de risco

| Critério | DELETE provider | Reply de suporte | Quitação de comissão |
|---|---|---|---|
| Dano em produção | Alto: cascatas destrutivas | Alto: resposta/status podem ser sobrescritos | Crítico: baixa e saldos podem divergir |
| Concorrência | Baixo na instrução única; sem proteção de decisão externa | Alto: read-modify-write perde replies | Crítico: pagamento pode ser aplicado mais de uma vez |
| Financeiro | Baixo/direto inexistente | Baixo/direto inexistente | Crítico |
| Perda de dados | Alto: provider, mappings e templates | Alto: lost update de replies | Alto: estado financeiro inconsistente e alteração parcial |
| Complexidade de extração | Baixa | Média | Alta |
| Cobertura atual por guards | Forte estática; sem execução real | Forte estática; sem execução real | Forte estática; sem execução real |
| Teste comportamental antes de modularizar | Necessário | Necessário, incluindo concorrência | Obrigatório, incluindo falhas e concorrência |
| Recomendação | Reforçar mais | Reforçar mais | Corrigir comportamento antes de extrair, após caracterização |

## Próxima etapa recomendada

Escolha: **4. criar teste comportamental real da quitação de comissão**.

Justificativa: é a rota com maior impacto financeiro, transacional e concorrente, enquanto a cobertura atual apenas inspeciona o fonte. Corrigir atomicidade imediatamente, sem primeiro obter uma linha de base executável, aumenta o risco de alterar silenciosamente casos-limite e contratos preservados. A próxima etapa deve testar o comportamento PostgreSQL e fallback, inclusive comissão ausente, já paga, afiliado ausente, falha entre operações e concorrência. Depois disso, uma etapa separada deve corrigir a transação com client dedicado, `ROLLBACK` e proteção concorrente; a extração deve ficar para depois da correção e de seus testes.

## Validações e comandos de conferência

Executados nesta etapa:

```bash
git log -1 --oneline
git status --short --untracked-files=all
rg -n 'custom-providers/:id|support/:id/reply|commissions/:id/pay' server.ts
test -f src/backend/admin/tests/admin-custom-provider-delete-contract.test.ts
test -f src/backend/admin/tests/admin-support-reply-contract.test.ts
test -f src/backend/admin/tests/admin-commission-payment-contract.test.ts
test -f src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts
npm run typecheck
npx vitest run src/backend/admin/tests/admin-custom-provider-delete-contract.test.ts
npx vitest run src/backend/admin/tests/admin-support-reply-contract.test.ts
npx vitest run src/backend/admin/tests/admin-commission-payment-contract.test.ts
npx vitest run src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts
git diff --check
git status --short --untracked-files=all
git diff --name-only
git diff --stat
```

Resultados:

- `npm run typecheck`: passou;
- guard do DELETE: passou, 7 testes;
- guard da resposta de suporte: passou, 9 testes;
- guard da quitação de comissão: passou, 10 testes;
- guard agregado das mutações restantes: passou, 9 testes;
- conferências Git: passaram; somente este relatório aparece no escopo final.

A suíte de auth não faz parte desta validação documental e não foi executada.
