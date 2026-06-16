import { Router } from 'express';
import { FiscalProductionOperationsTransitionController } from './FiscalProductionOperationsTransitionController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionOperationsTransitionController();

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
router.get('/control-plane-blueprint', (req, res) => controller.getControlPlaneBlueprint(req, res));
router.get('/activation-consent-boundary', (req, res) => controller.getActivationConsentBoundary(req, res));
router.get('/real-activation-readiness-non-executable-plan', (req, res) => controller.getRealActivationReadinessNonExecutablePlan(req, res));
router.get('/transition-authority-matrix', (req, res) => controller.getTransitionAuthorityMatrix(req, res));
router.get('/two-person-rule-no-op-plan', (req, res) => controller.getTwoPersonRuleNoOpPlan(req, res));
router.get('/separation-of-duties-matrix', (req, res) => controller.getSeparationOfDutiesMatrix(req, res));
router.get('/precondition-checklist', (req, res) => controller.getPreconditionChecklist(req, res));
router.get('/no-execution-evidence', (req, res) => controller.getNoExecutionEvidence(req, res));
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
