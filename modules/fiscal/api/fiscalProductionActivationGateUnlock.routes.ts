import { Router } from 'express';
import { FiscalProductionActivationGateUnlockController } from './FiscalProductionActivationGateUnlockController';

const router = Router();

// Middleware de autenticação mockado para simular exigência
router.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer master-admin-token') {
        const header = req.headers.authorization || '';
        if (!header.includes('master-admin-token')) {
             if (!(req as any).session?.is_admin && !(req as any).user?.is_admin) {
                 return res.status(401).json({ error: 'Unauthorized. Master Admin required.' });
             } 
        }
    }
    next();
});

router.get('/policy', FiscalProductionActivationGateUnlockController.getPolicy);
router.get('/gate-unlock-simulation', FiscalProductionActivationGateUnlockController.getGateUnlockSimulation);
router.get('/authorization-token-no-issue-plan', FiscalProductionActivationGateUnlockController.getAuthorizationTokenNoIssuePlan);
router.get('/authorization-grant-no-op-plan', FiscalProductionActivationGateUnlockController.getAuthorizationGrantNoOpPlan);
router.get('/gate-unlock-sequence-no-op-matrix', FiscalProductionActivationGateUnlockController.getGateUnlockSequenceNoOpMatrix);
router.get('/v2-activation-block-matrix', FiscalProductionActivationGateUnlockController.getV2ActivationBlockMatrix);
router.get('/legacy-continuity-during-activation-plan', FiscalProductionActivationGateUnlockController.getLegacyContinuityDuringActivationPlan);
router.get('/traffic-mutation-no-op-matrix', FiscalProductionActivationGateUnlockController.getTrafficMutationNoOpMatrix);
router.get('/runtime-activation-no-op-plan', FiscalProductionActivationGateUnlockController.getRuntimeActivationNoOpPlan);
router.get('/data-activation-no-op-plan', FiscalProductionActivationGateUnlockController.getDataActivationNoOpPlan);
router.get('/external-integration-no-op-plan', FiscalProductionActivationGateUnlockController.getExternalIntegrationNoOpPlan);
router.get('/gate-unlock-no-real-execution-evidence', FiscalProductionActivationGateUnlockController.getGateUnlockNoRealExecutionEvidence);
router.get('/dependency-matrix', FiscalProductionActivationGateUnlockController.getDependencyMatrix);
router.get('/blockers', FiscalProductionActivationGateUnlockController.getBlockers);
router.get('/risks', FiscalProductionActivationGateUnlockController.getRisks);
router.post('/validate', FiscalProductionActivationGateUnlockController.validate);
router.post('/evaluate', FiscalProductionActivationGateUnlockController.evaluate);
router.post('/simulate-decision', FiscalProductionActivationGateUnlockController.simulateDecision);
router.get('/report', FiscalProductionActivationGateUnlockController.getReport);
router.get('/audit', FiscalProductionActivationGateUnlockController.getAudit);
router.get('/health', FiscalProductionActivationGateUnlockController.getHealth);

export default router;
