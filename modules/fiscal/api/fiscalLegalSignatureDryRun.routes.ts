import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalSignatureDryRunController } from './FiscalLegalSignatureDryRunController';
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

router.get('/policy', FiscalLegalSignatureDryRunController.getPolicy);
router.get('/signer-eligibility', FiscalLegalSignatureDryRunController.getSignerEligibility);
router.get('/signature-intent-envelope', FiscalLegalSignatureDryRunController.getSignatureIntentEnvelope);
router.get('/mock-signature-workflow', FiscalLegalSignatureDryRunController.getMockSignatureWorkflow);
router.get('/quorum-simulation', FiscalLegalSignatureDryRunController.getQuorumSimulation);
router.get('/sod-review', FiscalLegalSignatureDryRunController.getSodReview);
router.get('/evidence-review', FiscalLegalSignatureDryRunController.getEvidenceReview);
router.get('/blockers', FiscalLegalSignatureDryRunController.getBlockers);
router.get('/risks', FiscalLegalSignatureDryRunController.getRisks);
router.post('/validate', FiscalLegalSignatureDryRunController.validate);
router.post('/evaluate', FiscalLegalSignatureDryRunController.evaluate);
router.post('/simulate-decision', FiscalLegalSignatureDryRunController.simulateDecision);
router.get('/report', FiscalLegalSignatureDryRunController.getReport);
router.get('/audit', FiscalLegalSignatureDryRunController.getAudit);
router.get('/health', FiscalLegalSignatureDryRunController.getHealth);

export default router;
