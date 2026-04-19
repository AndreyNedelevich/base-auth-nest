import { UserEntity } from '../../../database';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthUserResponseDto } from '../dto/response/auth-user.dto';
import { TokenResponseDto } from '../dto/response/tokens.dto';

// AuthMapper = “assemble the final response for login / refresh”
export class AuthMapper {
  public static toResponseDto(
    userEntity: UserEntity,
    tokens: TokenResponseDto,
  ): AuthUserResponseDto {
    return {
      user: UserMapper.toResponseDto(userEntity),
      tokens,
    };
  }
}
