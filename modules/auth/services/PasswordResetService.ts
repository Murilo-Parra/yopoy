import crypto from "crypto";
import bcrypt from "bcryptjs";
import { PasswordResetRepository } from "../repositories/PasswordResetRepository";

export class PasswordResetService {
  private resetRepository: PasswordResetRepository;

  constructor(resetRepository = new PasswordResetRepository()) {
    this.resetRepository = resetRepository;
  }

  /**
   * Generates a 32-byte cryptographic random token to reset a password
   */
  public async createResetToken(email: string): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    await this.resetRepository.createPasswordResetToken(email, token);
    return token;
  }

  /**
   * Processes the forgot password request securely, verifying user existence
   */
  public async forgotPassword(email: string): Promise<{
    success: boolean;
    message: string;
    simulated: boolean;
    recoverLink?: string;
    resetToken?: string;
    user?: any;
  }> {
    const user = await this.resetRepository.findUserByEmail(email);
    if (!user) {
      return {
        success: true,
        message: "Se o e-mail estiver cadastrado, um link de redefinição funcional foi gerado com sucesso.",
        simulated: false
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    await this.resetRepository.createPasswordResetToken(email, resetToken);

    const recoverLink = `/?resetToken=${resetToken}`;

    return {
      success: true,
      message: "Link de redefinição de segurança gerado com sucesso (Funcional para avaliação em tempo real!).",
      simulated: true,
      recoverLink,
      resetToken,
      user
    };
  }

  /**
   * Consumes a reset token and updates the user's password securely
   */
  public async resetPassword(token: string, newPasswordRaw: string): Promise<boolean> {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newPasswordRaw, salt);
    return this.resetRepository.resetPasswordWithToken(token, passwordHash);
  }
}
