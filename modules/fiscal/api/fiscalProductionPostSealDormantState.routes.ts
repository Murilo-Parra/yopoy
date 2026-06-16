import { Router } from 'express';
import { FiscalProductionPostSealDormantStateController } from './FiscalProductionPostSealDormantStateController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionPostSealDormantStateController.getPolicy);
router.get('/dormant-state-blueprint', FiscalProductionPostSealDormantStateController.getDormantStateBlueprint);
router.get('/permanent-non-resumption-contract', FiscalProductionPostSealDormantStateController.getPermanentNonResumptionContract);
router.get('/no-reentry-boundary-matrix', FiscalProductionPostSealDormantStateController.getNoReentryBoundaryMatrix);
router.get('/authority-resumption-blocked-plan', FiscalProductionPostSealDormantStateController.getAuthorityResumptionBlockedPlan);
router.get('/activation-resumption-blocked-plan', FiscalProductionPostSealDormantStateController.getActivationResumptionBlockedPlan);
router.get('/routing-resumption-blocked-matrix', FiscalProductionPostSealDormantStateController.getRoutingResumptionBlockedMatrix);
router.get('/runtime-resumption-blocked-plan', FiscalProductionPostSealDormantStateController.getRuntimeResumptionBlockedPlan);
router.get('/database-resumption-blocked-matrix', FiscalProductionPostSealDormantStateController.getDatabaseResumptionBlockedMatrix);
router.get('/external-integration-resumption-blocked-plan', FiscalProductionPostSealDormantStateController.getExternalIntegrationResumptionBlockedPlan);
router.get('/sensitive-data-resumption-blocked-matrix', FiscalProductionPostSealDormantStateController.getSensitiveDataResumptionBlockedMatrix);
router.get('/dormant-state-no-record-plan', FiscalProductionPostSealDormantStateController.getDormantStateNoRecordPlan);
router.get('/no-real-dormancy-record-evidence', FiscalProductionPostSealDormantStateController.getNoRealDormancyRecordEvidence);
router.get('/no-real-resumption-evidence', FiscalProductionPostSealDormantStateController.getNoRealResumptionEvidence);
router.get('/no-real-reentry-evidence', FiscalProductionPostSealDormantStateController.getNoRealReentryEvidence);
router.get('/dependency-matrix', FiscalProductionPostSealDormantStateController.getDependencyMatrix);
router.get('/blockers', FiscalProductionPostSealDormantStateController.getBlockers);
router.get('/risks', FiscalProductionPostSealDormantStateController.getRisks);
router.post('/validate', FiscalProductionPostSealDormantStateController.validate);
router.post('/evaluate', FiscalProductionPostSealDormantStateController.evaluate);
router.post('/simulate-decision', FiscalProductionPostSealDormantStateController.simulateDecision);
router.get('/report', FiscalProductionPostSealDormantStateController.getReport);
router.get('/audit', FiscalProductionPostSealDormantStateController.getAudit);
router.get('/health', FiscalProductionPostSealDormantStateController.getHealth);

export default router;
