import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import getConfig from './src/config/config';

dotenv.config({ path: './environments/local.env' });

const postgresConfig = getConfig().postgres;
const dbFolderPath = path.join(process.cwd(), 'src', 'database');

export default new DataSource({
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.user,
  password: postgresConfig.password,
  database: postgresConfig.database,
  synchronize: postgresConfig.logging,
  migrationsRun: postgresConfig.migrationsRun,
  entities: [path.join(dbFolderPath, 'entities', '*.entity.ts')],
  migrations: [path.join(dbFolderPath, 'migrations', '*.ts')],
});
