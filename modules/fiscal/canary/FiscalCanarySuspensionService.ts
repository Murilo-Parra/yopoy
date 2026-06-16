import { FiscalCanarySuspensionSimulation } from "./FiscalCanaryEvidenceTypes";
import { FiscalCanaryCorrelationService } from "./FiscalCanaryCorrelationService";

export class FiscalCanarySuspensionService {
  private correlationService = new FiscalCanaryCorrelationService();

  public async simulateSuspensionForRecord(recordId: string): Promise<FiscalCanarySuspensionSimulation> {
    const correlation = await this.correlationService.correlateRecord(recordId);
    
    if (!correlation.correlated) {
      return {
        shouldSuspend: false,
        reason: "Registro não encontrado para correlação.",
        affectedRecords: [],
        simulationOnly: true,
        activationBlocked: true
      };
    }

    if (correlation.recommendation === "BLOCK_FUTURE_CANARY" || correlation.recommendation === "REVIEW_REQUIRED") {
      return {
        shouldSuspend: true,
        reason: `Evidência shadow indica suspensão simulada: ${correlation.recommendation}`,
        affectedRecords: [recordId],
        simulationOnly: true,
        activationBlocked: true
      };
    }

    return {
      shouldSuspend: false,
      reason: "Evidências shadow estão com qualidade aceitável ou insuficiente para suspensão automática.",
      affectedRecords: [],
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
