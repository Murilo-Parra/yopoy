import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionCanaryTrafficSwitchController } from './FiscalProductionCanaryTrafficSwitchController';
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

router.get('/policy', FiscalProductionCanaryTrafficSwitchController.getPolicy);
router.get('/canary-traffic-simulation-plan', FiscalProductionCanaryTrafficSwitchController.getCanaryTrafficSimulationPlan);
router.get('/reversible-activation-plan', FiscalProductionCanaryTrafficSwitchController.getReversibleActivationPlan);
router.get('/traffic-switch-safety-matrix', FiscalProductionCanaryTrafficSwitchController.getTrafficSwitchSafetyMatrix);
router.get('/canary-percentage-simulation', FiscalProductionCanaryTrafficSwitchController.getCanaryPercentageSimulation);
router.get('/legacy-reversion-plan', FiscalProductionCanaryTrafficSwitchController.getLegacyReversionPlan);
router.get('/canary-abort-criteria', FiscalProductionCanaryTrafficSwitchController.getCanaryAbortCriteria);
router.get('/decision-checkpoint-matrix', FiscalProductionCanaryTrafficSwitchController.getDecisionCheckpointMatrix);
router.get('/dependency-matrix', FiscalProductionCanaryTrafficSwitchController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCanaryTrafficSwitchController.getBlockers);
router.get('/risks', FiscalProductionCanaryTrafficSwitchController.getRisks);
router.post('/validate', FiscalProductionCanaryTrafficSwitchController.validate);
router.post('/evaluate', FiscalProductionCanaryTrafficSwitchController.evaluate);
router.post('/simulate-decision', FiscalProductionCanaryTrafficSwitchController.simulateDecision);
router.get('/report', FiscalProductionCanaryTrafficSwitchController.getReport);
router.get('/audit', FiscalProductionCanaryTrafficSwitchController.getAudit);
router.get('/health', FiscalProductionCanaryTrafficSwitchController.getHealth);

export default router;
