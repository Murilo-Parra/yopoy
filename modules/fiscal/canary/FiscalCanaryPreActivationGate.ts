import { FiscalCanaryPreActivationChecklist } from "./FiscalCanaryPreActivationChecklist";
import { FiscalCanaryGateStatus, FiscalCanaryGateCheckStatus } from "./FiscalCanaryPreActivationTypes";
import { FiscalCanaryCockpitService } from "./FiscalCanaryCockpitService";

export class FiscalCanaryPreActivationGate {
  private checklistService = new FiscalCanaryPreActivationChecklist();
  private cockpitService = new FiscalCanaryCockpitService();

  public async evaluateGate(companyId?: string): Promise<{ gateStatus: FiscalCanaryGateStatus, readinessScore: number, blockers: string[], checklist: any[] }> {
    const checks = await this.checklistService.evaluateChecklist(companyId);
    const overview = await this.cockpitService.getOverview(companyId);
    
    const blockers: string[] = [];
    let hasFail = false;

    for (const check of checks) {
      if (check.status === FiscalCanaryGateCheckStatus.FAIL) {
        hasFail = true;
        if (check.severity === "CRITICAL" || check.severity === "HIGH") {
            blockers.push(`Check falhou: ${check.name} - ${check.reason}`);
        }
      }
    }

    let gateStatus = FiscalCanaryGateStatus.PASS_SIMULATED;
    if (overview.totalBlockers > 0) {
        gateStatus = FiscalCanaryGateStatus.FAIL_BLOCKED;
    } else if (overview.totalShadowRuns < 100) {
        gateStatus = FiscalCanaryGateStatus.INSUFFICIENT_EVIDENCE;
    } else if (overview.totalHighSeverity > 0) {
        gateStatus = FiscalCanaryGateStatus.NEEDS_REVIEW;
    } else if (hasFail) {
        gateStatus = FiscalCanaryGateStatus.NEEDS_REVIEW;
    }

    return {
      gateStatus,
      readinessScore: overview.globalReadinessScore,
      blockers,
      checklist: checks
    };
  }
}
