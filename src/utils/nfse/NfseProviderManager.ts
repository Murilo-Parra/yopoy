import { INfseProvider, NfseConfig } from './INfseProvider';

class NfseProviderManager {
  private providers: Map<string, INfseProvider> = new Map();

  registerProvider(providerName: string, provider: INfseProvider) {
    this.providers.set(providerName, provider);
  }

  getProvider(providerName: string): INfseProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider not found: ${providerName}`);
    }
    return provider;
  }

  hasProvider(providerName: string): boolean {
    return this.providers.has(providerName);
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}

export const nfseProviderManager = new NfseProviderManager();
