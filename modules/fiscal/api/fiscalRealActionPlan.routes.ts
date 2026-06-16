import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealActionPlanController } from './FiscalRealActionPlanController';
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

router.get('/policy', FiscalRealActionPlanController.getPolicy);
router.get('/payload-template', FiscalRealActionPlanController.getPayloadTemplate);
router.get('/locked-catalog', FiscalRealActionPlanController.getLockedCatalog);
router.get('/forbidden-commands', FiscalRealActionPlanController.getForbiddenCommands);
router.get('/blockers', FiscalRealActionPlanController.getBlockers);
router.get('/risks', FiscalRealActionPlanController.getRisks);
router.post('/build-payload', FiscalRealActionPlanController.buildPayload);
router.post('/evaluate', FiscalRealActionPlanController.evaluate);
router.post('/simulate-decision', FiscalRealActionPlanController.simulateDecision);
router.get('/report', FiscalRealActionPlanController.getReport);
router.get('/audit', FiscalRealActionPlanController.getAudit);
router.get('/health', FiscalRealActionPlanController.getHealth);

export { router as fiscalRealActionPlanRoutes };
