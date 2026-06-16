export interface RegisterRequestDTO {
  companyName: string;
  adminName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  plan?: string;
}

export interface LoginRequestDTO {
  email: string;
  password?: string;
}

export interface AuthenticatedUserDTO {
  id: string;
  name: string;
  email: string;
  company_id: string;
  corporateName: string;
  tradeName: string;
  cnpj: string;
  plan: string;
  allowedTabs: string[];
  is_admin: boolean;
  isAdmin?: boolean;
}

export interface LoginResponseDTO {
  success: boolean;
  token: string;
  user: AuthenticatedUserDTO;
}

export interface LogoutRequestDTO {
  token: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ForgotPasswordResponseDTO {
  success: boolean;
  message: string;
  simulated?: boolean;
  recoverLink?: string;
  resetToken?: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  password?: string;
  confirmPassword?: string;
}

export interface ResetPasswordResponseDTO {
  success: boolean;
  message: string;
}

export interface SessionResponseDTO {
  id: string;
  company_id: string;
  user_id: string;
  active: boolean;
  name?: string;
  login?: string;
  corporate_name?: string;
  trade_name?: string;
  cnpj?: string;
  plan?: string;
  allowed_tabs?: string[];
  is_admin?: boolean;
}
