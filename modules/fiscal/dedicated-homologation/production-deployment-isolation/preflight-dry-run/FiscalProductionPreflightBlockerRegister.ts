export class FiscalProductionPreflightBlockerRegister {
  public static getBlockers() {
    return [
      'B-PPF-01: Aprovação real de deploy bloqueada.',
      'B-PPF-02: Deploy real bloqueado.',
      'B-PPF-03: Release real bloqueado.',
      'B-PPF-04: Rollout real bloqueado.',
      'B-PPF-05: Aprovação real de cutover bloqueada.',
      'B-PPF-06: Cutover real bloqueado.',
      'B-PPF-07: Rollback real bloqueado.',
      'B-PPF-08: Publicação real de pacote bloqueada.',
      'B-PPF-09: Artefato executável real bloqueado.',
      'B-PPF-10: Produção V2 bloqueada.',
      'B-PPF-11: routeToV2 bloqueado.',
      'B-PPF-12: Legado obrigatório preservado.',
      'B-PPF-13: Tráfego real inalterável neste módulo.',
      'B-PPF-14: Proxy/middleware/tap real bloqueados.',
      'B-PPF-15: app.use/router.use reais intocados.',
      'B-PPF-16: Handler legado e V2 real bloqueados.',
      'B-PPF-17: Captura de request/response/payload real bloqueada.',
      'B-PPF-18: Worker/scheduler real bloqueado.',
      'B-PPF-19: Gate unlock real bloqueado.',
      'B-PPF-20: Autorização real bloqueada.',
      'B-PPF-21: Banco/DDL/DML reais bloqueados.',
      'B-PPF-22: SEFAZ/certificado/XML/PDF reais bloqueados.'
    ];
  }
}
