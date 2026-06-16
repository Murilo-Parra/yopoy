export class FiscalRealFreezeUnfreezeMatrix {
  public static getMatrix() {
    return [
      {
        domain: 'IaC',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'Banco de dados',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'Vault',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'Certificado A1',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'SEFAZ',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'XML signer',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'DANFE renderer',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'Observabilidade',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'Rollback',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      },
      {
        domain: 'Produção V2',
        freezeRequiredBeforeExecution: true,
        unfreezeRequiresPostValidation: true,
        frozenNow: false,
        unfrozenNow: false,
        realExecutionAllowed: false,
        activationBlocked: true
      }
    ];
  }
}
