import { FiscalSandboxPersistenceRepository } from './FiscalSandboxPersistenceRepository';
import { FiscalSandboxReviewValidator } from './FiscalSandboxReviewValidator';
import { FiscalSandboxReviewDecision, FiscalSandboxRetentionStatus, FiscalSandboxReviewResult } from './FiscalSandboxReviewTypes';
import { FiscalSandboxReviewAuditService } from './FiscalSandboxReviewAuditService';

export class FiscalSandboxReviewService {
  private repository: FiscalSandboxPersistenceRepository;

  constructor() {
    this.repository = new FiscalSandboxPersistenceRepository();
  }

  public async getSnapshots(companyId: string, filters: any = {}): Promise<any[]> {
    return this.repository.listSnapshots(companyId, filters);
  }

  public async getSnapshotById(companyId: string, id: string): Promise<any | null> {
    return this.repository.findById(companyId, id);
  }

  public async markReviewed(companyId: string, recordId: string, userId: string): Promise<FiscalSandboxReviewResult> {
    return this.applyDecision(companyId, recordId, userId, FiscalSandboxReviewDecision.REVIEWED);
  }

  public async retain(companyId: string, recordId: string, userId: string): Promise<FiscalSandboxReviewResult> {
    return this.applyDecision(companyId, recordId, userId, FiscalSandboxReviewDecision.RETAIN_FOR_ANALYSIS);
  }

  public async markCleanupEligible(companyId: string, recordId: string, userId: string): Promise<FiscalSandboxReviewResult> {
    return this.applyDecision(companyId, recordId, userId, FiscalSandboxReviewDecision.ELIGIBLE_FOR_CLEANUP);
  }

  private async applyDecision(companyId: string, recordId: string, userId: string, decision: FiscalSandboxReviewDecision): Promise<FiscalSandboxReviewResult> {
    const input = { companyId, recordId, decision, marker: 'fiscal-v2-sandbox-persistence' };
    const validation = FiscalSandboxReviewValidator.validateReviewAction(input);

    if (!validation.valid) {
      await FiscalSandboxReviewAuditService.logDecision(input, 'BLOCKED_FOR_SAFETY');
      return {
        success: false,
        recordId,
        decision: 'BLOCKED_FOR_SAFETY',
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        blockers: validation.blockers
      };
    }

    try {
      const snapshot = await this.repository.findById(companyId, recordId);
      if (!snapshot) {
        return {
          success: false,
          recordId,
          decision: 'NOT_FOUND',
          sandboxOnly: true,
          productionWrite: false,
          simulationOnly: true,
          activationBlocked: true,
          payloadIncluded: false,
          sensitiveDataIncluded: false,
          blockers: ['Snapshot not found']
        };
      }

      await this.repository.updateStatus(companyId, recordId, decision, userId);
      
      await FiscalSandboxReviewAuditService.logDecision(input, decision);

      return {
        success: true,
        recordId,
        decision,
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false
      };
    } catch (e: any) {
      await FiscalSandboxReviewAuditService.logDecision(input, 'FAILED_SAFE');
      return {
        success: false,
        recordId,
        decision: 'FAILED_SAFE',
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        blockers: [e.message]
      };
    }
  }
}
