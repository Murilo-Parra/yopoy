export class FiscalProductionComplianceExceptionWaiverNoPersistencePlan {
  public static getPlan() {
    return {
      exceptionWaiverNoPersistencePlanGenerated: true,
      realWaiverPersisted: false,
      realExceptionPersisted: false,
      description: 'Modelar exception/waiver sem persistência.'
    };
  }
}
