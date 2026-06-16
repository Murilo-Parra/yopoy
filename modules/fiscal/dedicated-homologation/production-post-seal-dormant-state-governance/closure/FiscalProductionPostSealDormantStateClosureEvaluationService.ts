import { FiscalProductionPostSealDormantStateClosureInput, FiscalProductionPostSealDormantStateClosureStatus } from './FiscalProductionPostSealDormantStateClosureTypes';
import { FiscalProductionPostSealDormantStateClosureValidator } from './FiscalProductionPostSealDormantStateClosureValidator';
import { FiscalProductionPostSealDormantStateClosureInventory } from './FiscalProductionPostSealDormantStateClosureInventory';
import { FiscalProductionPostSealDormantStateFinalChecklist } from './FiscalProductionPostSealDormantStateFinalChecklist';
import { FiscalProductionDormantStateEvidencePackageService } from './FiscalProductionDormantStateEvidencePackageService';
import { FiscalProductionNoReentryNoResumptionHandoffService } from './FiscalProductionNoReentryNoResumptionHandoffService';
import { FiscalProductionNoAuthorityNoActivationHandoffService } from './FiscalProductionNoAuthorityNoActivationHandoffService';
import { FiscalProductionNoRuntimeNoDatabaseHandoffService } from './FiscalProductionNoRuntimeNoDatabaseHandoffService';
import { FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService } from './FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService';
import { FiscalProductionPostSealDormantStatePostClosureRoadmap } from './FiscalProductionPostSealDormantStatePostClosureRoadmap';
import { FiscalProductionPostSealDormantStateClosureDependencyMatrix } from './FiscalProductionPostSealDormantStateClosureDependencyMatrix';
import { FiscalProductionPostSealDormantStateFinalBlockerRegister } from './FiscalProductionPostSealDormantStateFinalBlockerRegister';
import { FiscalProductionPostSealDormantStateFinalRiskRegister } from './FiscalProductionPostSealDormantStateFinalRiskRegister';

export class FiscalProductionPostSealDormantStateClosureEvaluationService {
  public static evaluate(input: FiscalProductionPostSealDormantStateClosureInput): any {
    const blockers = FiscalProductionPostSealDormantStateClosureValidator.validate(input);

    if (blockers.length > 0) {
      return {
        status: FiscalProductionPostSealDormantStateClosureStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionPostSealDormantStateClosureStatus.PRODUCTION_POST_SEAL_DORMANT_STATE_CLOSURE_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      closureInventory: FiscalProductionPostSealDormantStateClosureInventory.getInventory(),
      finalChecklist: FiscalProductionPostSealDormantStateFinalChecklist.getChecklist(),
      evidencePackage: FiscalProductionDormantStateEvidencePackageService.getPackage(),
      noReentryNoResumptionHandoff: FiscalProductionNoReentryNoResumptionHandoffService.getHandoff(),
      noAuthorityNoActivationHandoff: FiscalProductionNoAuthorityNoActivationHandoffService.getHandoff(),
      noRuntimeNoDatabaseHandoff: FiscalProductionNoRuntimeNoDatabaseHandoffService.getHandoff(),
      noExternalIntegrationNoSensitiveDataHandoff: FiscalProductionNoExternalIntegrationNoSensitiveDataHandoffService.getHandoff(),
      postClosureRoadmap: FiscalProductionPostSealDormantStatePostClosureRoadmap.getRoadmap(),
      dependencyMatrix: FiscalProductionPostSealDormantStateClosureDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionPostSealDormantStateFinalBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionPostSealDormantStateFinalRiskRegister.getRisks()
    };
  }
}
