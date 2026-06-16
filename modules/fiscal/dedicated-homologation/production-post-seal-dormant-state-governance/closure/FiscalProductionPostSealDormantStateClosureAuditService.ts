export class FiscalProductionPostSealDormantStateClosureAuditService {
  public static audit(event: string, details?: any) {
    console.log(`[AUDIT - Módulo 46.5] ${event}`, details ? JSON.stringify(details) : '');
  }
}
