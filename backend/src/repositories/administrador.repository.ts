import type { Pool } from 'pg';

export interface AdministratorRecord {
  identificador: number;
  usuario: string;
  contrasena: string;
}

export class AdministratorRepository {
  constructor(private readonly database: Pool) {}

  async findByUsername(usuario: string): Promise<AdministratorRecord | null> {
    const result = await this.database.query<AdministratorRecord>(
      `SELECT "Identificador" AS identificador, "Usuario" AS usuario, "Contrasena" AS contrasena
       FROM "Administrador" WHERE "Usuario" = $1 LIMIT 1`,
      [usuario],
    );
    return result.rows[0] ?? null;
  }

  async updatePassword(id: number, hash: string): Promise<void> {
    await this.database.query(
      `UPDATE "Administrador" SET "Contrasena" = $1 WHERE "Identificador" = $2`,
      [hash, id],
    );
  }
}
