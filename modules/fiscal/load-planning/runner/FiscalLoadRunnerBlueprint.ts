import { FiscalLoadRunnerBlueprint } from './FiscalLoadRunnerTypes';

export class FiscalLoadRunnerBlueprintService {
  public static getBlueprint(): FiscalLoadRunnerBlueprint {
    return {
      generatedAt: new Date().toISOString(),
      supportedScenarioGroups: ['READ_ONLY', 'SYNTHETIC_WRITE', 'SHADOW_MIRROR', 'MIDDLEWARE_DESIGN', 'TELEMETRY_DESIGN'],
      maxPlannedBatchSize: 1000,
      maxPlannedRpm: 10000,
      maxPlannedDurationMinutes: 60,
      executionEnabled: false,
      loadRunnerInstalled: false,
      workerCreated: false,
      schedulerCreated: false,
      callsRealEndpoint: false,
      callsLegacyHandler: false,
      callsV2Handler: false,
      routeToV2: false,
      routeToLegacy: true,
      toolingDesignOnly: true,
      planningOnly: true,
      simulationOnly: true,
      activationBlocked: true
    };
  }
}
