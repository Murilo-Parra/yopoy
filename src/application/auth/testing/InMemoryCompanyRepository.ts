import { CompanyRepository } from '../../repositories/CompanyRepository';
import { Company } from '../../../domain/entities';

export class InMemoryCompanyRepository implements CompanyRepository {
  public companies: Company[] = [];

  async create(company: Company): Promise<Company> {
    const newCompany: Company = {
      ...company,
      id: company.id || `com_${Math.random().toString(36).substring(2, 9)}`,
      created_at: company.created_at || new Date(),
    };
    this.companies.push(newCompany);
    return { ...newCompany };
  }

  async findById(id: string): Promise<Company | null> {
    const found = this.companies.find((c) => c.id === id);
    return found ? { ...found } : null;
  }
}
