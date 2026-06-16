export class FiscalLoadRunnerGuardrails {
  public static getChecklist(): string[] {
    return [
      '1. Load runner real não pode ser executado.',
      '2. executionEnabled deve permanecer false.',
      '3. executionStarted deve permanecer false.',
      '4. loadExecuted deve permanecer false.',
      '5. realTrafficGenerated deve permanecer false.',
      '6. Endpoint real não pode ser chamado.',
      '7. Handler legado não pode ser chamado.',
      '8. Handler V2 operacional não pode ser chamado.',
      '9. Worker não pode ser criado.',
      '10. Scheduler não pode ser criado.',
      '11. cron/setInterval/queue.process não pode existir.',
      '12. app.use legado não pode ser alterado.',
      '13. Middleware real não pode ser instalado.',
      '14. Tap real não pode ser instalado.',
      '15. SEFAZ não pode ser acionado.',
      '16. XML não pode ser assinado.',
      '17. PDF não pode ser gerado.',
      '18. INSERT/UPDATE/DELETE fiscal real não pode existir.',
      '19. routeToV2 deve permanecer false.',
      '20. routeToLegacy deve permanecer true.',
      '21. approvedForRealLoadTest deve permanecer false.',
      '22. approvedForRealCanary deve permanecer false.',
      '23. approvedForProductionV2 deve permanecer false.',
      '24. payloadIncluded deve permanecer false.',
      '25. sensitiveDataIncluded deve permanecer false.'
    ];
  }
}
