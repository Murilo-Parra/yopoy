export class FiscalProductionBaselineCutoverBlockerRegister {
  public static getBlockers() {
    return [
      'B-PBC-01: Baseline cutover real bloqueado.',
      'B-PBC-02: Go-live real bloqueado.',
      'B-PBC-03: Autorização real bloqueada.',
      'B-PBC-04: Gate real bloqueado.',
      'B-PBC-05: Produção V2 bloqueada.',
      'B-PBC-06: routeToV2 bloqueado.',
      'B-PBC-07: Legado obrigatório preservado.',
      'B-PBC-08: Tráfego real inalterável.',
      'B-PBC-09: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-PBC-10: Captura, duplicação e espelhamento reais bloqueados.',
      'B-PBC-11: Endpoint e handlers reais bloqueados.',
      'B-PBC-12: Deploy/release/rollback/canary/rollout reais bloqueados.',
      'B-PBC-13: Runtime/queue/job/worker reais bloqueados.',
      'B-PBC-14: Command runner/shell reais bloqueados.',
      'B-PBC-15: Banco/transação/DDL/DML reais bloqueados.',
      'B-PBC-16: SEFAZ real bloqueada.',
      'B-PBC-17: Certificado/PFX/senha/crypto reais bloqueados.',
      'B-PBC-18: XML/PDF reais bloqueados.',
      'B-PBC-19: Notificação real bloqueada.',
      'B-PBC-20: Pacote/artefato executável real bloqueado.'
    ];
  }
}
