export class FiscalProductionProcessManagerNoCreateMatrix {
  public static getMatrix() {
    return {
      processManagerNoCreateMatrixGenerated: true,
      realProcessManagerCreated: false,
      description: 'Modelar process managers sem criação real. Não abrir processo real, pid real ou pool real.'
    };
  }
}
