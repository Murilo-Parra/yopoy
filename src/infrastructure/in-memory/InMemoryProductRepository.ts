import { Product } from '../../domain/entities';
import { ProductRepository } from '../../application/repositories/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id === product.id && p.company_id === product.company_id);
    if (index >= 0) {
      this.products[index] = product;
    }
    return product;
  }

  async findById(companyId: string, id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id && p.company_id === companyId) || null;
  }

  async listByCompany(companyId: string): Promise<Product[]> {
    return this.products.filter(p => p.company_id === companyId);
  }
}
