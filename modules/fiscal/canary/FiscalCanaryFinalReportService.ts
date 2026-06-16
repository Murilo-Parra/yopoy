import { FiscalCanaryPreActivationGate } from "./FiscalCanaryPreActivationGate";
import { FiscalCanaryRollbackPlanService } from "./FiscalCanaryRollbackPlanService";
import { FiscalCanaryPreActivationReport, FiscalCanaryGoNoGoSimulation, FiscalCanaryGateStatus } from "./FiscalCanaryPreActivationTypes";

export class FiscalCanaryFinalReportService {
  private gate = new FiscalCanaryPreActivationGate();
  private rollback = new FiscalCanaryRollbackPlanService();

  public async getFinalReport(companyId?: string): Promise<FiscalCanaryPreActivationReport> {
    const gateEval = await this.gate.evaluateGate(companyId);
    const rollbackPlan = await this.rollback.getRollbackPlan(companyId);

    return {
      generatedAt: new Date().toISOString(),
      gateStatus: gateEval.gateStatus,
      approvedForRealCanary: false,
      simulationOnly: true,
      activationBlocked: true,
      readinessScore: gateEval.readinessScore,
      checklist: gateEval.checklist,
      blockers: gateEval.blockers,
      warnings: ["Canary real não pode ser aprovado nesta Sprint. Resultado limitado a pre-activation simulation."],
      rollbackPlanSummary: rollbackPlan.plan,
      finalRecommendation: "Pre-activation concluído em nível de simulação."
    };
  }

  public async simulateGoNoGo(companyId?: string): Promise<FiscalCanaryGoNoGoSimulation> {
    const gateEval = await this.gate.evaluateGate(companyId);

    return {
      go: false, // Critical requirement: always false
      noGo: true,
      reason: "Sprint 4.22 bloqueia aprovação real. Simulação final indica apenas Go/No-Go simulado.",
      blockers: [
        "A Sprint 4.22 veda ativação de Canary real.",
        ...(gateEval.gateStatus === FiscalCanaryGateStatus.FAIL_BLOCKED ? ["A porta de pré-ativação detectou bloqueios reais."] : [])
      ],
      warnings: [
        "Canary real não pode ser aprovado nesta Sprint. Resultado limitado a pre-activation simulation."
      ],
      requiredBeforeActivation: [
        "Autorização explícita em sprint futura para virada real."
      ],
      approvedForRealCanary: false,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
