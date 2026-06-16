import { Router } from 'express';
import { FiscalProductionFinalStateDisclosureController } from './FiscalProductionFinalStateDisclosureController';

const router = Router();

router.get('/policy', FiscalProductionFinalStateDisclosureController.getPolicy);
router.get('/disclosure-review-blueprint', FiscalProductionFinalStateDisclosureController.getDisclosureReviewBlueprint);
router.get('/governance-review-matrix', FiscalProductionFinalStateDisclosureController.getGovernanceReviewMatrix);
router.get('/no-export-handoff-plan', FiscalProductionFinalStateDisclosureController.getNoExportHandoffPlan);
router.get('/disclosure-scope-matrix', FiscalProductionFinalStateDisclosureController.getDisclosureScopeMatrix);
router.get('/recipient-eligibility-no-notify-matrix', FiscalProductionFinalStateDisclosureController.getRecipientEligibilityNoNotifyMatrix);
router.get('/disclosure-package-no-file-plan', FiscalProductionFinalStateDisclosureController.getDisclosurePackageNoFilePlan);
router.get('/disclosure-redaction-no-read-matrix', FiscalProductionFinalStateDisclosureController.getDisclosureRedactionNoReadMatrix);
router.get('/disclosure-no-external-submission-plan', FiscalProductionFinalStateDisclosureController.getDisclosureNoExternalSubmissionPlan);
router.get('/disclosure-no-notification-plan', FiscalProductionFinalStateDisclosureController.getDisclosureNoNotificationPlan);
router.get('/disclosure-no-persistence-plan', FiscalProductionFinalStateDisclosureController.getDisclosureNoPersistencePlan);
router.get('/disclosure-no-hash-plan', FiscalProductionFinalStateDisclosureController.getDisclosureNoHashPlan);
router.get('/disclosure-no-signature-plan', FiscalProductionFinalStateDisclosureController.getDisclosureNoSignaturePlan);
router.get('/disclosure-no-legal-effect-notice', FiscalProductionFinalStateDisclosureController.getDisclosureNoLegalEffectNotice);
router.get('/no-real-disclosure-export-evidence', FiscalProductionFinalStateDisclosureController.getNoRealDisclosureExportEvidence);
router.get('/no-real-disclosure-package-evidence', FiscalProductionFinalStateDisclosureController.getNoRealDisclosurePackageEvidence);
router.get('/no-real-disclosure-notification-evidence', FiscalProductionFinalStateDisclosureController.getNoRealDisclosureNotificationEvidence);
router.get('/dependency-matrix', FiscalProductionFinalStateDisclosureController.getDependencyMatrix);
router.get('/blockers', FiscalProductionFinalStateDisclosureController.getBlockers);
router.get('/risks', FiscalProductionFinalStateDisclosureController.getRisks);
router.post('/validate', FiscalProductionFinalStateDisclosureController.validate);
router.post('/evaluate', FiscalProductionFinalStateDisclosureController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalStateDisclosureController.simulateDecision);
router.get('/report', FiscalProductionFinalStateDisclosureController.getReport);
router.get('/audit', FiscalProductionFinalStateDisclosureController.getAudit);
router.get('/health', FiscalProductionFinalStateDisclosureController.getHealth);

export const fiscalProductionFinalStateDisclosureRoutes = router;
