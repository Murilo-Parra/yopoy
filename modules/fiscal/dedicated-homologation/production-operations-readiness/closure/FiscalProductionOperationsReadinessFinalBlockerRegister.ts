export class FiscalProductionOperationsReadinessFinalBlockerRegister {
  public static getBlockers() {
    return [
      'B-PORC-01: Closure operacional real bloqueado.',
      'B-PORC-02: Handoff operacional real bloqueado.',
      'B-PORC-03: Ativação operacional real bloqueada.',
      'B-PORC-04: Acesso operacional real bloqueado.',
      'B-PORC-05: RBAC/privilégio/sessão assistida reais bloqueados.',
      'B-PORC-06: Leitura real de dados/documentos/XML/PDF/PFX/certificado/segredo bloqueada.',
      'B-PORC-07: Incidente/runbook/mitigação reais bloqueados.',
      'B-PORC-08: Observability/métrica/telemetria/dashboard/alerta reais bloqueados.',
      'B-PORC-09: Notificação real bloqueada.',
      'B-PORC-10: Produção V2 e routeToV2 bloqueados.',
      'B-PORC-11: Legado obrigatório preservado.',
      'B-PORC-12: Tráfego real inalterável.',
      'B-PORC-13: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PORC-14: Captura de request/response/payload real bloqueada.',
      'B-PORC-15: Endpoint e handlers reais bloqueados.',
      'B-PORC-16: Runtime/queue/job/worker reais bloqueados.',
      'B-PORC-17: Banco/DDL/DML/SEFAZ/certificados reais bloqueados.'
    ];
  }
}
