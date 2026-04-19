import { Injectable } from '@nestjs/common';

import { IUserData } from '../../../common/models/interfaces/user-data.interface';
import { UserRepository } from '../../../core/repository/services/user.repository';
import { UserEntity } from '../../../database';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async currentUser(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ id: userData.userId });
  }

  public async deleteUser(userData: IUserData): Promise<void> {
    await this.userRepository.delete(userData.userId);
  }
}
