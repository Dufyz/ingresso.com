import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from './database/repositories/repositories.module';
import { ApplicationModule } from 'src/application/application.module';
import { UsecasesModule } from 'src/application/usecases/usecases.module';

@Module({})
export class InfraestructureModule {
  static forRoot(): DynamicModule {
    return {
      module: InfraestructureModule,
      imports: [RepositoriesModule],
    };
  }

  static forPresentation(): DynamicModule {
    return {
      module: InfraestructureModule,
      imports: [ApplicationModule, RepositoriesModule, UsecasesModule],
      exports: [ApplicationModule, RepositoriesModule, UsecasesModule],
    };
  }

  static forDomain(): DynamicModule {
    return {
      module: InfraestructureModule,
      imports: [RepositoriesModule],
      exports: [RepositoriesModule],
    };
  }
}
