import { Router } from 'express';
import { FiscalProductionBaselineApprovalController } from './FiscalProductionBaselineApprovalController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionBaselineApprovalController();

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
router.get('/approval-package', (req, res) => controller.getApprovalPackage(req, res));
router.get('/evidence-governance-plan', (req, res) => controller.getEvidenceGovernancePlan(req, res));
router.get('/approval-matrix', (req, res) => controller.getApprovalMatrix(req, res));
router.get('/precondition-evidence-review', (req, res) => controller.getPreconditionEvidenceReview(req, res));
router.get('/hard-lock-evidence-review', (req, res) => controller.getHardLockEvidenceReview(req, res));
router.get('/legacy-continuity-evidence-review', (req, res) => controller.getLegacyContinuityEvidenceReview(req, res));
router.get('/v2-locked-evidence-review', (req, res) => controller.getV2LockedEvidenceReview(req, res));
router.get('/traffic-lock-evidence-review', (req, res) => controller.getTrafficLockEvidenceReview(req, res));
router.get('/runtime-lock-evidence-review', (req, res) => controller.getRuntimeLockEvidenceReview(req, res));
router.get('/data-boundary-evidence-review', (req, res) => controller.getDataBoundaryEvidenceReview(req, res));
router.get('/external-integration-evidence-review', (req, res) => controller.getExternalIntegrationEvidenceReview(req, res));
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
