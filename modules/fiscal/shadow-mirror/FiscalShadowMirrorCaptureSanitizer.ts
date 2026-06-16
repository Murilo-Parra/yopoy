export class FiscalShadowMirrorCaptureSanitizer {
  public static sanitize(envelope: any): any {
    const safeEnvelope = {
      routeId: envelope.routeId,
      syntheticMethod: envelope.syntheticMethod,
      syntheticPath: envelope.syntheticPath,
      syntheticHeaders: this.sanitizeHeaders(envelope.syntheticHeaders),
      syntheticRequestShape: this.recursiveSanitize(envelope.syntheticRequestShape),
      syntheticResponseShape: this.recursiveSanitize(envelope.syntheticResponseShape),
      metadata: envelope.metadata,
      companyId: envelope.companyId,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
    return safeEnvelope;
  }

  private static sanitizeHeaders(headers: any): any {
    if (!headers) return {};
    const safeHeaders: any = {};
    for (const key of Object.keys(headers)) {
      const lowerKey = key.toLowerCase();
      if (['authorization', 'cookie', 'token', 'x-api-key', 'session'].includes(lowerKey)) {
        safeHeaders[key] = '<REDACTED>';
      } else {
        safeHeaders[key] = headers[key] === null ? null : `<${typeof headers[key]}>`;
      }
    }
    return safeHeaders;
  }

  private static recursiveSanitize(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    
    if (typeof obj !== 'object') {
       return `<${typeof obj}>`;
    }

    if (Array.isArray(obj)) {
      return obj.length > 0 ? [this.recursiveSanitize(obj[0])] : [];
    }

    const safeObj: any = {};
    for (const key of Object.keys(obj)) {
       const lowerKey = key.toLowerCase();
       if (lowerKey.includes('payload') || lowerKey.includes('password') || lowerKey.includes('token') || lowerKey.includes('cert') || lowerKey.includes('key')) {
         safeObj[key] = '<REDACTED>';
       } else {
         safeObj[key] = this.recursiveSanitize(obj[key]);
       }
    }
    return safeObj;
  }
}
