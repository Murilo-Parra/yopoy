import { NfseProviderConfig, NfseTransmissionResult, NfseQueryResult } from "../types/nfse.types";

export interface INfseProvider {
  transmit(payload: { xmlRps: string; config: NfseProviderConfig }): Promise<NfseTransmissionResult>;
  query(payload: { invoiceNumber: string; config: NfseProviderConfig }): Promise<NfseQueryResult>;
  cancel(payload: { invoiceNumber: string; justification: string; config: NfseProviderConfig }): Promise<{ success: boolean; canceledAt?: string; statusMessage?: string; errors?: string[] }>;
  validateConfig(config: NfseProviderConfig): Promise<{ valid: boolean; errors?: string[] }>;
}
