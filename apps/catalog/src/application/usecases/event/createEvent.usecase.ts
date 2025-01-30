import { Inject, Injectable } from '@nestjs/common';
import { RepositoryErrors } from 'src/application/errors';
import { EventRepositoryInterface } from 'src/application/interfaces/event.repository';
import { Event } from 'src/domain/event';
import { PostEventSchemaBody } from 'src/presentation/schemas/event/postEvent.schema';
import { Either, failure, success } from 'src/shared/utils/either';

@Injectable()
export class CreateEventUsecase {
  constructor(
    @Inject(EventRepositoryInterface)
    private eventRepository: EventRepositoryInterface,
  ) {}

  async execute(
    body: PostEventSchemaBody,
  ): Promise<Either<RepositoryErrors, Event>> {
    const eventOrError = await this.eventRepository.create(body);

    if (eventOrError.isFailure()) return failure(eventOrError.value);

    const event = eventOrError.value;
    return success(event);
  }
}
