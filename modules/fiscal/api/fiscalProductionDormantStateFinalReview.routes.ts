import { Router } from 'express';
import { FiscalProductionDormantStateFinalReviewController } from './FiscalProductionDormantStateFinalReviewController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionDormantStateFinalReviewController.getPolicy);
router.get('/final-review-blueprint', FiscalProductionDormantStateFinalReviewController.getFinalReviewBlueprint);
router.get('/executive-non-resumption-acknowledgement-matrix', FiscalProductionDormantStateFinalReviewController.getExecutiveNonResumptionAcknowledgementMatrix);
router.get('/no-legal-effect-review-notice', FiscalProductionDormantStateFinalReviewController.getNoLegalEffectReviewNotice);
router.get('/dormant-state-final-continuity-matrix', FiscalProductionDormantStateFinalReviewController.getDormantStateFinalContinuityMatrix);
router.get('/executive-review-no-approval-matrix', FiscalProductionDormantStateFinalReviewController.getExecutiveReviewNoApprovalMatrix);
router.get('/acknowledgement-no-binding-plan', FiscalProductionDormantStateFinalReviewController.getAcknowledgementNoBindingPlan);
router.get('/minutes-no-file-plan', FiscalProductionDormantStateFinalReviewController.getMinutesNoFilePlan);
router.get('/final-review-no-signature-plan', FiscalProductionDormantStateFinalReviewController.getFinalReviewNoSignaturePlan);
router.get('/final-review-no-notification-plan', FiscalProductionDormantStateFinalReviewController.getFinalReviewNoNotificationPlan);
router.get('/final-review-no-export-plan', FiscalProductionDormantStateFinalReviewController.getFinalReviewNoExportPlan);
router.get('/final-review-no-handoff-plan', FiscalProductionDormantStateFinalReviewController.getFinalReviewNoHandoffPlan);
router.get('/no-real-executive-approval-evidence', FiscalProductionDormantStateFinalReviewController.getExecutiveApprovalEvidence);
router.get('/no-real-acknowledgement-evidence', FiscalProductionDormantStateFinalReviewController.getAcknowledgementEvidence);
router.get('/no-real-legal-effect-evidence', FiscalProductionDormantStateFinalReviewController.getNoRealLegalEffectEvidence);
router.get('/no-real-final-review-handoff-evidence', FiscalProductionDormantStateFinalReviewController.getNoRealFinalReviewHandoffEvidence);
router.get('/dependency-matrix', FiscalProductionDormantStateFinalReviewController.getDependencyMatrix);
router.get('/blockers', FiscalProductionDormantStateFinalReviewController.getBlockers);
router.get('/risks', FiscalProductionDormantStateFinalReviewController.getRisks);
router.post('/validate', FiscalProductionDormantStateFinalReviewController.validate);
router.post('/evaluate', FiscalProductionDormantStateFinalReviewController.evaluate);
router.post('/simulate-decision', FiscalProductionDormantStateFinalReviewController.simulateDecision);
router.get('/report', FiscalProductionDormantStateFinalReviewController.getReport);
router.get('/audit', FiscalProductionDormantStateFinalReviewController.getAudit);
router.get('/health', FiscalProductionDormantStateFinalReviewController.getHealth);

export default router;
