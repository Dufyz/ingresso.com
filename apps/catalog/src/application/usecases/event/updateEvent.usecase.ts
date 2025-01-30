import { Inject, Injectable } from '@nestjs/common';
import { RepositoryErrors } from 'src/application/errors';
import { EventRepositoryInterface } from 'src/application/interfaces/event.repository';
import { Event } from 'src/domain/event';
import { PatchEventSchemaBody } from 'src/presentation/schemas/event/patchEvent.schema';
import { Either, failure, success } from 'src/shared/utils/either';

@Injectable()
export class UpdateEventUsecase {
  constructor(
    @Inject(EventRepositoryInterface)
    private eventRepository: EventRepositoryInterface,
  ) {}

  async execute(
    id: number,
    body: PatchEventSchemaBody,
  ): Promise<Either<RepositoryErrors, Event>> {
    const eventOrError = await this.eventRepository.update(id, body);

    if (eventOrError.isFailure()) return failure(eventOrError.value);

    const event = eventOrError.value;
    return success(event);
  }
}
