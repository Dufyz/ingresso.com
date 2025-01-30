import { Module } from '@nestjs/common';

import { UsecasesModule } from './usecases/usecases.module';

const modules = [UsecasesModule];

@Module({
  imports: [...modules],
  providers: [...modules],
  exports: [...modules],
})
export class ApplicationModule {}
