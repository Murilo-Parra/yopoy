import { FiscalReleaseArtifactDryRunInput, FiscalReleaseArtifactDryRunResult } from './FiscalReleaseArtifactDryRunTypes';
import { FiscalReleaseArtifactDryRunPolicy } from './FiscalReleaseArtifactDryRunPolicy';
import { FiscalReleaseArtifactManifest } from './FiscalReleaseArtifactManifest';
import { FiscalDeploymentPackageManifest } from './FiscalDeploymentPackageManifest';
import { FiscalReleaseArtifactIntegrityPlan } from './FiscalReleaseArtifactIntegrityPlan';
import { FiscalDeploymentPackageShapeValidator } from './FiscalDeploymentPackageShapeValidator';
import { FiscalReleaseArtifactNonExecutableContract } from './FiscalReleaseArtifactNonExecutableContract';
import { FiscalDeploymentPackageBoundaryPlan } from './FiscalDeploymentPackageBoundaryPlan';
import { FiscalReleaseArtifactDependencyMatrix } from './FiscalReleaseArtifactDependencyMatrix';
import { FiscalReleaseArtifactDryRunBlockerRegister } from './FiscalReleaseArtifactDryRunBlockerRegister';
import { FiscalReleaseArtifactDryRunRiskRegister } from './FiscalReleaseArtifactDryRunRiskRegister';

export class FiscalReleaseArtifactDryRunEvaluationService {
  public static evaluate(input: FiscalReleaseArtifactDryRunInput): FiscalReleaseArtifactDryRunResult {
    const policyResult = FiscalReleaseArtifactDryRunPolicy.enforce(input);
    if (policyResult && !policyResult.success) {
      return policyResult as FiscalReleaseArtifactDryRunResult;
    }

    FiscalReleaseArtifactManifest.generateManifest();
    FiscalDeploymentPackageManifest.generateManifest();
    FiscalReleaseArtifactIntegrityPlan.generatePlan();
    FiscalDeploymentPackageShapeValidator.validateShape(input);
    FiscalReleaseArtifactNonExecutableContract.generateContract();
    FiscalDeploymentPackageBoundaryPlan.generatePlan();
    FiscalReleaseArtifactDependencyMatrix.generateMatrix();

    const baseResult = FiscalReleaseArtifactDryRunPolicy.getBaseResult();

    return {
      ...baseResult,
      blockers: FiscalReleaseArtifactDryRunBlockerRegister.getBlockers(),
      warnings: FiscalReleaseArtifactDryRunRiskRegister.getRisks(),
      success: true,
      go: false,
      noGo: true
    };
  }
}
