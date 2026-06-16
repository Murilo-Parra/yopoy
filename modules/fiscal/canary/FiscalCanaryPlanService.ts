export class FiscalCanaryPlanService {
  public getPlanOverview(): object {
    return {
      title: "Plano de Migração Canary - Módulo Fiscal V2",
      sprintConfig: "4.17",
      status: "PLANNING_ONLY",
      simulationOnly: true,
      phases: [
        {
          id: "PHASE_A",
          name: "Canary Somente Leitura",
          description: "Rotas GET (ex: listar documentos). Risco baixo. Depende de Shadow Matching > 90%.",
          prerequisites: ["0 Blockers", "Sample Size > 100", "Validação por Master Admin"]
        },
        {
          id: "PHASE_B",
          name: "Canary Dry-Run Activo",
          description: "Roteamento ativo para V2 operando em modo dry-run, sem alterar banco legado (rollback after success).",
          prerequisites: ["Sucesso Phase A", "Validação de performance e concorrência"]
        },
        {
          id: "PHASE_C",
          name: "Canary Sandbox Controlado",
          description: "Persistência em V2 com cleanup automático em banco simulado.",
          prerequisites: ["Sucesso Phase B", "Isolamento de Tenant Auditável"]
        },
        {
          id: "PHASE_D",
          name: "Canary Produção Limitada (FUTURO)",
          description: "Rotas selecionadas operam na V2 em tenants autorizados. Assinatura e SEFAZ ativados.",
          prerequisites: ["Sucesso Phase C", "Feature Flag ativada manualmente", "Fallback imediato disponível"]
        }
      ],
      currentActionsAllowed: "Apenas simulação visual. Respostas oficiais e infra legada continuam 100% ativas.",
      forbiddenActions: [
        "Desligar rotas legadas",
        "Ativar comunicação produtiva SEFAZ V2",
        "Assinar XML no V2",
        "Redirecionar HTTP para V2 como handler final official"
      ]
    };
  }
}
