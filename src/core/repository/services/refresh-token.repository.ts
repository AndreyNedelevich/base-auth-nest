import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RefreshTokenEntity } from '../../../database';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }
  // создаёт объект токена
  // сохраняет его в БД
  public async saveToken(
    userId: string,
    deviceId: string,
    token: string,
  ): Promise<RefreshTokenEntity> {
    return await this.save(
      this.create({
        deviceId: deviceId,
        user_id: userId,
        refreshToken: token,
      }),
    );
  }
  // “есть ли такой токен в базе?”
  public async isTokenExist(token: string): Promise<boolean> {
    return await this.exist({
      where: { refreshToken: token },
    });
  }
}
