import { FiscalProviderResolver } from "../../../src/utils/locationResolver";

export class CompanyFiscalService {
  /**
   * Coordinates resolution of tax service providers and competent SEFAZ regions based on location
   */
  public resolveFiscalLocation(stateUf: string, city: string, ibgeCode?: string) {
    return FiscalProviderResolver(stateUf, city, ibgeCode);
  }
}
