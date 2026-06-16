export class FiscalHomologationRunbook {
  public static getRunbook(): any[] {
    const baseFlags = {
      notExecutableNow: true as true,
      executed: false as false
    };

    return [
      { id: 'STEP-01', type: 'PRE-CHECK', action: 'Pré-check de boot policy', ...baseFlags },
      { id: 'STEP-02', type: 'PRE-CHECK', action: 'Pré-check de RLS', ...baseFlags },
      { id: 'STEP-03', type: 'PRE-CHECK', action: 'Pré-check de isolamento tenant', ...baseFlags },
      { id: 'STEP-04', type: 'PRE-CHECK', action: 'Pré-check de sandbox', ...baseFlags },
      { id: 'STEP-05', type: 'PRE-CHECK', action: 'Pré-check de certificado mock', ...baseFlags },
      { id: 'STEP-06', type: 'PRE-CHECK', action: 'Pré-check de SEFAZ mock', ...baseFlags },
      { id: 'STEP-07', type: 'PRE-CHECK', action: 'Pré-check de XML signer mock', ...baseFlags },
      { id: 'STEP-08', type: 'PRE-CHECK', action: 'Pré-check de DANFE mock', ...baseFlags },
      { id: 'STEP-09', type: 'EXECUTION', action: 'Etapa futura de NFe homologação', ...baseFlags },
      { id: 'STEP-10', type: 'EXECUTION', action: 'Etapa futura de NFCe homologação', ...baseFlags },
      { id: 'STEP-11', type: 'EXECUTION', action: 'Etapa futura de cancelamento mock', ...baseFlags },
      { id: 'STEP-12', type: 'EXECUTION', action: 'Etapa futura de inutilização mock', ...baseFlags },
      { id: 'STEP-13', type: 'EXECUTION', action: 'Etapa futura de contingência offline mock', ...baseFlags },
      { id: 'STEP-14', type: 'ROLLBACK', action: 'Rollback futuro', ...baseFlags },
      { id: 'STEP-15', type: 'COMMUNICATION', action: 'Comunicação de incidente futura', ...baseFlags }
    ];
  }
}
