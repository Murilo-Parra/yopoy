export type SqlCommand = {
  sql: string;
  params?: unknown[];
  label?: string;
  mode?: 'dry-run' | 'blocked' | 'real' | 'postgres-local-sandbox';
};
