export class FiscalShadowMirrorTelemetryEvent {
  public static process(input: any): any {
    const allowedEvents = [
      'SYNTHETIC_CAPTURE_VALIDATED',
      'SYNTHETIC_CAPTURE_BLOCKED',
      'SYNTHETIC_SAFE_SHAPE_VALIDATED',
      'SYNTHETIC_SAFE_SHAPE_BLOCKED',
      'SYNTHETIC_PASSIVE_TAP_DECISION',
      'SYNTHETIC_ROUTE_RISK_EVALUATED'
    ];

    const eventType = allowedEvents.includes(input.eventType) ? input.eventType : 'UNKNOWN_SYNTHETIC_EVENT';

    return {
      routeId: input.routeId,
      eventType,
      syntheticMethod: input.syntheticMethod,
      syntheticPath: input.syntheticPath,
      syntheticStatusCode: input.syntheticStatusCode,
      syntheticDurationMs: input.syntheticDurationMs,
      syntheticRisk: input.syntheticRisk,
      syntheticShapeSummary: this.sanitizeShapeSummary(input.syntheticShapeSummary),
      metadata: this.sanitizeMetadata(input.metadata),
      companyId: input.companyId,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      telemetryFromRealTraffic: false
    };
  }

  private static sanitizeShapeSummary(summary: any): any {
    if (!summary) return null;
    const safeSummary: any = {};
    for (const key of Object.keys(summary)) {
      const lowerKey = key.toLowerCase();
      if (['authorization', 'cookie', 'token', 'password', 'privatekey', 'certificate', 'pfx', 'xml'].some(k => lowerKey.includes(k))) {
        safeSummary[key] = '<REDACTED>';
      } else {
        safeSummary[key] = summary[key];
      }
    }
    return safeSummary;
  }

  private static sanitizeMetadata(metadata: any): any {
    if (!metadata) return null;
    const safeMetadata: any = {};
    for (const key of Object.keys(metadata)) {
      const lowerKey = key.toLowerCase();
      if (['realrequest', 'realresponse', 'raw', 'payload'].some(k => lowerKey.includes(k))) {
         safeMetadata[key] = '<BLOCKED>';
      } else {
         safeMetadata[key] = metadata[key];
      }
    }
    return safeMetadata;
  }
}
