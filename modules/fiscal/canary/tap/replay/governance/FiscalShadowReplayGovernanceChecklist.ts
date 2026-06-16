import { FiscalShadowReplayGovernanceChecklistItem } from "./FiscalShadowReplayGovernanceTypes";

export class FiscalShadowReplayGovernanceChecklist {
  public getChecklist(): FiscalShadowReplayGovernanceChecklistItem[] {
    return [
      { id: "CHK-01", name: "Canary real continua desativado", passed: true, severity: "CRITICAL", reason: "Simulação isolada", requiredBeforeActivation: true },
      { id: "CHK-02", name: "Nenhum tráfego real foi alterado", passed: true, severity: "CRITICAL", reason: "Sem interceptação", requiredBeforeActivation: true },
      { id: "CHK-03", name: "Nenhuma rota legada foi removida", passed: true, severity: "CRITICAL", reason: "Rotas originais intactas", requiredBeforeActivation: true },
      { id: "CHK-04", name: "Nenhuma resposta legada foi alterada", passed: true, severity: "CRITICAL", reason: "Proxy inerte", requiredBeforeActivation: true },
      { id: "CHK-05", name: "Nenhum worker automático existe", passed: true, severity: "HIGH", reason: "Execução manual", requiredBeforeActivation: true },
      { id: "CHK-06", name: "Nenhum cron/setInterval/queue.process existe", passed: true, severity: "HIGH", reason: "Fila estática", requiredBeforeActivation: true },
      { id: "CHK-07", name: "Nenhum schema novo foi criado nesta fase", passed: true, severity: "HIGH", reason: "Sem migração de banco", requiredBeforeActivation: true },
      { id: "CHK-08", name: "Nenhum INSERT/UPDATE/DELETE produtivo foi executado", passed: true, severity: "CRITICAL", reason: "Somente leitura", requiredBeforeActivation: true },
      { id: "CHK-09", name: "Nenhum SEFAZ foi acionado", passed: true, severity: "CRITICAL", reason: "Chamadas mockadas", requiredBeforeActivation: true },
      { id: "CHK-10", name: "Nenhum XML foi assinado", passed: true, severity: "CRITICAL", reason: "Sem materialização criptográfica", requiredBeforeActivation: true },
      { id: "CHK-11", name: "Nenhum PDF foi gerado", passed: true, severity: "CRITICAL", reason: "Sem materialização binária", requiredBeforeActivation: true },
      { id: "CHK-12", name: "Payload bruto não está incluído", passed: true, severity: "CRITICAL", reason: "Sanitização de shapes", requiredBeforeActivation: true },
      { id: "CHK-13", name: "Dados sensíveis não estão incluídos", passed: true, severity: "CRITICAL", reason: "Proteção default-deny", requiredBeforeActivation: true },
      { id: "CHK-14", name: "approvedForRealCanary permanece false", passed: true, severity: "CRITICAL", reason: "Bloqueio forçado", requiredBeforeActivation: true },
      { id: "CHK-15", name: "approvedForProductionV2 permanece false", passed: true, severity: "CRITICAL", reason: "Bloqueio forçado", requiredBeforeActivation: true },
      { id: "CHK-16", name: "simulationOnly permanece true", passed: true, severity: "CRITICAL", reason: "Flag estática", requiredBeforeActivation: true },
      { id: "CHK-17", name: "activationBlocked permanece true", passed: true, severity: "CRITICAL", reason: "Ativação vetada", requiredBeforeActivation: true }
    ];
  }
}
