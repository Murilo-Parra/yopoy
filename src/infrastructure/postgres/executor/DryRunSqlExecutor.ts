import { SqlCommand } from './SqlCommand';
import { SqlExecutor } from './SqlExecutor';

export class DryRunSqlExecutor implements SqlExecutor {
  private executedCommands: SqlCommand[] = [];

  async execute<T = unknown>(command: SqlCommand): Promise<T> {
    const dryRunCommand: SqlCommand = { ...command, mode: 'dry-run' };
    this.executedCommands.push(dryRunCommand);
    
    // Simulate some basic returns based on the label/command structure for testability
    if (command.sql.toLowerCase().includes('returning *')) {
      return [{ id: 'mocked-id-dry-run' }] as unknown as T;
    }
    
    if (command.sql.toLowerCase().includes('select')) {
      return [] as unknown as T;
    }
    
    return undefined as unknown as T;
  }

  getExecutedCommands(): SqlCommand[] {
    return [...this.executedCommands];
  }
}
