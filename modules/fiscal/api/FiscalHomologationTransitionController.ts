import { Request, Response } from 'express';
import { FiscalHomologationTransitionInventory } from '../homologation/transition/FiscalHomologationTransitionInventory';
import { FiscalHomologationMockPhaseOutPlan } from '../homologation/transition/FiscalHomologationMockPhaseOutPlan';
import { FiscalHomologationDedicatedEnvironmentPlan } from '../homologation/transition/FiscalHomologationDedicatedEnvironmentPlan';
import { FiscalHomologationTransitionCriteria } from '../homologation/transition/FiscalHomologationTransitionCriteria';
import { FiscalHomologationTransitionBlockerRegister } from '../homologation/transition/FiscalHomologationTransitionBlockerRegister';
import { FiscalHomologationTransitionEvaluationService } from '../homologation/transition/FiscalHomologationTransitionEvaluationService';
import { FiscalHomologationTransitionHandoffService } from '../homologation/transition/FiscalHomologationTransitionHandoffService';
import { FiscalHomologationTransitionReportService } from '../homologation/transition/FiscalHomologationTransitionReportService';
import { FiscalHomologationTransitionAuditService } from '../homologation/transition/FiscalHomologationTransitionAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalHomologationTransitionController {
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' }); res.json({ inventory: FiscalHomologationTransitionInventory.getInventory(), readOnly: true, transitionPlanningOnly: true, phaseOutPlanningOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getMockPhaseOut(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_MOCK_PHASE_OUT' }); res.json(FiscalHomologationMockPhaseOutPlan.getPlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDedicatedEnvironment(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DEDICATED_ENVIRONMENT' }); res.json(FiscalHomologationDedicatedEnvironmentPlan.getPlan());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCriteria(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CRITERIA' }); res.json({ criteria: FiscalHomologationTransitionCriteria.getCriteria(), readOnly: true, transitionPlanningOnly: true, phaseOutPlanningOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' }); res.json({ blockers: FiscalHomologationTransitionBlockerRegister.getBlockers(), readOnly: true, transitionPlanningOnly: true, phaseOutPlanningOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE_TRANSITION' }); 
      
      const evaluation = FiscalHomologationTransitionEvaluationService.evaluate({
        companyId, requestedBy: userId, requestedAction: req.body.requestedAction, forceTransition: req.body.forceTransition, forceRealHomologation: req.body.forceRealHomologation, metadata: req.body.metadata
      });
      res.json(evaluation);
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHandoff(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_HANDOFF' }); res.json(FiscalHomologationTransitionHandoffService.generateHandoff());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getFinalReport(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_FINAL_REPORT' }); res.json(FiscalHomologationTransitionReportService.getFinalReport());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationTransitionAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' }); res.json({ logs: FiscalHomologationTransitionAuditService.getLogs(), readOnly: true, transitionPlanningOnly: true, phaseOutPlanningOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
      status: 'UP', readOnly: true, transitionPlanningOnly: true, phaseOutPlanningOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true,
      transitionExecuted: false, mockPhaseOutExecuted: false, dedicatedEnvironmentActivated: false, realHomologationActivated: false, realSefazCalled: false, certificateLoaded: false, realPfxRead: false, certificatePasswordRead: false, xmlSigned: false, realXmlSigned: false, pdfGenerated: false, realPdfGenerated: false, releaseActivated: false, canaryActivated: false, productionV2Activated: false, trafficChanged: false, endpointsCalled: false, workersCreated: false, schedulersCreated: false, approvedForTransitionExecution: false, approvedForMockPhaseOut: false, approvedForDedicatedEnvironmentActivation: false, approvedForRealHomologation: false, approvedForSefazConnection: false, approvedForCertificateLoad: false, approvedForXmlSigning: false, approvedForPdfGeneration: false, approvedForProductionV2: false, payloadIncluded: false, sensitiveDataIncluded: false
    });
  }
}
