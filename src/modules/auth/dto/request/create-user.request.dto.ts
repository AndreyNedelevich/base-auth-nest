import { IntersectionType, PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../user/models/dtos/request/base-user.request.dto';
import { AuthBaseRequestDto } from './auth-base.request.dto';

export class CreateUserDto extends IntersectionType(
  PickType(BaseUserRequestDto, ['firstName', 'lastName', 'email', 'password']),
  PickType(AuthBaseRequestDto, ['deviceId']),
) {}
