export class FiscalProductionOperationsAccessHandoffBlockerRegister {
  public static getBlockers() {
    return [
      'B-POA-01: Acesso operacional real bloqueado.',
      'B-POA-02: Alteração real de RBAC bloqueada.',
      'B-POA-03: Elevação real de privilégio bloqueada.',
      'B-POA-04: Criação real de usuário bloqueada.',
      'B-POA-05: Modificação real de permissão bloqueada.',
      'B-POA-06: Sessão assistida real bloqueada.',
      'B-POA-07: Leitura real de dados de tenant bloqueada.',
      'B-POA-08: Leitura real de documentos fiscais bloqueada.',
      'B-POA-09: Leitura de XML/PDF/PFX/certificado/segredo real bloqueada.',
      'B-POA-10: Notificação real de operador bloqueada.',
      'B-POA-11: Transição operacional real bloqueada.',
      'B-POA-12: Operação produtiva V2 bloqueada.',
      'B-POA-13: Autorização/gate reais bloqueados.',
      'B-POA-14: routeToV2 bloqueado e legado obrigatório preservado.',
      'B-POA-15: Tráfego real inalterável.',
      'B-POA-16: Proxy/middleware/tap/mirror/sniffer reais bloqueados.',
      'B-POA-17: Captura de request/response/payload real bloqueada.',
      'B-POA-18: Endpoint e handlers reais bloqueados.',
      'B-POA-19: Runtime/queue/job/worker reais bloqueados.',
      'B-POA-20: Banco/DDL/DML/SEFAZ/certificados reais bloqueados.'
    ];
  }
}
