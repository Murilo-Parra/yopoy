import { Router } from 'express';
import { FiscalProductionActivationConsentController } from './FiscalProductionActivationConsentController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionActivationConsentController();

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
router.get('/request-intake', (req, res) => controller.getRequestIntake(req, res));
router.get('/request-sanitizer', (req, res) => controller.getRequestSanitizer(req, res));
router.get('/consent-envelope', (req, res) => controller.getConsentEnvelope(req, res));
router.get('/signer-eligibility-matrix', (req, res) => controller.getSignerEligibilityMatrix(req, res));
router.get('/two-person-consent-simulation', (req, res) => controller.getTwoPersonConsentSimulation(req, res));
router.get('/separation-of-duties-review', (req, res) => controller.getSeparationOfDutiesReview(req, res));
router.get('/authorization-scope-no-op-plan', (req, res) => controller.getAuthorizationScopeNoOpPlan(req, res));
router.get('/no-notification-evidence', (req, res) => controller.getNoNotificationEvidence(req, res));
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
