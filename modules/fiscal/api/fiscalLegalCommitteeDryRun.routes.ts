import { Router, Request, Response, NextFunction } from 'express';
import { FiscalLegalCommitteeDryRunController } from './FiscalLegalCommitteeDryRunController';
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

router.get('/policy', FiscalLegalCommitteeDryRunController.getPolicy);
router.get('/committee-charter', FiscalLegalCommitteeDryRunController.getCommitteeCharter);
router.get('/approval-matrix', FiscalLegalCommitteeDryRunController.getApprovalMatrix);
router.get('/quorum-simulation', FiscalLegalCommitteeDryRunController.getQuorumSimulation);
router.get('/risk-acceptance-review', FiscalLegalCommitteeDryRunController.getRiskAcceptanceReview);
router.get('/waiver-review', FiscalLegalCommitteeDryRunController.getWaiverReview);
router.get('/signature-evidence-review', FiscalLegalCommitteeDryRunController.getSignatureEvidenceReview);
router.get('/final-recommendation', FiscalLegalCommitteeDryRunController.getFinalRecommendation);
router.get('/blockers', FiscalLegalCommitteeDryRunController.getBlockers);
router.get('/risks', FiscalLegalCommitteeDryRunController.getRisks);
router.post('/validate', FiscalLegalCommitteeDryRunController.validate);
router.post('/evaluate', FiscalLegalCommitteeDryRunController.evaluate);
router.post('/simulate-decision', FiscalLegalCommitteeDryRunController.simulateDecision);
router.get('/report', FiscalLegalCommitteeDryRunController.getReport);
router.get('/audit', FiscalLegalCommitteeDryRunController.getAudit);
router.get('/health', FiscalLegalCommitteeDryRunController.getHealth);

export default router;
