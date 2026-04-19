import { IUserData } from '../../../common/models/interfaces/user-data.interface';
import { UserEntity } from '../../../database';
import { UserResponseDto } from '../models/dtos/response/user.response.dto';

export class UserMapper {
  public static toResponseDto(entity: UserEntity): UserResponseDto {
    return {
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
    };
  }

  public static toUserData(entity: UserEntity, deviceId: string): IUserData {
    return {
      userId: entity.id,
      email: entity.email,
      deviceId,
    };
  }
}
