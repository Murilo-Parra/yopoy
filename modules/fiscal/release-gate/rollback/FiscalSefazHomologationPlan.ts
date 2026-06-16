export class FiscalSefazHomologationPlan {
  public static getHomologationPlans(): any[] {
    const defaultFlags = {
      executableNow: false as false,
      sefazCalled: false as false,
      xmlSigned: false as false,
      pdfGenerated: false as false,
      requiresHomologationEnvironment: true as true,
      requiresManualApproval: true as true
    };

    return [
      { id: 'SH-01', name: 'Homologação NFe em ambiente separado', ...defaultFlags },
      { id: 'SH-02', name: 'Homologação NFCe em ambiente separado', ...defaultFlags },
      { id: 'SH-03', name: 'Validação certificado A1 sem expor senha', ...defaultFlags },
      { id: 'SH-04', name: 'Validação XML signer em mock', ...defaultFlags },
      { id: 'SH-05', name: 'Validação DANFE em sandbox sem PDF real', ...defaultFlags },
      { id: 'SH-06', name: 'Validação de contingência offline', ...defaultFlags },
      { id: 'SH-07', name: 'Validação de inutilização em mock', ...defaultFlags },
      { id: 'SH-08', name: 'Validação de cancelamento em mock', ...defaultFlags },
      { id: 'SH-09', name: 'Validação de carta de correção em mock', ...defaultFlags }
    ];
  }
}
