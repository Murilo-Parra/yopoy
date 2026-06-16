import { SaleRepository } from '../../application/repositories/SaleRepository';
import { Sale } from '../../domain/entities';

export class PostgresAdapterBlocked implements SaleRepository {
    create(sale: Sale): Promise<Sale> {
        throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED: PostgreSQL integration is currently blocked in this module plan.');
    }
    update(sale: Sale): Promise<Sale> {
        throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED: PostgreSQL integration is currently blocked in this module plan.');
    }
    findById(id: string): Promise<Sale | null> {
        throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED: PostgreSQL integration is currently blocked in this module plan.');
    }
    listByCompany(companyId: string): Promise<Sale[]> {
        throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED: PostgreSQL integration is currently blocked in this module plan.');
    }
    addSaleItem(companyId: string, saleId: string, item: any): Promise<void> {
        throw new Error('POSTGRES_ADAPTER_NOT_IMPLEMENTED: PostgreSQL integration is currently blocked in this module plan.');
    }
}
