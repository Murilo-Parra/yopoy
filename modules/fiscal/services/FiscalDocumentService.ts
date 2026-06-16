import { FiscalDocumentRepository } from "../repositories/FiscalDocumentRepository";
import { FiscalDocumentDTO, FiscalDocumentCreateRequestDTO } from "../dto/fiscalDocument.dto";
import { validateFiscalDocumentCreate } from "../validators/fiscalDocument.validators";
import { FiscalWriteGuard } from "./FiscalWriteGuard";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class FiscalDocumentService {
  private fiscalDocumentRepository: FiscalDocumentRepository;
  private writeGuard: FiscalWriteGuard;

  constructor(
    fiscalDocumentRepository = new FiscalDocumentRepository(),
    writeGuard = new FiscalWriteGuard()
  ) {
    this.fiscalDocumentRepository = fiscalDocumentRepository;
    this.writeGuard = writeGuard;
  }

  async listDocuments(
    companyId: string,
    filters?: { limit?: number; offset?: number; documentType?: string }
  ): Promise<{ documents: FiscalDocumentDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    return this.fiscalDocumentRepository.listByCompany(companyId, filters);
  }

  async getDocumentById(companyId: string, id: string): Promise<FiscalDocumentDTO | null> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!id) {
      throw new Error("id é obrigatório.");
    }

    return this.fiscalDocumentRepository.findById(companyId, id);
  }

  async dryRunCreateDocument(companyId: string, payload: FiscalDocumentCreateRequestDTO): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    const validation = validateFiscalDocumentCreate(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para criação de documento fiscal: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.CREATE,
      documentType: "DOCUMENT",
      source: "FiscalDocumentService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, payload);
  }

  async sandboxCreateDocument(companyId: string, payload: any, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.CREATE,
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateFiscalDocumentCreate(payload);
    if (!validation.valid) {
      throw new Error(`Dados inválidos: ${validation.errors.join(", ")}`);
    }
    
    const created = await this.fiscalDocumentRepository.sandboxCreate(companyId, payload, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [created.id],
      message: "Registro guardado no banco e sinalizado de limpeza",
      data: created
    };
  }
}
