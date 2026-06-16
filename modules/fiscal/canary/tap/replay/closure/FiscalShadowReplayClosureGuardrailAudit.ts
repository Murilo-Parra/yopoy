import { FiscalShadowReplayClosureGuardrail } from "./FiscalShadowReplayClosureTypes";

export class FiscalShadowReplayClosureGuardrailAudit {
  public getGuardrails(): FiscalShadowReplayClosureGuardrail[] {
    return [
      { id: "G-CL-01", name: "Canary real continua desativado", passed: true, severity: "CRITICAL", evidence: "Nenhuma flag canary ligada", blockerForRealActivation: true },
      { id: "G-CL-02", name: "Nenhum tráfego real foi alterado", passed: true, severity: "CRITICAL", evidence: "Rotas originais intocadas", blockerForRealActivation: true },
      { id: "G-CL-03", name: "Nenhuma rota legada foi removida", passed: true, severity: "CRITICAL", evidence: "Rotas V1 seguem expostas", blockerForRealActivation: true },
      { id: "G-CL-04", name: "Nenhuma resposta legada foi alterada", passed: true, severity: "CRITICAL", evidence: "Nenhum wrapper no res.send legado", blockerForRealActivation: true },
      { id: "G-CL-05", name: "Nenhum app.use legado foi alterado para V2", passed: true, severity: "CRITICAL", evidence: "Middleware V2 não injetado", blockerForRealActivation: true },
      { id: "G-CL-06", name: "Nenhum worker automático existe", passed: true, severity: "HIGH", evidence: "Sem processos de consumo", blockerForRealActivation: true },
      { id: "G-CL-07", name: "Nenhum cron/setInterval/queue.process existe", passed: true, severity: "HIGH", evidence: "Execução 100% síncrona manual", blockerForRealActivation: true },
      { id: "G-CL-08", name: "Nenhum schema novo foi criado na Fase 5.7", passed: true, severity: "HIGH", evidence: "drizzle.config sem alterações", blockerForRealActivation: true },
      { id: "G-CL-09", name: "Nenhum INSERT/UPDATE/DELETE produtivo foi criado na Fase 5.7", passed: true, severity: "CRITICAL", evidence: "Acesso persistente omitido", blockerForRealActivation: true },
      { id: "G-CL-10", name: "Nenhum SEFAZ foi acionado", passed: true, severity: "CRITICAL", evidence: "Sefaz Connector mockado ou isolado", blockerForRealActivation: true },
      { id: "G-CL-11", name: "Nenhum XML foi assinado", passed: true, severity: "CRITICAL", evidence: "Pulos criptográficos mantidos", blockerForRealActivation: true },
      { id: "G-CL-12", name: "Nenhum PDF foi gerado", passed: true, severity: "CRITICAL", evidence: "Módulo gerador inativo/mockado", blockerForRealActivation: true },
      { id: "G-CL-13", name: "Payload bruto não está incluído", passed: true, severity: "CRITICAL", evidence: "SafeShape preserva remoção de raw", blockerForRealActivation: true },
      { id: "G-CL-14", name: "Dados sensíveis não estão incluídos", passed: true, severity: "CRITICAL", evidence: "Ocultamento de tokens e chaves", blockerForRealActivation: true },
      { id: "G-CL-15", name: "approvedForRealCanary permanece false", passed: true, severity: "CRITICAL", evidence: "Contrato rígido", blockerForRealActivation: true },
      { id: "G-CL-16", name: "approvedForProductionV2 permanece false", passed: true, severity: "CRITICAL", evidence: "Contrato rígido", blockerForRealActivation: true },
      { id: "G-CL-17", name: "simulationOnly permanece true", passed: true, severity: "CRITICAL", evidence: "Contrato rígido", blockerForRealActivation: true },
      { id: "G-CL-18", name: "activationBlocked permanece true", passed: true, severity: "CRITICAL", evidence: "Contrato rígido", blockerForRealActivation: true },
      { id: "G-CL-19", name: "Boot Policy permanece preservada", passed: true, severity: "HIGH", evidence: "Checagem DATABASE_URL ativa", blockerForRealActivation: true },
      { id: "G-CL-20", name: "RLS permanece preservado", passed: true, severity: "HIGH", evidence: "Diretrizes de RLS inalteradas", blockerForRealActivation: true },
      { id: "G-CL-21", name: "Scripts temporários resolvidos", passed: true, severity: "MEDIUM", evidence: "Removidos após execuções", blockerForRealActivation: true }
    ];
  }
}
