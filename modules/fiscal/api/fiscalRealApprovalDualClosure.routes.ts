import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalDualClosureController } from './FiscalRealApprovalDualClosureController';
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

router.get('/policy', FiscalRealApprovalDualClosureController.getPolicy);
router.get('/conclusion-simulation', FiscalRealApprovalDualClosureController.getConclusionSimulation);
router.get('/sod-review', FiscalRealApprovalDualClosureController.getSodReview);
router.get('/inventory', FiscalRealApprovalDualClosureController.getInventory);
router.get('/final-checklist', FiscalRealApprovalDualClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRealApprovalDualClosureController.getEvidencePackage);
router.get('/blockers', FiscalRealApprovalDualClosureController.getBlockers);
router.get('/risks', FiscalRealApprovalDualClosureController.getRisks);
router.post('/validate', FiscalRealApprovalDualClosureController.validate);
router.post('/evaluate', FiscalRealApprovalDualClosureController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalDualClosureController.simulateDecision);
router.get('/report', FiscalRealApprovalDualClosureController.getReport);
router.get('/audit', FiscalRealApprovalDualClosureController.getAudit);
router.get('/health', FiscalRealApprovalDualClosureController.getHealth);

export default router;
