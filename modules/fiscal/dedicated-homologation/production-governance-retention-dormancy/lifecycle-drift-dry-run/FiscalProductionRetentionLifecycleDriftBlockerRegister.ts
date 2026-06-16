export class FiscalProductionRetentionLifecycleDriftBlockerRegister {
  public static getBlockers(): string[] {
    return [
      'B-PRLD-01: Avaliação real de expiração bloqueada.',
      'B-PRLD-02: Deleção real bloqueada.',
      'B-PRLD-03: Mutação real de lifecycle bloqueada.',
      'B-PRLD-04: Aplicação real de política de retenção bloqueada.',
      'B-PRLD-05: Aplicação real de versão de política bloqueada.',
      'B-PRLD-06: Transição real de estado de archive bloqueada.',
      'B-PRLD-07: Movimentação, compactação e reclassificação real bloqueadas.',
      'B-PRLD-08: Persistência real de lifecycle/retenção/deleção/custody drift bloqueada.',
      'B-PRLD-09: PDF/ZIP/JSON/CSV reais bloqueados.',
      'B-PRLD-10: Exportação real bloqueada.',
      'B-PRLD-11: Notificação real bloqueada.',
      'B-PRLD-12: Hash, assinatura e proof reais bloqueados.',
      'B-PRLD-13: Filesystem, storage e banco bloqueados.',
      'B-PRLD-14: Payload, XML, PDF, tenant data e documento fiscal reais bloqueados.',
      'B-PRLD-15: Aprovação e execução real de go-live bloqueadas.',
      'B-PRLD-16: Autoridade real de ativação bloqueada.',
      'B-PRLD-17: Gate e token reais bloqueados.',
      'B-PRLD-18: Produção V2 e routeToV2 bloqueados.',
      'B-PRLD-19: Legado obrigatório preservado.',
      'B-PRLD-20: Tráfego real bloqueado.',
      'B-PRLD-21: Runtime, queue, job e worker reais bloqueados.',
      'B-PRLD-22: Banco, DML, DDL e migration reais bloqueados.',
      'B-PRLD-23: SEFAZ e API externa reais bloqueadas.',
      'B-PRLD-24: Webhook, callback e notification provider reais bloqueados.',
      'B-PRLD-25: Token, API key, secret, certificate, PFX e private key bloqueados.',
      'B-PRLD-26: Crypto e assinatura XML reais bloqueadas.',
      'B-PRLD-27: Lint global com ESLint v9 flat config reconhecido como pendência.',
      'B-PRLD-28: TS2308/namespace overlap preexistente reconhecido como pendência.',
      'B-PRLD-29: Namespace overlap introduzido pelo 44.3 bloqueado.'
    ];
  }
}
