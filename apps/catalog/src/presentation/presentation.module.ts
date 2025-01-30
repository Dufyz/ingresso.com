import { forwardRef, Module } from '@nestjs/common';
import { EventController } from './controller/event.controller';
import { AppController } from './controller/app.controller';
import { InfraestructureModule } from 'src/infra/infra.module';
import { UsecasesModule } from 'src/application/usecases/usecases.module';

const controllers = [AppController, EventController];

@Module({
  imports: [
    forwardRef(() => InfraestructureModule.forPresentation()),
    UsecasesModule,
  ],
  controllers,
})
export class PresentationModule {}
