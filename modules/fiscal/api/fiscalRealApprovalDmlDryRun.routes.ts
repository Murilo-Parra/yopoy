import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalDmlDryRunController } from './FiscalRealApprovalDmlDryRunController';
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

router.get('/policy', FiscalRealApprovalDmlDryRunController.getPolicy);
router.get('/seed-plan', FiscalRealApprovalDmlDryRunController.getSeedPlan);
router.get('/insert-simulation', FiscalRealApprovalDmlDryRunController.getInsertSimulation);
router.get('/update-simulation', FiscalRealApprovalDmlDryRunController.getUpdateSimulation);
router.get('/delete-simulation', FiscalRealApprovalDmlDryRunController.getDeleteSimulation);
router.get('/commit-plan', FiscalRealApprovalDmlDryRunController.getCommitPlan);
router.get('/mutation-diff', FiscalRealApprovalDmlDryRunController.getMutationDiff);
router.get('/blockers', FiscalRealApprovalDmlDryRunController.getBlockers);
router.get('/risks', FiscalRealApprovalDmlDryRunController.getRisks);
router.post('/validate', FiscalRealApprovalDmlDryRunController.validate);
router.post('/evaluate', FiscalRealApprovalDmlDryRunController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalDmlDryRunController.simulateDecision);
router.get('/report', FiscalRealApprovalDmlDryRunController.getReport);
router.get('/audit', FiscalRealApprovalDmlDryRunController.getAudit);
router.get('/health', FiscalRealApprovalDmlDryRunController.getHealth);

export { router as fiscalRealApprovalDmlDryRunRoutes };
