import { NfeDTO, NfeCreateRequestDTO, NfeUpdateStatusRequestDTO } from "../dto/nfe.dto";
import { FiscalDocumentStatus } from "../types/fiscal.types";

export interface INfeRepository {
  listByCompany(companyId: string, filters?: { limit?: number; offset?: number; status?: string }): Promise<{ nfeList: NfeDTO[]; total: number }>;
  findById(companyId: string, id: string): Promise<NfeDTO | null>;
  create(companyId: string, payload: NfeCreateRequestDTO): Promise<NfeDTO>;
  updateStatus(companyId: string, id: string, status: FiscalDocumentStatus, extraFields?: Pick<NfeUpdateStatusRequestDTO, "authorizedXml" | "protocolNumber" | "errorMessage">): Promise<NfeDTO | null>;
}
