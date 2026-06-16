import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionCutoverGovernanceController } from './FiscalProductionCutoverGovernanceController';
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

router.get('/policy', FiscalProductionCutoverGovernanceController.getPolicy);
router.get('/cutover-governance-blueprint', FiscalProductionCutoverGovernanceController.getCutoverGovernanceBlueprint);
router.get('/reversible-golive-no-op-contract', FiscalProductionCutoverGovernanceController.getReversibleGoLiveNoOpContract);
router.get('/cutover-window-plan', FiscalProductionCutoverGovernanceController.getCutoverWindowPlan);
router.get('/legacy-preservation-plan', FiscalProductionCutoverGovernanceController.getLegacyPreservationPlan);
router.get('/traffic-switch-no-op-plan', FiscalProductionCutoverGovernanceController.getTrafficSwitchNoOpPlan);
router.get('/reversion-path-plan', FiscalProductionCutoverGovernanceController.getReversionPathPlan);
router.get('/abort-criteria', FiscalProductionCutoverGovernanceController.getAbortCriteria);
router.get('/readiness-matrix', FiscalProductionCutoverGovernanceController.getReadinessMatrix);
router.get('/dependency-matrix', FiscalProductionCutoverGovernanceController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCutoverGovernanceController.getBlockers);
router.get('/risks', FiscalProductionCutoverGovernanceController.getRisks);
router.post('/validate', FiscalProductionCutoverGovernanceController.validate);
router.post('/evaluate', FiscalProductionCutoverGovernanceController.evaluate);
router.post('/simulate-decision', FiscalProductionCutoverGovernanceController.simulateDecision);
router.get('/report', FiscalProductionCutoverGovernanceController.getReport);
router.get('/audit', FiscalProductionCutoverGovernanceController.getAudit);
router.get('/health', FiscalProductionCutoverGovernanceController.getHealth);

export default router;
