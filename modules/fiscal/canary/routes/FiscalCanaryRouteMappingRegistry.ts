import { FiscalCanaryRouteCatalog } from "./FiscalCanaryRouteCatalog";
import { FiscalCanaryRouteMapping, FiscalCanaryRouteRiskLevel, FiscalCanaryRouteMappingStatus } from "./FiscalCanaryRouteMapTypes";

export class FiscalCanaryRouteMappingRegistry {
  private catalog = new FiscalCanaryRouteCatalog();

  public listMappings(): FiscalCanaryRouteMapping[] {
    return this.catalog.getCatalog();
  }

  public getMappingById(id: string): FiscalCanaryRouteMapping | undefined {
    return this.catalog.getCatalog().find(m => m.id === id);
  }

  public findByLegacyRoute(method: string, path: string): FiscalCanaryRouteMapping | undefined {
    return this.catalog.getCatalog().find(
      m => m.legacyMethod.toUpperCase() === method.toUpperCase() && m.legacyPath === path
    );
  }

  public findByV2Route(method: string, path: string): FiscalCanaryRouteMapping | undefined {
    return this.catalog.getCatalog().find(
      m => m.v2Method.toUpperCase() === method.toUpperCase() && m.v2Path === path
    );
  }

  public listCriticalMappings(): FiscalCanaryRouteMapping[] {
    return this.catalog.getCatalog().filter(m => m.riskLevel === FiscalCanaryRouteRiskLevel.CRITICAL);
  }

  public listFutureCandidates(): FiscalCanaryRouteMapping[] {
    return this.catalog.getCatalog().filter(m => m.status === FiscalCanaryRouteMappingStatus.CANDIDATE_FUTURE);
  }
}
