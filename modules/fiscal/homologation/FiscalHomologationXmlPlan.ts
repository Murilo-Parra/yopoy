export class FiscalHomologationXmlPlan {
  public static getXmlPlans(): any {
    return {
      description: 'Desenhar validação futura de XML signer.',
      xmlSigned: false as false,
      notes: 'No real XML is signed during this administrative phase.'
    };
  }
}
