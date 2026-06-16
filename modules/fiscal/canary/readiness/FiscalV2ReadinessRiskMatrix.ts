import { FiscalV2ReadinessDomain, FiscalV2ReadinessRisk } from "./FiscalV2ReadinessTypes";

export class FiscalV2ReadinessRiskMatrix {
  public static getRisks(): FiscalV2ReadinessRisk[] {
    return [
      {
        id: "R-01",
        domain: FiscalV2ReadinessDomain.ROUTE_MAPPING,
        severity: "CRITICAL",
        likelihood: "LOW",
        impact: "HIGH",
        description: "Ativação indevida de rota V2.",
        mitigation: "Hard-off no RuntimeGuard, block routeToV2 no nível de ambiente.",
        blockerForRealActivation: true
      },
      {
        id: "R-02",
        domain: FiscalV2ReadinessDomain.SHADOW_PROXY,
        severity: "HIGH",
        likelihood: "MEDIUM",
        impact: "HIGH",
        description: "Divergência entre resposta legada e V2.",
        mitigation: "Validar schemas via Shadow Proxy Harness com Safe Shape.",
        blockerForRealActivation: true
      },
      {
        id: "R-03",
        domain: FiscalV2ReadinessDomain.AUDIT,
        severity: "CRITICAL",
        likelihood: "LOW",
        impact: "HIGH",
        description: "Vazamento de payload bruto em relatório.",
        mitigation: "Strict validation on difference object via FiscalSafeDifferenceBuilder.",
        blockerForRealActivation: true
      },
      {
        id: "R-04",
        domain: FiscalV2ReadinessDomain.SAFE_SHAPE,
        severity: "CRITICAL",
        likelihood: "LOW",
        impact: "HIGH",
        description: "Vazamento de dados sensíveis fiscais.",
        mitigation: "Sanitize deeply through Safe Shape Sanitizer pass.",
        blockerForRealActivation: true
      },
      {
        id: "R-05",
        domain: FiscalV2ReadinessDomain.CANARY_CONTROL,
        severity: "HIGH",
        likelihood: "LOW",
        impact: "MEDIUM",
        description: "Uso indevido de allowlist para roteamento real.",
        mitigation: "Check validation limits usage to proxy bypass tracking only.",
        blockerForRealActivation: true
      },
      {
        id: "R-06",
        domain: FiscalV2ReadinessDomain.RUNTIME_GUARD,
        severity: "HIGH",
        likelihood: "MEDIUM",
        impact: "HIGH",
        description: "Relaxamento futuro de routeToV2.",
        mitigation: "Alerting / IAM blocking on feature flags.",
        blockerForRealActivation: true
      },
      {
        id: "R-07",
        domain: FiscalV2ReadinessDomain.SERVICES,
        severity: "CRITICAL",
        likelihood: "LOW",
        impact: "CRITICAL",
        description: "SEFAZ real acionado prematuramente.",
        mitigation: "Ensure simulationOnly bypasses logic globally.",
        blockerForRealActivation: true
      },
      {
        id: "R-08",
        domain: FiscalV2ReadinessDomain.SERVICES,
        severity: "HIGH",
        likelihood: "LOW",
        impact: "CRITICAL",
        description: "XML assinado com engine incorreta.",
        mitigation: "Disable signer until full tests are approved.",
        blockerForRealActivation: true
      },
      {
        id: "R-09",
        domain: FiscalV2ReadinessDomain.SERVICES,
        severity: "MEDIUM",
        likelihood: "LOW",
        impact: "MEDIUM",
        description: "PDF/DANFE gerado com layout divergente.",
        mitigation: "Dry-run PDF generators isolated.",
        blockerForRealActivation: true
      },
      {
        id: "R-10",
        domain: FiscalV2ReadinessDomain.SERVICES,
        severity: "HIGH",
        likelihood: "LOW",
        impact: "MEDIUM",
        description: "Worker duplicado em ambiente horizontal.",
        mitigation: "Block worker spawning until scale strategy mapped.",
        blockerForRealActivation: true
      },
      {
        id: "R-11",
        domain: FiscalV2ReadinessDomain.RLS,
        severity: "CRITICAL",
        likelihood: "LOW",
        impact: "CRITICAL",
        description: "RLS enfraquecido ou bypass incorreto.",
        mitigation: "Review tenant_id mapping inside repository loops.",
        blockerForRealActivation: true
      },
      {
        id: "R-12",
        domain: FiscalV2ReadinessDomain.BOOT_POLICY,
        severity: "HIGH",
        likelihood: "LOW",
        impact: "HIGH",
        description: "Boot em produção sem banco.",
        mitigation: "Hard check inside initialize on AppLoader.",
        blockerForRealActivation: true
      },
      {
        id: "R-13",
        domain: FiscalV2ReadinessDomain.SHADOW_PROXY,
        severity: "MEDIUM",
        likelihood: "HIGH",
        impact: "LOW",
        description: "Latência futura de proxy shadow real.",
        mitigation: "Fire-and-forget promise chains in proxy wrapper.",
        blockerForRealActivation: false
      },
      {
        id: "R-14",
        domain: FiscalV2ReadinessDomain.SAFE_SHAPE,
        severity: "HIGH",
        likelihood: "LOW",
        impact: "HIGH",
        description: "Sanitização incompleta de campos fiscais novos.",
        mitigation: "Allowlist must be updated recursively upon new API changes.",
        blockerForRealActivation: true
      },
      {
        id: "R-15",
        domain: FiscalV2ReadinessDomain.CONTROLLERS,
        severity: "LOW",
        likelihood: "HIGH",
        impact: "LOW",
        description: "Débito por excesso de infraestrutura inerte sem ativação.",
        mitigation: "Follow map to Fase 5 rollouts.",
        blockerForRealActivation: false
      }
    ];
  }
}
