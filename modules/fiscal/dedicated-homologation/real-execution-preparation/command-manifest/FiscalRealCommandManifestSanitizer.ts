export class FiscalRealCommandManifestSanitizer {
  public static sanitize(input: any): any {
    if (!input) return input;
    
    const sanitized = Array.isArray(input) ? [...input] : { ...input };

    const restrictedKeys = [
      'payload',
      'raw',
      'password',
      'token',
      'certificate',
      'privateKey',
      'pfx',
      'DATABASE_URL',
      'SEFAZ_CERT_PASSWORD',
      'A1_CERTIFICATE_PFX'
    ];

    const cleanObject = (obj: any) => {
      if (!obj || typeof obj !== 'object') return;
      
      for (const key of Object.keys(obj)) {
        if (restrictedKeys.includes(key) || restrictedKeys.includes(key.toUpperCase())) {
          obj[key] = '[SANITIZED_BY_COMMAND_MANIFEST]';
        } else if (typeof obj[key] === 'object') {
          cleanObject(obj[key]);
        }
      }
    };

    cleanObject(sanitized);
    return sanitized;
  }
}
