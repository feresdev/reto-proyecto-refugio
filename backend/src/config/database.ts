import { Pool } from 'pg';
import { environment } from './environment.js';

export const pool = new Pool({ connectionString: environment.databaseUrl });

export const closeDatabase = async (): Promise<void> => {
  await pool.end();
};
