import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostgresModule } from './postgres/postgres.module';

import configuration from '../config/config';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresModule,
    RedisModule,
    RepositoryModule,
  ],
  exports: [RedisModule, PostgresModule, RepositoryModule],
})
export class CoreModule {}
