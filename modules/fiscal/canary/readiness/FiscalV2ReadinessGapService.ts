import { FiscalV2ReadinessDomain, FiscalV2ReadinessGap } from "./FiscalV2ReadinessTypes";

export class FiscalV2ReadinessGapService {
  public static getGaps(): FiscalV2ReadinessGap[] {
    return [
      {
        id: "G-01",
        domain: FiscalV2ReadinessDomain.ROUTE_MAPPING,
        description: "Nenhum roteamento real autorizado.",
        requiredAction: "Permitir roteamento de 1-5% do tráfego interno real em Fase 5.",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-02",
        domain: FiscalV2ReadinessDomain.SHADOW_PROXY,
        description: "Nenhuma validação em carga real do proxy shadow.",
        requiredAction: "Ativar shadow proxy no fluxo assíncrono durante Fase 5 inicial.",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-03",
        domain: FiscalV2ReadinessDomain.CANARY_CONTROL,
        description: "Nenhum canary produtivo de baixa porcentagem implementado.",
        requiredAction: "Configurar weights no Canary Control Plane.",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-04",
        domain: FiscalV2ReadinessDomain.AUDIT,
        description: "Nenhuma comparação real em tráfego de produção interceptado.",
        requiredAction: "Realizar amostragem live pós-Sefaz.",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-05",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhuma ativação de escrita produtiva V2.",
        requiredAction: "Ligar branches master do banco.",
        priority: "CRITICAL",
        blockerForRealActivation: true
      },
      {
        id: "G-06",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhuma transmissão SEFAZ pela V2.",
        requiredAction: "Validar certificado e conexões HTTP de transação.",
        priority: "CRITICAL",
        blockerForRealActivation: true
      },
      {
        id: "G-07",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhuma assinatura XML real pela V2.",
        requiredAction: "Portar algoritmos A1 para o node-forge custom.",
        priority: "CRITICAL",
        blockerForRealActivation: true
      },
      {
        id: "G-08",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhuma geração PDF real pela V2.",
        requiredAction: "Homologar layout DANFE.",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-09",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhum worker V2 isolado.",
        requiredAction: "Instanciar novos processos consumindo Bull/Redis V2.",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-10",
        domain: FiscalV2ReadinessDomain.CANARY_CONTROL,
        description: "Nenhum rollback automático real implementado.",
        requiredAction: "Criar fallback healthchecks (500 threshold).",
        priority: "HIGH",
        blockerForRealActivation: true
      },
      {
        id: "G-11",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhum SLA de latência V2 validado.",
        requiredAction: "Benchmark Cénario P99.",
        priority: "MEDIUM",
        blockerForRealActivation: true
      },
      {
        id: "G-12",
        domain: FiscalV2ReadinessDomain.SERVICES,
        description: "Nenhum teste massivo de concorrência fiscal V2.",
        requiredAction: "Stress test de 5k notas/segundo.",
        priority: "MEDIUM",
        blockerForRealActivation: true
      }
    ];
  }
}
