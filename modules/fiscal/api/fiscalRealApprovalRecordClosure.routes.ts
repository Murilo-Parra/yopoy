import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalRecordClosureController } from './FiscalRealApprovalRecordClosureController';
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

router.get('/inventory', FiscalRealApprovalRecordClosureController.getInventory);
router.get('/final-checklist', FiscalRealApprovalRecordClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRealApprovalRecordClosureController.getEvidencePackage);
router.get('/blockers', FiscalRealApprovalRecordClosureController.getBlockers);
router.get('/risks', FiscalRealApprovalRecordClosureController.getRisks);
router.get('/handoff', FiscalRealApprovalRecordClosureController.getHandoff);
router.get('/report', FiscalRealApprovalRecordClosureController.getReport);
router.get('/audit', FiscalRealApprovalRecordClosureController.getAudit);
router.get('/health', FiscalRealApprovalRecordClosureController.getHealth);

export { router as fiscalRealApprovalRecordClosureRoutes };
