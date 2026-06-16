import { FiscalRealChangeWindowInput, FiscalRealChangeWindowResult } from './FiscalRealChangeWindowTypes';
import { FiscalRealChangeWindowEvaluationService } from './FiscalRealChangeWindowEvaluationService';

export class FiscalRealChangeWindowDecisionService {
  public static simulateDecision(input: FiscalRealChangeWindowInput): FiscalRealChangeWindowResult {
    const evaluation = FiscalRealChangeWindowEvaluationService.evaluate(input);
    
    return {
      ...evaluation,
      status: 'EXECUTION_READINESS_READY', // Simulate ready
      evaluationExecuted: true,
      decisionSimulated: true,
      go: false,
      noGo: true,
      approvedForChangeWindowClosure: true,
      approvedForRealChangeWindow: false,
      approvedForExecutionStart: false,
      approvedForIacApply: false,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForRealHomologation: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    } as any;
  }
}
