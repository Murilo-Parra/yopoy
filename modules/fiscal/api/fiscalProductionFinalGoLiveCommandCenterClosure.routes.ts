import { Router } from 'express';
import { FiscalProductionFinalGoLiveCommandCenterClosureController } from './FiscalProductionFinalGoLiveCommandCenterClosureController';

const router = Router();

router.get('/policy', FiscalProductionFinalGoLiveCommandCenterClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionFinalGoLiveCommandCenterClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionFinalGoLiveCommandCenterClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalProductionFinalGoLiveCommandCenterClosureController.getEvidencePackage);
router.get('/no-activation-handoff', FiscalProductionFinalGoLiveCommandCenterClosureController.getNoActivationHandoff);
router.get('/no-authority-handoff', FiscalProductionFinalGoLiveCommandCenterClosureController.getNoAuthorityHandoff);
router.get('/post-closure-roadmap', FiscalProductionFinalGoLiveCommandCenterClosureController.getPostClosureRoadmap);
router.get('/dependency-matrix', FiscalProductionFinalGoLiveCommandCenterClosureController.getDependencyMatrix);
router.get('/final-blockers', FiscalProductionFinalGoLiveCommandCenterClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionFinalGoLiveCommandCenterClosureController.getFinalRisks);
router.post('/validate', FiscalProductionFinalGoLiveCommandCenterClosureController.validate);
router.post('/evaluate', FiscalProductionFinalGoLiveCommandCenterClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionFinalGoLiveCommandCenterClosureController.simulateDecision);
router.get('/report', FiscalProductionFinalGoLiveCommandCenterClosureController.getReport);
router.get('/audit', FiscalProductionFinalGoLiveCommandCenterClosureController.getAudit);
router.get('/health', FiscalProductionFinalGoLiveCommandCenterClosureController.getHealth);

export const fiscalProductionFinalGoLiveCommandCenterClosureRoutes = router;
