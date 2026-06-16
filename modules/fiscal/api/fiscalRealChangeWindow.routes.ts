import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealChangeWindowController } from './FiscalRealChangeWindowController';
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

router.get('/policy', FiscalRealChangeWindowController.getPolicy);
router.get('/calendar', FiscalRealChangeWindowController.getCalendar);
router.get('/pre-execution-checklist', FiscalRealChangeWindowController.getPreExecutionChecklist);
router.get('/freeze-unfreeze', FiscalRealChangeWindowController.getFreezeUnfreeze);
router.get('/communication-plan', FiscalRealChangeWindowController.getCommunicationPlan);
router.get('/rollback-plan', FiscalRealChangeWindowController.getRollbackPlan);
router.get('/readiness-matrix', FiscalRealChangeWindowController.getReadinessMatrix);
router.get('/blockers', FiscalRealChangeWindowController.getBlockers);
router.get('/risks', FiscalRealChangeWindowController.getRisks);
router.post('/evaluate', FiscalRealChangeWindowController.evaluate);
router.post('/simulate-decision', FiscalRealChangeWindowController.simulateDecision);
router.get('/report', FiscalRealChangeWindowController.getReport);
router.get('/audit', FiscalRealChangeWindowController.getAudit);
router.get('/health', FiscalRealChangeWindowController.getHealth);

export { router as fiscalRealChangeWindowRoutes };
