import { describe, it, expect } from 'vitest';
import { DryRunSqlExecutor } from '../executor/DryRunSqlExecutor';
import { PostgresAuditLogRepository } from '../repositories/PostgresAuditLogRepository';
import { AuditLog } from '../../../domain/entities';

describe('Postgres Audit Simulation', () => {
  it('Should generate SQL with specific JSON serialization for state tracking', async () => {
    const executor = new DryRunSqlExecutor();
    const repo = new PostgresAuditLogRepository(executor);

    const log: AuditLog = {
      id: 'audit_123',
      company_id: 'comp_123',
      user_id: 'usr_123',
      action: 'UPDATE',
      entity_type: 'sale',
      entity_id: 'sale_1',
      previous_state: JSON.stringify({ status: 'OPEN' }),
      current_state: JSON.stringify({ status: 'CLOSED' }),
      created_at: new Date('2024-01-01T00:00:00Z'),
    };

    await repo.create(log);

    const cmds = executor.getExecutedCommands();
    expect(cmds.length).toBe(1);

    const cmd = cmds[0];
    expect(cmd.sql).toContain('INSERT INTO audit_logs');
    expect(cmd.params).toContain('comp_123');
    expect(cmd.params).toContain('UPDATE');
    expect(cmd.params).toContain('usr_123');
  });
});
