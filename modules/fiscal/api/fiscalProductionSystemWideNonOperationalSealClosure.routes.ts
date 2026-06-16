import { Router } from 'express';
import { FiscalProductionSystemWideNonOperationalSealClosureController } from './FiscalProductionSystemWideNonOperationalSealClosureController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionSystemWideNonOperationalSealClosureController.getPolicy);
router.get('/closure-inventory', FiscalProductionSystemWideNonOperationalSealClosureController.getClosureInventory);
router.get('/final-checklist', FiscalProductionSystemWideNonOperationalSealClosureController.getFinalChecklist);
router.get('/no-authority-evidence-package', FiscalProductionSystemWideNonOperationalSealClosureController.getNoAuthorityEvidencePackage);
router.get('/no-activation-evidence-package', FiscalProductionSystemWideNonOperationalSealClosureController.getNoActivationEvidencePackage);
router.get('/no-operational-handoff', FiscalProductionSystemWideNonOperationalSealClosureController.getNoOperationalHandoff);
router.get('/no-authority-handoff', FiscalProductionSystemWideNonOperationalSealClosureController.getNoAuthorityHandoff);
router.get('/no-activation-handoff', FiscalProductionSystemWideNonOperationalSealClosureController.getNoActivationHandoff);
router.get('/post-closure-roadmap', FiscalProductionSystemWideNonOperationalSealClosureController.getPostClosureRoadmap);
router.get('/dependency-matrix', FiscalProductionSystemWideNonOperationalSealClosureController.getDependencyMatrix);
router.get('/final-blockers', FiscalProductionSystemWideNonOperationalSealClosureController.getFinalBlockers);
router.get('/final-risks', FiscalProductionSystemWideNonOperationalSealClosureController.getFinalRisks);
router.post('/validate', FiscalProductionSystemWideNonOperationalSealClosureController.validate);
router.post('/evaluate', FiscalProductionSystemWideNonOperationalSealClosureController.evaluate);
router.post('/simulate-decision', FiscalProductionSystemWideNonOperationalSealClosureController.simulateDecision);
router.get('/report', FiscalProductionSystemWideNonOperationalSealClosureController.getReport);
router.get('/audit', FiscalProductionSystemWideNonOperationalSealClosureController.getAudit);
router.get('/health', FiscalProductionSystemWideNonOperationalSealClosureController.getHealth);

export default router;
