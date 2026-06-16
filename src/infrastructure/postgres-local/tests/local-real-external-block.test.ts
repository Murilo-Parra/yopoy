import { describe, it, expect } from 'vitest';
import { createServerAppContainer } from '../../../composition/createServerAppContainer';

describe('Postgres Local Sandbox External Block', () => {
  it('Should throw REMOTE_DATABASE_URL_BLOCKED if tried with remote url', () => {
    process.env.DATABASE_URL = 'postgres://user:pass@db.xyz.supabase.co:5432/postgres';
    expect(() => {
      createServerAppContainer('postgres-local-sandbox');
    }).toThrow('REMOTE_DATABASE_URL_BLOCKED');
  });

  it('Should throw POSTGRES_ADAPTER_NOT_IMPLEMENTED if explicit postgres production mode is used', () => {
    expect(() => {
      createServerAppContainer('postgres');
    }).toThrow('POSTGRES_ADAPTER_NOT_IMPLEMENTED');
  });
});
