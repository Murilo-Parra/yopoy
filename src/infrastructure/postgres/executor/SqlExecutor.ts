import { SqlCommand } from './SqlCommand';

export interface SqlExecutor {
  execute<T = unknown>(command: SqlCommand): Promise<T>;
  getExecutedCommands?(): SqlCommand[];
}
