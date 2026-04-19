export type SwaggerConfig = {
  isEnabled: boolean;
  user: string;
  password: string;
};

export type JWTConfig = {
  accessTokenSecret: string;
  accessTokenExpiration: number;
  refreshTokenSecret: string;
  refreshTokenExpiration: number;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  synchronize: boolean;
  migrationsRun: boolean;
  logging: boolean;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};

export type AppConfig = {
  host: string;
  port: number;
  environment: string;
};

export type Config = {
  app: AppConfig;
  jwt: JWTConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
  swagger: SwaggerConfig;
};
