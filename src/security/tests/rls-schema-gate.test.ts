import { describe, it, expect } from 'vitest';

describe('RLS Schema Unit Tests', () => {
  const REQUIRED_TABLES = ['companies', 'users', 'sales', 'sale_items', 'payments'];

  const validateSql = (sql: string) => {
    const errors: string[] = [];

    REQUIRED_TABLES.forEach(table => {
      const enableRegex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+ENABLE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
      if (!enableRegex.test(sql)) {
        errors.push(`Missing ENABLE RLS on ${table}`);
      }
    });

    REQUIRED_TABLES.forEach(table => {
      const forceRegex = new RegExp(`ALTER\\s+TABLE\\s+${table}\\s+FORCE\\s+ROW\\s+LEVEL\\s+SECURITY`, 'i');
      if (!forceRegex.test(sql)) {
        errors.push(`Missing FORCE RLS on ${table}`);
      }
    });

    // Check dynamic block or static USING/WITH CHECK statements of other tables
    const hasUsing = sql.toLowerCase().includes('using');
    const hasCheck = sql.toLowerCase().includes('with check');
    if (!hasUsing || !hasCheck) {
      errors.push('Missing USING or WITH CHECK policy templates');
    }

    return errors;
  };

  it('should pass on a fully secure SQL template with ENABLE and FORCE RLS scripts', () => {
    const validTestSchema = `
      -- 1. Enable RLS
      ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
      ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
      ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;

      -- 2. Force RLS
      ALTER TABLE companies FORCE ROW LEVEL SECURITY;
      ALTER TABLE users FORCE ROW LEVEL SECURITY;
      ALTER TABLE sales FORCE ROW LEVEL SECURITY;
      ALTER TABLE payments FORCE ROW LEVEL SECURITY;
      ALTER TABLE sale_items FORCE ROW LEVEL SECURITY;

      -- 3. Policies
      CREATE POLICY comp_policy ON companies FOR ALL USING (id = 1) WITH CHECK (id = 1);
      
      -- dynamic loop
      USING (company_id = 2) WITH CHECK (company_id = 2);
    `;

    const errors = validateSql(validTestSchema);
    expect(errors.length).toBe(0);
  });

  it('should catch missing ALTER TABLE ENABLE/FORCE statements', () => {
    const invalidTestSchema = `
      ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
      ALTER TABLE companies FORCE ROW LEVEL SECURITY;
      
      -- Policies template present
      USING (company_id = 2) WITH CHECK (company_id = 2);
    `;

    const errors = validateSql(invalidTestSchema);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.includes('Missing ENABLE RLS on users'))).toBe(true);
    expect(errors.some(e => e.includes('Missing FORCE RLS on sales'))).toBe(true);
  });

  it('should complain if USING or WITH CHECK are absent', () => {
    const invalidTestSchema = `
      -- 1. Enable RLS
      ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
      ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
      ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;

      -- 2. Force RLS
      ALTER TABLE companies FORCE ROW LEVEL SECURITY;
      ALTER TABLE users FORCE ROW LEVEL SECURITY;
      ALTER TABLE sales FORCE ROW LEVEL SECURITY;
      ALTER TABLE payments FORCE ROW LEVEL SECURITY;
      ALTER TABLE sale_items FORCE ROW LEVEL SECURITY;

      -- Policies lacks validation
      CREATE POLICY user_policy ON users FOR ALL USING (id = current_tenant);
    `;

    const errors = validateSql(invalidTestSchema);
    expect(errors.some(e => e.includes('Missing USING or WITH CHECK'))).toBe(true);
  });
});
