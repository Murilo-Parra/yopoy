import { FiscalShadowReplayGovernanceRisk } from "./FiscalShadowReplayGovernanceTypes";

export class FiscalShadowReplayGovernanceRiskService {
  public getRisks(): FiscalShadowReplayGovernanceRisk[] {
    return [
      { id: "R-GOV-01", severity: "CRITICAL", description: "Interpretação indevida do relatório como autorização de ativação.", mitigation: "Mensagens claras de block", blockerForRealActivation: true },
      { id: "R-GOV-02", severity: "HIGH", description: "Métricas insuficientes por dependência de memória.", mitigation: "Uso de memory-only limitará volume", blockerForRealActivation: true },
      { id: "R-GOV-03", severity: "HIGH", description: "Perda de dados após restart da API.", mitigation: "Fase inerte temporária", blockerForRealActivation: true },
      { id: "R-GOV-04", severity: "CRITICAL", description: "Ausência de carga real validada.", mitigation: "Precisa testes reais controlados", blockerForRealActivation: true },
      { id: "R-GOV-05", severity: "CRITICAL", description: "Ausência de interceptação real validada.", mitigation: "Rota legada opera normalmente", blockerForRealActivation: true },
      { id: "R-GOV-06", severity: "CRITICAL", description: "Ausência de emissão SEFAZ V2 validada.", mitigation: "Mock inibe detecção de falha de layout", blockerForRealActivation: true },
      { id: "R-GOV-07", severity: "CRITICAL", description: "Ausência de assinatura XML V2 validada.", mitigation: "Validar futuramente a infra de PKI", blockerForRealActivation: true },
      { id: "R-GOV-08", severity: "CRITICAL", description: "Ausência de geração DANFE/PDF V2 validada.", mitigation: "Pode haver desvio de layout", blockerForRealActivation: true },
      { id: "R-GOV-09", severity: "HIGH", description: "Sanitização dependente de contratos mantidos manualmente.", mitigation: "Validadores no sanitizer", blockerForRealActivation: true },
      { id: "R-GOV-10", severity: "HIGH", description: "Futuro risco de latência em proxy real.", mitigation: "Medição de latencia passiva necessária", blockerForRealActivation: true }
    ];
  }
}
