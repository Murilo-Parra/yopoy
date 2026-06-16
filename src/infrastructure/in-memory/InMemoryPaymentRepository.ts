import { Payment, PaymentLink } from '../../domain/entities';
import { PaymentRepository } from '../../application/repositories/PaymentRepository';

export class InMemoryPaymentRepository implements PaymentRepository {
  private payments: Payment[] = [];
  private links: PaymentLink[] = [];

  async create(payment: Payment): Promise<Payment> {
    this.payments.push(payment);
    return payment;
  }

  async update(payment: Payment): Promise<Payment> {
    const index = this.payments.findIndex(p => p.id === payment.id && p.company_id === payment.company_id);
    if (index >= 0) {
      this.payments[index] = payment;
    }
    return payment;
  }

  async findById(companyId: string, id: string): Promise<Payment | null> {
    return this.payments.find(p => p.id === id && p.company_id === companyId) || null;
  }

  async listByCompany(companyId: string): Promise<Payment[]> {
    return this.payments.filter(p => p.company_id === companyId);
  }

  async createLink(link: PaymentLink): Promise<PaymentLink> {
    this.links.push(link);
    return link;
  }

  async removeLink(linkId: string): Promise<void> {
    this.links = this.links.filter(l => l.id !== linkId);
  }

  async getLinksBySale(companyId: string, saleId: string): Promise<PaymentLink[]> {
    return this.links.filter(l => l.sale_id === saleId);
  }
}
