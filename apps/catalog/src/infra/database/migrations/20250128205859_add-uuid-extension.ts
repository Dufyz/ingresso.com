import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS events;

        DROP EXTENSION IF EXISTS "uuid-ossp";
    `);
}
