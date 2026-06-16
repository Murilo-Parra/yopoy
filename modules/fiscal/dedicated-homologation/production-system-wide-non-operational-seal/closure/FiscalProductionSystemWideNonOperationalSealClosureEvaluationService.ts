import { FiscalProductionSystemWideNonOperationalSealClosureInput, FiscalProductionSystemWideNonOperationalSealClosureResult, FiscalProductionSystemWideNonOperationalSealClosureStatus } from './FiscalProductionSystemWideNonOperationalSealClosureTypes';
import { FiscalProductionSystemWideNonOperationalSealClosureValidator } from './FiscalProductionSystemWideNonOperationalSealClosureValidator';
import { FiscalProductionSystemWideNonOperationalSealClosureInventory } from './FiscalProductionSystemWideNonOperationalSealClosureInventory';
import { FiscalProductionSystemWideNonOperationalSealFinalChecklist } from './FiscalProductionSystemWideNonOperationalSealFinalChecklist';
import { FiscalProductionSystemWideNoAuthorityEvidencePackageService } from './FiscalProductionSystemWideNoAuthorityEvidencePackageService';
import { FiscalProductionSystemWideNoActivationEvidencePackageService } from './FiscalProductionSystemWideNoActivationEvidencePackageService';
import { FiscalProductionSystemWideNoOperationalHandoffService } from './FiscalProductionSystemWideNoOperationalHandoffService';
import { FiscalProductionSystemWideNoAuthorityHandoffService } from './FiscalProductionSystemWideNoAuthorityHandoffService';
import { FiscalProductionSystemWideNoActivationHandoffService } from './FiscalProductionSystemWideNoActivationHandoffService';
import { FiscalProductionSystemWideNonOperationalSealPostClosureRoadmap } from './FiscalProductionSystemWideNonOperationalSealPostClosureRoadmap';
import { FiscalProductionSystemWideNonOperationalSealClosureDependencyMatrix } from './FiscalProductionSystemWideNonOperationalSealClosureDependencyMatrix';
import { FiscalProductionSystemWideNonOperationalSealFinalBlockerRegister } from './FiscalProductionSystemWideNonOperationalSealFinalBlockerRegister';
import { FiscalProductionSystemWideNonOperationalSealFinalRiskRegister } from './FiscalProductionSystemWideNonOperationalSealFinalRiskRegister';

export class FiscalProductionSystemWideNonOperationalSealClosureEvaluationService {
  public static evaluate(input: FiscalProductionSystemWideNonOperationalSealClosureInput): any {
    const blockers = FiscalProductionSystemWideNonOperationalSealClosureValidator.validate(input);
    
    if (blockers.length > 0) {
      return {
        status: FiscalProductionSystemWideNonOperationalSealClosureStatus.FAILED_SAFE,
        blockers,
        validationExecuted: true,
        evaluationExecuted: false
      };
    }

    return {
      status: FiscalProductionSystemWideNonOperationalSealClosureStatus.PRODUCTION_SYSTEM_WIDE_NON_OPERATIONAL_SEAL_CLOSURE_READY,
      validationExecuted: true,
      evaluationExecuted: true,
      closureInventory: FiscalProductionSystemWideNonOperationalSealClosureInventory.getInventory(),
      finalChecklist: FiscalProductionSystemWideNonOperationalSealFinalChecklist.getChecklist(),
      noAuthorityEvidencePackage: FiscalProductionSystemWideNoAuthorityEvidencePackageService.generatePackage(),
      noActivationEvidencePackage: FiscalProductionSystemWideNoActivationEvidencePackageService.generatePackage(),
      noOperationalHandoff: FiscalProductionSystemWideNoOperationalHandoffService.generateHandoff(),
      noAuthorityHandoff: FiscalProductionSystemWideNoAuthorityHandoffService.generateHandoff(),
      noActivationHandoff: FiscalProductionSystemWideNoActivationHandoffService.generateHandoff(),
      postClosureRoadmap: FiscalProductionSystemWideNonOperationalSealPostClosureRoadmap.getRoadmap(),
      dependencyMatrix: FiscalProductionSystemWideNonOperationalSealClosureDependencyMatrix.getMatrix(),
      registeredBlockers: FiscalProductionSystemWideNonOperationalSealFinalBlockerRegister.getBlockers(),
      registeredRisks: FiscalProductionSystemWideNonOperationalSealFinalRiskRegister.getRisks()
    };
  }
}
