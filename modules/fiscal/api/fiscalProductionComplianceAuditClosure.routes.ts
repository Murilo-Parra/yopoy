import { Router } from 'express';
import { FiscalProductionComplianceAuditClosureController } from './FiscalProductionComplianceAuditClosureController';

const router = Router();

router.get('/policy', FiscalProductionComplianceAuditClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionComplianceAuditClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionComplianceAuditClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionComplianceAuditClosureController.getEvidencePackage);
router.get('/no-submission-handoff', FiscalProductionComplianceAuditClosureController.getNoSubmissionHandoff);
router.get('/post-closure-roadmap', FiscalProductionComplianceAuditClosureController.getPostClosureRoadmap);
router.get('/final-blockers', FiscalProductionComplianceAuditClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionComplianceAuditClosureController.getFinalRisks);
router.post('/validate', FiscalProductionComplianceAuditClosureController.validate);
router.post('/evaluate', FiscalProductionComplianceAuditClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionComplianceAuditClosureController.simulateDecision);
router.get('/report', FiscalProductionComplianceAuditClosureController.getReport);
router.get('/audit', FiscalProductionComplianceAuditClosureController.getAudit);
router.get('/health', FiscalProductionComplianceAuditClosureController.getHealth);

export const fiscalProductionComplianceAuditClosureRoutes = router;
