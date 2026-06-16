export class FiscalProductionCommitteeDeliberationBlockerRegister {
  public static getBlockers() {
    return [
      'B-PCD-01: Aprovação real de comitê bloqueada.',
      'B-PCD-02: Persistência real de deliberação bloqueada.',
      'B-PCD-03: Approval record real bloqueado.',
      'B-PCD-04: Notificação externa real bloqueada.',
      'B-PCD-05: Gate real bloqueado.',
      'B-PCD-06: Autorização real bloqueada.',
      'B-PCD-07: Deploy real bloqueado.',
      'B-PCD-08: Release real bloqueado.',
      'B-PCD-09: Rollout real bloqueado.',
      'B-PCD-10: Canary real bloqueado.',
      'B-PCD-11: Cutover real bloqueado.',
      'B-PCD-12: Rollback real bloqueado.',
      'B-PCD-13: Pacote real bloqueado.',
      'B-PCD-14: Artefato executável real bloqueado.',
      'B-PCD-15: Produção V2 bloqueada.',
      'B-PCD-16: routeToV2 bloqueado.',
      'B-PCD-17: Legado obrigatório preservado.',
      'B-PCD-18: Tráfego real inalterável.',
      'B-PCD-19: Proxy/middleware/tap real bloqueados.',
      'B-PCD-20: app.use/router.use reais intocados.',
      'B-PCD-21: Handler legado e V2 real bloqueados.',
      'B-PCD-22: Captura/duplicação/espelhamento real bloqueados.',
      'B-PCD-23: Worker/scheduler real bloqueado.',
      'B-PCD-24: Banco/DDL/DML reais bloqueados.',
      'B-PCD-25: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
