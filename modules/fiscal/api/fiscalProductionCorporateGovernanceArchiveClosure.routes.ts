import { Router } from 'express';
import { FiscalProductionCorporateGovernanceArchiveClosureController } from './FiscalProductionCorporateGovernanceArchiveClosureController';

const router = Router();

router.get('/policy', FiscalProductionCorporateGovernanceArchiveClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionCorporateGovernanceArchiveClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionCorporateGovernanceArchiveClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionCorporateGovernanceArchiveClosureController.getEvidencePackage);
router.get('/no-record-handoff', FiscalProductionCorporateGovernanceArchiveClosureController.getNoRecordHandoff);
router.get('/no-notification-handoff', FiscalProductionCorporateGovernanceArchiveClosureController.getNoNotificationHandoff);
router.get('/no-legal-effect-handoff', FiscalProductionCorporateGovernanceArchiveClosureController.getNoLegalEffectHandoff);
router.get('/post-closure-roadmap', FiscalProductionCorporateGovernanceArchiveClosureController.getPostClosureRoadmap);
router.get('/dependency-matrix', FiscalProductionCorporateGovernanceArchiveClosureController.getDependencyMatrix);
router.get('/final-blockers', FiscalProductionCorporateGovernanceArchiveClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionCorporateGovernanceArchiveClosureController.getFinalRisks);
router.post('/validate', FiscalProductionCorporateGovernanceArchiveClosureController.validate);
router.post('/evaluate', FiscalProductionCorporateGovernanceArchiveClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionCorporateGovernanceArchiveClosureController.simulateDecision);
router.get('/report', FiscalProductionCorporateGovernanceArchiveClosureController.getReport);
router.get('/audit', FiscalProductionCorporateGovernanceArchiveClosureController.getAudit);
router.get('/health', FiscalProductionCorporateGovernanceArchiveClosureController.getHealth);

export const fiscalProductionCorporateGovernanceArchiveClosureRoutes = router;
