export class FiscalRouteMirrorSafetyChecklist {
  public static getChecklist() {
    return {
      mirrorSafetyChecklistGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      requestCaptured: false,
      responseCaptured: false,
      description: 'Safety checklist for mirror/shadow verifying lack of real capture.'
    };
  }
}
