import { FiscalProductionOperationsSignatureGovernanceBlueprint } from './FiscalProductionOperationsSignatureGovernanceBlueprint';
import { FiscalProductionOperationsNonExecutableActivationConsentContract } from './FiscalProductionOperationsNonExecutableActivationConsentContract';
import { FiscalProductionOperationsAuthorizedSignerMatrix } from './FiscalProductionOperationsAuthorizedSignerMatrix';
import { FiscalProductionOperationsTwoPersonSignatureSimulation } from './FiscalProductionOperationsTwoPersonSignatureSimulation';
import { FiscalProductionOperationsSignatureSoDMatrix } from './FiscalProductionOperationsSignatureSoDMatrix';
import { FiscalProductionOperationsNonCryptographicSignatureEnvelope } from './FiscalProductionOperationsNonCryptographicSignatureEnvelope';
import { FiscalProductionOperationsSignatureEvidenceNoPersistencePlan } from './FiscalProductionOperationsSignatureEvidenceNoPersistencePlan';
import { FiscalProductionOperationsNoRealSignatureEvidence } from './FiscalProductionOperationsNoRealSignatureEvidence';
import { FiscalProductionOperationsNoGateUnlockEvidence } from './FiscalProductionOperationsNoGateUnlockEvidence';
import { FiscalProductionOperationsSignatureDependencyMatrix } from './FiscalProductionOperationsSignatureDependencyMatrix';
import { FiscalProductionOperationsSignatureGovernanceBlockerRegister } from './FiscalProductionOperationsSignatureGovernanceBlockerRegister';
import { FiscalProductionOperationsSignatureGovernanceRiskRegister } from './FiscalProductionOperationsSignatureGovernanceRiskRegister';
import { FiscalProductionOperationsSignatureGovernancePolicy } from './FiscalProductionOperationsSignatureGovernancePolicy';
import { FiscalProductionOperationsSignatureGovernanceValidator } from './FiscalProductionOperationsSignatureGovernanceValidator';
import { FiscalProductionOperationsSignatureGovernanceInput } from './FiscalProductionOperationsSignatureGovernanceTypes';

export class FiscalProductionOperationsSignatureGovernanceEvaluationService {
  public static evaluate(input: FiscalProductionOperationsSignatureGovernanceInput) {
    FiscalProductionOperationsSignatureGovernanceValidator.validate(input);

    return {
      evaluationExecuted: true,
      policy: FiscalProductionOperationsSignatureGovernancePolicy.getPolicyMessage(),
      blueprint: FiscalProductionOperationsSignatureGovernanceBlueprint.getBlueprint(),
      consentContract: FiscalProductionOperationsNonExecutableActivationConsentContract.getContract(),
      signerMatrix: FiscalProductionOperationsAuthorizedSignerMatrix.getMatrix(),
      twoPersonSimulation: FiscalProductionOperationsTwoPersonSignatureSimulation.simulate(),
      sodMatrix: FiscalProductionOperationsSignatureSoDMatrix.getMatrix(),
      nonCryptographicEnvelope: FiscalProductionOperationsNonCryptographicSignatureEnvelope.getEnvelope(),
      evidenceNoPersistencePlan: FiscalProductionOperationsSignatureEvidenceNoPersistencePlan.getPlan(),
      noRealSignatureEvidence: FiscalProductionOperationsNoRealSignatureEvidence.getEvidence(),
      noGateUnlockEvidence: FiscalProductionOperationsNoGateUnlockEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionOperationsSignatureDependencyMatrix.getMatrix(),
      blockers: FiscalProductionOperationsSignatureGovernanceBlockerRegister.getBlockers(),
      risks: FiscalProductionOperationsSignatureGovernanceRiskRegister.getRisks(),
      status: 'evaluated_safe'
    };
  }
}
