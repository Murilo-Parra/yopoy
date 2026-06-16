# Simulação de Transacionabilidade

Utilizamos `DryRunUnitOfWork` que estende `UnitOfWork` base.

## Regras
Um encerramento de escopo transacional (`tx => ...`) embute nativamente chamadas consecutivas atômicas no executor, injetando as query-tags `BEGIN` e `COMMIT` (ou `ROLLBACK` em falha explícita/implicita).

## Testes Cobertos:
(Testado em `postgres-transaction-simulation.test.ts` e `postgres-unit-of-work-dry-run.test.ts`)
1. Transação bem sucedida: Asserções capturam "BEGIN" seguido diretamente de `set_config` para RLS/Tracking contextual e encerramento com `COMMIT`.
2. Falhas sintéticas: A execução dispara error de JS nativo abortando promise e injetando tag `ROLLBACK`.

## Parecer
Preparado para pool real suportado pelo standard library pg `client.query('BEGIN')` e `client.query('COMMIT')` em releases secundárias.
