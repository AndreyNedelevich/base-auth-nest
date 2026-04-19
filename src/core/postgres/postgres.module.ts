import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresService } from './postgres-connection.service';

@Module({
  imports: [
    //forRootAsync потому что нет доступа к DI (ConfigService)
    // forRoot     = конфиг известен заранее
    // forRootAsync = конфиг собирается во время запуска приложения
    TypeOrmModule.forRootAsync({
      useClass: PostgresService,
    }),
  ],
  providers: [],
  exports: [],
})
export class PostgresModule {}
