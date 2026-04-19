import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Config, PostgresConfig } from '../../config/config.types';

@Injectable()
export class PostgresService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<Config>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgresConfig = this.configService.get<PostgresConfig>('postgres');
    const dbFolderPath = path.join(process.cwd(), 'dist', 'src', 'database');

    return {
      type: 'postgres',
      host: postgresConfig.host,
      port: postgresConfig.port,
      username: postgresConfig.user,
      password: postgresConfig.password,
      database: postgresConfig.database,
      synchronize: postgresConfig.logging,
      migrationsRun: postgresConfig.migrationsRun,
      entities: [path.join(dbFolderPath, 'entities', '*.entity.js')],
      migrations: [path.join(dbFolderPath, 'migrations', '*.js')],
    };
  }
}
