import { FiscalProductionRuntimeQueueUnlockInput, FiscalProductionRuntimeQueueUnlockResult, FiscalProductionRuntimeQueueUnlockStatus } from './FiscalProductionRuntimeQueueUnlockTypes';
import { FiscalProductionRuntimeQueueUnlockEvaluationService } from './FiscalProductionRuntimeQueueUnlockEvaluationService';

export class FiscalProductionRuntimeQueueUnlockDecisionService {
  public static simulateDecision(input: FiscalProductionRuntimeQueueUnlockInput): FiscalProductionRuntimeQueueUnlockResult {
    const evaluation = FiscalProductionRuntimeQueueUnlockEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalProductionRuntimeQueueUnlockStatus.NO_REAL_JOB_ENQUEUE_EVIDENCE_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
