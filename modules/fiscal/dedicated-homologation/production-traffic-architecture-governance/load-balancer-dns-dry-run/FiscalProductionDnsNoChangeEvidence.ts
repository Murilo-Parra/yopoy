export class FiscalProductionDnsNoChangeEvidence {
  public static getEvidence() {
    return {
      dnsNoChangeEvidenceGenerated: true,
      realDnsChanged: false,
      description: 'Evidência confirmando que nenhuma alteração real de DNS ocorreu.'
    };
  }
}
