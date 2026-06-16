import { Router, Request, Response, NextFunction } from 'express';
import { FiscalProductionCutoverApprovalController } from './FiscalProductionCutoverApprovalController';
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

router.get('/policy', FiscalProductionCutoverApprovalController.getPolicy);
router.get('/cutover-readiness-plan', FiscalProductionCutoverApprovalController.getCutoverReadinessPlan);
router.get('/rollback-governance-plan', FiscalProductionCutoverApprovalController.getRollbackGovernancePlan);
router.get('/go-nogo-approval-matrix', FiscalProductionCutoverApprovalController.getGoNoGoApprovalMatrix);
router.get('/change-window-readiness', FiscalProductionCutoverApprovalController.getChangeWindowReadiness);
router.get('/operational-freeze-plan', FiscalProductionCutoverApprovalController.getOperationalFreezePlan);
router.get('/cutover-abort-criteria', FiscalProductionCutoverApprovalController.getCutoverAbortCriteria);
router.get('/dependency-matrix', FiscalProductionCutoverApprovalController.getDependencyMatrix);
router.get('/blockers', FiscalProductionCutoverApprovalController.getBlockers);
router.get('/risks', FiscalProductionCutoverApprovalController.getRisks);
router.post('/validate', FiscalProductionCutoverApprovalController.validate);
router.post('/evaluate', FiscalProductionCutoverApprovalController.evaluate);
router.post('/simulate-decision', FiscalProductionCutoverApprovalController.simulateDecision);
router.get('/report', FiscalProductionCutoverApprovalController.getReport);
router.get('/audit', FiscalProductionCutoverApprovalController.getAudit);
router.get('/health', FiscalProductionCutoverApprovalController.getHealth);

export default router;
