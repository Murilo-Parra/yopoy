import { describe, it, expect } from 'vitest';
import { assertLocalDatabaseUrl } from '../../postgres/guards/assertLocalDatabaseUrl';

describe('Native DB Guardrails', () => {
  it('Should allow localhost', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@localhost:5432/db')).not.toThrow();
  });

  it('Should allow 127.0.0.1', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@127.0.0.1:5432/db')).not.toThrow();
  });

  it('Should block supabase.co', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@db.xyz.supabase.co:5432/postgres'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block amazonaws.com', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@mydb.c123.us-east-1.rds.amazonaws.com/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block railway.app', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@xxx.railway.app:5432/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block neon.tech', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@xxx.neon.tech:5432/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block IPs that are public or non-loopback', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@192.168.1.100:5432/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block sslmode=require', () => {
    expect(() => assertLocalDatabaseUrl('postgres://user:pass@localhost:5432/db?sslmode=require'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should block invalid protocol', () => {
    expect(() => assertLocalDatabaseUrl('mysql://user:pass@localhost:5432/db'))
      .toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });
});
