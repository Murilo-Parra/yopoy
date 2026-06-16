import { RegisterRequestDTO, LoginRequestDTO, ResetPasswordRequestDTO, ForgotPasswordRequestDTO } from "../dto/auth.dto";

export class AuthValidators {
  /**
   * Validate forgot password input
   */
  public static validateForgotPassword(data: ForgotPasswordRequestDTO): { success: boolean; error?: string } {
    const { email } = data;

    if (!email) {
      return { success: false, error: "O campo de e-mail é obrigatório." };
    }

    return { success: true };
  }

  /**
   * Validate user registration inputs
   */
  public static validateRegister(data: RegisterRequestDTO): { success: boolean; error?: string } {
    const { companyName, adminName, email, password, confirmPassword } = data;

    if (!companyName || !adminName || !email || !password || !confirmPassword) {
      return { success: false, error: "Todos os campos obrigatórios devem ser preenchidos para continuar." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "O e-mail preenchido possui formato sintático inválido." };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "A senha e a confirmação de senha não coincidem." };
    }

    if (password.length < 6) {
      return { success: false, error: "A senha deve conter no mínimo 6 caracteres por segurança." };
    }

    return { success: true };
  }

  /**
   * Validate user login inputs
   */
  public static validateLogin(data: LoginRequestDTO): { success: boolean; error?: string } {
    const { email, password } = data;

    if (!email || !password) {
      return { success: false, error: "Por favor, insira o seu e-mail e senha de segurança." };
    }

    return { success: true };
  }

  /**
   * Validate password reset inputs
   */
  public static validateResetPassword(data: ResetPasswordRequestDTO): { success: boolean; error?: string } {
    const { token, password, confirmPassword } = data;

    if (!token || !password || !confirmPassword) {
      return { success: false, error: "Token de autenticação e preenchimento de nova senha são obrigatórios." };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "A nova senha e a confirmação de senha não conferem." };
    }

    if (password.length < 6) {
      return { success: false, error: "A nova senha deve possuir no mínimo 6 dígitos." };
    }

    return { success: true };
  }
}
