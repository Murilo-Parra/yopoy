import { CompanyAuthRepository } from '../../../application/auth/contracts/CompanyAuthRepository';
import { CompanyRepository } from '../../../application/repositories/CompanyRepository';
import { Company } from '../../../domain/entities';
import { SqlExecutor } from '../executor/SqlExecutor';

export class PostgresCompanyAuthRepository implements CompanyAuthRepository, CompanyRepository {
  constructor(private executor: SqlExecutor) {}

  async isCompanyActive(companyId: string): Promise<boolean> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT active, status FROM companies WHERE id = $1 LIMIT 1',
      params: [companyId],
      mode: 'real',
      label: 'isCompanyActive'
    });
    if (rows.length === 0) return false;
    return rows[0].active === true && rows[0].status === 'ACTIVE';
  }

  async getCompanySubscriptionTier(companyId: string): Promise<string | null> {
    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT subscription_tier FROM companies WHERE id = $1 LIMIT 1',
      params: [companyId],
      mode: 'real',
      label: 'getCompanySubscriptionTier'
    });
    if (rows.length === 0) return null;
    return rows[0].subscription_tier;
  }

  async lockCompany(companyId: string): Promise<void> {
    await this.executor.execute({
      sql: "UPDATE companies SET active = false, status = 'SUSPENDED', updated_at = NOW() WHERE id = $1",
      params: [companyId],
      mode: 'real',
      label: 'lockCompany'
    });
  }

  async unlockCompany(companyId: string): Promise<void> {
    await this.executor.execute({
      sql: "UPDATE companies SET active = true, status = 'ACTIVE', updated_at = NOW() WHERE id = $1",
      params: [companyId],
      mode: 'real',
      label: 'unlockCompany'
    });
  }

  // CompanyRepository contract implementation
  async create(company: Company): Promise<Company> {
    await this.executor.execute({
      sql: `SELECT set_config('app.current_company_id', $1, true)`,
      params: [company.id],
      mode: 'real',
      label: 'setCompanyContext'
    });

    await this.executor.execute({
      sql: `
        INSERT INTO companies (id, name, document, status, active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      params: [
        company.id,
        company.name,
        company.cnpj || null,
        company.status || 'ACTIVE',
        company.status === 'ACTIVE',
        company.created_at || new Date(),
        new Date()
      ],
      mode: 'real',
      label: 'createCompany'
    });

    return company;
  }

  async findById(id: string): Promise<Company | null> {
    await this.executor.execute({
      sql: `SELECT set_config('app.current_company_id', $1, true)`,
      params: [id],
      mode: 'real',
      label: 'setCompanyContext'
    });

    const rows = await this.executor.execute<any[]>({
      sql: 'SELECT * FROM companies WHERE id = $1 LIMIT 1',
      params: [id],
      mode: 'real',
      label: 'findCompanyById'
    });
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      cnpj: row.document || undefined,
      status: row.status as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
      created_at: new Date(row.created_at)
    };
  }
}
