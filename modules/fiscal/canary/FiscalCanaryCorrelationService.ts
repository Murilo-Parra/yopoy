import { FiscalCanaryCorrelationResult, FiscalCanaryEvidenceStatus } from "./FiscalCanaryEvidenceTypes";
import { FiscalCanaryEvidenceService } from "./FiscalCanaryEvidenceService";
import { FiscalCanaryControlRepository } from "./FiscalCanaryControlRepository";
import { FiscalCanaryControlMode, FiscalCanaryControlStatus } from "./FiscalCanaryControlTypes";

export class FiscalCanaryCorrelationService {
  private evidenceService = new FiscalCanaryEvidenceService();
  private controlRepo = new FiscalCanaryControlRepository();

  public async correlateRecord(recordId: string): Promise<FiscalCanaryCorrelationResult> {
    const records = await this.controlRepo.listRecords({});
    const record = records.find(r => r.id === recordId);
    
    if (!record) {
      return this.buildNotCorrelated();
    }

    const evidence = await this.evidenceService.evaluateEvidence(record.route, record.operation, record.companyId);

    let recommendation = "KEEP_PLANNED";
    const blockers: string[] = [];
    const warnings: string[] = [];

    if (evidence.evidenceStatus === FiscalCanaryEvidenceStatus.BLOCKED) {
      recommendation = "BLOCK_FUTURE_CANARY";
      blockers.push("Existem divergências BLOCKER recentes na rota.");
    } else if (evidence.evidenceStatus === FiscalCanaryEvidenceStatus.INSUFFICIENT || evidence.evidenceStatus === FiscalCanaryEvidenceStatus.UNKNOWN) {
      recommendation = "INSUFFICIENT_EVIDENCE";
      warnings.push("Amostragem insuficiente para manter aprovação com segurança.");
    } else if (evidence.evidenceStatus === FiscalCanaryEvidenceStatus.DEGRADED) {
      recommendation = "REVIEW_REQUIRED";
      warnings.push("A leitura recente indica degradação. Revisão recomendada antes do canary.");
    }

    return {
      correlated: true,
      controlRecordId: recordId,
      evidenceStatus: evidence.evidenceStatus,
      recommendation,
      blockers,
      warnings,
      simulationOnly: true,
      activationBlocked: true
    };
  }

  private buildNotCorrelated(): FiscalCanaryCorrelationResult {
    return {
      correlated: false,
      evidenceStatus: FiscalCanaryEvidenceStatus.UNKNOWN,
      recommendation: "Record not found",
      blockers: [],
      warnings: [],
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
