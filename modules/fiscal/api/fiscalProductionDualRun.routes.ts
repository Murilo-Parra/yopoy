import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionDualRunController } from './FiscalProductionDualRunController';
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

router.get('/policy', FiscalProductionDualRunController.getPolicy);
router.get('/dual-run-plan', FiscalProductionDualRunController.getDualRunPlan);
router.get('/telemetry-readiness', FiscalProductionDualRunController.getTelemetryReadiness);
router.get('/legacy-vs-v2-comparison', FiscalProductionDualRunController.getLegacyVsV2Comparison);
router.get('/reversible-activation-plan', FiscalProductionDualRunController.getReversibleActivationPlan);
router.get('/observability-matrix', FiscalProductionDualRunController.getObservabilityMatrix);
router.get('/decision-checkpoints', FiscalProductionDualRunController.getDecisionCheckpoints);
router.get('/rollback-criteria', FiscalProductionDualRunController.getRollbackCriteria);
router.get('/blockers', FiscalProductionDualRunController.getBlockers);
router.get('/risks', FiscalProductionDualRunController.getRisks);
router.post('/validate', FiscalProductionDualRunController.validate);
router.post('/evaluate', FiscalProductionDualRunController.evaluate);
router.post('/simulate-decision', FiscalProductionDualRunController.simulateDecision);
router.get('/report', FiscalProductionDualRunController.getReport);
router.get('/audit', FiscalProductionDualRunController.getAudit);
router.get('/health', FiscalProductionDualRunController.getHealth);

export default router;
