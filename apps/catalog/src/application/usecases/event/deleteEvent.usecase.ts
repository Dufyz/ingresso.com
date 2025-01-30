import { Inject, Injectable } from '@nestjs/common';
import { RepositoryErrors } from 'src/application/errors';
import { EventRepositoryInterface } from 'src/application/interfaces/event.repository';
import { Either, failure, success } from 'src/shared/utils/either';

@Injectable()
export class DeleteEventUsecase {
  constructor(
    @Inject(EventRepositoryInterface)
    private eventRepository: EventRepositoryInterface,
  ) {}

  async execute(id: number): Promise<Either<RepositoryErrors, void>> {
    const resultOrError = await this.eventRepository.delete(id);

    if (resultOrError.isFailure()) return failure(resultOrError.value);

    return success(undefined);
  }
}
