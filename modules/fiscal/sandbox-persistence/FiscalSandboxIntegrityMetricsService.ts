import { FiscalSandboxIntegrityReadModel } from './FiscalSandboxIntegrityReadModel';
import { FiscalSandboxQualityScore, FiscalSandboxIntegrityStatus } from './FiscalSandboxIntegrityTypes';

export class FiscalSandboxIntegrityMetricsService {
  private readModel: FiscalSandboxIntegrityReadModel;

  constructor() {
    this.readModel = new FiscalSandboxIntegrityReadModel();
  }

  public async getCountsByStatus(companyId: string) {
    return this.readModel.getCountsByStatus(companyId);
  }

  public async getCountsBySource(companyId: string) {
    return this.readModel.getCountsBySource(companyId);
  }

  public async getCountsByRoute(companyId: string) {
    return this.readModel.getCountsByRoute(companyId);
  }

  public async getIncompleteCandidates(companyId: string) {
    return this.readModel.getIncompleteCandidates(companyId);
  }

  public async getExpiredCandidates(companyId: string) {
    return this.readModel.getExpiredCandidates(companyId);
  }

  public async getDuplicateCandidates(companyId: string) {
    return this.readModel.getDuplicateCandidates(companyId);
  }

  public async getSummary(companyId: string) {
     const status = await this.readModel.getCountsByStatus(companyId);
     const source = await this.readModel.getCountsBySource(companyId);
     const route = await this.readModel.getCountsByRoute(companyId);

     return {
        status,
        source,
        route,
        sandboxOnly: true,
        productionWrite: false,
        readOnly: true,
        simulationOnly: true,
        activationBlocked: true
     };
  }

  public async getQualityScore(companyId: string): Promise<FiscalSandboxQualityScore> {
    const totalSnapshots = await this.readModel.getTotalSnapshots(companyId);
    
    if (totalSnapshots === 0) {
      return {
        score: 0,
        status: FiscalSandboxIntegrityStatus.INSUFFICIENT_DATA,
        totalSnapshots: 0,
        validSnapshots: 0,
        incompleteSnapshots: 0,
        duplicateCandidates: 0,
        expiredSnapshots: 0,
        retainedSnapshots: 0,
        reviewedSnapshots: 0,
        blockedSnapshots: 0,
        sandboxOnly: true,
        productionWrite: false,
        readOnly: true,
        simulationOnly: true,
        activationBlocked: true
      };
    }

    const incomplete = await this.readModel.getIncompleteCandidates(companyId);
    const expired = await this.readModel.getExpiredCandidates(companyId, 7);
    const duplicates = await this.readModel.getDuplicateCandidates(companyId);
    const statusCounts = await this.readModel.getCountsByStatus(companyId);

    const duplicateCount = duplicates.reduce((acc, curr) => acc + (curr.copies - 1), 0);
    const retainedCount = statusCounts['RETAIN_FOR_ANALYSIS'] || 0;
    const reviewedCount = statusCounts['REVIEWED'] || 0;
    const blockedCount = statusCounts['BLOCKED_FOR_SAFETY'] || 0;
    const failedSafeCount = statusCounts['FAILED_SAFE'] || 0;

    let score = 100;
    
    const penaltyPerIncomplete = 5;
    const penaltyPerExpired = 2;
    const penaltyPerDuplicate = 1;
    const penaltyPerBlocked = 10;

    score -= (incomplete.length * penaltyPerIncomplete);
    score -= (expired.length * penaltyPerExpired);
    score -= (duplicateCount * penaltyPerDuplicate);
    score -= ((blockedCount + failedSafeCount) * penaltyPerBlocked);

    if (score < 0) score = 0;

    let finalStatus: FiscalSandboxIntegrityStatus = FiscalSandboxIntegrityStatus.HEALTHY;
    
    if (score < 50 || blockedCount > 0) {
       finalStatus = FiscalSandboxIntegrityStatus.BLOCKED_BY_RISK;
    } else if (score < 80) {
       finalStatus = FiscalSandboxIntegrityStatus.WARNING;
    }

    return {
      score,
      status: finalStatus,
      totalSnapshots,
      validSnapshots: totalSnapshots - incomplete.length,
      incompleteSnapshots: incomplete.length,
      duplicateCandidates: duplicateCount,
      expiredSnapshots: expired.length,
      retainedSnapshots: retainedCount,
      reviewedSnapshots: reviewedCount,
      blockedSnapshots: blockedCount + failedSafeCount,
      sandboxOnly: true,
      productionWrite: false,
      readOnly: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
