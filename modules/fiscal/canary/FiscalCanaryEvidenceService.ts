import { FiscalCanaryEvidenceRepository } from "./FiscalCanaryEvidenceRepository";
import { FiscalCanaryEvidenceSummary, FiscalCanaryEvidenceStatus } from "./FiscalCanaryEvidenceTypes";
import { FiscalCanaryConfig } from "./FiscalCanaryConfig";

export class FiscalCanaryEvidenceService {
  private repository = new FiscalCanaryEvidenceRepository();

  public async evaluateEvidence(route: string, operation: string, companyId?: string): Promise<FiscalCanaryEvidenceSummary> {
    const summary = await this.repository.getEvidenceSummary(route, operation, companyId);
    
    summary.evidenceStatus = this.calculateStatus(summary);
    return summary;
  }

  private calculateStatus(summary: FiscalCanaryEvidenceSummary): FiscalCanaryEvidenceStatus {
    if (summary.sampleSize === 0) {
      return FiscalCanaryEvidenceStatus.UNKNOWN;
    }

    const minScore = FiscalCanaryConfig.getMinimumReadinessScore();
    const minSample = FiscalCanaryConfig.getRequiredSampleSize();

    if (summary.blockerCount > 0) {
      return FiscalCanaryEvidenceStatus.BLOCKED;
    }

    if (summary.sampleSize < minSample) {
      return FiscalCanaryEvidenceStatus.INSUFFICIENT;
    }

    if (summary.highCount > 0 || summary.readinessScore < minScore) {
      return FiscalCanaryEvidenceStatus.DEGRADED;
    }

    return FiscalCanaryEvidenceStatus.SUFFICIENT;
  }
}
