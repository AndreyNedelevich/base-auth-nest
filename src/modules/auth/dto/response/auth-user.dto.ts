import { Exclude } from 'class-transformer';

import { UserResponseDto } from '../../../user/models/dtos/response/user.response.dto';
import { TokenResponseDto } from './tokens.dto';

@Exclude()
export class AuthUserResponseDto {
  tokens: TokenResponseDto;

  user: UserResponseDto;
}
