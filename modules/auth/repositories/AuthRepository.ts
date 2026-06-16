import { findUserByEmail, incrementFailedAttempts, resetFailedAttempts } from "../../../db";

export class AuthRepository {
  /**
   * Finds a user by email address
   */
  public async findUserByEmail(email: string): Promise<any | null> {
    return findUserByEmail(email);
  }

  /**
   * Finds a user by email address (compatibility alias)
   */
  public async findByEmail(email: string): Promise<any | null> {
    return this.findUserByEmail(email);
  }

  /**
   * Increments the serial failed login attempts for a user
   */
  public async incrementFailedAttempts(userId: string): Promise<number | null> {
    return incrementFailedAttempts(userId);
  }

  /**
   * Resets the serial failed login attempts for a user
   */
  public async resetFailedAttempts(userId: string): Promise<void> {
    return resetFailedAttempts(userId);
  }
}
