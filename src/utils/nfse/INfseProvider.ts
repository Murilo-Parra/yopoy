export interface NfseConfig {
  companyId: string;
  municipalInscription: string;
  ibgeCode: string;
  environment: 'producao' | 'homologacao';
  urlProducao?: string;
  urlHomologacao?: string;
  certificateId: string;
  [key: string]: any;
}

export interface NfseData {
  id: string;
  customer: any;
  service: any;
  totalValue: number;
  [key: string]: any;
}

export interface INfseProvider {
  name: string;
  
  validate(config: NfseConfig, data: NfseData): Promise<{ valid: boolean; errors: string[] }>;
  
  generateXml(config: NfseConfig, data: NfseData): Promise<string>;
  
  sign(xml: string, certificateId: string): Promise<string>;
  
  send(config: NfseConfig, signedXml: string): Promise<{ success: boolean; protocol?: string; message?: string; rawResponse?: string }>;
  
  query(config: NfseConfig, protocol: string): Promise<{ status: string; xml?: string; message?: string }>;
  
  cancel(config: NfseConfig, invoiceNumber: string, reason: string): Promise<{ success: boolean; message?: string }>;
  
  downloadXml(config: NfseConfig, invoiceNumber: string): Promise<string>;
  
  downloadPdf(config: NfseConfig, invoiceNumber: string): Promise<string>;
  
  healthCheck(config: NfseConfig): Promise<boolean>;
  
  validateConfiguration?(config: NfseConfig): Promise<{ valid: boolean; errors: string[] }>;
  
  getProviderInfo?(): any;
  
  syncStatus?(config: NfseConfig, invoiceNumber: string): Promise<{ status: string; message?: string }>;
  
  substitute?(config: NfseConfig, oldInvoiceNumber: string, data: NfseData): Promise<{ success: boolean; protocol?: string; message?: string; rawResponse?: string }>;
}
