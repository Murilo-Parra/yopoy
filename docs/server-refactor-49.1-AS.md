# Etapa 49.1-AS — atomicidade da baixa interna de comissão

## Objetivo e base

Corrigir somente a atomicidade de `POST /api/admin/commissions/:id/pay`, preservando a rota inline e seu papel de baixa interna/contábil. Commit-base: `4dcd3ed test(admin): cover commission payment behavior`.

Arquivos alterados:

- `server.ts`;
- `src/backend/admin/tests/admin-commission-payment-contract.test.ts`;
- `src/backend/admin/tests/admin-commission-payment-behavior.test.ts`;
- `src/backend/admin/tests/admin-remaining-mutation-routes-safety.test.ts`;
- `docs/server-refactor-49.1-AS.md`.

No `server.ts`, somente a rota de comissão foi alterada. A rota de suporte e `DELETE /api/admin/custom-providers/:id` não foram alterados. Nenhuma rota foi extraída e nenhum registrador foi criado.

## Limite de negócio

Esta rota não realiza pagamento real nem movimenta dinheiro. Ela apenas marca `affiliate_commissions.status` como `Pago` e atualiza os saldos internos `commission_paid` e `commission_pending` em `affiliates`.

Uma transação de banco de dados torna atômicas essas alterações internas. Ela não é uma transação monetária, não envia valores a bancos ou usuários e não substitui um gateway de pagamentos. Não foi adicionada integração com Pix, boleto, cartão, banco, gateway, API financeira ou webhook.

## Comportamento antigo e novo

Antes, `BEGIN` e `COMMIT` eram chamados diretamente no pool e poderiam usar conexões diferentes. Não havia `ROLLBACK`, comissão inexistente ou já paga retornava sucesso, e o `rowCount` do UPDATE do afiliado era ignorado.

Agora, o caminho PostgreSQL:

1. obtém um client dedicado com `pgPool.connect()`;
2. executa `BEGIN`, SELECT e ambos os UPDATEs com `client.query`;
3. retorna 404 para comissão inexistente;
4. retorna 409 para comissão já paga;
5. valida o `rowCount` do UPDATE do afiliado e retorna 404 quando ele não existe;
6. executa `COMMIT` somente no caminho feliz;
7. executa `ROLLBACK` nos caminhos inválidos e em erro após o BEGIN;
8. sempre executa `client.release()` no `finally`.

O fallback local foi alinhado: usa os mesmos status 404/409 e não persiste alteração parcial quando a comissão é inexistente, já está paga ou seu afiliado não existe. O payload de sucesso e o erro 500 existentes foram preservados.

## Riscos

Riscos reduzidos: comandos PostgreSQL fora da mesma conexão, ausência de rollback, sucesso silencioso e comissão marcada como paga sem afiliado atualizado.

Riscos ainda existentes: a rota não usa lock de linha nem controle explícito de concorrência; o saldo pendente PostgreSQL pode ficar negativo, enquanto o fallback aplica piso zero. Esses pontos não foram ampliados nesta etapa para manter o escopo restrito.

## Validações

- `npm run typecheck`;
- teste de contrato da comissão;
- teste comportamental da comissão;
- guard das mutações admin restantes;
- suíte de autenticação obrigatória do repositório;
- `git diff --check`, status, lista e estatística do diff.

## Próxima etapa recomendada

49.1-AT — checkpoint final e encerramento da sequência 49.1. Depois disso, parar a refatoração do server e voltar para produto/front-end: documento oficial Yopoy V1, modelo de cards/estados e Central Visual Inteligente.
