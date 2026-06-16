import { Router } from 'express';
import { FiscalProductionCorporateGovernanceArchiveController } from './FiscalProductionCorporateGovernanceArchiveController';

const router = Router();

router.get('/policy', FiscalProductionCorporateGovernanceArchiveController.getPolicy);
router.get('/archive-blueprint', FiscalProductionCorporateGovernanceArchiveController.getArchiveBlueprint);
router.get('/non-operational-continuity-record-contract', FiscalProductionCorporateGovernanceArchiveController.getNonOperationalContinuityRecordContract);
router.get('/archive-scope-inventory', FiscalProductionCorporateGovernanceArchiveController.getArchiveScopeInventory);
router.get('/domain-closure-aggregation-matrix', FiscalProductionCorporateGovernanceArchiveController.getDomainClosureAggregationMatrix);
router.get('/archive-no-file-plan', FiscalProductionCorporateGovernanceArchiveController.getArchiveNoFilePlan);
router.get('/continuity-record-no-persistence-plan', FiscalProductionCorporateGovernanceArchiveController.getContinuityRecordNoPersistencePlan);
router.get('/archive-no-legal-effect-notice', FiscalProductionCorporateGovernanceArchiveController.getArchiveNoLegalEffectNotice);
router.get('/archive-no-export-plan', FiscalProductionCorporateGovernanceArchiveController.getArchiveNoExportPlan);
router.get('/archive-recipient-no-notification-matrix', FiscalProductionCorporateGovernanceArchiveController.getArchiveRecipientNoNotificationMatrix);
router.get('/archive-evidence-reference-no-read-matrix', FiscalProductionCorporateGovernanceArchiveController.getArchiveEvidenceReferenceNoReadMatrix);
router.get('/archive-no-hash-no-signature-plan', FiscalProductionCorporateGovernanceArchiveController.getArchiveNoHashNoSignaturePlan);
router.get('/no-real-record-evidence', FiscalProductionCorporateGovernanceArchiveController.getNoRealRecordEvidence);
router.get('/no-real-file-evidence', FiscalProductionCorporateGovernanceArchiveController.getNoRealFileEvidence);
router.get('/no-real-export-evidence', FiscalProductionCorporateGovernanceArchiveController.getNoRealExportEvidence);
router.get('/dependency-matrix', FiscalProductionCorporateGovernanceArchiveController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCorporateGovernanceArchiveController.getBlockers);
router.get('/risks', FiscalProductionCorporateGovernanceArchiveController.getRisks);
router.post('/validate', FiscalProductionCorporateGovernanceArchiveController.validate);
router.post('/evaluate', FiscalProductionCorporateGovernanceArchiveController.evaluate);
router.post('/simulate-decision', FiscalProductionCorporateGovernanceArchiveController.simulateDecision);
router.get('/report', FiscalProductionCorporateGovernanceArchiveController.getReport);
router.get('/audit', FiscalProductionCorporateGovernanceArchiveController.getAudit);
router.get('/health', FiscalProductionCorporateGovernanceArchiveController.getHealth);

export const fiscalProductionCorporateGovernanceArchiveRoutes = router;
