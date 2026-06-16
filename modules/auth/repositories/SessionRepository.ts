import { createSession, validateSession, revokeSession } from "../../../db";

export class SessionRepository {
  /**
   * Persists a newly created user session token
   */
  public async createSession(userId: string, companyId: string, token: string): Promise<void> {
    return createSession(userId, companyId, token);
  }

  /**
   * Validates and returns active session information
   */
  public async validateSession(token: string): Promise<any | null> {
    return validateSession(token);
  }

  /**
   * Revokes and invalidates a session token
   */
  public async revokeSession(token: string): Promise<void> {
    return revokeSession(token);
  }
}
