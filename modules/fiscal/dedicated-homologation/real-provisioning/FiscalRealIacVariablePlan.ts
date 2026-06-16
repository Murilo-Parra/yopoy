export class FiscalRealIacVariablePlan {
  public static getPlan() {
    return {
      allowedVariables: ['environment', 'region', 'vpc_cidr', 'instance_type'],
      forbiddenVariables: [
        'password',
        'token',
        'privateKey',
        'pfx',
        'certificate',
        'certPassword',
        'DATABASE_URL',
        'SEFAZ_CERT_PASSWORD',
        'A1_CERTIFICATE_PFX'
      ],
      rawSecretsAllowed: false,
      pfxAllowed: false,
      passwordAllowed: false,
      sensitiveDataIncluded: false,
      payloadIncluded: false
    };
  }
}
