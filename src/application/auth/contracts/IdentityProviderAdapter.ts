import { SafeAuthUser } from '../types';

export interface AuthenticateWithPasswordInput {
  email: string;
  passwordPlainText: string;
}

export interface ExternalIdentityInput {
  providerName: string;
  externalUserId: string;
}

export interface IdentityProviderAdapter {
  authenticateWithPassword(input: AuthenticateWithPasswordInput): Promise<SafeAuthUser | null>;
  getExternalIdentity(input: ExternalIdentityInput): Promise<SafeAuthUser | null>;
  linkExternalIdentity(userId: string, input: ExternalIdentityInput): Promise<void>;
  unlinkExternalIdentity(userId: string, providerName: string): Promise<void>;
}
