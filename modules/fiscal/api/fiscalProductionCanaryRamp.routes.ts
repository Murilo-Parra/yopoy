import { Router } from 'express';
import { FiscalProductionCanaryRampController } from './FiscalProductionCanaryRampController';

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

router.get('/policy', FiscalProductionCanaryRampController.getPolicy);
router.get('/canary-ramp-simulation', FiscalProductionCanaryRampController.getCanaryRampSimulation);
router.get('/traffic-promotion-no-op-plan', FiscalProductionCanaryRampController.getTrafficPromotionNoOpPlan);
router.get('/traffic-slice-simulation-matrix', FiscalProductionCanaryRampController.getTrafficSliceSimulationMatrix);
router.get('/canary-percentage-no-op-matrix', FiscalProductionCanaryRampController.getCanaryPercentageNoOpMatrix);
router.get('/reversible-traffic-promotion-plan', FiscalProductionCanaryRampController.getReversibleTrafficPromotionPlan);
router.get('/legacy-continuity-during-canary-plan', FiscalProductionCanaryRampController.getLegacyContinuityDuringCanaryPlan);
router.get('/canary-abort-reversion-matrix', FiscalProductionCanaryRampController.getCanaryAbortReversionMatrix);
router.get('/no-real-traffic-promotion-evidence', FiscalProductionCanaryRampController.getNoRealTrafficPromotionEvidence);
router.get('/no-real-canary-activation-evidence', FiscalProductionCanaryRampController.getNoRealCanaryActivationEvidence);
router.get('/dependency-matrix', FiscalProductionCanaryRampController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCanaryRampController.getBlockers);
router.get('/risks', FiscalProductionCanaryRampController.getRisks);
router.post('/validate', FiscalProductionCanaryRampController.validate);
router.post('/evaluate', FiscalProductionCanaryRampController.evaluate);
router.post('/simulate-decision', FiscalProductionCanaryRampController.simulateDecision);
router.get('/report', FiscalProductionCanaryRampController.getReport);
router.get('/audit', FiscalProductionCanaryRampController.getAudit);
router.get('/health', FiscalProductionCanaryRampController.getHealth);

export default router;
