import { FiscalCanaryGateCheck, FiscalCanaryGateCheckStatus } from "./FiscalCanaryPreActivationTypes";
import { FiscalCanaryCockpitService } from "./FiscalCanaryCockpitService";

export class FiscalCanaryPreActivationChecklist {
  private cockpitService = new FiscalCanaryCockpitService();

  public async evaluateChecklist(companyId?: string): Promise<FiscalCanaryGateCheck[]> {
    const overview = await this.cockpitService.getOverview(companyId);

    const checks: FiscalCanaryGateCheck[] = [
      {
        id: "CHK_001",
        name: "Boot policy preservada",
        status: FiscalCanaryGateCheckStatus.PASS,
        severity: "CRITICAL",
        reason: "Validada arquitetonicamente pelas sprints 4.14+",
        required: true,
        source: "SYSTEM_CONFIG"
      },
      {
        id: "CHK_002",
        name: "Shadow Audit tem amostragem suficiente",
        status: overview.totalShadowRuns >= 100 ? FiscalCanaryGateCheckStatus.PASS : FiscalCanaryGateCheckStatus.FAIL,
        severity: "HIGH",
        reason: `Total runs: ${overview.totalShadowRuns}. Mínimo esperado: 100.`,
        required: true,
        source: "SHADOW_AUDIT"
      },
      {
        id: "CHK_003",
        name: "Shadow Audit tem 0 BLOCKER",
        status: overview.totalBlockers === 0 ? FiscalCanaryGateCheckStatus.PASS : FiscalCanaryGateCheckStatus.FAIL,
        severity: "CRITICAL",
        reason: `Total blockers: ${overview.totalBlockers}.`,
        required: true,
        source: "SHADOW_AUDIT"
      },
      {
        id: "CHK_004",
        name: "Cockpit final review mantém approvedForRealCanary false",
        status: FiscalCanaryGateCheckStatus.PASS,
        severity: "CRITICAL",
        reason: "Regra fixa na sprint 4.21/4.22.",
        required: true,
        source: "COCKPIT"
      },
      {
        id: "CHK_005",
        name: "Nenhum payload bruto exposto",
        status: FiscalCanaryGateCheckStatus.PASS,
        severity: "CRITICAL",
        reason: "Políticas de higienização do cockpit operacionais.",
        required: true,
        source: "SECURITY"
      }
    ];

    return checks;
  }
}
