import { Router } from 'express';
import { FiscalProductionAuthorizationDeliberationController } from './FiscalProductionAuthorizationDeliberationController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionAuthorizationDeliberationController();

function requireAdminRole(req: any, res: any, next: any) {
  const session = req.session;
  const user = req.user;
  
  const isAdmin = session?.is_admin === true || session?.is_admin === 1 || 
                  user?.is_admin === true || user?.is_admin === 1 || 
                  session?.role === 'Proprietário' || session?.role === 'Administrador' ||
                  user?.role === 'Proprietário' || user?.role === 'Administrador';
  
  if (!isAdmin) {
    return res.status(403).json({ error: 'Acesso restrito. Privilégios administrativos necessários.' });
  }
  next();
}

router.use(requireFiscalAuth);
router.use(requireAdminRole);

router.get('/policy', (req, res) => controller.getPolicy(req, res));
router.get('/deliberation-charter', (req, res) => controller.getDeliberationCharter(req, res));
router.get('/quorum-simulation', (req, res) => controller.getQuorumSimulation(req, res));
router.get('/authority-vote-simulation', (req, res) => controller.getAuthorityVoteSimulation(req, res));
router.get('/gate-precondition-review', (req, res) => controller.getGatePreconditionReview(req, res));
router.get('/consent-evidence-review-matrix', (req, res) => controller.getConsentEvidenceReviewMatrix(req, res));
router.get('/sod-revalidation-matrix', (req, res) => controller.getSoDRevalidationMatrix(req, res));
router.get('/risk-acceptance-no-op-review', (req, res) => controller.getRiskAcceptanceNoOpReview(req, res));
router.get('/deliberation-no-persistence-evidence', (req, res) => controller.getDeliberationNoPersistenceEvidence(req, res));
router.get('/dependency-matrix', (req, res) => controller.getDependencyMatrix(req, res));
router.get('/blockers', (req, res) => controller.getBlockers(req, res));
router.get('/risks', (req, res) => controller.getRisks(req, res));
router.post('/validate', (req, res) => controller.validate(req, res));
router.post('/evaluate', (req, res) => controller.evaluate(req, res));
router.post('/simulate-decision', (req, res) => controller.simulateDecision(req, res));
router.get('/report', (req, res) => controller.getReport(req, res));
router.get('/audit', (req, res) => controller.getAudit(req, res));
router.get('/health', (req, res) => controller.getHealth(req, res));

export default router;
