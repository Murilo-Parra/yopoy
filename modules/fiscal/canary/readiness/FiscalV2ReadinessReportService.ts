import { FiscalV2ReadinessAuditService } from "./FiscalV2ReadinessAuditService";
import { FiscalV2ReadinessGapService } from "./FiscalV2ReadinessGapService";
import { FiscalV2ReadinessInventory } from "./FiscalV2ReadinessInventory";
import { FiscalV2ReadinessRiskMatrix } from "./FiscalV2ReadinessRiskMatrix";
import { FiscalV2FinalReadinessReport, FiscalV2ReadinessStatus } from "./FiscalV2ReadinessTypes";

export class FiscalV2ReadinessReportService {
  private auditService: FiscalV2ReadinessAuditService;

  constructor() {
    this.auditService = new FiscalV2ReadinessAuditService();
  }

  public getFinalReport(): FiscalV2FinalReadinessReport {
    const checks = this.auditService.executeChecks();
    const passedChecks = checks.filter(c => c.status === "PASS").length;
    const score = Math.floor((passedChecks / checks.length) * 100);

    const risks = FiscalV2ReadinessRiskMatrix.getRisks();
    const gaps = FiscalV2ReadinessGapService.getGaps();

    return {
      generatedAt: new Date().toISOString(),
      status: FiscalV2ReadinessStatus.BLOCKED_FOR_REAL_ACTIVATION,
      score,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      simulationOnly: true,
      activationBlocked: true,
      checks,
      risks,
      gaps,
      blockers: [
        "A Sprint 4.27 é uma auditoria final de prontidão. Ativação real permanece bloqueada.",
        ...gaps.filter(g => g.blockerForRealActivation).map(g => g.description),
        ...risks.filter(r => r.blockerForRealActivation).map(r => r.description)
      ],
      recommendations: [
        "Aprovação do pacote atual.",
        "Mapeamento de recursos de infraestrutura para worker V2.",
        "Avanço para Fase 5 com ativação gradativa de shadow."
      ],
      requiredBeforeActivation: [
        "Assinatura de Risco pelas Stakeholders",
        "Ativação do Canary Router em modo Shadow real",
        ...gaps.filter(g => g.priority === "CRITICAL").map(g => g.requiredAction)
      ]
    };
  }
}
