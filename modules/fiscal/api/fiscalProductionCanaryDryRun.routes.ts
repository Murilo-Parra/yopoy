import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionCanaryDryRunController } from './FiscalProductionCanaryDryRunController';
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

// Exigir autenticação e papel administrativo
router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', FiscalProductionCanaryDryRunController.getPolicy);
router.get('/scope-catalog', FiscalProductionCanaryDryRunController.getScopeCatalog);
router.get('/tenant-eligibility', FiscalProductionCanaryDryRunController.getTenantEligibility);
router.get('/traffic-switch-plan', FiscalProductionCanaryDryRunController.getTrafficSwitchPlan);
router.get('/percentage-plan', FiscalProductionCanaryDryRunController.getPercentagePlan);
router.get('/kill-switch-readiness', FiscalProductionCanaryDryRunController.getKillSwitchReadiness);
router.get('/rollback-readiness', FiscalProductionCanaryDryRunController.getRollbackReadiness);
router.get('/blockers', FiscalProductionCanaryDryRunController.getBlockers);
router.get('/risks', FiscalProductionCanaryDryRunController.getRisks);
router.post('/validate', FiscalProductionCanaryDryRunController.validate);
router.post('/evaluate', FiscalProductionCanaryDryRunController.evaluate);
router.post('/simulate-decision', FiscalProductionCanaryDryRunController.simulateDecision);
router.get('/report', FiscalProductionCanaryDryRunController.getReport);
router.get('/audit', FiscalProductionCanaryDryRunController.getAudit);
router.get('/health', FiscalProductionCanaryDryRunController.getHealth);

export default router;
