import { Router } from 'express';
import { FiscalProductionCutoverClosureController } from './FiscalProductionCutoverClosureController';
import { requireFiscalAuth } from './helpers';

const router = Router();
const controller = new FiscalProductionCutoverClosureController();

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
router.get('/closure-inventory', (req, res) => controller.getClosureInventory(req, res));
router.get('/final-checklist', (req, res) => controller.getFinalChecklist(req, res));
router.get('/evidence-package', (req, res) => controller.getEvidencePackage(req, res));
router.get('/no-activation-handoff', (req, res) => controller.getNoActivationHandoff(req, res));
router.get('/post-closure-roadmap', (req, res) => controller.getPostClosureRoadmap(req, res));
router.get('/final-blockers', (req, res) => controller.getFinalBlockers(req, res));
router.get('/final-risks', (req, res) => controller.getFinalRisks(req, res));
router.post('/validate', (req, res) => controller.validate(req, res));
router.post('/evaluate', (req, res) => controller.evaluate(req, res));
router.post('/simulate-decision', (req, res) => controller.simulateDecision(req, res));
router.get('/report', (req, res) => controller.getReport(req, res));
router.get('/audit', (req, res) => controller.getAudit(req, res));
router.get('/health', (req, res) => controller.getHealth(req, res));

export default router;
