import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLoadPlanningClosureController } from './FiscalLoadPlanningClosureController';
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

router.get('/inventory', FiscalLoadPlanningClosureController.getInventory);
router.get('/guardrails', FiscalLoadPlanningClosureController.getGuardrails);
router.get('/risks', FiscalLoadPlanningClosureController.getRisks);
router.get('/evidence', FiscalLoadPlanningClosureController.getEvidence);
router.get('/handoff', FiscalLoadPlanningClosureController.getHandoff);
router.get('/final-report', FiscalLoadPlanningClosureController.getFinalReport);
router.get('/audit', FiscalLoadPlanningClosureController.getAudit);
router.get('/health', FiscalLoadPlanningClosureController.getHealth);

export { router as fiscalLoadPlanningClosureRoutes };
