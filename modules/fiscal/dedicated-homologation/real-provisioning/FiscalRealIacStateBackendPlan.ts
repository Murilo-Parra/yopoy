export class FiscalRealIacStateBackendPlan {
  public static getPlan() {
    return {
      plannedBackendType: 's3-or-gcs',
      stateEncryptionRequired: true,
      stateLockingRequired: true,
      stateAccessRestricted: true,
      realBackendCreated: false,
      stateWritten: false,
      secretMaterialInState: false
    };
  }
}
