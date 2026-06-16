import { FiscalProductionComplianceAuditGovernanceInput } from './FiscalProductionComplianceAuditGovernanceTypes';
import { FiscalProductionComplianceAuditGovernancePolicy } from './FiscalProductionComplianceAuditGovernancePolicy';
import { FiscalProductionComplianceAuditGovernanceValidator } from './FiscalProductionComplianceAuditGovernanceValidator';
import { FiscalProductionComplianceAuditGovernanceBlueprint } from './FiscalProductionComplianceAuditGovernanceBlueprint';
import { FiscalProductionNoSubmissionRegulatoryBoundaryContract } from './FiscalProductionNoSubmissionRegulatoryBoundaryContract';
import { FiscalProductionComplianceScopeSimulationMatrix } from './FiscalProductionComplianceScopeSimulationMatrix';
import { FiscalProductionAuditDossierNoFilePlan } from './FiscalProductionAuditDossierNoFilePlan';
import { FiscalProductionAuditRequirementMetadataMatrix } from './FiscalProductionAuditRequirementMetadataMatrix';
import { FiscalProductionEvidenceReferenceNoReadPlan } from './FiscalProductionEvidenceReferenceNoReadPlan';
import { FiscalProductionComplianceReviewNoOpPlan } from './FiscalProductionComplianceReviewNoOpPlan';
import { FiscalProductionExternalSubmissionNoOpMatrix } from './FiscalProductionExternalSubmissionNoOpMatrix';
import { FiscalProductionNoRegulatoryFilingEvidence } from './FiscalProductionNoRegulatoryFilingEvidence';
import { FiscalProductionNoAuditorNotificationEvidence } from './FiscalProductionNoAuditorNotificationEvidence';
import { FiscalProductionComplianceAuditDependencyMatrix } from './FiscalProductionComplianceAuditDependencyMatrix';
import { FiscalProductionComplianceAuditGovernanceBlockerRegister } from './FiscalProductionComplianceAuditGovernanceBlockerRegister';
import { FiscalProductionComplianceAuditGovernanceRiskRegister } from './FiscalProductionComplianceAuditGovernanceRiskRegister';

export class FiscalProductionComplianceAuditGovernanceEvaluationService {
  public static evaluate(input: FiscalProductionComplianceAuditGovernanceInput) {
    FiscalProductionComplianceAuditGovernanceValidator.validate(input);

    return {
      status: 'evaluated',
      policy: FiscalProductionComplianceAuditGovernancePolicy.getPolicyMessage(),
      governanceBlueprint: FiscalProductionComplianceAuditGovernanceBlueprint.getBlueprint(),
      noSubmissionBoundaryContract: FiscalProductionNoSubmissionRegulatoryBoundaryContract.getContract(),
      complianceScopeSimulationMatrix: FiscalProductionComplianceScopeSimulationMatrix.getMatrix(),
      auditDossierNoFilePlan: FiscalProductionAuditDossierNoFilePlan.getPlan(),
      auditRequirementMetadataMatrix: FiscalProductionAuditRequirementMetadataMatrix.getMatrix(),
      evidenceReferenceNoReadPlan: FiscalProductionEvidenceReferenceNoReadPlan.getPlan(),
      complianceReviewNoOpPlan: FiscalProductionComplianceReviewNoOpPlan.getPlan(),
      externalSubmissionNoOpMatrix: FiscalProductionExternalSubmissionNoOpMatrix.getMatrix(),
      noRegulatoryFilingEvidence: FiscalProductionNoRegulatoryFilingEvidence.getEvidence(),
      noAuditorNotificationEvidence: FiscalProductionNoAuditorNotificationEvidence.getEvidence(),
      dependencyMatrix: FiscalProductionComplianceAuditDependencyMatrix.getMatrix(),
      blockers: FiscalProductionComplianceAuditGovernanceBlockerRegister.getBlockers(),
      risks: FiscalProductionComplianceAuditGovernanceRiskRegister.getRisks(),
    };
  }
}
