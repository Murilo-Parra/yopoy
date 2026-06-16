export class FiscalDedicatedXmlSignerContract {
  public static getContract() {
    return {
      description: 'Contrato futuro para assinatura XML homologação',
      signerIsolationPlanned: true as true,
      xmlSigned: false as false,
      realXmlSigned: false as false
    };
  }
}
