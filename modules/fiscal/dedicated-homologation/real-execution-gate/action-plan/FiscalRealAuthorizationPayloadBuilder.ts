import { FiscalRealAuthorizationPayloadInput, FiscalRealAuthorizationPayload } from './FiscalRealExecutionActionPlanTypes';

export class FiscalRealAuthorizationPayloadBuilder {
  public static buildPayload(input: FiscalRealAuthorizationPayloadInput): FiscalRealAuthorizationPayload {
    const sanitizedMetadata = { ...input.metadata };

    // Sanitization: remove sensitive keys
    const sensitiveKeys = ['token', 'password', 'certificate', 'privateKey', 'pfx', 'DATABASE_URL'];
    for (const key of sensitiveKeys) {
      if (sanitizedMetadata && sanitizedMetadata[key]) {
        delete sanitizedMetadata[key];
      }
    }

    return {
      payloadId: 'PAYLOAD-SIM-' + Date.now(),
      generatedAt: new Date().toISOString(),
      requestedBy: input.requestedBy,
      companyId: input.companyId,
      requestedAction: input.requestedAction,
      authorizationPurpose: input.authorizationPurpose,
      sanitizedMetadata,
      payloadExecutable: false,
      payloadSigned: false,
      payloadPersisted: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      realExecutionAuthorized: false,
      realExecutionGateUnlocked: false,
      realExecutionStarted: false,
      activationBlocked: true
    };
  }

  public static getTemplate(): FiscalRealAuthorizationPayload {
    return this.buildPayload({});
  }
}
