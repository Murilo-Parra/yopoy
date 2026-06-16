import { FiscalHomologationEvaluationInput, FiscalHomologationBlueprintStatus } from './FiscalHomologationBlueprintTypes';

export class FiscalHomologationPolicy {
  public static evaluateRequest(input: FiscalHomologationEvaluationInput): {
    homologationExecuted: false;
    sefazCalled: false;
    xmlSigned: false;
    pdfGenerated: false;
    certificateLoaded: false;
    activationBlocked: true;
    status: string;
    blockers: string[];
  } {
    const blockers: string[] = [];

    if (input.forceExecute === true) {
      blockers.push('forceExecute is explicitly blocked in Phase 10.1.');
    }

    if (input.requestedAction && (input.requestedAction.toLowerCase().includes('prod') || input.requestedAction.toLowerCase().includes('real'))) {
      blockers.push('Productive requested actions are prohibited.');
    }

    blockers.push('Homologation Blueprint 10.1 é uma avaliação administrativa. Homologação real, SEFAZ real, certificado real, XML assinado e PDF real permanecem bloqueados.');

    return {
      homologationExecuted: false,
      sefazCalled: false,
      xmlSigned: false,
      pdfGenerated: false,
      certificateLoaded: false,
      activationBlocked: true,
      status: FiscalHomologationBlueprintStatus.HOMOLOGATION_BLOCKED,
      blockers
    };
  }
}
