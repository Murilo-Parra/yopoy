import { Request, Response } from 'express';
import { FiscalHomologationMockScenarioCatalog } from '../homologation/mock/FiscalHomologationMockScenarioCatalog';
import { FiscalHomologationMockPayloadValidator } from '../homologation/mock/FiscalHomologationMockPayloadValidator';
import { FiscalHomologationMockExecutionHarness } from '../homologation/mock/FiscalHomologationMockExecutionHarness';
import { FiscalHomologationMockReportService } from '../homologation/mock/FiscalHomologationMockReportService';
import { FiscalHomologationMockAuditService } from '../homologation/mock/FiscalHomologationMockAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalHomologationMockController {
  public static async getScenarios(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationMockAuditService.logSimulationAction({ companyId, userId, endpoint, action: 'READ_SCENARIOS' });

      res.json({
        scenarios: FiscalHomologationMockScenarioCatalog.getScenarios(),
        readOnly: true, mockOnly: true, sandboxOnly: true, dryRunOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async validate(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const safeShape = req.body.safeShape;
      const validation = FiscalHomologationMockPayloadValidator.validate(safeShape);

      await FiscalHomologationMockAuditService.logSimulationAction({ companyId, userId, endpoint, action: 'VALIDATE_PAYLOAD' });

      res.json(validation);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  private static async executeMockScenario(req: Request, res: Response, scenario: string) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      const input = {
          scenario,
          requestedBy: userId,
          companyId,
          safeShape: req.body.safeShape || {},
          forceRealExecution: req.body.forceRealExecution,
          metadata: req.body.metadata
      };

      const result = await FiscalHomologationMockExecutionHarness.executeMock(input);

      await FiscalHomologationMockAuditService.logSimulationAction({ 
          companyId, userId, endpoint, action: `EXECUTE_${scenario}`, scenario
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async simulateNfe(req: Request, res: Response) {
    await FiscalHomologationMockController.executeMockScenario(req, res, 'MOCK_NFE_AUTHORIZATION');
  }

  public static async simulateNfce(req: Request, res: Response) {
    await FiscalHomologationMockController.executeMockScenario(req, res, 'MOCK_NFCE_AUTHORIZATION');
  }

  public static async simulateCancel(req: Request, res: Response) {
    await FiscalHomologationMockController.executeMockScenario(req, res, 'MOCK_CANCEL');
  }

  public static async simulateInutilization(req: Request, res: Response) {
    await FiscalHomologationMockController.executeMockScenario(req, res, 'MOCK_INUTILIZATION');
  }

  public static async simulateContingency(req: Request, res: Response) {
    await FiscalHomologationMockController.executeMockScenario(req, res, 'MOCK_CONTINGENCY');
  }

  public static async getReport(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationMockAuditService.logSimulationAction({ companyId, userId, endpoint, action: 'READ_MOCK_REPORT' });

      res.json(FiscalHomologationMockReportService.getReport());
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getAudit(req: Request, res: Response) {
     try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });

      await FiscalHomologationMockAuditService.logSimulationAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });

      res.json({
         logs: FiscalHomologationMockAuditService.getLogs(),
         readOnly: true, mockOnly: true, sandboxOnly: true, dryRunOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true 
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({ 
      status: 'UP',
      readOnly: true,
      governanceOnly: true,
      planningOnly: true,
      simulationOnly: true,
      blueprintOnly: true,
      runbookPlanningOnly: true,
      mockOnly: true,
      sandboxOnly: true,
      dryRunOnly: true,
      activationBlocked: true,
      homologationExecuted: false,
      realSefazCalled: false,
      certificateLoaded: false,
      realPfxRead: false,
      certificatePasswordRead: false,
      xmlSigned: false,
      realXmlSigned: false,
      pdfGenerated: false,
      realPdfGenerated: false,
      releaseActivated: false,
      canaryActivated: false,
      productionV2Activated: false,
      trafficChanged: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    });
  }
}
