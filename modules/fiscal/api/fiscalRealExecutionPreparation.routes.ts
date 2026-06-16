import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealExecutionPreparationController } from './FiscalRealExecutionPreparationController';
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

router.get('/policy', FiscalRealExecutionPreparationController.getPolicy);
router.get('/operational-envelope', FiscalRealExecutionPreparationController.getOperationalEnvelope);
router.get('/checklist', FiscalRealExecutionPreparationController.getChecklist);
router.get('/blockers', FiscalRealExecutionPreparationController.getBlockers);
router.get('/risks', FiscalRealExecutionPreparationController.getRisks);
router.post('/evaluate', FiscalRealExecutionPreparationController.evaluate);
router.post('/simulate-preparation', FiscalRealExecutionPreparationController.simulatePreparation);
router.get('/report', FiscalRealExecutionPreparationController.getReport);
router.get('/audit', FiscalRealExecutionPreparationController.getAudit);
router.get('/health', FiscalRealExecutionPreparationController.getHealth);

export { router as fiscalRealExecutionPreparationRoutes };
