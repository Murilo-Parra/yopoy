import { 
  SefazEndpointConfig, 
  SefazTransmissionResult, 
  SefazCancelResult, 
  SefazProtocolResult, 
  SefazDistributionResult 
} from "../types/sefaz.types";

export interface ISefazCommunicator {
  transmit(xmlSigned: string, config: SefazEndpointConfig): Promise<SefazTransmissionResult>;
  cancel(xmlSigned: string, config: SefazEndpointConfig): Promise<SefazCancelResult>;
  queryProtocol(payload: { key: string }, config: SefazEndpointConfig): Promise<SefazProtocolResult>;
  invalidate(payload: { uf: string; year: number; cnpj: string; series: number; startNumber: number; endNumber: number; justification: string }, config: SefazEndpointConfig): Promise<SefazProtocolResult>;
  sendCce(xmlSigned: string, config: SefazEndpointConfig): Promise<SefazProtocolResult>;
  distributeDfe(payload: { uf: string; cnpj: string; ultNSU?: string; nsu?: string }, config: SefazEndpointConfig): Promise<SefazDistributionResult>;
  status(config: SefazEndpointConfig): Promise<{ online: boolean; latencyMs?: number; statusMessage?: string }>;
}
