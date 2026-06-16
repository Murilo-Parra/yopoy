import { Product } from '../../domain/entities';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(product: Product): Promise<Product>;
  findById(companyId: string, id: string): Promise<Product | null>;
  listByCompany(companyId: string): Promise<Product[]>;
}
