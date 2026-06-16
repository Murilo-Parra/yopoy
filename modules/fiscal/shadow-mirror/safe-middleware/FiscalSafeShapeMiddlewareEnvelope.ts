export class FiscalSafeShapeMiddlewareEnvelope {
  public static process(input: any): any {
    return {
      routeId: input.routeId,
      syntheticMethod: input.syntheticMethod,
      syntheticPath: input.syntheticPath,
      syntheticHeaders: this.sanitizeHeaders(input.syntheticHeaders),
      syntheticRequestShape: this.recursiveSanitize(input.syntheticRequestShape),
      syntheticResponseShape: this.recursiveSanitize(input.syntheticResponseShape),
      metadata: input.metadata,
      companyId: input.companyId,
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
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
