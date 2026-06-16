import { DanfeDTO } from "../dto/danfe.dto";

export interface IDanfeRepository {
  listByCompany(companyId: string, filters?: { limit?: number; offset?: number; documentType?: string }): Promise<{ danfeList: DanfeDTO[]; total: number }>;
  findById(companyId: string, id: string): Promise<DanfeDTO | null>;
  findByNfeId(companyId: string, nfeId: string): Promise<DanfeDTO | null>;
  save(companyId: string, payload: Omit<DanfeDTO, "id" | "companyId" | "createdAt">): Promise<DanfeDTO>;
}
