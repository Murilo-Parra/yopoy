import { Customer } from '../../domain/entities';

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  findById(companyId: string, id: string): Promise<Customer | null>;
  listByCompany(companyId: string): Promise<Customer[]>;
}
