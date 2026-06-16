import { Request, Response } from 'express';
import {
  FiscalProductionDatabasePersistencePolicy,
  FiscalProductionDatabaseConnectionNoOpenBlueprint,
  FiscalProductionConnectionPoolNoCreatePlan,
  FiscalProductionTransactionBoundaryNoOpenMatrix,
  FiscalProductionQueryRunnerNoExecutePlan,
  FiscalProductionDmlDdlNoExecuteMatrix,
  FiscalProductionMigrationNoRunPlan,
  FiscalProductionRepositoryNoMutationMatrix,
  FiscalProductionPersistenceAdapterNoBindPlan,
  FiscalProductionDatabaseCredentialNoReadPlan,
  FiscalProductionTenantDataNoReadMatrix,
  FiscalProductionFiscalDocumentNoReadPlan,
  FiscalProductionDatabaseNoRealConnectionEvidence,
  FiscalProductionPersistenceNoRealWriteEvidence,
  FiscalProductionDatabasePersistenceDependencyMatrix,
  FiscalProductionDatabasePersistenceBlockerRegister,
  FiscalProductionDatabasePersistenceRiskRegister,
  FiscalProductionDatabasePersistenceValidator,
  FiscalProductionDatabasePersistenceEvaluationService,
  FiscalProductionDatabasePersistenceDecisionService,
  FiscalProductionDatabasePersistenceReportService,
  FiscalProductionDatabasePersistenceAuditService
} from '../dedicated-homologation/production-runtime-orchestration-governance/database-persistence-dry-run';

export class FiscalProductionDatabasePersistenceController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionDatabasePersistencePolicy.getPolicy());
  }

  public static getDatabaseConnectionNoOpenBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionDatabaseConnectionNoOpenBlueprint.getBlueprint());
  }

  public static getConnectionPoolNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionConnectionPoolNoCreatePlan.getPlan());
  }

  public static getTransactionBoundaryNoOpenMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTransactionBoundaryNoOpenMatrix.getMatrix());
  }

  public static getQueryRunnerNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionQueryRunnerNoExecutePlan.getPlan());
  }

  public static getDmlDdlNoExecuteMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDmlDdlNoExecuteMatrix.getMatrix());
  }

  public static getMigrationNoRunPlan(req: Request, res: Response) {
    res.json(FiscalProductionMigrationNoRunPlan.getPlan());
  }

  public static getRepositoryNoMutationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRepositoryNoMutationMatrix.getMatrix());
  }

  public static getPersistenceAdapterNoBindPlan(req: Request, res: Response) {
    res.json(FiscalProductionPersistenceAdapterNoBindPlan.getPlan());
  }

  public static getDatabaseCredentialNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionDatabaseCredentialNoReadPlan.getPlan());
  }

  public static getTenantDataNoReadMatrix(req: Request, res: Response) {
    res.json(FiscalProductionTenantDataNoReadMatrix.getMatrix());
  }

  public static getFiscalDocumentNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionFiscalDocumentNoReadPlan.getPlan());
  }

  public static getDatabaseNoRealConnectionEvidence(req: Request, res: Response) {
    res.json(FiscalProductionDatabaseNoRealConnectionEvidence.getEvidence());
  }

  public static getPersistenceNoRealWriteEvidence(req: Request, res: Response) {
    res.json(FiscalProductionPersistenceNoRealWriteEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionDatabasePersistenceDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionDatabasePersistenceBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionDatabasePersistenceRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionDatabasePersistenceValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionDatabasePersistenceEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionDatabasePersistenceDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionDatabasePersistenceDecisionService.simulateDecision(input);
    res.json(FiscalProductionDatabasePersistenceReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionDatabasePersistenceDecisionService.simulateDecision(input);
    res.json(FiscalProductionDatabasePersistenceAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Database Transaction, Connection Pool & Persistence Boundary No-Open / No-Write Dry-Run', readOnly: true });
  }
}
