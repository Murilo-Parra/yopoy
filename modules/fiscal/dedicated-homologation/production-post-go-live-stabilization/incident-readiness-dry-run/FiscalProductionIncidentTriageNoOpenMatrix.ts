export class FiscalProductionIncidentTriageNoOpenMatrix {
  public static getMatrix() {
    return {
      incidentTriageNoOpenMatrixGenerated: true,
      realOperatorNotified: false,
      realSreNotified: false,
      description: 'Modelar triagem de incidentes sem abertura real. Não acionar operador real. Não notificar SRE real.'
    };
  }
}
