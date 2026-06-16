import { FiscalShadowMirrorRouteCatalog } from './FiscalShadowMirrorRouteCatalog';
import { FiscalShadowMirrorRouteDescriptor } from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorRegistryService {
  public static listRoutes(): FiscalShadowMirrorRouteDescriptor[] {
    return FiscalShadowMirrorRouteCatalog.getRoutes();
  }

  public static getRoute(id: string): FiscalShadowMirrorRouteDescriptor | undefined {
    return FiscalShadowMirrorRouteCatalog.getRouteById(id);
  }

  public static getRisks() {
    return [
      { risk: 'CRITICAL', definition: 'Involves external side-effects (SEFAZ), crypto operations, or state mutations.' },
      { risk: 'HIGH', definition: 'Involves heavy compute like PDF generation, or complex read-locks.' },
      { risk: 'MEDIUM', definition: 'Involves multi-table reads with JOINs.' },
      { risk: 'LOW', definition: 'Simple primary-key lookups or metadata reads.' }
    ];
  }

  public static getDependencies() {
    return [
      'DATABASE_READ: Safe to mirror with RLS boundaries',
      'DATABASE_WRITE: Blocked from mirroring in V2',
      'SEFAZ: Blocked, avoids double emissions',
      'XML_SIGNING: Blocked, saves compute',
      'PDF_GENERATION: Blocked, saves compute'
    ];
  }
}
