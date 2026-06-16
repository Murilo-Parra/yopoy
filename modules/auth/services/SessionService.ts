import crypto from "crypto";
import { SessionRepository } from "../repositories/SessionRepository";

export class SessionService {
  private sessionRepository: SessionRepository;

  constructor(sessionRepository = new SessionRepository()) {
    this.sessionRepository = sessionRepository;
  }

  /**
   * Generates a 32-byte cryptographic random token and registers a session
   */
  public async createSession(userId: string, companyId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    await this.sessionRepository.createSession(userId, companyId, token);
    return token;
  }

  /**
   * Validates if a token is linked to an active, valid session
   */
  public async validateSession(token: string): Promise<any | null> {
    return this.sessionRepository.validateSession(token);
  }

  /**
   * Destroys an existing session (revocation)
   */
  public async revokeSession(token: string): Promise<void> {
    await this.sessionRepository.revokeSession(token);
  }
}
