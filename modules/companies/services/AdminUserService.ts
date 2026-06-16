import bcrypt from "bcryptjs";
import { AdminUserRepository } from "../repositories/AdminUserRepository";
import { AdminUserListItemDTO, AdminUserCreateRequestDTO, AdminUserUpdateRequestDTO } from "../dto/adminUser.dto";
import { AdminUserFiltersDTO } from "../validators/adminUser.validators";

export class AdminUserService {
  private repository: AdminUserRepository;

  constructor(repository = new AdminUserRepository()) {
    this.repository = repository;
  }

  /**
   * Business logic for listing users in global administration panel
   */
  public async listUsers(filters?: AdminUserFiltersDTO): Promise<AdminUserListItemDTO[]> {
    const rawUsers = await this.repository.listUsers(filters);

    // double guarantee that sensitive fields are not in the response:
    return rawUsers.map(user => ({
      id: user.id,
      company_id: user.company_id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      active: user.active,
      last_login: user.last_login,
      created_at: user.created_at,
      corporate_name: user.corporate_name
    }));
  }

  /**
   * Business logic for creating a user in global administration panel
   */
  public async createUser(payload: AdminUserCreateRequestDTO, ip: string): Promise<AdminUserListItemDTO> {
    const userId = "usr_" + Date.now();
    
    // Default password to 'elparrar123' if not provided
    const password = payload.password?.trim() || "elparrar123";
    const passwordHash = bcrypt.hashSync(password, 10);

    const active = payload.active !== false;
    const is_admin = payload.is_admin === true;

    await this.repository.createUserAdmin({
      id: userId,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      company_id: payload.company_id,
      passwordHash,
      is_admin,
      active
    }, ip);

    return {
      id: userId,
      company_id: payload.company_id,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      is_admin,
      active,
      last_login: null,
      created_at: new Date(),
      corporate_name: ""
    };
  }

  /**
   * Business logic for updating a user in global administration panel
   */
  public async updateUser(userId: string, payload: AdminUserUpdateRequestDTO, ip: string): Promise<void> {
    if (!userId) {
      throw new Error("ID do usuário é obrigatório.");
    }

    let passwordHash: string | null = null;
    if (payload.new_password && payload.new_password.trim().length >= 6) {
      passwordHash = bcrypt.hashSync(payload.new_password.trim(), 10);
    }

    await this.repository.updateUserAdmin(userId, {
      name: payload.name,
      active: payload.active === true,
      passwordHash
    }, ip);
  }
}
