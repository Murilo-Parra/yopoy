import { NfeRepository } from "../repositories/NfeRepository";
import { NfeDTO, NfeCreateRequestDTO, NfeUpdateStatusRequestDTO } from "../dto/nfe.dto";
import { validateNfeCreate, validateNfeStatusUpdate } from "../validators/nfe.validators";
import { FiscalWriteGuard } from "./FiscalWriteGuard";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class NfeService {
  private nfeRepository: NfeRepository;
  private writeGuard: FiscalWriteGuard;

  constructor(
    nfeRepository = new NfeRepository(),
    writeGuard = new FiscalWriteGuard()
  ) {
    this.nfeRepository = nfeRepository;
    this.writeGuard = writeGuard;
  }

  async listNfe(
    companyId: string,
    filters?: { limit?: number; offset?: number; status?: string }
  ): Promise<{ nfeList: NfeDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    return this.nfeRepository.listByCompany(companyId, filters);
  }

  async getNfeById(companyId: string, id: string): Promise<NfeDTO | null> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!id) {
      throw new Error("id é obrigatório.");
    }

    return this.nfeRepository.findById(companyId, id);
  }

  async dryRunCreateNfe(companyId: string, payload: NfeCreateRequestDTO): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    const validation = validateNfeCreate(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para criação de NFe: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.CREATE,
      documentType: "NFE",
      source: "NfeService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, payload);
  }

  async dryRunUpdateNfeStatus(companyId: string, id: string, status: string): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!id) {
      throw new Error("id é obrigatório.");
    }

    const payload: NfeUpdateStatusRequestDTO = { status: status as any };
    const validation = validateNfeStatusUpdate(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para atualização de status da NFe: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.UPDATE,
      documentType: "NFE",
      source: "NfeService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, { nfeId: id, ...payload });
  }

  async sandboxCreateNfe(companyId: string, payload: any, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.CREATE,
      documentType: "NFE",
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateNfeCreate(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para NFe: ${validation.errors.join("; ")}`);
    }
    
    const created = await this.nfeRepository.sandboxCreate(companyId, payload, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [created.id],
      message: "NFe guardada no banco sandbox",
      data: created
    };
  }

  async sandboxUpdateNfeStatus(companyId: string, id: string, status: string, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.UPDATE,
      documentType: "NFE",
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateNfeStatusUpdate({ status: status as any });
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos: ${validation.errors.join("; ")}`);
    }
    
    const updated = await this.nfeRepository.sandboxUpdateStatus(companyId, id, status, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [updated.id],
      message: "NFe status guardado no banco sandbox",
      data: updated
    };
  }
}
