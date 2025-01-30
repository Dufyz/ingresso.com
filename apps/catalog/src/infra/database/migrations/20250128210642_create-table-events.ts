import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE events (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            event_id UUID UNIQUE DEFAULT uuid_generate_v4(),
            name VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE IF EXISTS event;
    `);
}
