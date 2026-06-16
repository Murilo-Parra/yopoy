import { FiscalCanaryApprovalRequest, FiscalCanaryApprovalResult, FiscalCanaryControlStatus, FiscalCanaryControlRecordAction, FiscalCanaryControlMode } from "./FiscalCanaryControlTypes";
import { FiscalCanaryActivationGuard } from "./FiscalCanaryActivationGuard";
import { FiscalCanaryAllowlistService } from "./FiscalCanaryAllowlistService";
import { FiscalCanaryControlAuditService } from "./FiscalCanaryControlAuditService";
import { FiscalCanaryRiskMatrix } from "./FiscalCanaryRiskMatrix";

export class FiscalCanaryApprovalService {
  private allowlistService = new FiscalCanaryAllowlistService();
  private auditService = new FiscalCanaryControlAuditService();

  public async processApproval(request: FiscalCanaryApprovalRequest, userId?: string): Promise<FiscalCanaryApprovalResult> {
    const riskLevel = FiscalCanaryRiskMatrix.getRiskLevel(request.route);
    
    try {
      FiscalCanaryActivationGuard.assertNoRealActivation(request);
    } catch (e: any) {
      const auditId = await this.auditService.logAction(
        FiscalCanaryControlRecordAction.APPROVAL_SIMULATED,
        request.route,
        request.operation,
        riskLevel,
        FiscalCanaryControlStatus.BLOCKED,
        FiscalCanaryControlMode.BLOCKED,
        e.message,
        { error: e.message },
        request.companyId,
        userId
      );
      return {
        approved: false,
        status: FiscalCanaryControlStatus.BLOCKED,
        simulationOnly: true,
        activationBlocked: true,
        reason: e.message,
        blockers: [e.message],
        warnings: [],
        auditId
      };
    }

    const allowlistSimulation = await this.allowlistService.simulateAllowlistEntry({
      companyId: request.companyId,
      route: request.route,
      operation: request.operation,
      userId
    });

    if (allowlistSimulation.status === FiscalCanaryControlStatus.BLOCKED) {
      const auditId = await this.auditService.logAction(
        FiscalCanaryControlRecordAction.APPROVAL_SIMULATED,
        request.route,
        request.operation,
        riskLevel,
        FiscalCanaryControlStatus.BLOCKED,
        FiscalCanaryControlMode.BLOCKED,
        allowlistSimulation.reason,
        { allowlistSimulation },
        request.companyId,
        userId
      );
      return {
        approved: false,
        status: FiscalCanaryControlStatus.BLOCKED,
        simulationOnly: true,
        activationBlocked: true,
        reason: allowlistSimulation.reason,
        blockers: [allowlistSimulation.reason],
        warnings: [],
        auditId
      };
    }

    const auditId = await this.auditService.logAction(
      FiscalCanaryControlRecordAction.APPROVAL_SIMULATED,
      request.route,
      request.operation,
      riskLevel,
      FiscalCanaryControlStatus.SIMULATION_APPROVED,
      FiscalCanaryControlMode.SIMULATION_ONLY,
      "Simulação de aprovação concluída com sucesso.",
      { justification: request.justification },
      request.companyId,
      userId
    );

    return {
      approved: true,
      status: FiscalCanaryControlStatus.SIMULATION_APPROVED,
      simulationOnly: true,
      activationBlocked: true,
      reason: "Permissão de simulação concedida sem efeitos colaterais.",
      blockers: [],
      warnings: [],
      auditId
    };
  }

  public async processBlock(route: string, operation: string, companyId?: string, userId?: string): Promise<FiscalCanaryApprovalResult> {
    const riskLevel = FiscalCanaryRiskMatrix.getRiskLevel(route);
    const auditId = await this.auditService.logAction(
      FiscalCanaryControlRecordAction.BLOCK_SIMULATED,
      route,
      operation,
      riskLevel,
      FiscalCanaryControlStatus.BLOCKED,
      FiscalCanaryControlMode.BLOCKED,
      "Bloqueio manual via control plane.",
      { manualBlock: true },
      companyId,
      userId
    );
    return {
      approved: false,
      status: FiscalCanaryControlStatus.BLOCKED,
      simulationOnly: true,
      activationBlocked: true,
      reason: "Bloqueio manual.",
      blockers: ["Bloqueio manual via control plane."],
      warnings: [],
      auditId
    };
  }
}
