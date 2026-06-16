import { FiscalLegalSignOffInput, FiscalLegalSignOffResult, FiscalLegalSignOffStatus } from './FiscalLegalSignOffTypes';
import { FiscalLegalSignOffEvaluationService } from './FiscalLegalSignOffEvaluationService';

export class FiscalLegalSignOffDecisionService {
  public static simulateDecision(input: FiscalLegalSignOffInput): FiscalLegalSignOffResult {
    const evaluation = FiscalLegalSignOffEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalLegalSignOffStatus.NON_EXECUTABLE_SIGNATURE_CONTRACT_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
