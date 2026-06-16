import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalRecordDryRunController } from './FiscalRealApprovalRecordDryRunController';
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

router.get('/policy', FiscalRealApprovalRecordDryRunController.getPolicy);
router.get('/versioning-plan', FiscalRealApprovalRecordDryRunController.getVersioningPlan);
router.get('/blockers', FiscalRealApprovalRecordDryRunController.getBlockers);
router.get('/risks', FiscalRealApprovalRecordDryRunController.getRisks);
router.post('/validate-integrity', FiscalRealApprovalRecordDryRunController.validateIntegrity);
router.post('/simulate-persistence', FiscalRealApprovalRecordDryRunController.simulatePersistence);
router.post('/simulate-audit-trail', FiscalRealApprovalRecordDryRunController.simulateAuditTrail);
router.post('/evaluate', FiscalRealApprovalRecordDryRunController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalRecordDryRunController.simulateDecision);
router.get('/report', FiscalRealApprovalRecordDryRunController.getReport);
router.get('/audit', FiscalRealApprovalRecordDryRunController.getAudit);
router.get('/health', FiscalRealApprovalRecordDryRunController.getHealth);

export { router as fiscalRealApprovalRecordDryRunRoutes };
