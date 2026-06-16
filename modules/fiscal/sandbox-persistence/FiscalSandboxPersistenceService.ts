import { FiscalSandboxPersistenceRepository } from './FiscalSandboxPersistenceRepository';
import { FiscalSandboxPersistenceValidator } from './FiscalSandboxPersistenceValidator';
import { 
  FiscalSandboxPersistenceResult, 
  FiscalSandboxSnapshotRecord,
  FiscalSandboxSnapshotStatus
} from './FiscalSandboxPersistenceTypes';

export class FiscalSandboxPersistenceService {
  private repository: FiscalSandboxPersistenceRepository;

  constructor() {
    this.repository = new FiscalSandboxPersistenceRepository();
  }

  public async saveSnapshot(input: any): Promise<FiscalSandboxPersistenceResult> {
    // 1. Validate Input
    const validation = FiscalSandboxPersistenceValidator.validate(input);
    
    // 2. Map valid (and sanitized) input to the record format
    const recordToSave: Omit<FiscalSandboxSnapshotRecord, 'id' | 'createdAt'> = {
      companyId: validation.safeInput.companyId,
      userId: validation.safeInput.userId,
      source: validation.safeInput.source,
      route: validation.safeInput.route,
      operation: validation.safeInput.operation,
      status: validation.safeInput.status,
      safeShape: validation.safeInput.safeShape,
      metadata: validation.safeInput.metadata,
      marker: 'fiscal-v2-sandbox-persistence',
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
    };

    // 3. Persist using Repository
    const result = await this.repository.createSnapshot(recordToSave);
    
    if (validation.blockers.length > 0) {
      result.warnings = ['Sensitive data blocked or missing required fields. Shape cleared.'];
      result.blockers = validation.blockers;
    }

    return result;
  }

  public async listSnapshots(companyId: string, filters?: any): Promise<FiscalSandboxSnapshotRecord[]> {
    if (!companyId) throw new Error('companyId is required for listing snapshots');
    return this.repository.listSnapshots(companyId, filters);
  }

  public async getSnapshot(companyId: string, id: string): Promise<FiscalSandboxSnapshotRecord | null> {
    if (!companyId || !id) throw new Error('companyId and id are required');
    return this.repository.findById(companyId, id);
  }

  public async markReviewed(companyId: string, id: string, userId?: string): Promise<boolean> {
    if (!companyId || !id) throw new Error('companyId and id are required');
    return this.repository.markReviewed(companyId, id, userId);
  }
}
