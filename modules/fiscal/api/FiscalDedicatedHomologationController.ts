import { Request, Response } from 'express';
import { FiscalDedicatedEnvironmentInventory } from '../dedicated-homologation/FiscalDedicatedEnvironmentInventory';
import { FiscalDedicatedNetworkContract } from '../dedicated-homologation/FiscalDedicatedNetworkContract';
import { FiscalDedicatedDatabaseContract } from '../dedicated-homologation/FiscalDedicatedDatabaseContract';
import { FiscalDedicatedSecretVaultContract } from '../dedicated-homologation/FiscalDedicatedSecretVaultContract';
import { FiscalDedicatedCertificateContract } from '../dedicated-homologation/FiscalDedicatedCertificateContract';
import { FiscalDedicatedSefazContract } from '../dedicated-homologation/FiscalDedicatedSefazContract';
import { FiscalDedicatedXmlSignerContract } from '../dedicated-homologation/FiscalDedicatedXmlSignerContract';
import { FiscalDedicatedDanfeContract } from '../dedicated-homologation/FiscalDedicatedDanfeContract';
import { FiscalDedicatedObservabilityContract } from '../dedicated-homologation/FiscalDedicatedObservabilityContract';
import { FiscalDedicatedRollbackContract } from '../dedicated-homologation/FiscalDedicatedRollbackContract';
import { FiscalDedicatedReadinessCriteria } from '../dedicated-homologation/FiscalDedicatedReadinessCriteria';
import { FiscalDedicatedBlockerRegister } from '../dedicated-homologation/FiscalDedicatedBlockerRegister';
import { FiscalDedicatedEvaluationService } from '../dedicated-homologation/FiscalDedicatedEvaluationService';
import { FiscalDedicatedReportService } from '../dedicated-homologation/FiscalDedicatedReportService';
import { FiscalDedicatedAuditService } from '../dedicated-homologation/FiscalDedicatedAuditService';

function extractContext(req: Request) {
   const companyId = (req as any).user?.companyId || (req as any).session?.company_id || req.headers['x-company-id'] as string;
   const userId = (req as any).user?.id || (req as any).session?.user_id || 'system';
   return { companyId, userId, endpoint: req.path };
}

export class FiscalDedicatedHomologationController {
  
  public static async getInventory(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });
      await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_INVENTORY' });
      res.json({ inventory: FiscalDedicatedEnvironmentInventory.getInventory(), readOnly: true, infrastructureBlueprintOnly: true, contractOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getNetwork(req: Request, res: Response) {
    try {
      const { companyId, userId, endpoint } = extractContext(req);
      if (!companyId) return res.status(400).json({ error: 'companyId is required' });
      await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_NETWORK' });
      res.json(FiscalDedicatedNetworkContract.getContract());
    } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDatabase(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DATABASE' });
        res.json(FiscalDedicatedDatabaseContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSecrets(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SECRETS' });
        res.json(FiscalDedicatedSecretVaultContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCertificates(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CERTIFICATES' });
        res.json(FiscalDedicatedCertificateContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getSefaz(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_SEFAZ' });
        res.json(FiscalDedicatedSefazContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getXmlSigner(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_XML_SIGNER' });
        res.json(FiscalDedicatedXmlSignerContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getDanfe(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_DANFE' });
        res.json(FiscalDedicatedDanfeContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getObservability(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_OBSERVABILITY' });
        res.json(FiscalDedicatedObservabilityContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getRollback(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_ROLLBACK' });
        res.json(FiscalDedicatedRollbackContract.getContract());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getCriteria(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_CRITERIA' });
        res.json({ criteria: FiscalDedicatedReadinessCriteria.getCriteria(), readOnly: true, infrastructureBlueprintOnly: true, contractOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getBlockers(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_BLOCKERS' });
        res.json({ blockers: FiscalDedicatedBlockerRegister.getBlockers(), readOnly: true, infrastructureBlueprintOnly: true, contractOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async evaluate(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'EVALUATE' });
        
        const evaluation = FiscalDedicatedEvaluationService.evaluate({
            companyId, requestedBy: userId, requestedAction: req.body.requestedAction, forceActivateEnvironment: req.body.forceActivateEnvironment, forceRealHomologation: req.body.forceRealHomologation, forceSefazConnection: req.body.forceSefazConnection, metadata: req.body.metadata
        });

        res.json(evaluation);
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getReport(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_REPORT' });
        res.json(FiscalDedicatedReportService.getFinalReport());
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getAudit(req: Request, res: Response) {
      try {
        const { companyId, userId, endpoint } = extractContext(req);
        if (!companyId) return res.status(400).json({ error: 'companyId is required' });
        await FiscalDedicatedAuditService.logAdministrativeAction({ companyId, userId, endpoint, action: 'READ_AUDIT' });
        res.json({ logs: FiscalDedicatedAuditService.getLogs(), readOnly: true, infrastructureBlueprintOnly: true, contractOnly: true, governanceOnly: true, simulationOnly: true, activationBlocked: true });
      } catch (err: any) { res.status(500).json({ error: 'Internal Server Error', details: err.message }); }
  }

  public static async getHealth(req: Request, res: Response) {
    res.json({
      status: 'UP',
      readOnly: true,
      infrastructureBlueprintOnly: true,
      contractOnly: true,
      governanceOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      environmentActivated: false,
      realHomologationActivated: false,
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
      endpointsCalled: false,
      workersCreated: false,
      schedulersCreated: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      approvedForEnvironmentActivation: false,
      approvedForRealHomologation: false,
      approvedForSefazConnection: false,
      approvedForCertificateLoad: false,
      approvedForXmlSigning: false,
      approvedForPdfGeneration: false,
      approvedForProductionV2: false
    });
  }

}
