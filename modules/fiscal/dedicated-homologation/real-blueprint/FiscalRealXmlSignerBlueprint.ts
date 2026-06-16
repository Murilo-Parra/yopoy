export class FiscalRealXmlSignerBlueprint {
  public static getBlueprint() {
    return {
      futureIsolatedSigner: 'Serviço autônomo sem estado',
      canonicalizationPolicy: 'C14N',
      validationPolicy: 'XSD local via schemas oficiais SEFAZ',
      keyAccessPolicy: 'Em memória, non-exportable se suportado no Vault KMS',
      xmlSigned: false,
      realXmlSigned: false
    };
  }
}
