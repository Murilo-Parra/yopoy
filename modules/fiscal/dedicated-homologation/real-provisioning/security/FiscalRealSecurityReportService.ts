import { FiscalRealProvisioningSecurityReport, FiscalRealProvisioningSecurityStatus } from './FiscalRealProvisioningSecurityTypes';
import { FiscalRealSecurityReviewChecklist } from './FiscalRealSecurityReviewChecklist';
import { FiscalRealSecurityApprovalMatrix } from './FiscalRealSecurityApprovalMatrix';
import { FiscalRealSegregationOfDutiesMatrix } from './FiscalRealSegregationOfDutiesMatrix';
import { FiscalRealSecurityBlockerRegister } from './FiscalRealSecurityBlockerRegister';
import { FiscalRealSecurityRiskRegister } from './FiscalRealSecurityRiskRegister';
import { FiscalRealSecurityEvaluationService } from './FiscalRealSecurityEvaluationService';
import { FiscalRealSecurityDecisionService } from './FiscalRealSecurityDecisionService';

export class FiscalRealSecurityReportService {
  public static getReport(): FiscalRealProvisioningSecurityReport {
    return {
      generatedAt: new Date().toISOString(),
      status: FiscalRealProvisioningSecurityStatus.SECURITY_REVIEW_READY,
      checklist: FiscalRealSecurityReviewChecklist.getChecklist(),
      approvalMatrix: FiscalRealSecurityApprovalMatrix.getMatrix(),
      segregationOfDuties: FiscalRealSegregationOfDutiesMatrix.getMatrix(),
      blockers: FiscalRealSecurityBlockerRegister.getBlockers(),
      risks: FiscalRealSecurityRiskRegister.getRisks(),
      evaluation: FiscalRealSecurityEvaluationService.evaluate({}),
      decision: FiscalRealSecurityDecisionService.simulateDecision({}),
      recommendations: [
        'O Módulo 12.3 foi encerrado em modo read-only/security-review-only/approval-workflow-only/governance-only/simulation-only. Apenas o fechamento documental da revisão de segurança foi aprovado. Aprovação real, Terraform apply, Pulumi up, deploy real, infraestrutura real, banco real, vault real, secrets reais, certificado real, SEFAZ real, XML assinado, PDF real, Release real, Canary real, Produção V2 e tráfego produtivo permanecem bloqueados.'
      ],
      readOnly: true,
      securityReviewOnly: true,
      approvalWorkflowOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      approvedForSecurityReviewClosure: true,
      approvedForIacApply: false,
      approvedForInfrastructureProvisioning: false,
      approvedForEnvironmentActivation: false,
      approvedForProductionV2: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
