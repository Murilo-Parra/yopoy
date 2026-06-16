export class FiscalReleaseGateCriteriaMatrix {
  public static getCriteria(): string[] {
    return [
      '1. Release real não pode ser aprovado nesta fase.',
      '2. Canary real não pode ser aprovado nesta fase.',
      '3. Produção V2 não pode ser aprovada nesta fase.',
      '4. Tráfego real não pode ser alterado.',
      '5. app.use legado não pode ser alterado.',
      '6. Middleware real não pode ser instalado.',
      '7. Tap real não pode ser instalado.',
      '8. Load real não pode ser executado.',
      '9. Worker automático não pode ser criado.',
      '10. Scheduler não pode ser criado.',
      '11. SEFAZ não pode ser acionado.',
      '12. XML não pode ser assinado.',
      '13. PDF não pode ser gerado.',
      '14. Escrita em tabela fiscal real não pode ocorrer.',
      '15. Payload bruto não pode ser exposto.',
      '16. Dado sensível não pode ser exposto.',
      '17. Boot Policy deve permanecer preservada.',
      '18. RLS deve permanecer preservado.',
      '19. Rotas legadas devem permanecer preservadas.',
      '20. Respostas legadas devem permanecer preservadas.'
    ];
  }
}
