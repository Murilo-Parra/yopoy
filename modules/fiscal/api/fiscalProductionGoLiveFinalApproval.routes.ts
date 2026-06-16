import { Router } from 'express';
import { FiscalProductionGoLiveFinalApprovalController } from './FiscalProductionGoLiveFinalApprovalController';

const router = Router();

router.get('/policy', FiscalProductionGoLiveFinalApprovalController.getPolicy);
router.get('/final-approval-package', FiscalProductionGoLiveFinalApprovalController.getFinalApprovalPackage);
router.get('/executive-sign-off-simulation-matrix', FiscalProductionGoLiveFinalApprovalController.getExecutiveSignOffSimulationMatrix);
router.get('/final-readiness-evidence-review-matrix', FiscalProductionGoLiveFinalApprovalController.getFinalReadinessEvidenceReviewMatrix);
router.get('/no-activation-decision-matrix', FiscalProductionGoLiveFinalApprovalController.getNoActivationDecisionMatrix);
router.get('/authorization-no-grant-plan', FiscalProductionGoLiveFinalApprovalController.getAuthorizationNoGrantPlan);
router.get('/go-live-approval-no-op-plan', FiscalProductionGoLiveFinalApprovalController.getGoLiveApprovalNoOpPlan);
router.get('/cutover-decision-no-execute-matrix', FiscalProductionGoLiveFinalApprovalController.getCutoverDecisionNoExecuteMatrix);
router.get('/rollback-fallback-evidence-review-matrix', FiscalProductionGoLiveFinalApprovalController.getRollbackFallbackEvidenceReviewMatrix);
router.get('/no-real-approval-evidence', FiscalProductionGoLiveFinalApprovalController.getNoRealApprovalEvidence);
router.get('/no-real-authorization-evidence', FiscalProductionGoLiveFinalApprovalController.getNoRealAuthorizationEvidence);
router.get('/dependency-matrix', FiscalProductionGoLiveFinalApprovalController.getDependencyMatrix);
router.get('/blockers', FiscalProductionGoLiveFinalApprovalController.getBlockers);
router.get('/risks', FiscalProductionGoLiveFinalApprovalController.getRisks);
router.post('/validate', FiscalProductionGoLiveFinalApprovalController.validate);
router.post('/evaluate', FiscalProductionGoLiveFinalApprovalController.evaluate);
router.post('/simulate-decision', FiscalProductionGoLiveFinalApprovalController.simulateDecision);
router.get('/report', FiscalProductionGoLiveFinalApprovalController.getReport);
router.get('/audit', FiscalProductionGoLiveFinalApprovalController.getAudit);
router.get('/health', FiscalProductionGoLiveFinalApprovalController.getHealth);

export const fiscalProductionGoLiveFinalApprovalRoutes = router;
