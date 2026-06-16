import { FiscalProductionEvidenceVaultGovernanceInput } from './FiscalProductionEvidenceVaultGovernanceTypes';
import { FiscalProductionEvidenceVaultGovernancePolicy } from './FiscalProductionEvidenceVaultGovernancePolicy';
import { FiscalProductionEvidenceVaultGovernanceValidator } from './FiscalProductionEvidenceVaultGovernanceValidator';
import { FiscalProductionEvidenceVaultBlueprint } from './FiscalProductionEvidenceVaultBlueprint';
import { FiscalProductionNoPersistenceAuditBoundaryContract } from './FiscalProductionNoPersistenceAuditBoundaryContract';
import { FiscalProductionEvidenceClassificationMatrix } from './FiscalProductionEvidenceClassificationMatrix';
import { FiscalProductionEvidenceRetentionNoOpPlan } from './FiscalProductionEvidenceRetentionNoOpPlan';
import { FiscalProductionEvidenceHashingNoCryptoPlan } from './FiscalProductionEvidenceHashingNoCryptoPlan';
import { FiscalProductionEvidenceAccessNoReadMatrix } from './FiscalProductionEvidenceAccessNoReadMatrix';
import { FiscalProductionEvidenceExportNoOpPlan } from './FiscalProductionEvidenceExportNoOpPlan';
import { FiscalProductionAuditTrailInMemoryOnlyPlan } from './FiscalProductionAuditTrailInMemoryOnlyPlan';
import { FiscalProductionEvidenceVaultDependencyMatrix } from './FiscalProductionEvidenceVaultDependencyMatrix';
import { FiscalProductionEvidenceVaultGovernanceBlockerRegister } from './FiscalProductionEvidenceVaultGovernanceBlockerRegister';
import { FiscalProductionEvidenceVaultGovernanceRiskRegister } from './FiscalProductionEvidenceVaultGovernanceRiskRegister';

export class FiscalProductionEvidenceVaultGovernanceEvaluationService {
  public static evaluate(input: FiscalProductionEvidenceVaultGovernanceInput) {
    FiscalProductionEvidenceVaultGovernanceValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionEvidenceVaultGovernancePolicy.getPolicyMessage(),
      vaultBlueprint: FiscalProductionEvidenceVaultBlueprint.getBlueprint(),
      noPersistenceAuditBoundaryContract: FiscalProductionNoPersistenceAuditBoundaryContract.getContract(),
      evidenceClassificationMatrix: FiscalProductionEvidenceClassificationMatrix.getMatrix(),
      evidenceRetentionNoOpPlan: FiscalProductionEvidenceRetentionNoOpPlan.getPlan(),
      evidenceHashingNoCryptoPlan: FiscalProductionEvidenceHashingNoCryptoPlan.getPlan(),
      evidenceAccessNoReadMatrix: FiscalProductionEvidenceAccessNoReadMatrix.getMatrix(),
      evidenceExportNoOpPlan: FiscalProductionEvidenceExportNoOpPlan.getPlan(),
      auditTrailInMemoryOnlyPlan: FiscalProductionAuditTrailInMemoryOnlyPlan.getPlan(),
      dependencyMatrix: FiscalProductionEvidenceVaultDependencyMatrix.getMatrix(),
      blockers: FiscalProductionEvidenceVaultGovernanceBlockerRegister.getBlockers(),
      risks: FiscalProductionEvidenceVaultGovernanceRiskRegister.getRisks(),
    };
  }
}
