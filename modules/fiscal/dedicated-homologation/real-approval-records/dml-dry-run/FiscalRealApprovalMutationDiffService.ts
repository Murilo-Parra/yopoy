export class FiscalRealApprovalMutationDiffService {
  public static generateDiff() {
    return {
      mutationDiffGenerated: true,
      rawValuesIncluded: false,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      diff: {
        fieldsChanged: [
          { field: 'status', typeOfChange: 'MUTATION_SIMULATED' },
          { field: 'approverB', typeOfChange: 'MUTATION_SIMULATED' }
        ],
        notes: 'Simulated diff. No sensitive old/new values exposed.'
      }
    };
  }
}
