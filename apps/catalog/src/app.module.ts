import { forwardRef, Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { InfraestructureModule } from './infra/infra.module';

@Module({
  imports: [
    forwardRef(() => InfraestructureModule.forRoot()),
    PresentationModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
