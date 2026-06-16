import { FiscalCanaryEligibilityService } from "./FiscalCanaryEligibilityService";
import { FiscalCanaryControlStatus, FiscalCanaryControlRecordAction, FiscalCanaryControlRecord, FiscalCanaryControlMode } from "./FiscalCanaryControlTypes";
import { FiscalCanaryRiskMatrix } from "./FiscalCanaryRiskMatrix";
import { FiscalCanaryActivationGuard } from "./FiscalCanaryActivationGuard";
import { FiscalCanaryControlRepository } from "./FiscalCanaryControlRepository";
import { FiscalCanaryControlAuditService } from "./FiscalCanaryControlAuditService";

export class FiscalCanaryAllowlistService {
  private eligibilityService = new FiscalCanaryEligibilityService();
  private repository = new FiscalCanaryControlRepository();
  private auditService = new FiscalCanaryControlAuditService();

  public async simulateAllowlistEntry(input: { companyId?: string, route: string, operation: string, userId?: string }): Promise<any> {
    const isCritical = FiscalCanaryActivationGuard.blockIfCriticalRoute(input.route, input.operation);
    const hasSideEffects = FiscalCanaryActivationGuard.blockIfExternalSideEffect(input.operation);
    const riskLevel = FiscalCanaryRiskMatrix.getRiskLevel(input.route);

    if (isCritical || hasSideEffects) {
      const reason = "Risco CRITICAL com efeitos colaterais reais. Operação bloqueada.";
      const auditId = await this.auditService.logAction(
        FiscalCanaryControlRecordAction.BLOCK_SIMULATED,
        input.route,
        input.operation,
        riskLevel,
        FiscalCanaryControlStatus.BLOCKED,
        FiscalCanaryControlMode.BLOCKED,
        reason,
        { blockedByCriticalOrSideEffects: true },
        input.companyId,
        input.userId
      );
      return {
        status: FiscalCanaryControlStatus.BLOCKED,
        reason,
        auditId
      };
    }

    const eligibility = await this.eligibilityService.evaluateEligibility({
      companyId: input.companyId,
      route: input.route,
      operation: input.operation
    });

    const status = eligibility.eligible ? FiscalCanaryControlStatus.SIMULATION_APPROVED : FiscalCanaryControlStatus.BLOCKED;
    const reason = eligibility.eligible ? "Candidato válido para Canary simulado." : `Bloqueado: ${eligibility.blockers.join(" ")}`;

    const auditId = await this.auditService.logAction(
      FiscalCanaryControlRecordAction.ALLOWLIST_SIMULATED,
      input.route,
      input.operation,
      riskLevel,
      status,
      FiscalCanaryControlMode.SIMULATION_ONLY,
      reason,
      { blockers: eligibility.blockers, warnings: eligibility.warnings },
      input.companyId,
      input.userId
    );

    return {
      status,
      reason,
      auditId
    };
  }

  public async listSimulatedAllowlist(filters: any = {}): Promise<FiscalCanaryControlRecord[]> {
    return await this.repository.listRecords({ ...filters, action: FiscalCanaryControlRecordAction.ALLOWLIST_SIMULATED } as any);
  }
}
