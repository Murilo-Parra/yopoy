import { Sale, SaleItem } from '../../../domain/entities';

export class SaleMapper {
  static toPersistence(domain: Sale) {
    return {
      id: domain.id,
      company_id: domain.company_id,
      customer_id: domain.customer_id || null,
      status: domain.status,
      total_amount: domain.total_amount,
      discount_amount: domain.discount_amount,
      created_by: domain.created_by,
      updated_by: domain.updated_by,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
      archived_at: domain.archived_at || null,
      archived_by: domain.archived_by || null,
      deleted_at: domain.deleted_at || null,
      deleted_by: domain.deleted_by || null,
      version: domain.version,
    };
  }

  static itemToPersistence(domain: SaleItem, companyId: string) {
    return {
      id: domain.id,
      company_id: companyId,
      sale_id: domain.sale_id,
      product_id: domain.product_id || null,
      service_id: domain.service_id || null,
      qty: domain.qty,
      unit_value: domain.unit_value,
      total_value: domain.total_value,
    };
  }
}
