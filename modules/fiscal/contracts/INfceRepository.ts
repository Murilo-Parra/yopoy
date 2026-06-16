import { NfceDTO, NfceCreateRequestDTO, NfceCancelRequestDTO } from "../dto/nfce.dto";
import { FiscalDocumentStatus } from "../types/fiscal.types";

export interface INfceRepository {
  listByCompany(companyId: string, filters?: { limit?: number; offset?: number; status?: string }): Promise<{ nfceList: NfceDTO[]; total: number }>;
  findById(companyId: string, id: string): Promise<NfceDTO | null>;
  create(companyId: string, payload: NfceCreateRequestDTO): Promise<NfceDTO>;
  cancel(companyId: string, id: string, payload: NfceCancelRequestDTO): Promise<NfceDTO | null>;
  sync(companyId: string, payloads: NfceCreateRequestDTO[]): Promise<NfceDTO[]>;
}
