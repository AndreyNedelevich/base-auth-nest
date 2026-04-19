import { Config } from './config.types';

export default (): Config => {
  return {
    app: {
      host: process.env.APP_HOST || 'local',
      port: parseInt(process.env.APP_PORT) || 3000,
      environment: process.env.APP_ENVIRONMENT || 'local',
    },
    jwt: {
      accessTokenSecret:
        process.env.AUTH_ACCESS_TOKEN_SECRET || 'access secret',
      accessTokenExpiration:
        parseInt(process.env.AUTH_ACCESS_TOKEN_EXPIRATION) || 3600,
      refreshTokenSecret:
        process.env.AUTH_REFRESH_TOKEN_SECRET || 'refresh secret',
      refreshTokenExpiration:
        parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRATION) || 86400,
    },
    postgres: {
      host: process.env.POSTGRES_HOST || '0.0.0.0',
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      user: process.env.POSTGRES_USER || 'user',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'base-auth',
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true' || false,
      migrationsRun: process.env.POSTGRES_RUN_MIGRATIONS === 'true' || false,
      logging: process.env.POSTGRES_LOGGING === 'true' || false,
    },
    redis: {
      host: process.env.REDIS_HOST || '0.0.0.0',
      port: parseInt(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || 'redispass',
    },
    swagger: {
      isEnabled: process.env.SWAGGER_ENABLED === 'true',
      user: process.env.SWAGGER_USER || 'admin',
      password: process.env.SWAGGER_PASSWORD || 'admin',
    },
  };
};
