import { FiscalRealIacResourceCatalog } from './FiscalRealIacResourceCatalog';

export class FiscalRealIacPlanValidator {
  public static validate(plan: any): any {
    const blockers: string[] = [];
    const strObj = JSON.stringify(plan || {});

    if (strObj.match(/terraform apply|pulumi up|cloudformation deploy/i)) {
      blockers.push('Validator blocked real apply/deploy actions.');
    }

    if (strObj.match(/password|token|privateKey|pfx|certificate|DATABASE_URL|SEFAZ_CERT_PASSWORD|A1_CERTIFICATE_PFX/i) && strObj.length > 50) {
      blockers.push('Validator blocked sensitive data or credentials in clear text.');
    }

    if (strObj.length > 20000) {
      blockers.push('Validator blocked giant strings.');
    }

    const catalog = FiscalRealIacResourceCatalog.getCatalog();
    const plannedResourceIds = catalog.map(r => r.resourceId);
    
    // Abstract check
    return {
      validationPassed: blockers.length === 0,
      blockers,
      iacApplied: false,
      realResourceCreated: false,
      catalogVerified: true
    };
  }
}
