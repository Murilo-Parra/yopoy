import { createPasswordResetToken, resetPasswordWithToken, findUserByEmail } from "../../../db";

export class PasswordResetRepository {
  /**
   * Persists a newly created password reset token
   */
  public async createToken(email: string, token: string): Promise<void> {
    return createPasswordResetToken(email, token);
  }

  /**
   * Persists a newly created password reset token (compatibility name)
   */
  public async createPasswordResetToken(email: string, token: string): Promise<void> {
    return this.createToken(email, token);
  }

  /**
   * Consumes a reset token to update a user's password hash
   */
  public async resetPassword(token: string, newPasswordHash: string): Promise<boolean> {
    return resetPasswordWithToken(token, newPasswordHash);
  }

  /**
   * Consumes a reset token to update a user's password hash (compatibility name)
   */
  public async resetPasswordWithToken(token: string, newPasswordHash: string): Promise<boolean> {
    return this.resetPassword(token, newPasswordHash);
  }

  /**
   * Find user by email (transitional database lookup)
   */
  public async findUserByEmail(email: string): Promise<any | null> {
    return findUserByEmail(email);
  }
}
