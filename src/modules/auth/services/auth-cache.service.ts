import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config, JWTConfig } from '../../../config/config.types';
import { RedisService } from '../../../core/redis/redis.service';
import { AUTH_CACHE } from '../constants/constants';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JWTConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JWTConfig>('jwt');
  }

  public async saveToken(
    userId: string,
    deviceId: string,
    accessToken: string,
  ): Promise<void> {
    const multi = this.redisService.multi();
    const key = `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`;

    await this.redisService.deleteByKey(key, multi);
    await this.redisService.sAdd(key, accessToken, multi);
    await this.redisService.expire(
      key,
      this.jwtConfig.accessTokenExpiration,
      multi,
    );

    await this.redisService.exec(multi);
  }

  public async removeToken(userId: string, deviceId: string): Promise<void> {
    await this.redisService.deleteByKey(
      `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`,
    );
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    accessToken: string,
  ): Promise<boolean> {
    const userAccessTokens = await this.redisService.sMembers(
      `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`,
    );
    return userAccessTokens.some((token: string) => token === accessToken);
  }
}
