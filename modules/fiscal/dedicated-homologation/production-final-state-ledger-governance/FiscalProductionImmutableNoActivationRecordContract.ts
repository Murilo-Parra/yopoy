export class FiscalProductionImmutableNoActivationRecordContract {
  public static getContract() {
    return {
      immutableNoActivationRecordContractGenerated: true,
      realLegalActivationRecordCreated: false,
      realDatabaseWritten: false,
      description: 'Modelar contrato de registro imutável de não ativação em modo documental. Não gerar registro legal real. Não gravar banco/filesystem/storage.'
    };
  }
}
