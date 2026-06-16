import { FiscalShadowMirrorDependencyType } from './FiscalShadowMirrorTypes';

export class FiscalShadowMirrorDependencyMap {
  public static getDependenciesForRoute(operationId: string): FiscalShadowMirrorDependencyType[] {
    const deps: FiscalShadowMirrorDependencyType[] = [
      FiscalShadowMirrorDependencyType.AUTH,
      FiscalShadowMirrorDependencyType.RLS
    ];

    if (operationId.startsWith('GET_')) {
      deps.push(FiscalShadowMirrorDependencyType.DATABASE_READ);
    } else if (operationId.startsWith('CREATE_') || operationId.startsWith('UPDATE_') || operationId.startsWith('DELETE_')) {
      deps.push(FiscalShadowMirrorDependencyType.DATABASE_WRITE);
    }

    if (operationId.includes('EMIT') || operationId.includes('TRANSMIT') || operationId.includes('CANCEL') || operationId.includes('INUTILIZAR')) {
      deps.push(FiscalShadowMirrorDependencyType.SEFAZ);
      deps.push(FiscalShadowMirrorDependencyType.XML_SIGNING);
      deps.push(FiscalShadowMirrorDependencyType.CERTIFICATE_ACCESS);
    }

    if (operationId.includes('DANFE') || operationId.includes('PDF')) {
      deps.push(FiscalShadowMirrorDependencyType.PDF_GENERATION);
    }

    return deps;
  }
}
