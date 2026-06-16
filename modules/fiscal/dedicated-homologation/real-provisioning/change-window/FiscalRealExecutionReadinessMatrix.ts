export class FiscalRealExecutionReadinessMatrix {
  public static getMatrix() {
    return [
      { domain: 'IAC_APPLY', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'INFRASTRUCTURE', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'DATABASE', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'SECRET_VAULT', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'CERTIFICATE', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'SEFAZ', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'XML_SIGNER', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'DANFE', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'OBSERVABILITY', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'ROLLBACK', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true },
      { domain: 'PRODUCTION_V2', readinessLevel: 'PLANNED', requiredBeforeRealExecution: true, readyForRealExecution: false, blockerReason: 'Aprovação pendente', activationBlocked: true }
    ];
  }
}
