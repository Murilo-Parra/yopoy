import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalSchemaDryRunController } from './FiscalRealApprovalSchemaDryRunController';
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

router.get('/policy', FiscalRealApprovalSchemaDryRunController.getPolicy);
router.get('/migration-plan', FiscalRealApprovalSchemaDryRunController.getMigrationPlan);
router.get('/ddl-simulation', FiscalRealApprovalSchemaDryRunController.getDdlSimulation);
router.get('/schema-diff', FiscalRealApprovalSchemaDryRunController.getSchemaDiff);
router.get('/rls-plan', FiscalRealApprovalSchemaDryRunController.getRlsPlan);
router.get('/index-plan', FiscalRealApprovalSchemaDryRunController.getIndexPlan);
router.get('/blockers', FiscalRealApprovalSchemaDryRunController.getBlockers);
router.get('/risks', FiscalRealApprovalSchemaDryRunController.getRisks);
router.post('/validate', FiscalRealApprovalSchemaDryRunController.validate);
router.post('/evaluate', FiscalRealApprovalSchemaDryRunController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalSchemaDryRunController.simulateDecision);
router.get('/report', FiscalRealApprovalSchemaDryRunController.getReport);
router.get('/audit', FiscalRealApprovalSchemaDryRunController.getAudit);
router.get('/health', FiscalRealApprovalSchemaDryRunController.getHealth);

export { router as fiscalRealApprovalSchemaDryRunRoutes };
