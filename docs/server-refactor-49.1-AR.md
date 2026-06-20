# Etapa 49.1-AR — teste comportamental da quitação admin de comissão

## Objetivo

Caracterizar de forma executável e controlada o contrato atual de `POST /api/admin/commissions/:id/pay`, sem alterar ou extrair a rota e sem corrigir seu comportamento financeiro.

## Base e escopo

- Commit-base: `74b8215 docs(admin): diagnose remaining critical admin routes`.
- Arquivos alterados: `src/backend/admin/tests/admin-commission-payment-behavior.test.ts` e este relatório.
- `server.ts` não foi alterado.

## Estratégia sem listener

O teste lê do `server.ts` o statement inline completo entre o marcador da rota e o registro seguinte, transpila somente esse trecho TypeScript e o executa com dependências controladas. Um app fake captura o handler realmente registrado; requests e responses são objetos locais. Assim, o teste não importa nem inicializa `server.ts`, banco, Vite ou módulos de produção, não executa bootstrap, não abre porta e não usa rede. `pgPool`, `isPostgresActive`, `requireMasterAdmin`, fallback local e agendamento de persistência ficam sob controle do teste.

## Cenários cobertos

- PostgreSQL feliz: ordem `BEGIN`, `SELECT`, UPDATE da comissão, UPDATE do afiliado e `COMMIT`; parâmetros e payload real.
- PostgreSQL com comissão inexistente ou já paga: `BEGIN`/`SELECT`/`COMMIT`, sem UPDATEs e com sucesso silencioso.
- PostgreSQL com erro depois de `BEGIN`: HTTP 500, payload real, sem `COMMIT` e sem `ROLLBACK`.
- PostgreSQL com afiliado inexistente: `rowCount: 0` ignorado, seguido de `COMMIT` e sucesso.
- Fallback com comissão pendente e afiliado existente: baixa, ajuste dos dois saldos, piso zero no pendente e um agendamento.
- Fallback com comissão inexistente ou já paga: sucesso silencioso e nenhum agendamento.
- Fallback com afiliado inexistente: comissão persistida como paga e um agendamento.

Não há cenário fora da cobertura solicitada. Autorização master não é integrada: ela é uma dependência controlada, pois o objeto deste teste é o handler de quitação e `src/backend/auth` está fora do escopo.

## Comportamento financeiro e riscos confirmados

O caminho PostgreSQL marca a comissão como `Pago` e depois soma `commission_amount` em `commission_paid` e subtrai o valor de `commission_pending`. O fallback limita o pendente a zero; PostgreSQL não. Comissão inexistente ou já paga retorna sucesso sem ajuste. Afiliado inexistente também retorna sucesso depois de marcar a comissão.

- `BEGIN` e `COMMIT` são chamados via `pgPool.query`, sem client dedicado; não há garantia de mesma conexão.
- Não existe `ROLLBACK` quando um comando falha.
- O `rowCount` do UPDATE do afiliado não é verificado.
- Comissão inexistente, já paga e afiliado inexistente resultam em sucesso silencioso.

## Validações

- `npm run typecheck`.
- Teste de contrato da quitação.
- Novo teste comportamental.
- Guard das mutações admin restantes.
- `git diff --check`, status, lista e estatística do diff.

## Próxima etapa recomendada

Corrigir atomicidade e transação da comissão em etapa separada, antes de qualquer extração: usar client dedicado do pool; executar `BEGIN`/`COMMIT`/`ROLLBACK` no mesmo client; tratar comissão inexistente, comissão já paga e afiliado inexistente; e avaliar lock e concorrência. Não misturar essa correção com suporte ou `DELETE`.
