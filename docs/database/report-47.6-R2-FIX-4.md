# Módulo 47.6-R2-FIX-4 — Corrigir Bootstrap de Companies com FORCE RLS no PostgreSQL Local

## 1. Arquivos alterados
- `src/infrastructure/postgres-native/tests/native-rls-isolation.test.ts`
- `src/infrastructure/postgres-native/tests/native-unit-of-work.test.ts`

## 2. Como a policy de companies foi corrigida
No módulo `FIX-3`, a policy de `companies` já foi corretamente definida para utilizar a comparação direta do ID da empresa (`id::text = current_setting('app.current_company_id', true)`). 

## 3. Como o bootstrap de companies foi ajustado
Para satisfazer a exigência da política e ainda manter o `FORCE ROW LEVEL SECURITY`, o script dos testes agora emprega UUIDs com antecedência via `randomUUID()`. O ID predeterminado é injetado localmente via `SELECT set_config(...)` na conexão logo antes de processar o comando base `INSERT INTO companies`.

## 4. Como os testes criam empresas sob contexto RLS válido
Em vez de depender de query strings cruas com `RETURNING id`, cada bloco de SETUP nos testes requisita um único `pool.connect()`. A partir deste *Client*, o teste invoca um bloco `BEGIN`, seguido imediatamente pela parametrização `set_config('app.current_company_id', $1, true)` com o UUID definido para a company. Só a partir deste ponto o `INSERT INTO companies` real ocorre, usando este mesmo UUID - respeitando assim a policy configurada.

## 5. Como users/sales são criados com company_id válido
Permanecendo estritamente dentro da mesma transação referenciada (`client`), o passo de inclusão de usuários e vendas agora acessa o mesmo UUID `idC1` gerado localmente, satisfazendo integridade de constraint de chave estrangeira (FK) e contexto RLS multi-tenant, sem necessitar `RETURNING id` das empresas.

## 6. Como o UnitOfWork preserva contexto
No setup via script de testes, a verificação passa usando as instâncias UoW que inicializam em si um transacional `BEGIN`, setando de antemão o contexto usando `app.current_company_id`. Todos os callbacks repassados rodam na mesmíssima conexão extraída do `pool`, impedindo colisão com RLS e queries que buscam/registram valores.

## 7. Como o teste confirma isolamento C1/C2
O teste executa, via UnitOfWork, a query total `SELECT * FROM sales;` no namespace do tenant `idC1` e logo após no namespace `idC2`. Devido ao context binding e `FORCE RLS`, as instâncias validam o limite transacional devolvendo unicamente 1 linha por chamamento - excluindo informações vazadas do outro workspace sem intervenção do framework ou cláusula `WHERE` explícita na SQL. Adicionalmente, quando chamado via `pool.query` descontextualizado, é reforçada a segurança restritiva provando tamanho de `0` resultados.

## 8. Resultado de db:native:test
**PASS**. Todos os 15 testes finalizados de modo local transacional (`2 tests files | 15 tests cases`).

## 9. Resultado de lint
**PASS**.

## 10. Resultado de typecheck
**PASS**.

## 11. Resultado de build
**PASS**.

## Confirmações de Restrições
12. **Docker não foi usado**: CONFIRMADO.
13. **Supabase cloud não foi usada**: CONFIRMADO.
14. **Banco remoto não foi usado**: CONFIRMADO.
15. **Service_role não foi usado**: CONFIRMADO.
16. **SEFAZ real não chamada**: CONFIRMADO. 
17. **Produção V2 não ativada**: CONFIRMADO.

## 18. Parecer
**GO** para 47.7 somente se todos os comandos locais falarem sucesso ao host principal de operação.
**NO-GO** para produção.
**NO-GO** para fiscal real.
**NO-GO** para gateway real.
