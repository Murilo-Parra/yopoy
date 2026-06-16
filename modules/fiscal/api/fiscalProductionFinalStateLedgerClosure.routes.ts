import { Router } from 'express';
import { FiscalProductionFinalStateLedgerClosureController } from './FiscalProductionFinalStateLedgerClosureController';

const router = Router();

router.get('/policy', FiscalProductionFinalStateLedgerClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionFinalStateLedgerClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionFinalStateLedgerClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionFinalStateLedgerClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionFinalStateLedgerClosureController.getNoActivationHandoff);
router.get('/no-persistence-handoff', FiscalProductionFinalStateLedgerClosureController.getNoPersistenceHandoff);
router.get('/no-legal-effect-handoff', FiscalProductionFinalStateLedgerClosureController.getNoLegalEffectHandoff);
router.get('/post-closure-roadmap', FiscalProductionFinalStateLedgerClosureController.getPostClosureRoadmap);
router.get('/dependency-matrix', FiscalProductionFinalStateLedgerClosureController.getDependencyMatrix);
router.get('/final-blockers', FiscalProductionFinalStateLedgerClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionFinalStateLedgerClosureController.getFinalRisks);
router.post('/validate', FiscalProductionFinalStateLedgerClosureController.validate);
router.post('/evaluate', FiscalProductionFinalStateLedgerClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalStateLedgerClosureController.simulateDecision);
router.get('/report', FiscalProductionFinalStateLedgerClosureController.getReport);
router.get('/audit', FiscalProductionFinalStateLedgerClosureController.getAudit);
router.get('/health', FiscalProductionFinalStateLedgerClosureController.getHealth);

export const fiscalProductionFinalStateLedgerClosureRoutes = router;
