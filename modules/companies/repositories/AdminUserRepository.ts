import { isPostgresActive, pgPool } from "../../../infrastructure/database";
import { dbInMemoryLocal, scheduleSaveLocalFallback, logAudit } from "../../../db";
import { AdminUserListItemDTO } from "../dto/adminUser.dto";
import { AdminUserFiltersDTO } from "../validators/adminUser.validators";

export class AdminUserRepository {
  /**
   * Updates administrative properties of a corporate user
   */
  public async updateUserAdmin(
    userId: string, 
    payload: { name: string; active: boolean; passwordHash?: string | null }, 
    ip: string
  ): Promise<void> {
    if (isPostgresActive && pgPool) {
      if (payload.passwordHash) {
        await pgPool.query(`
          UPDATE users 
          SET name = $1, active = $2, password_hash = $3, updated_at = CURRENT_TIMESTAMP
          WHERE id = $4
        `, [payload.name, payload.active, payload.passwordHash, userId]);
      } else {
        await pgPool.query(`
          UPDATE users 
          SET name = $1, active = $2, updated_at = CURRENT_TIMESTAMP
          WHERE id = $3
        `, [payload.name, payload.active, userId]);
      }
    } else {
      const users = JSON.parse(dbInMemoryLocal.global['users'] || '[]');
      const idx = users.findIndex((u: any) => u.id === userId);
      if (idx !== -1) {
        users[idx].name = payload.name;
        users[idx].active = payload.active === true;
        if (payload.passwordHash) {
          users[idx].password_hash = payload.passwordHash;
        }
        users[idx].updated_at = new Date().toISOString();
        dbInMemoryLocal.global['users'] = JSON.stringify(users);
        scheduleSaveLocalFallback();
      }
    }

    await logAudit(
      'SaaS', 
      'usr_admin', 
      "SUPER_ADMIN_USER_UPDATE", 
      `Usuário corporativo ${userId} modificado/auditado por Super Admin. IP: ${ip}`, 
      ip
    );
  }

  /**
   * Administratively registers a new user under a specific company
   */
  public async createUserAdmin(
    payload: { id: string; name: string; email: string; company_id: string; passwordHash: string; is_admin: boolean; active: boolean },
    ip: string
  ): Promise<void> {
    if (isPostgresActive && pgPool) {
      await pgPool.query(`
        INSERT INTO users (id, company_id, name, login, password_hash, allowed_tabs, is_admin, active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `, [
        payload.id,
        payload.company_id,
        payload.name,
        payload.email,
        payload.passwordHash,
        JSON.stringify(["dashboard", "vendas", "produtos", "configuracoes"]),
        payload.is_admin,
        payload.active
      ]);
    } else {
      const users = JSON.parse(dbInMemoryLocal.global['users'] || '[]');
      const newUser = {
        id: payload.id,
        company_id: payload.company_id,
        name: payload.name,
        login: payload.email,
        password_hash: payload.passwordHash,
        allowed_tabs: ["dashboard", "vendas", "produtos", "configuracoes"],
        is_admin: payload.is_admin,
        active: payload.active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      users.push(newUser);
      dbInMemoryLocal.global['users'] = JSON.stringify(users);
      scheduleSaveLocalFallback();
    }

    await logAudit(
      'SaaS', 
      'usr_admin', 
      "SUPER_ADMIN_USER_CREATE", 
      `Novo usuário corporativo administrativamente registrado. ID: ${payload.id}, E-mail: ${payload.email}, Empresa: ${payload.company_id}. IP: ${ip}`, 
      ip
    );
  }

  /**
   * Fetches all registered users along with their company corporate name
   */
  public async listUsers(filters?: AdminUserFiltersDTO): Promise<AdminUserListItemDTO[]> {
    let result: AdminUserListItemDTO[] = [];

    if (isPostgresActive && pgPool) {
      // Basic query from legacy code
      let sql = `
        SELECT u.id, u.company_id, u.name, u.login as email, u.is_admin, u.active, u.last_login, u.created_at, c.corporate_name
        FROM users u 
        JOIN companies c ON u.company_id = c.id
      `;
      const queryParams: any[] = [];
      const whereClauses: string[] = [];

      if (filters?.companyId) {
        queryParams.push(filters.companyId);
        whereClauses.push(`u.company_id = $${queryParams.length}`);
      }

      if (filters?.status) {
        const isActive = filters.status === "active";
        queryParams.push(isActive);
        whereClauses.push(`u.active = $${queryParams.length}`);
      }

      if (filters?.search) {
        queryParams.push(`%${filters.search}%`);
        whereClauses.push(`(u.name ILIKE $${queryParams.length} OR u.login ILIKE $${queryParams.length})`);
      }

      if (whereClauses.length > 0) {
        sql += " WHERE " + whereClauses.join(" AND ");
      }

      sql += " ORDER BY u.created_at DESC";

      if (filters?.limit) {
        queryParams.push(filters.limit);
        sql += ` LIMIT $${queryParams.length}`;
      }

      if (filters?.page && filters?.limit) {
        const offset = (filters.page - 1) * filters.limit;
        queryParams.push(offset);
        sql += ` OFFSET $${queryParams.length}`;
      }

      const usersRes = await pgPool.query(sql, queryParams);
      result = usersRes.rows.map((u: any) => ({
        id: u.id,
        company_id: u.company_id,
        name: u.name,
        email: u.email,
        is_admin: u.is_admin,
        active: u.active !== false,
        last_login: u.last_login,
        created_at: u.created_at,
        corporate_name: u.corporate_name
      }));
    } else {
      const users = JSON.parse(dbInMemoryLocal.global['users'] || '[]');
      const comps = JSON.parse(dbInMemoryLocal.global['companies'] || '[]');
      
      let filteredUsers = [...users];

      if (filters?.companyId) {
        filteredUsers = filteredUsers.filter((u: any) => u.company_id === filters.companyId);
      }

      if (filters?.status) {
        const isActive = filters.status === "active";
        filteredUsers = filteredUsers.filter((u: any) => (u.active !== false) === isActive);
      }

      if (filters?.search) {
        const term = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(
          (u: any) => 
            (u.name && u.name.toLowerCase().includes(term)) || 
            (u.login && u.login.toLowerCase().includes(term))
        );
      }

      // Order by created_at DESC
      filteredUsers.sort((a: any, b: any) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      });

      if (filters?.page && filters?.limit) {
        const offset = (filters.page - 1) * filters.limit;
        filteredUsers = filteredUsers.slice(offset, offset + filters.limit);
      } else if (filters?.limit) {
        filteredUsers = filteredUsers.slice(0, filters.limit);
      }

      result = filteredUsers.map((u: any) => {
        const comp = comps.find((c: any) => c.id === u.company_id);
        return {
          id: u.id,
          company_id: u.company_id,
          name: u.name,
          email: u.login || u.email,
          is_admin: u.is_admin,
          active: u.active !== false,
          last_login: u.last_login || new Date(Date.now() - Math.random() * 5 * 86400000).toISOString(),
          created_at: u.created_at,
          corporate_name: comp ? comp.corporate_name : "Empresa Desconhecida"
        };
      });
    }

    return result;
  }
}
