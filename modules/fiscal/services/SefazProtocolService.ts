import { SefazProtocolRepository } from "../repositories/SefazProtocolRepository";
import { SefazProtocolDTO } from "../contracts/ISefazProtocolRepository";
import { validateSefazProtocolSave } from "../validators/sefaz.validators";
import { FiscalWriteGuard } from "./FiscalWriteGuard";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class SefazProtocolService {
  private sefazProtocolRepository: SefazProtocolRepository;
  private writeGuard: FiscalWriteGuard;

  constructor(
    sefazProtocolRepository = new SefazProtocolRepository(),
    writeGuard = new FiscalWriteGuard()
  ) {
    this.sefazProtocolRepository = sefazProtocolRepository;
    this.writeGuard = writeGuard;
  }

  async listProtocols(
    companyId: string,
    filters?: { limit?: number; offset?: number }
  ): Promise<{ protocols: SefazProtocolDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    return this.sefazProtocolRepository.listByCompany(companyId, filters);
  }

  async getProtocolsByDocumentId(companyId: string, documentId: string): Promise<SefazProtocolDTO[]> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!documentId) {
      throw new Error("documentId é obrigatório.");
    }

    return this.sefazProtocolRepository.findByDocumentId(companyId, documentId);
  }

  async dryRunSaveProtocol(companyId: string, payload: any): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    const validation = validateSefazProtocolSave(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para salvar protocolo SEFAZ: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.SAVE,
      documentType: "SEFAZ_PROTOCOL",
      source: "SefazProtocolService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, payload);
  }

  async sandboxSaveProtocol(companyId: string, payload: any, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.SAVE,
      documentType: "SEFAZ_PROTOCOL",
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateSefazProtocolSave(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para salvar protocolo SEFAZ: ${validation.errors.join("; ")}`);
    }
    
    const created = await this.sefazProtocolRepository.sandboxSave(companyId, payload, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [created.id],
      message: "Protocolo SEFAZ guardado no banco sandbox",
      data: created
    };
  }
}
