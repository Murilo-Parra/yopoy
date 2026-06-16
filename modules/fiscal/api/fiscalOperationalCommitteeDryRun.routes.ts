import { Router, Request, Response, NextFunction } from 'express';
import { FiscalOperationalCommitteeDryRunController } from './FiscalOperationalCommitteeDryRunController';
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

router.get('/policy', FiscalOperationalCommitteeDryRunController.getPolicy);
router.get('/architecture-charter', FiscalOperationalCommitteeDryRunController.getArchitectureCharter);
router.get('/approval-matrix', FiscalOperationalCommitteeDryRunController.getApprovalMatrix);
router.get('/quorum-simulation', FiscalOperationalCommitteeDryRunController.getQuorumSimulation);
router.get('/risk-acceptance-simulation', FiscalOperationalCommitteeDryRunController.getRiskAcceptanceSimulation);
router.get('/exception-waiver-simulation', FiscalOperationalCommitteeDryRunController.getExceptionWaiverSimulation);
router.get('/evidence-review-matrix', FiscalOperationalCommitteeDryRunController.getEvidenceReviewMatrix);
router.get('/final-recommendation', FiscalOperationalCommitteeDryRunController.getFinalRecommendation);
router.get('/blockers', FiscalOperationalCommitteeDryRunController.getBlockers);
router.get('/risks', FiscalOperationalCommitteeDryRunController.getRisks);
router.post('/validate', FiscalOperationalCommitteeDryRunController.validate);
router.post('/evaluate', FiscalOperationalCommitteeDryRunController.evaluate);
router.post('/simulate-decision', FiscalOperationalCommitteeDryRunController.simulateDecision);
router.get('/report', FiscalOperationalCommitteeDryRunController.getReport);
router.get('/audit', FiscalOperationalCommitteeDryRunController.getAudit);
router.get('/health', FiscalOperationalCommitteeDryRunController.getHealth);

export default router;
