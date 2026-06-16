import { Customer } from '../../domain/entities';
import { CustomerRepository } from '../../application/repositories/CustomerRepository';

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers: Customer[] = [];

  async create(customer: Customer): Promise<Customer> {
    this.customers.push(customer);
    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    const index = this.customers.findIndex(c => c.id === customer.id && c.company_id === customer.company_id);
    if (index >= 0) {
      this.customers[index] = customer;
    }
    return customer;
  }

  async findById(companyId: string, id: string): Promise<Customer | null> {
    return this.customers.find(c => c.id === id && c.company_id === companyId) || null;
  }

  async listByCompany(companyId: string): Promise<Customer[]> {
    return this.customers.filter(c => c.company_id === companyId);
  }
}
