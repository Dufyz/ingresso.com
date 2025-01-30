import { Inject, Injectable } from '@nestjs/common';
import { RepositoryErrors } from 'src/application/errors';
import { EventRepositoryInterface } from 'src/application/interfaces/event.repository';
import { Event } from 'src/domain/event';
import { Either, failure, success } from 'src/shared/utils/either';

@Injectable()
export class ListEventsUsecase {
  constructor(
    @Inject(EventRepositoryInterface)
    private eventRepository: EventRepositoryInterface,
  ) {}

  async execute(): Promise<Either<RepositoryErrors, Event[]>> {
    const eventsOrError = await this.eventRepository.list();

    if (eventsOrError.isFailure()) return failure(eventsOrError.value);

    const events = eventsOrError.value;
    return success(events);
  }
}
