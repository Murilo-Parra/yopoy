export class FiscalShadowMirrorTelemetrySerializer {
  public static serialize(safeEvent: any): any {
    const serialized = JSON.stringify(safeEvent);
    if (
      serialized.includes('<?xml') ||
      serialized.includes('privateKey') ||
      safeEvent.metadata?.isRealTraffic ||
      safeEvent.telemetryFromRealTraffic === true
    ) {
      return {
        error: 'Sanitization failure: Contains unsafe indicators in telemetry event',
        serializerResult: null
      };
    }

    return {
      error: null,
      serializerResult: {
        ...safeEvent,
        telemetryPersisted: false,
        telemetryInMemoryOnly: true,
        telemetryFromRealTraffic: false,
        hasRawBody: false,
        hasRawResponse: false,
        containsSecrets: false,
        payloadIncluded: false,
        sensitiveDataIncluded: false
      }
    };
  }
}
