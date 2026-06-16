import { FiscalLegalAuditEventDryRunInput, FiscalLegalAuditEventDryRunResult } from './FiscalLegalAuditEventDryRunTypes';
import { FiscalLegalAuditEventPolicy } from './FiscalLegalAuditEventPolicy';
import { FiscalLegalAuditEventBlockerRegister } from './FiscalLegalAuditEventBlockerRegister';
import { FiscalLegalAuditEventRiskRegister } from './FiscalLegalAuditEventRiskRegister';
import { FiscalLegalAuditEventModelPlan } from './FiscalLegalAuditEventModelPlan';
import { FiscalLegalAuditControlledAppendSimulator } from './FiscalLegalAuditControlledAppendSimulator';
import { FiscalLegalAuditCorrectionEventSimulator } from './FiscalLegalAuditCorrectionEventSimulator';
import { FiscalLegalAuditRetentionEventSimulator } from './FiscalLegalAuditRetentionEventSimulator';
import { FiscalLegalAuditEventLinkagePlan } from './FiscalLegalAuditEventLinkagePlan';
import { FiscalLegalAuditLedgerMutationDiffService } from './FiscalLegalAuditLedgerMutationDiffService';

export class FiscalLegalAuditEventEvaluationService {
  public static evaluate(input: FiscalLegalAuditEventDryRunInput): FiscalLegalAuditEventDryRunResult {
    const policyResult = FiscalLegalAuditEventPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalLegalAuditEventDryRunResult;
    }

    // Call sims to verify correctness conceptually
    FiscalLegalAuditEventModelPlan.generatePlan();
    FiscalLegalAuditControlledAppendSimulator.simulateAppend();
    FiscalLegalAuditCorrectionEventSimulator.simulateCorrection();
    FiscalLegalAuditRetentionEventSimulator.simulateRetention();
    FiscalLegalAuditEventLinkagePlan.simulateLinkage();
    FiscalLegalAuditLedgerMutationDiffService.generateDiff();

    const baseResult = FiscalLegalAuditEventPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalLegalAuditEventBlockerRegister.getBlockers(),
      warnings: FiscalLegalAuditEventRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
