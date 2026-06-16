import { Router } from 'express';
import { FiscalProductionReentryAttemptDenialController } from './FiscalProductionReentryAttemptDenialController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionReentryAttemptDenialController.getPolicy);
router.get('/reentry-attempt-denial-blueprint', FiscalProductionReentryAttemptDenialController.getReentryAttemptDenialBlueprint);
router.get('/resumption-lock-contract', FiscalProductionReentryAttemptDenialController.getResumptionLockContract);
router.get('/dormant-state-continuity-matrix', FiscalProductionReentryAttemptDenialController.getDormantStateContinuityMatrix);
router.get('/authority-reentry-denial-matrix', FiscalProductionReentryAttemptDenialController.getAuthorityReentryDenialMatrix);
router.get('/activation-reentry-denial-matrix', FiscalProductionReentryAttemptDenialController.getActivationReentryDenialMatrix);
router.get('/routing-reentry-denial-matrix', FiscalProductionReentryAttemptDenialController.getRoutingReentryDenialMatrix);
router.get('/runtime-reentry-denial-plan', FiscalProductionReentryAttemptDenialController.getRuntimeReentryDenialPlan);
router.get('/database-reentry-denial-matrix', FiscalProductionReentryAttemptDenialController.getDatabaseReentryDenialMatrix);
router.get('/external-integration-reentry-denial-plan', FiscalProductionReentryAttemptDenialController.getExternalIntegrationReentryDenialPlan);
router.get('/sensitive-data-reentry-denial-matrix', FiscalProductionReentryAttemptDenialController.getSensitiveDataReentryDenialMatrix);
router.get('/gate-unlock-reentry-denial-plan', FiscalProductionReentryAttemptDenialController.getGateUnlockReentryDenialPlan);
router.get('/authorization-token-reentry-denial-matrix', FiscalProductionReentryAttemptDenialController.getAuthorizationTokenReentryDenialMatrix);
router.get('/production-v2-reentry-blocked-evidence', FiscalProductionReentryAttemptDenialController.getProductionV2ReentryBlockedEvidence);
router.get('/no-real-reentry-attempt-evidence', FiscalProductionReentryAttemptDenialController.getNoRealReentryAttemptEvidence);
router.get('/no-real-resumption-unlock-evidence', FiscalProductionReentryAttemptDenialController.getNoRealResumptionUnlockEvidence);
router.get('/no-real-reactivation-evidence', FiscalProductionReentryAttemptDenialController.getNoRealReactivationEvidence);
router.get('/dependency-matrix', FiscalProductionReentryAttemptDenialController.getDependencyMatrix);
router.get('/blockers', FiscalProductionReentryAttemptDenialController.getBlockers);
router.get('/risks', FiscalProductionReentryAttemptDenialController.getRisks);
router.post('/validate', FiscalProductionReentryAttemptDenialController.validate);
router.post('/evaluate', FiscalProductionReentryAttemptDenialController.evaluate);
router.post('/simulate-decision', FiscalProductionReentryAttemptDenialController.simulateDecision);
router.get('/report', FiscalProductionReentryAttemptDenialController.getReport);
router.get('/audit', FiscalProductionReentryAttemptDenialController.getAudit);
router.get('/health', FiscalProductionReentryAttemptDenialController.getHealth);

export default router;
