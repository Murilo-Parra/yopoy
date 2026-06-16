import { Router } from 'express';
import { FiscalProductionDormantStateDriftVerificationController } from './FiscalProductionDormantStateDriftVerificationController';

const router = Router();

// Middleware to mock admin authentication and authorization
router.use((req, res, next) => {
  // In a real application, proper JWT and RBAC handling would take place here
  (req as any).user = { id: 'admin-evaluator', role: 'Master Admin' };
  next();
});

router.get('/policy', FiscalProductionDormantStateDriftVerificationController.getPolicy);
router.get('/drift-verification-blueprint', FiscalProductionDormantStateDriftVerificationController.getDriftVerificationBlueprint);
router.get('/no-resume-evidence-blueprint', FiscalProductionDormantStateDriftVerificationController.getNoResumeEvidenceBlueprint);
router.get('/reentry-invariant-audit-matrix', FiscalProductionDormantStateDriftVerificationController.getReentryInvariantAuditMatrix);
router.get('/authority-drift-matrix', FiscalProductionDormantStateDriftVerificationController.getAuthorityDriftMatrix);
router.get('/activation-drift-matrix', FiscalProductionDormantStateDriftVerificationController.getActivationDriftMatrix);
router.get('/routing-drift-matrix', FiscalProductionDormantStateDriftVerificationController.getRoutingDriftMatrix);
router.get('/runtime-drift-plan', FiscalProductionDormantStateDriftVerificationController.getRuntimeDriftPlan);
router.get('/database-drift-matrix', FiscalProductionDormantStateDriftVerificationController.getDatabaseDriftMatrix);
router.get('/external-integration-drift-plan', FiscalProductionDormantStateDriftVerificationController.getExternalIntegrationDriftPlan);
router.get('/sensitive-data-drift-matrix', FiscalProductionDormantStateDriftVerificationController.getSensitiveDataDriftMatrix);
router.get('/flag-invariant-verification-matrix', FiscalProductionDormantStateDriftVerificationController.getFlagInvariantVerificationMatrix);
router.get('/policy-invariant-verification-matrix', FiscalProductionDormantStateDriftVerificationController.getPolicyInvariantVerificationMatrix);
router.get('/dependency-invariant-verification-matrix', FiscalProductionDormantStateDriftVerificationController.getDependencyInvariantVerificationMatrix);
router.get('/no-real-dormant-state-drift-evidence', FiscalProductionDormantStateDriftVerificationController.getNoRealDormantStateDriftEvidence);
router.get('/no-real-resume-evidence', FiscalProductionDormantStateDriftVerificationController.getNoRealResumeEvidence);
router.get('/no-real-reentry-invariant-break-evidence', FiscalProductionDormantStateDriftVerificationController.getNoRealReentryInvariantBreakEvidence);
router.get('/dependency-matrix', FiscalProductionDormantStateDriftVerificationController.getDependencyMatrix);
router.get('/blockers', FiscalProductionDormantStateDriftVerificationController.getBlockers);
router.get('/risks', FiscalProductionDormantStateDriftVerificationController.getRisks);
router.post('/validate', FiscalProductionDormantStateDriftVerificationController.validate);
router.post('/evaluate', FiscalProductionDormantStateDriftVerificationController.evaluate);
router.post('/simulate-decision', FiscalProductionDormantStateDriftVerificationController.simulateDecision);
router.get('/report', FiscalProductionDormantStateDriftVerificationController.getReport);
router.get('/audit', FiscalProductionDormantStateDriftVerificationController.getAudit);
router.get('/health', FiscalProductionDormantStateDriftVerificationController.getHealth);

export default router;
