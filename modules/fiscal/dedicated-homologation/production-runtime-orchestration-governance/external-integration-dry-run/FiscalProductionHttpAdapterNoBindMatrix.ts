export class FiscalProductionHttpAdapterNoBindMatrix {
  public static getMatrix() {
    return {
      httpAdapterNoBindMatrixGenerated: true,
      realHttpAdapterBound: false,
      description: 'Modelar adapters HTTP/REST/SOAP sem bind real. Não criar client HTTP real autenticado.'
    };
  }
}
