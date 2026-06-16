export class FiscalShadowMirrorSafeShapeBuilder {
  public static buildSafeShape(rawShape: any): { safeShape: any; payloadIncluded: false; sensitiveDataIncluded: false } {
    return {
      safeShape: this.recursiveSanitize(rawShape),
      payloadIncluded: false,
      sensitiveDataIncluded: false
    };
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
