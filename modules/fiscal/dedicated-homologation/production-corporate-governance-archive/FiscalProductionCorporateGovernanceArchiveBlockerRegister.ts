export class FiscalProductionCorporateGovernanceArchiveBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PCGA-01: Archive real bloqueado.',
      'B-PCGA-02: Registro corporativo real bloqueado.',
      'B-PCGA-03: Arquivo real de archive bloqueado.',
      'B-PCGA-04: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PCGA-05: Persistência real de archive e continuidade bloqueada.',
      'B-PCGA-06: Exportação real bloqueada.',
      'B-PCGA-07: Submissão real para auditor/regulador bloqueada.',
      'B-PCGA-08: Notificação real bloqueada.',
      'B-PCGA-09: Hash, assinatura e proof reais bloqueados.',
      'B-PCGA-10: Filesystem, storage e banco bloqueados.',
      'B-PCGA-11: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PCGA-12: Registro legal real de ativação bloqueado.',
      'B-PCGA-13: Aprovação e execução real de go-live bloqueadas.',
      'B-PCGA-14: Comando real de ativação bloqueado.',
      'B-PCGA-15: Autoridade real de ativação bloqueada.',
      'B-PCGA-16: Gate e token reais bloqueados.',
      'B-PCGA-17: Produção V2 e routeToV2 bloqueados.',
      'B-PCGA-18: Legado obrigatório preservado.',
      'B-PCGA-19: Tráfego, load balancer e DNS reais bloqueados.',
      'B-PCGA-20: Runtime, queue, job, worker, scheduler, cron e shell reais bloqueados.',
      'B-PCGA-21: Banco, DML, DDL e migration reais bloqueados.',
      'B-PCGA-22: SEFAZ e API externa reais bloqueadas.',
      'B-PCGA-23: Webhook, callback e notification provider reais bloqueados.',
      'B-PCGA-24: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PCGA-25: Crypto e assinatura XML reais bloqueadas.',
      'B-PCGA-26: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PCGA-27: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PCGA-28: Namespace overlap introduzido pelo 43.1 bloqueado.'
    ];
  }
}
