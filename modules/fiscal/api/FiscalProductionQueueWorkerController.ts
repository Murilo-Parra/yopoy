import { Request, Response } from 'express';
import {
  FiscalProductionQueueWorkerPolicy,
  FiscalProductionQueueTopologyNoStartBlueprint,
  FiscalProductionWorkerDispatchNoOpPlan,
  FiscalProductionJobEnqueueNoOpMatrix,
  FiscalProductionBatchMicroBatchNoExecutePlan,
  FiscalProductionRetryBackoffNoActivationMatrix,
  FiscalProductionDeadLetterQueueNoCreatePlan,
  FiscalProductionConsumerProducerNoStartMatrix,
  FiscalProductionConcurrencyPoolNoOpenPlan,
  FiscalProductionJobPayloadNoReadPlan,
  FiscalProductionQueueWorkerNoRealDispatchEvidence,
  FiscalProductionQueueWorkerNoRealProcessingEvidence,
  FiscalProductionQueueWorkerDependencyMatrix,
  FiscalProductionQueueWorkerBlockerRegister,
  FiscalProductionQueueWorkerRiskRegister,
  FiscalProductionQueueWorkerValidator,
  FiscalProductionQueueWorkerEvaluationService,
  FiscalProductionQueueWorkerDecisionService,
  FiscalProductionQueueWorkerReportService,
  FiscalProductionQueueWorkerAuditService
} from '../dedicated-homologation/production-runtime-orchestration-governance/queue-worker-dry-run';

export class FiscalProductionQueueWorkerController {
  public static getPolicy(req: Request, res: Response) {
    res.json(FiscalProductionQueueWorkerPolicy.getPolicy());
  }

  public static getQueueTopologyNoStartBlueprint(req: Request, res: Response) {
    res.json(FiscalProductionQueueTopologyNoStartBlueprint.getBlueprint());
  }

  public static getWorkerDispatchNoOpPlan(req: Request, res: Response) {
    res.json(FiscalProductionWorkerDispatchNoOpPlan.getPlan());
  }

  public static getJobEnqueueNoOpMatrix(req: Request, res: Response) {
    res.json(FiscalProductionJobEnqueueNoOpMatrix.getMatrix());
  }

  public static getBatchMicroBatchNoExecutePlan(req: Request, res: Response) {
    res.json(FiscalProductionBatchMicroBatchNoExecutePlan.getPlan());
  }

  public static getRetryBackoffNoActivationMatrix(req: Request, res: Response) {
    res.json(FiscalProductionRetryBackoffNoActivationMatrix.getMatrix());
  }

  public static getDeadLetterQueueNoCreatePlan(req: Request, res: Response) {
    res.json(FiscalProductionDeadLetterQueueNoCreatePlan.getPlan());
  }

  public static getConsumerProducerNoStartMatrix(req: Request, res: Response) {
    res.json(FiscalProductionConsumerProducerNoStartMatrix.getMatrix());
  }

  public static getConcurrencyPoolNoOpenPlan(req: Request, res: Response) {
    res.json(FiscalProductionConcurrencyPoolNoOpenPlan.getPlan());
  }

  public static getJobPayloadNoReadPlan(req: Request, res: Response) {
    res.json(FiscalProductionJobPayloadNoReadPlan.getPlan());
  }

  public static getQueueWorkerNoRealDispatchEvidence(req: Request, res: Response) {
    res.json(FiscalProductionQueueWorkerNoRealDispatchEvidence.getEvidence());
  }

  public static getQueueWorkerNoRealProcessingEvidence(req: Request, res: Response) {
    res.json(FiscalProductionQueueWorkerNoRealProcessingEvidence.getEvidence());
  }

  public static getDependencyMatrix(req: Request, res: Response) {
    res.json(FiscalProductionQueueWorkerDependencyMatrix.getMatrix());
  }

  public static getBlockers(req: Request, res: Response) {
    res.json({ blockers: FiscalProductionQueueWorkerBlockerRegister.getBlockers() });
  }

  public static getRisks(req: Request, res: Response) {
    res.json({ risks: FiscalProductionQueueWorkerRiskRegister.getRisks() });
  }

  public static validate(req: Request, res: Response) {
    const input = req.body || {};
    const errors = FiscalProductionQueueWorkerValidator.validate(input);
    res.json({ valid: errors.length === 0, errors });
  }

  public static evaluate(req: Request, res: Response) {
    const input = req.body || {};
    const warnings = FiscalProductionQueueWorkerEvaluationService.evaluate(input);
    res.json({ evaluated: true, warnings });
  }

  public static simulateDecision(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionQueueWorkerDecisionService.simulateDecision(input);
    res.json(result);
  }

  public static getReport(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionQueueWorkerDecisionService.simulateDecision(input);
    res.json(FiscalProductionQueueWorkerReportService.generateReport(result));
  }

  public static getAudit(req: Request, res: Response) {
    const input = req.body || {};
    const result = FiscalProductionQueueWorkerDecisionService.simulateDecision(input);
    res.json(FiscalProductionQueueWorkerAuditService.generateAuditRecord(result));
  }

  public static getHealth(req: Request, res: Response) {
    res.json({ status: 'ok', module: 'Production Queue, Worker & Job Dispatch Topology No-Start / No-Enqueue Dry-Run', readOnly: true });
  }
}
