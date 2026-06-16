import { Sale, SaleItem } from '../../domain/entities';
import { SaleRepository } from '../../application/repositories/SaleRepository';

export class InMemorySaleRepository implements SaleRepository {
  private sales: Sale[] = [];

  async create(sale: Sale): Promise<Sale> {
    this.sales.push(sale);
    return sale;
  }

  async update(sale: Sale): Promise<Sale> {
    const index = this.sales.findIndex(s => s.id === sale.id && s.company_id === sale.company_id);
    if (index >= 0) {
      this.sales[index] = sale;
    }
    return sale;
  }

  async findById(companyId: string, id: string): Promise<Sale | null> {
    return this.sales.find(s => s.id === id && s.company_id === companyId) || null;
  }

  async listByCompany(companyId: string): Promise<Sale[]> {
    return this.sales.filter(s => s.company_id === companyId);
  }

  async addSaleItem(companyId: string, saleId: string, item: SaleItem): Promise<void> {
    const sale = await this.findById(companyId, saleId);
    if (sale) {
      sale.items.push(item);
      sale.total_amount += item.total_value;
    }
  }
}
