import { FiscalSandboxPersistenceRepository } from './FiscalSandboxPersistenceRepository';
import { FiscalSandboxReviewValidator } from './FiscalSandboxReviewValidator';
import { FiscalSandboxRetentionPolicy } from './FiscalSandboxRetentionPolicy';
import { FiscalSandboxCleanupPreview } from './FiscalSandboxReviewTypes';
import { FiscalSandboxReviewAuditService } from './FiscalSandboxReviewAuditService';

export class FiscalSandboxRetentionService {
  private repository: FiscalSandboxPersistenceRepository;

  constructor() {
    this.repository = new FiscalSandboxPersistenceRepository();
  }

  public async previewCleanup(companyId: string, olderThanDays?: number): Promise<FiscalSandboxCleanupPreview> {
    const input = { companyId, marker: 'fiscal-v2-sandbox-persistence', targetTable: 'fiscal_v2_sandbox_snapshots' };
    const validation = FiscalSandboxReviewValidator.validateCleanupAction(input);

    if (!validation.valid) {
      throw new Error(`Cleanup validation failed: ${validation.blockers.join(', ')}`);
    }

    const allSnapshots = await this.repository.listSnapshots(companyId); // In a real app we'd paginate or use explicit queries, ok for sandbox size
    
    const candidates = allSnapshots.filter(s => {
      // 1. Never clean retained snapshots
      if (FiscalSandboxRetentionPolicy.isCleanupBlocked(s.status)) return false;
      
      // 2. Either explicitly eligible, or expired based on age
      if (FiscalSandboxRetentionPolicy.getCleanupEligibleStatuses().includes(s.status)) {
         return FiscalSandboxRetentionPolicy.isRetentionExpired(new Date(s.createdAt), olderThanDays);
      }

      return false;
    });

    const byStatus: Record<string, number> = {};
    const bySource: Record<string, number> = {};

    candidates.forEach(c => {
      byStatus[c.status] = (byStatus[c.status] || 0) + 1;
      bySource[c.source] = (bySource[c.source] || 0) + 1;
    });

    await FiscalSandboxReviewAuditService.logCleanupPreview(input, candidates.length);

    return {
      generatedAt: new Date().toISOString(),
      totalCandidates: candidates.length,
      candidateIds: candidates.map(c => c.id),
      byStatus,
      bySource,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      executeRequired: false
    };
  }

  public async executeCleanup(companyId: string, candidateIds: string[]): Promise<any> {
    const input = { companyId, marker: 'fiscal-v2-sandbox-persistence', targetTable: 'fiscal_v2_sandbox_snapshots' };
    const validation = FiscalSandboxReviewValidator.validateCleanupAction(input);

    if (!validation.valid) {
      throw new Error(`Cleanup execution blocked: ${validation.blockers.join(', ')}`);
    }

    // Double check retention to avoid wiping retained records directly passed by ID
    const allSnapshots = await this.repository.listSnapshots(companyId);
    
    const validCandidateIds = allSnapshots
      .filter(s => candidateIds.includes(s.id) && !FiscalSandboxRetentionPolicy.isCleanupBlocked(s.status))
      .map(s => s.id);

    let removedCount = 0;
    
    // Iteratively delete them safely (or a better SQL query)
    // To minimize risk, we keep it isolated
    for (const id of validCandidateIds) {
      await this.repository.updateStatus(companyId, id, 'CLEANED');
    }
    
    const filters = { status: 'CLEANED' };
    removedCount = await this.repository.cleanup(companyId, filters);

    await FiscalSandboxReviewAuditService.logCleanupExecute(input, removedCount);

    return {
      removedCount,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
