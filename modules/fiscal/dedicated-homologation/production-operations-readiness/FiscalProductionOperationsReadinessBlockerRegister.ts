export class FiscalProductionOperationsReadinessBlockerRegister {
  public static getBlockers() {
    return [
      'B-POR-01: Transição operacional real bloqueada.',
      'B-POR-02: Operação produtiva V2 bloqueada.',
      'B-POR-03: Autorização real bloqueada.',
      'B-POR-04: Gate real bloqueado.',
      'B-POR-05: Cutover/go-live/rollback reais bloqueados.',
      'B-POR-06: Produção V2 bloqueada.',
      'B-POR-07: routeToV2 bloqueado.',
      'B-POR-08: Legado obrigatório preservado.',
      'B-POR-09: Tráfego real inalterável.',
      'B-POR-10: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-POR-11: Captura, duplicação e espelhamento reais bloqueados.',
      'B-POR-12: Endpoint e handlers reais bloqueados.',
      'B-POR-13: Deploy/release/canary/rollout reais bloqueados.',
      'B-POR-14: Runtime/queue/job/worker reais bloqueados.',
      'B-POR-15: Command runner/shell reais bloqueados.',
      'B-POR-16: Banco/transação/DDL/DML reais bloqueados.',
      'B-POR-17: SEFAZ real bloqueada.',
      'B-POR-18: Certificado/PFX/senha/crypto/XML/PDF reais bloqueados.',
      'B-POR-19: Notificação real bloqueada.',
      'B-POR-20: Pacote/artefato executável real bloqueado.'
    ];
  }
}
