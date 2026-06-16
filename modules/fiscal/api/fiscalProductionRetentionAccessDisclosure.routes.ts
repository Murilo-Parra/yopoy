import { Router } from 'express';
import { FiscalProductionRetentionAccessDisclosureController } from './FiscalProductionRetentionAccessDisclosureController';

const router = Router();

router.get('/policy', FiscalProductionRetentionAccessDisclosureController.getPolicy);
router.get('/retention-dormancy-access-review-blueprint', FiscalProductionRetentionAccessDisclosureController.getRetentionDormancyAccessReviewBlueprint);
router.get('/dormant-record-access-no-grant-matrix', FiscalProductionRetentionAccessDisclosureController.getDormantRecordAccessNoGrantMatrix);
router.get('/retrieval-suppression-no-read-plan', FiscalProductionRetentionAccessDisclosureController.getRetrievalSuppressionNoReadPlan);
router.get('/disclosure-eligibility-no-approve-matrix', FiscalProductionRetentionAccessDisclosureController.getDisclosureEligibilityNoApproveMatrix);
router.get('/export-package-no-create-plan', FiscalProductionRetentionAccessDisclosureController.getExportPackageNoCreatePlan);
router.get('/download-link-no-issue-matrix', FiscalProductionRetentionAccessDisclosureController.getDownloadLinkNoIssueMatrix);
router.get('/presigned-url-no-generate-plan', FiscalProductionRetentionAccessDisclosureController.getPresignedUrlNoGeneratePlan);
router.get('/recipient-disclosure-no-notify-matrix', FiscalProductionRetentionAccessDisclosureController.getRecipientDisclosureNoNotifyMatrix);
router.get('/redaction-no-read-no-apply-plan', FiscalProductionRetentionAccessDisclosureController.getRedactionNoReadNoApplyPlan);
router.get('/access-audit-no-persistence-plan', FiscalProductionRetentionAccessDisclosureController.getAccessAuditNoPersistencePlan);
router.get('/retention-disclosure-no-legal-effect-notice', FiscalProductionRetentionAccessDisclosureController.getRetentionDisclosureNoLegalEffectNotice);
router.get('/no-real-access-grant-evidence', FiscalProductionRetentionAccessDisclosureController.getNoRealAccessGrantEvidence);
router.get('/no-real-retrieval-evidence', FiscalProductionRetentionAccessDisclosureController.getNoRealRetrievalEvidence);
router.get('/no-real-disclosure-export-evidence', FiscalProductionRetentionAccessDisclosureController.getNoRealDisclosureExportEvidence);
router.get('/dependency-matrix', FiscalProductionRetentionAccessDisclosureController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRetentionAccessDisclosureController.getBlockers);
router.get('/risks', FiscalProductionRetentionAccessDisclosureController.getRisks);
router.post('/validate', FiscalProductionRetentionAccessDisclosureController.validate);
router.post('/evaluate', FiscalProductionRetentionAccessDisclosureController.evaluate);
router.post('/simulate-decision', FiscalProductionRetentionAccessDisclosureController.simulateDecision);
router.get('/report', FiscalProductionRetentionAccessDisclosureController.getReport);
router.get('/audit', FiscalProductionRetentionAccessDisclosureController.getAudit);
router.get('/health', FiscalProductionRetentionAccessDisclosureController.getHealth);

export const fiscalProductionRetentionAccessDisclosureRoutes = router;
