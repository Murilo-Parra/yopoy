import { Company } from '../../domain/entities';
import { CompanyRepository } from '../../application/repositories/CompanyRepository';

export class InMemoryCompanyRepository implements CompanyRepository {
  private companies: Company[] = [];

  async create(company: Company): Promise<Company> {
    this.companies.push(company);
    return company;
  }

  async findById(id: string): Promise<Company | null> {
    return this.companies.find((c) => c.id === id) || null;
  }
}
