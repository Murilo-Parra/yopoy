import { NfseDTO, NfseQueryRequestDTO } from "../dto/nfse.dto";

export interface INfseRepository {
  listByCompany(companyId: string, filters?: { limit?: number; offset?: number; status?: string }): Promise<{ invoices: NfseDTO[]; total: number }>;
  findById(companyId: string, id: string): Promise<NfseDTO | null>;
  query(companyId: string, payload: NfseQueryRequestDTO): Promise<NfseDTO[]>;
  save(companyId: string, payload: Partial<NfseDTO> & { invoiceNumber: string; customerId: string; totalServiceValue: number }): Promise<NfseDTO>;
}
