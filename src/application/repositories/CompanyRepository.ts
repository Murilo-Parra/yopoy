import { Company } from '../../domain/entities';

export interface CompanyRepository {
  create(company: Company): Promise<Company>;
  findById(id: string): Promise<Company | null>;
}
