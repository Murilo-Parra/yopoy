import { FiscalSandboxPersistenceService } from './FiscalSandboxPersistenceService';
import { FiscalSandboxReplayBridgeValidator } from './FiscalSandboxReplayBridgeValidator';
import { FiscalSandboxReplayBridgeAuditService } from './FiscalSandboxReplayBridgeAuditService';
import { 
  FiscalSandboxReplayBridgeResult,
  FiscalSandboxReplayBridgeSource,
  FiscalSandboxReplayBridgeOperation
} from './FiscalSandboxReplayBridgeTypes';

export class FiscalSandboxReplayBridgeService {
  private sandboxPersistence: FiscalSandboxPersistenceService;

  constructor() {
    this.sandboxPersistence = new FiscalSandboxPersistenceService();
  }

  public async validateBridgeInput(input: any): Promise<{ valid: boolean; blockers: string[] }> {
    const val = FiscalSandboxReplayBridgeValidator.validate(input);
    return { valid: val.valid, blockers: val.blockers };
  }

  public async storeManualCaptureSnapshot(input: any): Promise<FiscalSandboxReplayBridgeResult> {
    const newInput = {
      ...input,
      source: FiscalSandboxReplayBridgeSource.MANUAL_CAPTURE,
      operation: FiscalSandboxReplayBridgeOperation.STORE_MANUAL_SNAPSHOT
    };
    return this.processStorage(newInput);
  }

  public async storeReplayQueueItem(input: any): Promise<FiscalSandboxReplayBridgeResult> {
    const newInput = {
      ...input,
      source: FiscalSandboxReplayBridgeSource.REPLAY_QUEUE,
      operation: FiscalSandboxReplayBridgeOperation.STORE_REPLAY_ITEM
    };
    return this.processStorage(newInput);
  }

  public async storeReplayBatchResult(input: any): Promise<FiscalSandboxReplayBridgeResult> {
    const newInput = {
      ...input,
      source: FiscalSandboxReplayBridgeSource.REPLAY_BATCH,
      operation: FiscalSandboxReplayBridgeOperation.STORE_BATCH_RESULT
    };
    return this.processStorage(newInput);
  }

  public async storeGovernanceSnapshot(input: any): Promise<FiscalSandboxReplayBridgeResult> {
    const newInput = {
      ...input,
      source: FiscalSandboxReplayBridgeSource.REPLAY_GOVERNANCE,
      operation: FiscalSandboxReplayBridgeOperation.STORE_GOVERNANCE_SNAPSHOT
    };
    return this.processStorage(newInput);
  }

  private async processStorage(input: any): Promise<FiscalSandboxReplayBridgeResult> {
    const validation = FiscalSandboxReplayBridgeValidator.validate(input);
    
    if (!validation.valid) {
      await FiscalSandboxReplayBridgeAuditService.logAttempt(
        input.source || 'UNKNOWN', 
        input.operation || 'UNKNOWN', 
        'BLOCKED'
      );
      
      return {
        success: false,
        stored: false,
        source: input.source,
        operation: input.operation,
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        warnings: ['Blocked by Validator'],
        blockers: validation.blockers
      };
    }

    try {
      // Map properties for FiscalSandboxPersistenceService schema where needed
      const result = await this.sandboxPersistence.saveSnapshot({
        companyId: validation.safeInput.companyId,
        userId: validation.safeInput.userId,
        source: validation.safeInput.source,
        route: validation.safeInput.route || '/unknown',
        operation: validation.safeInput.operation,
        status: 'STORED',
        safeShape: validation.safeInput.safeShape,
        metadata: validation.safeInput.metadata,
      });

      await FiscalSandboxReplayBridgeAuditService.logAttempt(
        input.source, 
        input.operation, 
        'SUCCESS'
      );

      return {
        success: true,
        stored: true,
        sandboxRecordId: result.recordId,
        source: input.source,
        operation: input.operation,
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        warnings: result.warnings
      };
    } catch (err: any) {
      await FiscalSandboxReplayBridgeAuditService.logAttempt(
        input.source || 'UNKNOWN', 
        input.operation || 'UNKNOWN', 
        'FAILED_SAFE'
      );

      return {
        success: false,
        stored: false,
        source: input.source,
        operation: input.operation,
        sandboxOnly: true,
        productionWrite: false,
        simulationOnly: true,
        activationBlocked: true,
        payloadIncluded: false,
        sensitiveDataIncluded: false,
        warnings: ['Internal error during persistence.'],
        blockers: [err.message]
      };
    }
  }
}
