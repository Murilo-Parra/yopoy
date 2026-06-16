import { FiscalCanaryControlRecord, FiscalCanaryControlStatus, FiscalCanaryControlRecordAction, FiscalCanaryControlMode } from "./FiscalCanaryControlTypes";
import { FiscalCanaryControlRepository } from "./FiscalCanaryControlRepository";
import { randomUUID } from "crypto";

export class FiscalCanaryControlAuditService {
  private repository = new FiscalCanaryControlRepository();

  public async logAction(
    action: FiscalCanaryControlRecordAction,
    route: string,
    operation: string,
    riskLevel: string,
    status: FiscalCanaryControlStatus,
    mode: FiscalCanaryControlMode,
    reason: string,
    metadata: any = {},
    companyId?: string,
    userId?: string
  ): Promise<string> {
    const record: FiscalCanaryControlRecord = {
      id: randomUUID(),
      action,
      route,
      operation,
      riskLevel,
      status,
      mode,
      simulationOnly: true,
      activationBlocked: true,
      reason,
      metadata,
      companyId,
      userId,
      createdBy: userId,
      createdAt: new Date().toISOString()
    };
    await this.repository.saveRecord(record);
    return record.id;
  }

  public async listAudit(filters: any = {}): Promise<FiscalCanaryControlRecord[]> {
    return await this.repository.listRecords(filters);
  }
}
