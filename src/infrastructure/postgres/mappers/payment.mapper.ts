import { Payment, PaymentLink } from '../../../domain/entities';

export class PaymentMapper {
  static toPersistence(domain: Payment) {
    return {
      id: domain.id,
      company_id: domain.company_id,
      amount: domain.amount,
      method: domain.method,
      status: domain.status,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
      created_by: domain.created_by,
      updated_by: domain.updated_by,
      archived_at: domain.archived_at,
      deleted_at: domain.deleted_at,
      version: domain.version
    };
  }

  static linkToPersistence(domain: PaymentLink, companyId: string) {
    return {
      id: domain.id,
      company_id: companyId,
      payment_id: domain.payment_id,
      sale_id: domain.sale_id,
      assigned_amount: domain.assigned_amount,
      created_at: domain.created_at,
      created_by: domain.created_by
    };
  }
}
