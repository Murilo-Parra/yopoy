export class FiscalDedicatedCertificateContract {
  public static getContract() {
    return {
      description: 'Contrato futuro para certificado A1 (PFX)',
      manualValidationRequired: true as true,
      certificateLoaded: false as false,
      realPfxRead: false as false,
      certificatePasswordRead: false as false
    };
  }
}
