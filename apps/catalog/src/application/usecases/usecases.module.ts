import { forwardRef, Module } from '@nestjs/common';
import {
  CreateEventUsecase,
  DeleteEventUsecase,
  ListEventsUsecase,
  UpdateEventUsecase,
} from './event';
import { InfraestructureModule } from 'src/infra/infra.module';
import { EventRepositoryInterface } from '../interfaces/event.repository';
import { EventRepository } from 'src/infra/database/repositories/event.repository';

const event = {
  repositorie: [
    {
      provide: EventRepositoryInterface,
      useClass: EventRepository,
    },
  ],
  usecases: [
    CreateEventUsecase,
    DeleteEventUsecase,
    ListEventsUsecase,
    UpdateEventUsecase,
  ],
};

const usecases = [...event.usecases];

@Module({
  imports: [forwardRef(() => InfraestructureModule.forDomain())],
  providers: [...event.repositorie, ...usecases],
  exports: [...event.repositorie, ...usecases],
})
export class UsecasesModule {}
