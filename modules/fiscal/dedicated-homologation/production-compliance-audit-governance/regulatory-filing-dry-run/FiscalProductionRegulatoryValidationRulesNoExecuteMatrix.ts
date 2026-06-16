export class FiscalProductionRegulatoryValidationRulesNoExecuteMatrix {
  public static getMatrix() {
    return {
      validationRulesNoExecuteMatrixGenerated: true,
      realSefazCalled: false,
      realCryptoUsed: false,
      realHashCalculated: false,
      description: 'Modelar regras de validação sem executar validação externa. Não chamar SEFAZ. Não chamar regulador externo. Não usar crypto/hash.'
    };
  }
}
