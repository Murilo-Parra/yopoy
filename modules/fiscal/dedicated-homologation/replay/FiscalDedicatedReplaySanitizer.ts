export class FiscalDedicatedReplaySanitizer {
  public static sanitize(input: any): any {
    if (!input) return input;
    const sanitized = JSON.parse(JSON.stringify(input));
    
    const removeSensitive = (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          removeSensitive(obj[key]);
        } else if (typeof obj[key] === 'string') {
          if (
            key.toLowerCase().includes('password') ||
            key.toLowerCase().includes('token') ||
            key.toLowerCase().includes('privatekey') ||
            key.toLowerCase().includes('pfx') ||
            key.toLowerCase().includes('certificate') ||
            key.toLowerCase().includes('payload') ||
            key.toLowerCase().includes('raw')
          ) {
            obj[key] = '[SANITIZED]';
          } else if (obj[key].length > 1000) {
            obj[key] = '[SANITIZED_GIANT_STRING]';
          } else if (obj[key].includes('<?xml')) {
            obj[key] = '[SANITIZED_XML]';
          }
        }
      }
    };

    removeSensitive(sanitized);
    
    // Explicitly delete root fields if present
    delete sanitized.payload;
    delete sanitized.raw;
    delete sanitized.password;
    delete sanitized.token;
    delete sanitized.privateKey;
    delete sanitized.pfx;
    delete sanitized.certificate;

    return sanitized;
  }
}
