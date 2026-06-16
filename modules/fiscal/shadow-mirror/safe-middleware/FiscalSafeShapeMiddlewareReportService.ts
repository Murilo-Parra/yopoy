import { FiscalSafeShapeMiddlewareReport, FiscalSafeShapeMiddlewareStatus } from './FiscalSafeShapeMiddlewareTypes';

export class FiscalSafeShapeMiddlewareReportService {
  private static totalValidations = 0;
  private static totalBlocked = 0;
  private static byRoute: Record<string, number> = {};
  private static byStatus: Record<string, number> = {};

  public static recordValidation(routeId: string, status: FiscalSafeShapeMiddlewareStatus | string) {
    this.totalValidations++;
    if (status !== FiscalSafeShapeMiddlewareStatus.ENVELOPE_VALID) this.totalBlocked++;

    this.byRoute[routeId] = (this.byRoute[routeId] || 0) + 1;
    this.byStatus[status] = (this.byStatus[status] || 0) + 1;
  }

  public static getReport(): FiscalSafeShapeMiddlewareReport {
    return {
      generatedAt: new Date().toISOString(),
      totalValidations: this.totalValidations,
      totalBlocked: this.totalBlocked,
      byRoute: this.byRoute,
      byStatus: this.byStatus,
      readOnly: true,
      designOnly: true,
      validationOnly: true,
      simulationOnly: true,
      activationBlocked: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
  }
}
