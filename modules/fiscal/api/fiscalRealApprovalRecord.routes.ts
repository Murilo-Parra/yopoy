import { Router, Request, Response, NextFunction } from 'express';
import { FiscalRealApprovalRecordController } from './FiscalRealApprovalRecordController';
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

router.get('/policy', FiscalRealApprovalRecordController.getPolicy);
router.get('/blueprint', FiscalRealApprovalRecordController.getBlueprint);
router.get('/schema-plan', FiscalRealApprovalRecordController.getSchemaPlan);
router.get('/blockers', FiscalRealApprovalRecordController.getBlockers);
router.get('/risks', FiscalRealApprovalRecordController.getRisks);
router.post('/validate', FiscalRealApprovalRecordController.validate);
router.post('/evaluate', FiscalRealApprovalRecordController.evaluate);
router.post('/simulate-decision', FiscalRealApprovalRecordController.simulateDecision);
router.get('/non-executable-signature-envelope', FiscalRealApprovalRecordController.getNonExecutableSignatureEnvelope);
router.get('/report', FiscalRealApprovalRecordController.getReport);
router.get('/audit', FiscalRealApprovalRecordController.getAudit);
router.get('/health', FiscalRealApprovalRecordController.getHealth);

export { router as fiscalRealApprovalRecordRoutes };
