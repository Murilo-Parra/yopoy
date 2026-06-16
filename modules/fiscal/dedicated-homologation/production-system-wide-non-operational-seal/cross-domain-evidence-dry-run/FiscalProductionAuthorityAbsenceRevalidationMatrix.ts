export class FiscalProductionAuthorityAbsenceRevalidationMatrix {
  public static getMatrix() {
    return {
      authorityAbsenceRevalidationMatrixGenerated: true,
      realAuthorityRevalidated: false,
      evidenceConvertedToAuthority: false,
      realActivationAuthorityGranted: false,
      description: 'Revalidar ausência de autoridade real. Não conceder autoridade.'
    };
  }
}
