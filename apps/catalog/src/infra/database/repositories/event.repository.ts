/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { EventRepositoryInterface } from 'src/application/interfaces/event.repository';
import { Event, parseEventFromDB } from 'src/domain/event';
import { getRepositoryError, RepositoryErrors } from 'src/application/errors';
import { Either, failure, success } from 'src/shared/utils/either';
import sql from '../postgresql';
import { PostEventSchemaBody } from 'src/presentation/schemas/event/postEvent.schema';
import { PatchEventSchemaBody } from 'src/presentation/schemas/event/patchEvent.schema';
import { filterObjNullishValues } from 'src/shared/utils/filterObjNullishValues';

@Injectable()
export class EventRepository implements EventRepositoryInterface {
  async list(): Promise<Either<RepositoryErrors, Event[]>> {
    try {
      const events: Event[] = await sql`
            SELECT 
                e.id, 
                e.event_id,
                e.name,
                e.price,
                e.created_at,
                e.updated_at
            FROM events e
        `;

      return success(events.map(parseEventFromDB));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async create(
    body: PostEventSchemaBody,
  ): Promise<Either<RepositoryErrors, Event>> {
    try {
      const eventToCreate: Pick<Event, 'name' | 'price'> = {
        name: body.name,
        price: body.price,
      };

      const colsToInsert = Object.keys(
        eventToCreate,
      ) as (keyof typeof eventToCreate)[];

      const [event] = await sql`
            INSERT INTO events ${sql(eventToCreate, ...colsToInsert)}
            RETURNING id, event_id, name, price, created_at, updated_at
        `;

      return success(parseEventFromDB(event as Event));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async update(
    id: number,
    body: PatchEventSchemaBody,
  ): Promise<Either<RepositoryErrors, Event>> {
    try {
      const eventToUpdate: Partial<Pick<Event, 'name' | 'price'>> =
        filterObjNullishValues({
          name: body.name,
          price: body.price,
        });

      const colsToUpdate = Object.keys(
        eventToUpdate,
      ) as (keyof typeof eventToUpdate)[];

      const [event] = await sql`
            UPDATE events
            SET ${sql(eventToUpdate, ...colsToUpdate)}
            WHERE id = ${id}
            RETURNING id, event_id, name, price, created_at, updated_at
        `;

      return success(parseEventFromDB(event as Event));
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }

  async delete(id: number): Promise<Either<RepositoryErrors, void>> {
    try {
      await sql`
            DELETE FROM events
            WHERE id = ${id}
        `;

      return success(undefined);
    } catch (e) {
      return failure(getRepositoryError(e));
    }
  }
}
