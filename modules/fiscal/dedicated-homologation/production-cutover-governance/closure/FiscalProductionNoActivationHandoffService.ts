export class FiscalProductionNoActivationHandoffService {
  public static getHandoff() {
    return {
      noActivationHandoffGenerated: true,
      noCutoverHandoffOnly: true,
      approvedForRealCutover: false,
      approvedForProductionV2: false,
      description: 'Gera handoff final de não ativação. Declara que o domínio 27 fecha sem autorizar cutover real.'
    };
  }
}
