import { FiscalSandboxCleanupRepository } from "../repositories/FiscalSandboxCleanupRepository";
import { FiscalSandboxCleanupResult } from "../types/fiscalSandbox.types";

export class FiscalSandboxCleanupService {
  private cleanupRepository: FiscalSandboxCleanupRepository;

  constructor() {
    this.cleanupRepository = new FiscalSandboxCleanupRepository();
  }

  async cleanupBySandboxSource(companyId: string, source: string): Promise<FiscalSandboxCleanupResult> {
    if (!companyId) throw new Error("CompanyId is required for sandbox cleanup");
    if (source !== "fiscal-v2-sandbox") throw new Error("Only fiscal-v2-sandbox source is allowed");
    
    return this.cleanupRepository.cleanupBySandboxSource(companyId, source);
  }

  async cleanupByCreatedIds(companyId: string, createdIds: string[]): Promise<FiscalSandboxCleanupResult> {
    if (!companyId) throw new Error("CompanyId is required for sandbox cleanup");
    if (!createdIds || createdIds.length === 0) {
      return { success: true, deletedCount: 0, deletedIds: [] };
    }

    return this.cleanupRepository.cleanupByCreatedIds(companyId, createdIds);
  }
}
