import { Either } from 'src/shared/utils/either';
import { RepositoryErrors } from '../errors';
import { Event } from 'src/domain/event';
import { PostEventSchemaBody } from 'src/presentation/schemas/event/postEvent.schema';
import { PatchEventSchemaBody } from 'src/presentation/schemas/event/patchEvent.schema';

export interface EventRepositoryInterface {
  list(): Promise<Either<RepositoryErrors, Event[]>>;
  create(body: PostEventSchemaBody): Promise<Either<RepositoryErrors, Event>>;
  update(
    id: number,
    body: PatchEventSchemaBody,
  ): Promise<Either<RepositoryErrors, Event>>;
  delete(id: number): Promise<Either<RepositoryErrors, void>>;
}

export const EventRepositoryInterface = Symbol('EventRepository');
