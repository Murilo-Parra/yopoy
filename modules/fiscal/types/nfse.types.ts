export enum NfseProviderType {
  BETHA = "BETHA",
  DSF = "DSF",
  FIORILLI = "FIORILLI",
  IPM = "IPM",
  ISSNET = "ISSNET",
  SIGISS = "SIGISS",
  SIMPLISS = "SIMPLISS",
  WEBISS = "WEBISS",
  CUSTOM = "CUSTOM"
}

export interface NfseProviderConfig {
  providerType: NfseProviderType;
  endpointUrl: string;
  clientId?: string;
  clientSecret?: string;
  username?: string;
  password?: string;
  token?: string;
  signInvoices: boolean;
  signRps: boolean;
  certificateRequired: boolean;
}

export interface NfseServiceItem {
  code: string;
  name: string;
  aliquot: number;
  taxable: boolean;
  itemCnae?: string;
  nationalCode?: string;
}

export interface NfseTransmissionResult {
  success: boolean;
  invoiceNumber?: string;
  verificationCode?: string;
  xmlSent: string;
  xmlReceived?: string;
  statusMessage?: string;
  errors?: string[];
}

export interface NfseQueryResult {
  success: boolean;
  found: boolean;
  invoiceNumber?: string;
  verificationCode?: string;
  xmlReceived?: string;
  statusMessage?: string;
  errors?: string[];
}

export enum NfseQueueStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED"
}
