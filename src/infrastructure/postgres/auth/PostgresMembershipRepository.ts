import { MembershipRepository } from '../../../application/auth/contracts/MembershipRepository';
import { Membership, AuthRole } from '../../../application/auth/types';
import { SqlExecutor } from '../executor/SqlExecutor';

export class PostgresMembershipRepository implements MembershipRepository {
  constructor(private executor: SqlExecutor) {}

  private toDomain(row: any): Membership {
    return {
      id: row.id,
      userId: row.user_id,
      companyId: row.company_id,
      role: row.role as AuthRole,
      isActive: row.active,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  async findMembership(userId: string, companyId: string): Promise<Membership | null> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM memberships WHERE user_id = $1 AND company_id = $2 LIMIT 1',
      params: [userId, companyId],
      mode: 'real',
      label: 'findMembership'
    });
    if (rows.length === 0) return null;
    return this.toDomain(rows[0]);
  }

  async listMembershipsByUser(userId: string): Promise<Membership[]> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM memberships WHERE user_id = $1',
      params: [userId],
      mode: 'real',
      label: 'listMembershipsByUser'
    });

    return rows.map(row => this.toDomain(row));
  }

  async listMembershipsByCompany(companyId: string): Promise<Membership[]> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM memberships WHERE company_id = $1',
      params: [companyId],
      mode: 'real',
      label: 'listMembershipsByCompany'
    });
    return rows.map(row => this.toDomain(row));
  }

  async createMembership(input: Omit<Membership, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Membership> {
    await this.executor.execute({
      sql: `SELECT set_config('app.current_company_id', $1, true)`,
      params: [input.companyId],
      mode: 'real',
      label: 'setCompanyContext'
    });

    const rows = await this.executor.execute<any[]>({
      sql: `
        INSERT INTO memberships (company_id, user_id, role, active)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
      params: [input.companyId, input.userId, input.role, true],
      mode: 'real',
      label: 'createMembership'
    });
    return this.toDomain(rows[0]);
  }

  async updateRole(membershipId: string, role: AuthRole): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE memberships SET role = $1, updated_at = NOW() WHERE id = $2',
      params: [role, membershipId],
      mode: 'real',
      label: 'updateRole'
    });
  }

  async disableMembership(membershipId: string): Promise<void> {
    await this.executor.execute({
      sql: 'UPDATE memberships SET active = false, updated_at = NOW() WHERE id = $1',
      params: [membershipId],
      mode: 'real',
      label: 'disableMembership'
    });
  }
}
