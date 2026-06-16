/**
 * DTOs for Admin Company Control
 */

export interface AdminCompanyListItemDTO {
  id: string;
  corporate_name: string;
  trade_name: string;
  cnpj?: string | null;
  plan?: string;
  status?: string;
  trial_ends_at?: string | Date | null;
  expires_at?: string | Date | null;
  created_at?: string | Date;
  updated_at?: string | Date | null;
  usage_products: number;
  usage_transactions: number;
  usage_invoices: number;
}

export interface AdminCompanyStatsDTO {
  totalCompanies: number;
  activeCompanies: number;
  inactiveCompanies: number;
  trialCompanies: number;
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  accessesToday: number;
  accessesMonth: number;
  mrr: number;
  estimatedAnnualRevenue: number;
  affiliatesCount: number;
  newRegistrationsRecent: number;
}

export interface AdminCompanyUpdateRequestDTO {
  corporate_name: string;
  trade_name: string;
  cnpj?: string | null;
  plan: string;
  status: string;
  trial_ends_at?: string | null;
  expires_at?: string | null;
}

export interface AdminCompanyUpdateResponseDTO {
  success: boolean;
  message: string;
}

export interface AdminCompanyDeleteResponseDTO {
  success: boolean;
  message: string;
}
