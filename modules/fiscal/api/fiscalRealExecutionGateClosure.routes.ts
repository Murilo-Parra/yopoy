import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealExecutionGateClosureController } from './FiscalRealExecutionGateClosureController';
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

router.get('/inventory', FiscalRealExecutionGateClosureController.getInventory);
router.get('/final-checklist', FiscalRealExecutionGateClosureController.getFinalChecklist);
router.get('/evidence-package', FiscalRealExecutionGateClosureController.getEvidencePackage);
router.get('/blockers', FiscalRealExecutionGateClosureController.getBlockers);
router.get('/risks', FiscalRealExecutionGateClosureController.getRisks);
router.get('/handoff', FiscalRealExecutionGateClosureController.getHandoff);
router.get('/report', FiscalRealExecutionGateClosureController.getReport);
router.get('/audit', FiscalRealExecutionGateClosureController.getAudit);
router.get('/health', FiscalRealExecutionGateClosureController.getHealth);

export { router as fiscalRealExecutionGateClosureRoutes };
