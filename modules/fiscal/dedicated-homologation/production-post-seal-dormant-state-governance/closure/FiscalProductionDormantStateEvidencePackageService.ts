export class FiscalProductionDormantStateEvidencePackageService {
  public static getPackage() {
    return {
      evidencePackageGenerated: true,
      description: 'Pacote de evidências de dormência (leitura apenas).',
      realExportCreated: false
    };
  }
}
