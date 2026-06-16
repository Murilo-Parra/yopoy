import { FiscalCanaryRouteMappingRegistry } from "./FiscalCanaryRouteMappingRegistry";
import { FiscalCanaryRouteMappingValidator } from "./FiscalCanaryRouteMappingValidator";
import { FiscalCanaryRouteReadinessService } from "./FiscalCanaryRouteReadinessService";

export class FiscalCanaryRouteMappingService {
  private registry = new FiscalCanaryRouteMappingRegistry();
  private validator = new FiscalCanaryRouteMappingValidator();
  private readinessService = new FiscalCanaryRouteReadinessService();

  public getCatalog() {
    return this.registry.listMappings();
  }

  public getMappingById(id: string) {
    return this.registry.getMappingById(id);
  }

  public simulateMapping(method: string, path: string) {
    const mapping = this.registry.findByLegacyRoute(method, path);
    if (!mapping) {
      return {
        matched: false,
        routeToV2: false,
        routeToLegacy: true,
        simulationOnly: true,
        activationBlocked: true
      };
    }
    return {
      matched: true,
      mapping,
      routeToV2: false, // FORCE
      routeToLegacy: true, // FORCE
      simulationOnly: true,
      activationBlocked: true
    };
  }

  public validateMapping(method: string, path: string) {
    const mapping = this.registry.findByLegacyRoute(method, path);
    if (!mapping) {
      return this.validator.validateNonMappedRoute();
    }
    return this.validator.validateMapping(mapping);
  }

  public async getReadiness(mappingId: string, companyId?: string) {
    return await this.readinessService.getReadinessForMapping(mappingId, companyId);
  }
}
