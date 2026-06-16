import { describe, it, expect } from 'vitest';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';

describe('Local Database Guardrails', () => {
  it('Should allow localhost', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@localhost:5432/db')).not.toThrow();
  });

  it('Should allow 127.0.0.1', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@127.0.0.1:5432/db')).not.toThrow();
  });

  it('Should allow internal docker host yopoy-postgres', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@yopoy-postgres:5432/db')).not.toThrow();
  });

  it('Should block supabase domains', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@db.xyz.supabase.co:5432/postgres'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block RDS domains', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@mydb.c123.us-east-1.rds.amazonaws.com/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block IPs that are not explicit local loopbacks', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@192.168.1.100:5432/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block sslmode=require', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@localhost:5432/db?sslmode=require'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });
});
