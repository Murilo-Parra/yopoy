import { FiscalShadowReplayClosureFinalReport, FiscalShadowReplayClosureStatus } from "./FiscalShadowReplayClosureTypes";
import { FiscalShadowReplayClosureInventory } from "./FiscalShadowReplayClosureInventory";
import { FiscalShadowReplayClosureGuardrailAudit } from "./FiscalShadowReplayClosureGuardrailAudit";
import { FiscalShadowReplayClosureHandoffService } from "./FiscalShadowReplayClosureHandoffService";

export class FiscalShadowReplayClosureReportService {
  private inventoryService: FiscalShadowReplayClosureInventory;
  private guardrailAudit: FiscalShadowReplayClosureGuardrailAudit;
  private handoffService: FiscalShadowReplayClosureHandoffService;

  constructor() {
    this.inventoryService = new FiscalShadowReplayClosureInventory();
    this.guardrailAudit = new FiscalShadowReplayClosureGuardrailAudit();
    this.handoffService = new FiscalShadowReplayClosureHandoffService();
  }

  public getFinalReport(): FiscalShadowReplayClosureFinalReport {
    return {
      generatedAt: new Date().toISOString(),
      status: FiscalShadowReplayClosureStatus.CLOSED_WITH_GUARDRAILS,
      inventory: this.inventoryService.getInventory(),
      guardrails: this.guardrailAudit.getGuardrails(),
      handoff: this.handoffService.getHandoff(),
      recommendations: [
        "Validar paineis no UI com endpoints in memory",
        "Desenvolver plano de testes reais em conta sandboxed"
      ],
      message: "A Fase 5 foi encerrada em modo read-only/simulation-only. A ativação real do Fiscal V2 permanece bloqueada.",
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForRealCanary: false,
      approvedForProductionV2: false
    };
  }

  public getInventory() { return this.inventoryService.getInventory(); }
  public getGuardrails() { return this.guardrailAudit.getGuardrails(); }
  public getHandoff() { return this.handoffService.getHandoff(); }
}
