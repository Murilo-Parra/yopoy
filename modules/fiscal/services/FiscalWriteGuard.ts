import { IFiscalWriteGuard } from "../contracts/IFiscalWriteGuard";
import { 
  FiscalWriteGuardContext, 
  FiscalWriteGuardDecision, 
  FiscalWriteDryRunResult,
  FiscalWriteMode,
  FiscalWriteOperationType
} from "../types/fiscalWrite.types";

export class FiscalWriteGuard implements IFiscalWriteGuard {
  private mode: FiscalWriteMode;

  constructor(mode: FiscalWriteMode = FiscalWriteMode.DRY_RUN) {
    this.mode = mode;
  }

  getMode(): FiscalWriteMode {
    return this.mode;
  }

  setMode(mode: FiscalWriteMode): void {
    this.mode = mode;
  }

  async canWrite(context: FiscalWriteGuardContext): Promise<FiscalWriteGuardDecision> {
    if (this.mode === FiscalWriteMode.DISABLED) {
      return FiscalWriteGuardDecision.DENY;
    }
    
    if (this.mode === FiscalWriteMode.ENABLED) {
      return FiscalWriteGuardDecision.DENY;
    }

    if (this.mode === FiscalWriteMode.ROLLBACK_ONLY) {
      return FiscalWriteGuardDecision.ROLLBACK_ONLY;
    }

    if (this.mode === FiscalWriteMode.SANDBOX_PERSISTENCE) {
      if (!context.sandbox || context.source !== "fiscal-v2-sandbox" || !context.companyId) {
        return FiscalWriteGuardDecision.DENY;
      }
      // SEFAZ, SIGN, TRANSMIT, etc. should fail
      if (
        context.operation === FiscalWriteOperationType.SIGN ||
        context.operation === FiscalWriteOperationType.TRANSMIT
      ) {
        return FiscalWriteGuardDecision.DENY;
      }
      return FiscalWriteGuardDecision.SANDBOX_PERSISTENCE;
    }

    if (this.mode === FiscalWriteMode.DRY_RUN) {
      return FiscalWriteGuardDecision.DRY_RUN;
    }

    return FiscalWriteGuardDecision.DENY;
  }

  async assertCanWrite(context: FiscalWriteGuardContext): Promise<void> {
    const decision = await this.canWrite(context);

    if (decision === FiscalWriteGuardDecision.ROLLBACK_ONLY) {
       console.warn("Escrita fiscal persistente permanece desativada. Esta operação será executada apenas em transação ROLLBACK_ONLY.");
       return;
    }
    
    if (decision === FiscalWriteGuardDecision.SANDBOX_PERSISTENCE) {
       console.warn("Persistência sandbox permitida. Registro deve permanecer marcado como teste e ser limpo após validação.");
       return;
    }
    
    if (this.mode === FiscalWriteMode.ENABLED) {
      throw new Error("Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.");
    }
    
    if (decision === FiscalWriteGuardDecision.DENY) {
      if (this.mode === FiscalWriteMode.SANDBOX_PERSISTENCE) {
        throw new Error("Escrita fiscal produtiva permanece desativada. Apenas persistência sandbox controlada é permitida nesta Sprint.");
      }
      throw new Error(`Operação de escrita ${context.operation} negada. Escrita fiscal real desativada na Sprint 4.6. Operação permitida apenas em modo dry-run controlado.`);
    }

    if (decision === FiscalWriteGuardDecision.DRY_RUN && !context.dryRun) {
      throw new Error(`Operação ${context.operation} recusada para gravação real. Escrita fiscal real desativada na Sprint 4.6. Solicite via dry-run.`);
    }
  }

  async dryRun(context: FiscalWriteGuardContext, payload: any): Promise<FiscalWriteDryRunResult> {
    const timestamp = new Date().toISOString();
    const prefix = context.documentType || "DOC";
    const simulatedId = `${prefix.toLowerCase()}-sim-${Math.random().toString(36).substring(2, 10)}`;

    return {
      success: true,
      simulatedId,
      message: `Simulação de ${context.operation} executada com sucesso em modo dry-run controlado. Nenhum dado persistido no banco real.`,
      operation: context.operation,
      timestamp,
      payload
    };
  }
}
