import { IntersectionType, PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../user/models/dtos/request/base-user.request.dto';
import { AuthBaseRequestDto } from './auth-base.request.dto';

export class LoginUserDto extends IntersectionType(
  PickType(BaseUserRequestDto, ['email', 'password']),
  PickType(AuthBaseRequestDto, ['deviceId']),
) {}
