import { pgPool } from '../../../../db';
import { CustomProvider } from './CustomProvider';
import { nfseProviderManager } from '../NfseProviderManager';

export class CustomProviderManager {
  static async loadAllCustomProviders() {
    try {
      if (!pgPool) return; // Might be in frontend or no connection
      
      const result = await pgPool.query(`
        SELECT id, name FROM custom_nfse_providers WHERE active = true
      `);
      
      for (const row of result.rows) {
        const providerName = `Custom_${row.name.replace(/[^a-zA-Z0-9]/g, '')}`;
        
        // Let's create a specialized class instance for it
        const customProvider = new CustomProvider(providerName, row.id);
        
        // Also fetch templates / mappings to cache if we wanted, 
        // but can be fetch dynamically too.
        
        nfseProviderManager.registerProvider(providerName, customProvider);
        console.log(`[CustomProviderManager] Registered custom provider ${providerName}`);
      }
    } catch (err) {
      console.error('Error loading custom providers:', err);
    }
  }
}
