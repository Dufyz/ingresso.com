import { Module, Provider } from '@nestjs/common';
import { EventRepositoryInterface } from 'src/application/interfaces/event.repository';
import { EventRepository } from './event.repository';

const repositories: Provider[] = [
  { provide: EventRepositoryInterface, useClass: EventRepository },
];

@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
