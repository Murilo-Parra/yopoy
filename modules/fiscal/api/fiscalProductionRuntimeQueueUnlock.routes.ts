import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionRuntimeQueueUnlockController } from './FiscalProductionRuntimeQueueUnlockController';
import { requireFiscalAuth } from './helpers';

const router = Router();

function requireAdminRole(req: Request, res: Response, next: NextFunction) {
  const session = (req as any).session;
  const user = (req as any).user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
    return;
  }
  next();
}

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalProductionRuntimeQueueUnlockController.getPolicy);
router.get('/queue-unlock-simulation', FiscalProductionRuntimeQueueUnlockController.getQueueUnlockSimulation);
router.get('/queue-state-simulation', FiscalProductionRuntimeQueueUnlockController.getQueueStateSimulation);
router.get('/dispatch-eligibility-matrix', FiscalProductionRuntimeQueueUnlockController.getDispatchEligibilityMatrix);
router.get('/worker-dispatch-no-op-plan', FiscalProductionRuntimeQueueUnlockController.getWorkerDispatchNoOpPlan);
router.get('/command-dispatch-boundary', FiscalProductionRuntimeQueueUnlockController.getCommandDispatchBoundary);
router.get('/dispatch-safety-checklist', FiscalProductionRuntimeQueueUnlockController.getDispatchSafetyChecklist);
router.get('/no-job-enqueue-evidence', FiscalProductionRuntimeQueueUnlockController.getNoJobEnqueueEvidence);
router.get('/dependency-matrix', FiscalProductionRuntimeQueueUnlockController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRuntimeQueueUnlockController.getBlockers);
router.get('/risks', FiscalProductionRuntimeQueueUnlockController.getRisks);
router.post('/validate', FiscalProductionRuntimeQueueUnlockController.validate);
router.post('/evaluate', FiscalProductionRuntimeQueueUnlockController.evaluate);
router.post('/simulate-decision', FiscalProductionRuntimeQueueUnlockController.simulateDecision);
router.get('/report', FiscalProductionRuntimeQueueUnlockController.getReport);
router.get('/audit', FiscalProductionRuntimeQueueUnlockController.getAudit);
router.get('/health', FiscalProductionRuntimeQueueUnlockController.getHealth);

export default router;
