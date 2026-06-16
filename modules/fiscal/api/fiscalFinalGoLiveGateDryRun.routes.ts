import { Router, Request, Response, NextFunction } from 'express';
import { FiscalFinalGoLiveGateDryRunController } from './FiscalFinalGoLiveGateDryRunController';
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

router.get('/policy', FiscalFinalGoLiveGateDryRunController.getPolicy);
router.get('/gate-eligibility', FiscalFinalGoLiveGateDryRunController.getGateEligibility);
router.get('/mock-activation-runbook', FiscalFinalGoLiveGateDryRunController.getMockActivationRunbook);
router.get('/gate-unlock-simulation', FiscalFinalGoLiveGateDryRunController.getGateUnlockSimulation);
router.get('/traffic-switch-simulation', FiscalFinalGoLiveGateDryRunController.getTrafficSwitchSimulation);
router.get('/rollback-simulation', FiscalFinalGoLiveGateDryRunController.getRollbackSimulation);
router.get('/killswitch-simulation', FiscalFinalGoLiveGateDryRunController.getKillSwitchSimulation);
router.get('/decision-checkpoints', FiscalFinalGoLiveGateDryRunController.getDecisionCheckpoints);
router.get('/blockers', FiscalFinalGoLiveGateDryRunController.getBlockers);
router.get('/risks', FiscalFinalGoLiveGateDryRunController.getRisks);
router.post('/validate', FiscalFinalGoLiveGateDryRunController.validate);
router.post('/evaluate', FiscalFinalGoLiveGateDryRunController.evaluate);
router.post('/simulate-decision', FiscalFinalGoLiveGateDryRunController.simulateDecision);
router.get('/report', FiscalFinalGoLiveGateDryRunController.getReport);
router.get('/audit', FiscalFinalGoLiveGateDryRunController.getAudit);
router.get('/health', FiscalFinalGoLiveGateDryRunController.getHealth);

export default router;
