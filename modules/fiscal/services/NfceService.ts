import { NfceRepository } from "../repositories/NfceRepository";
import { NfceDTO, NfceCreateRequestDTO, NfceCancelRequestDTO } from "../dto/nfce.dto";
import { validateNfceCreate, validateNfceCancel } from "../validators/nfce.validators";
import { FiscalWriteGuard } from "./FiscalWriteGuard";
import { FiscalWriteOperationType } from "../types/fiscalWrite.types";

export class NfceService {
  private nfceRepository: NfceRepository;
  private writeGuard: FiscalWriteGuard;

  constructor(
    nfceRepository = new NfceRepository(),
    writeGuard = new FiscalWriteGuard()
  ) {
    this.nfceRepository = nfceRepository;
    this.writeGuard = writeGuard;
  }

  async listNfce(
    companyId: string,
    filters?: { limit?: number; offset?: number; status?: string }
  ): Promise<{ nfceList: NfceDTO[]; total: number }> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    return this.nfceRepository.listByCompany(companyId, filters);
  }

  async getNfceById(companyId: string, id: string): Promise<NfceDTO | null> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!id) {
      throw new Error("id é obrigatório.");
    }

    return this.nfceRepository.findById(companyId, id);
  }

  async dryRunCreateNfce(companyId: string, payload: NfceCreateRequestDTO): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }

    const validation = validateNfceCreate(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para criação de NFCe: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.CREATE,
      documentType: "NFCE",
      source: "NfceService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, payload);
  }

  async dryRunCancelNfce(companyId: string, id: string, payload: NfceCancelRequestDTO): Promise<any> {
    if (!companyId) {
      throw new Error("companyId é obrigatório.");
    }
    if (!id) {
      throw new Error("id é obrigatório.");
    }

    const validation = validateNfceCancel(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para cancelamento de NFCe: ${validation.errors.join("; ")}`);
    }

    const context = {
      companyId,
      operation: FiscalWriteOperationType.CANCEL,
      documentType: "NFCE",
      source: "NfceService",
      dryRun: true
    };

    await this.writeGuard.assertCanWrite(context);
    return this.writeGuard.dryRun(context, { nfceId: id, ...payload });
  }

  async sandboxCreateNfce(companyId: string, payload: any, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.CREATE,
      documentType: "NFCE",
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateNfceCreate(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para NFCe: ${validation.errors.join("; ")}`);
    }
    
    const created = await this.nfceRepository.sandboxCreate(companyId, payload, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [created.id],
      message: "NFCe guardada no banco sandbox",
      data: created
    };
  }

  async sandboxCancelNfce(companyId: string, id: string, payload: any, userId?: string): Promise<any> {
    const context = {
      companyId,
      userId,
      operation: FiscalWriteOperationType.CANCEL,
      documentType: "NFCE",
      source: "fiscal-v2-sandbox",
      sandbox: true
    };
    await this.writeGuard.assertCanWrite(context);
    
    const validation = validateNfceCancel(payload);
    if (!validation.valid) {
      throw new Error(`Dados de entrada inválidos para cancelamento de NFCe: ${validation.errors.join("; ")}`);
    }
    
    const updated = await this.nfceRepository.sandboxCancel(companyId, id, payload, context);
    
    return {
      success: true,
      sandbox: true,
      persisted: true,
      cleanupRequired: true,
      createdIds: [updated.id],
      message: "NFCe cancelamento guardado no banco sandbox",
      data: updated
    };
  }
}
