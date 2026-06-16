export class FiscalProductionOperationsSignatureActivationGateBlockerRegister {
  public static getBlockers() {
    return [
      'B-POSAG-01: Gate real bloqueado.',
      'B-POSAG-02: Autorização real bloqueada.',
      'B-POSAG-03: Emissão de token real de autorização bloqueada.',
      'B-POSAG-04: Produção V2 e routeToV2 bloqueados.',
      'B-POSAG-05: Legado obrigatório preservado.',
      'B-POSAG-06: Tráfego real inalterável.',
      'B-POSAG-07: Assinatura real bloqueada.',
      'B-POSAG-08: Assinatura criptográfica real bloqueada.',
      'B-POSAG-09: Consentimento e registros reais bloqueados.',
      'B-POSAG-10: Certificado/PFX/senha/chave privada/token/segredo reais bloqueados.',
      'B-POSAG-11: Crypto real bloqueada.',
      'B-POSAG-12: XML/PDF reais bloqueados.',
      'B-POSAG-13: Notificações reais bloqueadas.',
      'B-POSAG-14: Banco/DDL/DML/SEFAZ reais bloqueados.',
      'B-POSAG-15: Runtime/queue/job/worker reais bloqueados.',
      'B-POSAG-16: Operação produtiva real bloqueada.'
    ];
  }
}
