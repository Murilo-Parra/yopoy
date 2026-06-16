import { FiscalDocumentDTO, FiscalDocumentCreateRequestDTO, FiscalDocumentUpdateRequestDTO } from "../dto/fiscalDocument.dto";

export interface IFiscalDocumentRepository {
  listByCompany(companyId: string, filters?: { limit?: number; offset?: number; documentType?: string }): Promise<{ documents: FiscalDocumentDTO[]; total: number }>;
  findById(companyId: string, id: string): Promise<FiscalDocumentDTO | null>;
  create(companyId: string, payload: FiscalDocumentCreateRequestDTO & { createdBy: string; status: string; id?: string }): Promise<FiscalDocumentDTO>;
  update(companyId: string, id: string, payload: FiscalDocumentUpdateRequestDTO): Promise<FiscalDocumentDTO | null>;
  delete(companyId: string, id: string): Promise<boolean>;
}
