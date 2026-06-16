import { Router } from 'express';
import { FiscalProductionExecutionCutoverDenialController } from './FiscalProductionExecutionCutoverDenialController';

const router = Router();

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

router.get('/policy', FiscalProductionExecutionCutoverDenialController.getPolicy);
router.get('/physical-cutover-attempt-denial-matrix', FiscalProductionExecutionCutoverDenialController.getPhysicalCutoverAttemptDenialMatrix);
router.get('/emergency-runtime-containment-no-op-plan', FiscalProductionExecutionCutoverDenialController.getEmergencyRuntimeContainmentNoOpPlan);
router.get('/physical-execution-attempt-block-matrix', FiscalProductionExecutionCutoverDenialController.getPhysicalExecutionAttemptBlockMatrix);
router.get('/traffic-promotion-denial-matrix', FiscalProductionExecutionCutoverDenialController.getTrafficPromotionDenialMatrix);
router.get('/legacy-mandatory-continuity-matrix', FiscalProductionExecutionCutoverDenialController.getLegacyMandatoryContinuityMatrix);
router.get('/cutover-abort-no-op-matrix', FiscalProductionExecutionCutoverDenialController.getCutoverAbortNoOpMatrix);
router.get('/rollback-no-op-matrix', FiscalProductionExecutionCutoverDenialController.getRollbackNoOpMatrix);
router.get('/no-physical-cutover-evidence', FiscalProductionExecutionCutoverDenialController.getNoPhysicalCutoverEvidence);
router.get('/no-real-kill-switch-evidence', FiscalProductionExecutionCutoverDenialController.getNoRealKillSwitchEvidence);
router.get('/no-traffic-mutation-evidence', FiscalProductionExecutionCutoverDenialController.getNoTrafficMutationEvidence);
router.get('/dependency-matrix', FiscalProductionExecutionCutoverDenialController.getDependencyMatrix);
router.get('/blockers', FiscalProductionExecutionCutoverDenialController.getBlockers);
router.get('/risks', FiscalProductionExecutionCutoverDenialController.getRisks);
router.post('/validate', FiscalProductionExecutionCutoverDenialController.validate);
router.post('/evaluate', FiscalProductionExecutionCutoverDenialController.evaluate);
router.post('/simulate-decision', FiscalProductionExecutionCutoverDenialController.simulateDecision);
router.get('/report', FiscalProductionExecutionCutoverDenialController.getReport);
router.get('/audit', FiscalProductionExecutionCutoverDenialController.getAudit);
router.get('/health', FiscalProductionExecutionCutoverDenialController.getHealth);

export default router;
