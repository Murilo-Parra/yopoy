import { FiscalShadowReplayGovernanceExport, FiscalShadowReplayGovernanceFinalReview, FiscalShadowReplayGovernanceStatus } from "./FiscalShadowReplayGovernanceTypes";
import { FiscalShadowReplayGovernanceSnapshotService } from "./FiscalShadowReplayGovernanceSnapshotService";
import { FiscalShadowReplayGovernanceChecklist } from "./FiscalShadowReplayGovernanceChecklist";
import { FiscalShadowReplayGovernanceRiskService } from "./FiscalShadowReplayGovernanceRiskService";
import { FiscalShadowReplayGovernanceSerializer } from "./FiscalShadowReplayGovernanceSerializer";

export class FiscalShadowReplayGovernanceExportService {
  private snapshotService: FiscalShadowReplayGovernanceSnapshotService;
  private checklistService: FiscalShadowReplayGovernanceChecklist;
  private riskService: FiscalShadowReplayGovernanceRiskService;
  private serializer: FiscalShadowReplayGovernanceSerializer;

  constructor(snapshotService: FiscalShadowReplayGovernanceSnapshotService) {
    this.snapshotService = snapshotService;
    this.checklistService = new FiscalShadowReplayGovernanceChecklist();
    this.riskService = new FiscalShadowReplayGovernanceRiskService();
    this.serializer = new FiscalShadowReplayGovernanceSerializer();
  }

  public getFinalReview(): FiscalShadowReplayGovernanceFinalReview {
     return {
         go: false,
         noGo: true,
         reason: "Fase 5.6 bloqueia ativação para assegurar simulacro inerte",
         requiredBeforeGo: ["Executar Fase 6", "Testes em base isolada", "Homologação de schema"],
         readOnly: true,
         simulationOnly: true,
         activationBlocked: true
     };
  }

  public generateExportData(): FiscalShadowReplayGovernanceExport {
    const data: FiscalShadowReplayGovernanceExport = {
      generatedAt: new Date().toISOString(),
      version: "1.0",
      status: FiscalShadowReplayGovernanceStatus.NOT_APPROVED_FOR_REAL_CANARY,
      snapshot: this.snapshotService.getSnapshot(),
      checklist: this.checklistService.getChecklist(),
      risks: this.riskService.getRisks(),
      recommendations: ["Manter V2 inativa", "Não criar workers", "Evitar carga real"],
      finalDecision: this.getFinalReview(),
      message: "Este pacote de governança é read-only, simulationOnly e não autoriza ativação real do Fiscal V2.",
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
    return data;
  }

  public exportJson(): any {
    return this.serializer.serializeJson(this.generateExportData());
  }

  public exportText(): string {
    return this.serializer.serializeText(this.generateExportData());
  }
}
