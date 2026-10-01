import type { Pool, PoolClient } from 'pg';
import type { AnimalFilters, AnimalInput } from '../types/animal.types.js';

export class AnimalRepository {
  constructor(private readonly database: Pool) {}

  async create(input: AnimalInput): Promise<unknown> {
    const client = await this.database.connect();
    try {
      await client.query('BEGIN');
      await client.query('SELECT pg_advisory_xact_lock($1)', [84721]);
      const idResult = await client.query<{ id: number }>(
        `SELECT COALESCE(MAX("Identificador"), 0) + 1 AS id FROM "Animal"`,
      );
      const id = idResult.rows[0].id;
      const result = await client.query(
        `INSERT INTO "Animal" ("Identificador", "Nombre", "Raza", "Edad", "Sexo", "TipoAnimal")
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING "Identificador" AS "identificador", "Nombre" AS "nombre", "Raza" AS "raza",
                   "Edad" AS "edad", "Sexo" AS "sexo", "FechaIngreso" AS "fechaIngreso",
                   "TipoAnimal" AS "tipoAnimal"`,
        [id, input.nombre, input.raza, input.edad, input.sexo, input.tipoAnimal],
      );
      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async update(id: number, input: Partial<AnimalInput>): Promise<unknown | null> {
    const columns: Record<keyof AnimalInput, string> = {
      nombre: '"Nombre"', raza: '"Raza"', edad: '"Edad"', sexo: '"Sexo"', tipoAnimal: '"TipoAnimal"',
    };
    const entries = Object.entries(input) as [keyof AnimalInput, AnimalInput[keyof AnimalInput]][];
    const set = entries.map(([key], index) => `${columns[key]} = $${index + 1}`).join(', ');
    const values = entries.map(([, value]) => value);
    values.push(id as never);
    const result = await this.database.query(
      `UPDATE "Animal" SET ${set} WHERE "Identificador" = $${values.length}
       RETURNING "Identificador" AS "identificador", "Nombre" AS "nombre", "Raza" AS "raza",
                 "Edad" AS "edad", "Sexo" AS "sexo", "FechaIngreso" AS "fechaIngreso",
                 "TipoAnimal" AS "tipoAnimal"`,
      values,
    );
    return result.rows[0] ?? null;
  }

  async findAll(filters: AnimalFilters): Promise<unknown[]> {
    const clauses: string[] = [];
    const values: string[] = [];
    const add = (clause: string, value: string) => { values.push(value); clauses.push(clause.replace('?', `$${values.length}`)); };
    if (filters.nombre) add('"Nombre" ILIKE ?', `%${filters.nombre}%`);
    if (filters.raza) add('"Raza" ILIKE ?', `%${filters.raza}%`);
    if (filters.sexo) add('"Sexo" = ?', filters.sexo);
    if (filters.tipoAnimal) add('"TipoAnimal" = ?', filters.tipoAnimal);
    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const result = await this.database.query(
      `SELECT "Identificador" AS "identificador", "Nombre" AS "nombre", "Raza" AS "raza",
              "Edad" AS "edad", "Sexo" AS "sexo", "FechaIngreso" AS "fechaIngreso",
              "TipoAnimal" AS "tipoAnimal"
       FROM "Animal" ${where} ORDER BY "Identificador"`,
      values,
    );
    return result.rows;
  }
}
