import { FiscalReleaseArtifactDryRunInput, FiscalReleaseArtifactDryRunResult, FiscalReleaseArtifactDryRunStatus } from './FiscalReleaseArtifactDryRunTypes';
import { FiscalReleaseArtifactDryRunEvaluationService } from './FiscalReleaseArtifactDryRunEvaluationService';

export class FiscalReleaseArtifactDryRunDecisionService {
  public static simulateDecision(input: FiscalReleaseArtifactDryRunInput): FiscalReleaseArtifactDryRunResult {
    const evaluation = FiscalReleaseArtifactDryRunEvaluationService.evaluate(input);

    return {
      ...evaluation,
      status: FiscalReleaseArtifactDryRunStatus.DEPLOYMENT_PACKAGE_DRY_RUN_READY,
      decisionSimulated: true,
      go: false,
      noGo: true
    };
  }
}
