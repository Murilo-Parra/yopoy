import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalSignOffController } from './FiscalLegalSignOffController';
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

router.get('/policy', FiscalLegalSignOffController.getPolicy);
router.get('/charter', FiscalLegalSignOffController.getCharter);
router.get('/signer-responsibility-matrix', FiscalLegalSignOffController.getSignerResponsibilityMatrix);
router.get('/signature-envelope', FiscalLegalSignOffController.getSignatureEnvelope);
router.get('/evidence-dependencies', FiscalLegalSignOffController.getEvidenceDependencies);
router.get('/readiness-checklist', FiscalLegalSignOffController.getReadinessChecklist);
router.get('/blockers', FiscalLegalSignOffController.getBlockers);
router.get('/risks', FiscalLegalSignOffController.getRisks);
router.post('/validate', FiscalLegalSignOffController.validate);
router.post('/evaluate', FiscalLegalSignOffController.evaluate);
router.post('/simulate-decision', FiscalLegalSignOffController.simulateDecision);
router.get('/report', FiscalLegalSignOffController.getReport);
router.get('/audit', FiscalLegalSignOffController.getAudit);
router.get('/health', FiscalLegalSignOffController.getHealth);

export default router;
