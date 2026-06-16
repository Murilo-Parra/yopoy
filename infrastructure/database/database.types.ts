import { Pool, PoolConfig } from "pg";

export interface DatabaseParsedUrl {
  user?: string;
  password?: string;
  host: string;
  port: number;
  database: string;
}

export type DbPool = Pool;
export type DbConfig = PoolConfig;
