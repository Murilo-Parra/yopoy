import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalAuditSchemaDryRunController } from './FiscalLegalAuditSchemaDryRunController';
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

router.get('/policy', FiscalLegalAuditSchemaDryRunController.getPolicy);
router.get('/ledger-schema-plan', FiscalLegalAuditSchemaDryRunController.getLedgerSchemaPlan);
router.get('/ddl-simulation', FiscalLegalAuditSchemaDryRunController.getDdlSimulation);
router.get('/rls-plan', FiscalLegalAuditSchemaDryRunController.getRlsPlan);
router.get('/retention-ddl-plan', FiscalLegalAuditSchemaDryRunController.getRetentionDdlPlan);
router.get('/index-plan', FiscalLegalAuditSchemaDryRunController.getIndexPlan);
router.get('/schema-diff', FiscalLegalAuditSchemaDryRunController.getSchemaDiff);
router.get('/blockers', FiscalLegalAuditSchemaDryRunController.getBlockers);
router.get('/risks', FiscalLegalAuditSchemaDryRunController.getRisks);
router.post('/validate', FiscalLegalAuditSchemaDryRunController.validate);
router.post('/evaluate', FiscalLegalAuditSchemaDryRunController.evaluate);
router.post('/simulate-decision', FiscalLegalAuditSchemaDryRunController.simulateDecision);
router.get('/report', FiscalLegalAuditSchemaDryRunController.getReport);
router.get('/audit', FiscalLegalAuditSchemaDryRunController.getAudit);
router.get('/health', FiscalLegalAuditSchemaDryRunController.getHealth);

export default router;
