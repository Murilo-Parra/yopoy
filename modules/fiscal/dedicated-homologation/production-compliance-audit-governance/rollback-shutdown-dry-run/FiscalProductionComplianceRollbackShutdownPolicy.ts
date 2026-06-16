export class FiscalProductionComplianceRollbackShutdownPolicy {
  public static getPolicy() {
    return {
      name: 'PRODUCTION_COMPLIANCE_ROLLBACK_SHUTDOWN_POLICY',
      rules: [
        'MUST_USE_ROLLBACK_NO_OP_BLUEPRINT',
        'MUST_USE_V2_SHUTDOWN_NO_OP_CONTRACT',
        'MUST_NOT_EXECUTE_REAL_ROLLBACK',
        'MUST_NOT_EXECUTE_REAL_V2_SHUTDOWN'
      ],
      enforcementLevel: 'STRICT',
      readOnly: true,
      governanceOnly: true,
      simulationOnly: true
    };
  }
}
