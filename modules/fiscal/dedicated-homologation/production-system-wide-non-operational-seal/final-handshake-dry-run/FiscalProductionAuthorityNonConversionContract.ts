export class FiscalProductionAuthorityNonConversionContract {
  public static getContract() {
    return {
      authorityNonConversionContractGenerated: true,
      signOffConvertedToAuthority: false,
      evidenceConvertedToAuthority: false,
      realActivationAuthorityGranted: false,
      description: 'Impedir conversão de sign-off/evidence em autoridade real.'
    };
  }
}
