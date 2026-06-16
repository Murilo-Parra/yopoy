import { FiscalSyntheticLoadScenario } from './FiscalLoadPlanningTypes';

export class FiscalSyntheticScenarioCatalog {
  public static getScenarios(): FiscalSyntheticLoadScenario[] {
    const baseSafetyProps = {
      syntheticOnly: true as true,
      callsRealEndpoint: false as false,
      callsLegacyHandler: false as false,
      callsV2Handler: false as false,
      invokesSefaz: false as false,
      signsXml: false as false,
      generatesPdf: false as false,
      writesFiscalTables: false as false
    };

    return [
      {
        id: 'SCENARIO-SYNTHETIC-READ-01',
        name: 'leitura sintética de documentos fiscais',
        routeGroup: 'READ_ONLY',
        estimatedRequestsPerMinute: 100,
        estimatedPayloadShapeSize: '2KB',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SYNTHETIC-READ-02',
        name: 'leitura sintética de NF-e metadata',
        routeGroup: 'READ_ONLY',
        estimatedRequestsPerMinute: 50,
        estimatedPayloadShapeSize: '1KB',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SYNTHETIC-READ-03',
        name: 'leitura sintética de NFC-e metadata',
        routeGroup: 'READ_ONLY',
        estimatedRequestsPerMinute: 200,
        estimatedPayloadShapeSize: '1KB',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SYNTHETIC-READ-04',
        name: 'leitura sintética de DANFE metadata',
        routeGroup: 'READ_ONLY',
        estimatedRequestsPerMinute: 30,
        estimatedPayloadShapeSize: '500B',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SYNTHETIC-READ-05',
        name: 'leitura sintética de protocolos persistidos',
        routeGroup: 'READ_ONLY',
        estimatedRequestsPerMinute: 80,
        estimatedPayloadShapeSize: '800B',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SYNTHETIC-WRITE-01',
        name: 'sandbox persistence synthetic write estimate',
        routeGroup: 'SYNTHETIC_WRITE',
        estimatedRequestsPerMinute: 10,
        estimatedPayloadShapeSize: '5KB',
        risk: 'MEDIUM',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SM-VALIDATION-01',
        name: 'shadow mirror synthetic validation estimate',
        routeGroup: 'SHADOW_MIRROR',
        estimatedRequestsPerMinute: 500,
        estimatedPayloadShapeSize: '1KB',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-SAFE-MIDDLEWARE-01',
        name: 'safe middleware synthetic validation estimate',
        routeGroup: 'MIDDLEWARE_DESIGN',
        estimatedRequestsPerMinute: 1000,
        estimatedPayloadShapeSize: '1KB',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-TELEMETRY-01',
        name: 'telemetry synthetic event estimate',
        routeGroup: 'TELEMETRY_DESIGN',
        estimatedRequestsPerMinute: 2000,
        estimatedPayloadShapeSize: '500B',
        risk: 'LOW',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-CRITICAL-SEFAZ',
        name: 'emissão/transmissão SEFAZ',
        routeGroup: 'CRITICAL',
        estimatedRequestsPerMinute: 0,
        estimatedPayloadShapeSize: '10KB',
        risk: 'CRITICAL',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-CRITICAL-CANCEL',
        name: 'cancelamento/inutilização',
        routeGroup: 'CRITICAL',
        estimatedRequestsPerMinute: 0,
        estimatedPayloadShapeSize: '2KB',
        risk: 'CRITICAL',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-CRITICAL-XML',
        name: 'assinatura XML',
        routeGroup: 'CRITICAL',
        estimatedRequestsPerMinute: 0,
        estimatedPayloadShapeSize: '15KB',
        risk: 'CRITICAL',
        ...baseSafetyProps
      },
      {
        id: 'SCENARIO-HIGH-PDF',
        name: 'PDF real',
        routeGroup: 'HIGH',
        estimatedRequestsPerMinute: 0,
        estimatedPayloadShapeSize: '500KB',
        risk: 'CRITICAL',
        ...baseSafetyProps
      }
    ];
  }

  public static getScenarioById(id: string): FiscalSyntheticLoadScenario | undefined {
    return this.getScenarios().find(s => s.id === id);
  }
}
