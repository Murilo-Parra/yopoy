export class FiscalProductionOperationsStakeholderSoDReview {
  public static getReview() {
    return {
      stakeholderSoDReviewGenerated: true,
      realOperationsHandoffCompleted: false,
      title: 'Stakeholder Segregation of Duties Review',
      description: 'Revisar segregação de funções de modo documental. Não concluir handoff operacional real. Não elevar privilégio real.'
    };
  }
}
