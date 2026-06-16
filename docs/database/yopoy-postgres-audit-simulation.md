# Simulação de Logs de Auditoria

## Especificação de Paridade
O `create` em `PostgresAuditLogRepository.ts` traduz os objetos TypeScript estruturados (que capturam `{ status: 'OPEN' }` transitando para `{ status: 'CLOSED' }`) em um buffer stringificado JSON (`JSON.stringify()`) coerente.

## Verificação de Teste
`postgres-audit-log-simulation.test.ts` ratifica a modelagem onde o método de salvamento do `AuditLog` retém adequadamente:
- user_id;
- action (por ex. `UPDATE_SALE`);
- previous e current state un-mashed pela execução preparada base (\$N).

## Impacto
Nenhum DML real subido. Total capacidade de auditar sem perder tipo.
