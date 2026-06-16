import { Sale, SaleItem } from '../../domain/entities';

export interface SaleRepository {
  create(sale: Sale): Promise<Sale>;
  update(sale: Sale): Promise<Sale>;
  findById(companyId: string, id: string): Promise<Sale | null>;
  listByCompany(companyId: string): Promise<Sale[]>;
  addSaleItem(companyId: string, saleId: string, item: SaleItem): Promise<void>;
}
