export class FiscalRealApprovalRecordSanitizer {
  public static sanitize(input: any): any {
    if (!input) return {};
    
    const sanitized = { ...input };

    const forbiddenKeys = [
      'payload',
      'raw',
      'password',
      'token',
      'certificate',
      'privatekey',
      'pfx',
      'database_url',
      'sefaz_cert_password',
      'a1_certificate_pfx',
      'xml',
      'pdf',
      'base64',
      'command',
      'script'
    ];

    for (const key of Object.keys(sanitized)) {
      if (forbiddenKeys.some(f => key.toLowerCase().includes(f))) {
        sanitized[key] = '[SANITIZED]';
      }
    }

    if (sanitized.metadata) {
      if (typeof sanitized.metadata !== 'string') {
        const metaStr = JSON.stringify(sanitized.metadata).toLowerCase();
        if (forbiddenKeys.some(f => metaStr.includes(f)) || metaStr.includes('exec(') || metaStr.includes('spawn(') || metaStr.includes('child_process')) {
            sanitized.metadata = { note: '[METADATA_SANITIZED_FOR_SECURITY]' };
        }
      } else {
        const metaStr = sanitized.metadata.toLowerCase();
        if (forbiddenKeys.some(f => metaStr.includes(f)) || metaStr.includes('exec(') || metaStr.includes('spawn(') || metaStr.includes('child_process')) {
            sanitized.metadata = '[METADATA_SANITIZED_FOR_SECURITY]';
        }
      }
    }

    return sanitized;
  }
}
