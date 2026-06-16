/**
 * DTOs for Admin User Control (Sprint 3.6)
 */

export interface AdminUserListItemDTO {
  id: string;
  company_id: string;
  name: string;
  email: string;
  is_admin: boolean;
  active: boolean;
  last_login?: string | null;
  created_at: string | Date;
  corporate_name: string;
}

export type AdminUserListResponseDTO = AdminUserListItemDTO[];

export interface AdminUserCreateRequestDTO {
  name: string;
  email: string;
  company_id: string;
  password?: string;
  is_admin?: boolean;
  active?: boolean;
}

export interface AdminUserCreateResponseDTO {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    company_id: string;
    is_admin: boolean;
    active: boolean;
  };
}

export interface AdminUserUpdateRequestDTO {
  name: string;
  active: boolean;
  force_reset_password?: boolean;
  new_password?: string;
}

export interface AdminUserUpdateResponseDTO {
  success: boolean;
  message: string;
}

