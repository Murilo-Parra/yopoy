export class FiscalProductionOperationsStakeholderSignatureBlockerRegister {
  public static getBlockers() {
    return [
      'B-POSS-01: Coleta de assinatura real bloqueada.',
      'B-POSS-02: Coleta de assinatura criptográfica real bloqueada.',
      'B-POSS-03: Consentimento real bloqueado.',
      'B-POSS-04: Persistência de registro real de assinatura bloqueada.',
      'B-POSS-05: Persistência de atestado real bloqueada.',
      'B-POSS-06: Notificação real de stakeholder/signatário bloqueada.',
      'B-POSS-07: Webhook/Slack/WhatsApp/e-mail/pager/PagerDuty/Opsgenie reais bloqueados.',
      'B-POSS-08: Autorização real bloqueada.',
      'B-POSS-09: Gate real bloqueado.',
      'B-POSS-10: Operação produtiva real bloqueada.',
      'B-POSS-11: Handoff operacional real bloqueado.',
      'B-POSS-12: Produção V2 e routeToV2 bloqueados.',
      'B-POSS-13: Legado obrigatório preservado.',
      'B-POSS-14: Tráfego real inalterável.',
      'B-POSS-15: Certificado/PFX/senha/segredo/crypto reais bloqueados.',
      'B-POSS-16: XML/PDF reais bloqueados.',
      'B-POSS-17: Banco/DDL/DML/SEFAZ reais bloqueados.',
      'B-POSS-18: Runtime/queue/job/worker reais bloqueados.'
    ];
  }
}
