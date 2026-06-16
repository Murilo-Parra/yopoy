import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionRuntimeStepDryRunController } from './FiscalProductionRuntimeStepDryRunController';
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

router.get('/policy', FiscalProductionRuntimeStepDryRunController.getPolicy);
router.get('/step-manifest', FiscalProductionRuntimeStepDryRunController.getStepManifest);
router.get('/command-manifest', FiscalProductionRuntimeStepDryRunController.getCommandManifest);
router.get('/sanitized-command-manifest', FiscalProductionRuntimeStepDryRunController.getSanitizedCommandManifest);
router.get('/step-sequence-plan', FiscalProductionRuntimeStepDryRunController.getStepSequencePlan);
router.get('/queue-no-op-plan', FiscalProductionRuntimeStepDryRunController.getQueueNoOpPlan);
router.get('/worker-no-op-contract', FiscalProductionRuntimeStepDryRunController.getWorkerNoOpContract);
router.get('/step-rollback-plan', FiscalProductionRuntimeStepDryRunController.getStepRollbackPlan);
router.get('/circuit-breaker-plan', FiscalProductionRuntimeStepDryRunController.getCircuitBreakerPlan);
router.get('/dependency-matrix', FiscalProductionRuntimeStepDryRunController.getDependencyMatrix);
router.get('/blockers', FiscalProductionRuntimeStepDryRunController.getBlockers);
router.get('/risks', FiscalProductionRuntimeStepDryRunController.getRisks);
router.post('/validate', FiscalProductionRuntimeStepDryRunController.validate);
router.post('/evaluate', FiscalProductionRuntimeStepDryRunController.evaluate);
router.post('/simulate-decision', FiscalProductionRuntimeStepDryRunController.simulateDecision);
router.get('/report', FiscalProductionRuntimeStepDryRunController.getReport);
router.get('/audit', FiscalProductionRuntimeStepDryRunController.getAudit);
router.get('/health', FiscalProductionRuntimeStepDryRunController.getHealth);

export default router;
