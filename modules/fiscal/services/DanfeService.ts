import { DanfeRepository } from "../repositories/DanfeRepository";
import { DanfeDTO } from "../dto/danfe.dto";
import { validateDanfeSave } from "../validators/danfe.validators";
import { FiscalWriteGuard } from "./FiscalWriteGuard";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class DanfeService {
  private danfeRepository: DanfeRepository;
  private writeGuard: FiscalWriteGuard;

  constructor(
    danfeRepository = new DanfeRepository(),
    writeGuard = new FiscalWriteGuard()
  ) {
    this.danfeRepository = danfeRepository;
    this.writeGuard = writeGuard;
  }

  async listDanfe(
    companyId: string,
    filters?: { limit?: number; offset?: number; documentType?: string }
  ): Promise<{ danfeList: DanfeDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    return this.danfeRepository.listByCompany(companyId, filters);
  }

  async getDanfeById(companyId: string, id: string): Promise<DanfeDTO | null> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!id) {
      throw new Error("id é obrigatório.");
    }

    return this.danfeRepository.findById(companyId, id);
  }

  async getDanfeByNfeId(companyId: string, nfeId: string): Promise<DanfeDTO | null> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!nfeId) {
      throw new Error("nfeId é obrigatório.");
    }

    return this.danfeRepository.findByNfeId(companyId, nfeId);
  }

  async dryRunSaveDanfe(companyId: string, payload: any): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    const validation = validateDanfeSave(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para salvar DANFE: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.SAVE,
      documentType: "DANFE",
      source: "DanfeService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, payload);
  }

  async sandboxSaveDanfe(companyId: string, payload: any, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.SAVE,
      documentType: "DANFE",
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateDanfeSave(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para salvar DANFE: ${validation.errors.join("; ")}`);
    }
    
    const created = await this.danfeRepository.sandboxSave(companyId, payload, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [created.id],
      message: "DANFE guardado no banco sandbox",
      data: created
    };
  }
}
