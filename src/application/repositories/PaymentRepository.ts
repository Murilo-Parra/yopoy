import { Payment, PaymentLink } from '../../domain/entities';

export interface PaymentRepository {
  create(payment: Payment): Promise<Payment>;
  update(payment: Payment): Promise<Payment>;
  findById(companyId: string, id: string): Promise<Payment | null>;
  listByCompany(companyId: string): Promise<Payment[]>;
  createLink(link: PaymentLink): Promise<PaymentLink>;
  removeLink(linkId: string): Promise<void>;
  getLinksBySale(companyId: string, saleId: string): Promise<PaymentLink[]>;
}
