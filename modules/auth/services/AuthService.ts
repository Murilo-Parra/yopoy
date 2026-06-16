import bcrypt from "bcryptjs";
import { AuthRepository } from "../repositories/AuthRepository";
import { RegisterRequestDTO, LoginRequestDTO } from "../dto/auth.dto";
import { CompanyOnboardingService } from "../../companies";

export class AuthService {
  private authRepository: AuthRepository;
  private companyOnboardingService: CompanyOnboardingService;

  constructor(
    authRepository = new AuthRepository(),
    companyOnboardingService = new CompanyOnboardingService()
  ) {
    this.authRepository = authRepository;
    this.companyOnboardingService = companyOnboardingService;
  }

  /**
   * Performs user lookup of legitimate credentials
   */
  public async findUserByEmail(email: string): Promise<any | null> {
    return this.authRepository.findByEmail(email);
  }

  /**
   * Registers a brand new corporate tenant/admin
   */
  public async register(payload: RegisterRequestDTO): Promise<any> {
    // Hashear a senha
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(payload.password || "", salt);
    
    // Delegate to CompanyOnboardingService instead of AuthRepository
    return this.companyOnboardingService.createTenantWithAdmin({
      companyName: payload.companyName,
      adminName: payload.adminName,
      email: payload.email,
      password: hashedPassword,
      plan: payload.plan
    });
  }

  /**
   * Securely compares raw passwords with stored hashes
   */
  public comparePasswords(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * Handles user login failures and locks account if limit is reached
   */
  public async handleLoginFailure(userId: string): Promise<number | null> {
    return this.authRepository.incrementFailedAttempts(userId);
  }

  /**
   * Resets sequential failed attempts upon success
   */
  public async handleLoginSuccess(userId: string): Promise<void> {
    await this.authRepository.resetFailedAttempts(userId);
  }
}
