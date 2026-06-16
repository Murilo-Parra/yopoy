export class FiscalNoInterceptionContract {
  public static generateContract() {
    return {
      noInterceptionContractGenerated: true,
      appUseModified: false,
      middlewareInstalled: false,
      proxyInstalled: false,
      tapInstalled: false,
      trafficChanged: false,
      description: 'No real interception. Middleware, proxies, and taps are not installed.'
    };
  }
}
