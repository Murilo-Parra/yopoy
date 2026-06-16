import { Router } from 'express';
import { FiscalProductionCorporateBoardReviewController } from './FiscalProductionCorporateBoardReviewController';

const router = Router();

router.get('/policy', FiscalProductionCorporateBoardReviewController.getPolicy);
router.get('/board-review-blueprint', FiscalProductionCorporateBoardReviewController.getBoardReviewBlueprint);
router.get('/executive-acknowledgement-non-binding-matrix', FiscalProductionCorporateBoardReviewController.getExecutiveAcknowledgementNonBindingMatrix);
router.get('/board-quorum-simulation-matrix', FiscalProductionCorporateBoardReviewController.getBoardQuorumSimulationMatrix);
router.get('/board-member-eligibility-no-authority-matrix', FiscalProductionCorporateBoardReviewController.getBoardMemberEligibilityNoAuthorityMatrix);
router.get('/archive-review-no-read-matrix', FiscalProductionCorporateBoardReviewController.getArchiveReviewNoReadMatrix);
router.get('/board-decision-no-approval-matrix', FiscalProductionCorporateBoardReviewController.getBoardDecisionNoApprovalMatrix);
router.get('/board-minutes-no-file-plan', FiscalProductionCorporateBoardReviewController.getBoardMinutesNoFilePlan);
router.get('/executive-acknowledgement-no-persistence-plan', FiscalProductionCorporateBoardReviewController.getExecutiveAcknowledgementNoPersistencePlan);
router.get('/board-notification-no-send-plan', FiscalProductionCorporateBoardReviewController.getBoardNotificationNoSendPlan);
router.get('/board-no-legal-effect-notice', FiscalProductionCorporateBoardReviewController.getBoardNoLegalEffectNotice);
router.get('/no-real-board-approval-evidence', FiscalProductionCorporateBoardReviewController.getNoRealBoardApprovalEvidence);
router.get('/no-real-acknowledgement-evidence', FiscalProductionCorporateBoardReviewController.getNoRealAcknowledgementEvidence);
router.get('/no-real-board-notification-evidence', FiscalProductionCorporateBoardReviewController.getNoRealBoardNotificationEvidence);
router.get('/dependency-matrix', FiscalProductionCorporateBoardReviewController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCorporateBoardReviewController.getBlockers);
router.get('/risks', FiscalProductionCorporateBoardReviewController.getRisks);
router.post('/validate', FiscalProductionCorporateBoardReviewController.validate);
router.post('/evaluate', FiscalProductionCorporateBoardReviewController.evaluate);
router.post('/simulate-decision', FiscalProductionCorporateBoardReviewController.simulateDecision);
router.get('/report', FiscalProductionCorporateBoardReviewController.getReport);
router.get('/audit', FiscalProductionCorporateBoardReviewController.getAudit);
router.get('/health', FiscalProductionCorporateBoardReviewController.getHealth);

export const fiscalProductionCorporateBoardReviewRoutes = router;
