import { FiscalShadowTapAuditRecord } from "./FiscalShadowTapTypes";

export class FiscalShadowTapAuditService {
  private records: FiscalShadowTapAuditRecord[] = [];

  public logSimulation(route: string, operation: string, companyId?: string, userId?: string): void {
    const record: FiscalShadowTapAuditRecord = {
      id: `TAPAUDIT-${Math.random().toString(36).substring(7)}`,
      route,
      operation,
      companyId,
      userId,
      captured: false,
      simulationOnly: true,
      activationBlocked: true,
      createdAt: new Date().toISOString()
    };
    this.records.push(record);
  }

  public getAuditRecords(): FiscalShadowTapAuditRecord[] {
    return [...this.records];
  }
}
