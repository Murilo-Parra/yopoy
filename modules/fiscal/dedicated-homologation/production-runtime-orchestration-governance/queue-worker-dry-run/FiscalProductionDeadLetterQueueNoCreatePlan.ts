export class FiscalProductionDeadLetterQueueNoCreatePlan {
  public static getPlan() {
    return {
      deadLetterQueueNoCreatePlanGenerated: true,
      realDeadLetterQueueCreated: false,
      description: 'Modelar DLQ sem criação real.'
    };
  }
}
