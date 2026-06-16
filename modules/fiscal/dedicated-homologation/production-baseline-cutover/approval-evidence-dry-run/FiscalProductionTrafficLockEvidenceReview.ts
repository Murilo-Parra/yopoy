export class FiscalProductionTrafficLockEvidenceReview {
  public static getReview() {
    return {
      trafficLockEvidenceReviewGenerated: true,
      trafficChanged: false,
      proxyInstalled: false,
      middlewareInstalled: false,
      tapInstalled: false,
      description: 'Revisa evidência de tráfego travado. Não altera tráfego real. Não instala proxy/middleware/tap.'
    };
  }
}
