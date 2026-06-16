export class FiscalDay2SupportAccessBlockerRegister {
  public static getBlockers() {
    return [
      'B-D2SA-01: Acesso real de suporte bloqueado.',
      'B-D2SA-02: Alteração real de RBAC bloqueada.',
      'B-D2SA-03: Elevação real de privilégio bloqueada.',
      'B-D2SA-04: Criação real de usuário bloqueada.',
      'B-D2SA-05: Modificação real de permissão bloqueada.',
      'B-D2SA-06: Sessão assistida real bloqueada.',
      'B-D2SA-07: Acesso real a dados de tenant bloqueado.',
      'B-D2SA-08: Acesso real a documento fiscal bloqueado.',
      'B-D2SA-09: Leitura real de XML/PDF/PFX/segredo bloqueada.',
      'B-D2SA-10: Notificação externa real bloqueada.',
      'B-D2SA-11: Operação day-2 real bloqueada.',
      'B-D2SA-12: Runbook/incidente/alerta/observability reais bloqueados.',
      'B-D2SA-13: Produção V2 bloqueada.',
      'B-D2SA-14: routeToV2 bloqueado.',
      'B-D2SA-15: Legado obrigatório preservado.',
      'B-D2SA-16: Tráfego real inalterável.',
      'B-D2SA-17: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-D2SA-18: app.use/router.use reais intocados.',
      'B-D2SA-19: Handler legado e V2 real bloqueados.',
      'B-D2SA-20: Captura/duplicação/espelhamento real bloqueados.',
      'B-D2SA-21: Runtime/queue/job/worker reais bloqueados.',
      'B-D2SA-22: Command runner/shell reais bloqueados.',
      'B-D2SA-23: Transação real de banco bloqueada.',
      'B-D2SA-24: Banco/DDL/DML reais bloqueados.',
      'B-D2SA-25: SEFAZ real bloqueada.',
      'B-D2SA-26: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-D2SA-27: XML/PDF reais bloqueados.',
      'B-D2SA-28: Autorização real bloqueada.',
      'B-D2SA-29: Gate real bloqueado.',
      'B-D2SA-30: Deploy/cutover/rollback reais bloqueados.',
      'B-D2SA-31: Pacote/artefato executável real bloqueado.'
    ];
  }
}
