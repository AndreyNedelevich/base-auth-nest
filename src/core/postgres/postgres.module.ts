import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresService } from './postgres-connection.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresService,
    }),
  ],
  providers: [],
  exports: [],
})
export class PostgresModule {}
