import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealExecutionPreparationClosureController } from './FiscalRealExecutionPreparationClosureController';
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

router.get('/inventory', FiscalRealExecutionPreparationClosureController.getInventory);
router.get('/final-checklist', FiscalRealExecutionPreparationClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRealExecutionPreparationClosureController.getEvidencePackage);
router.get('/blockers', FiscalRealExecutionPreparationClosureController.getBlockers);
router.get('/risks', FiscalRealExecutionPreparationClosureController.getRisks);
router.get('/handoff', FiscalRealExecutionPreparationClosureController.getHandoff);
router.get('/report', FiscalRealExecutionPreparationClosureController.getReport);
router.get('/audit', FiscalRealExecutionPreparationClosureController.getAudit);
router.get('/health', FiscalRealExecutionPreparationClosureController.getHealth);

export { router as fiscalRealExecutionPreparationClosureRoutes };
