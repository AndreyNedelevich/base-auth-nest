import { IntersectionType, PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../user/models/dtos/request/base-user.request.dto';
import { AuthBaseRequestDto } from './auth-base.request.dto';
// IntersectionType in NestJS is used to combine multiple DTOs into a single one.
export class CreateUserDto extends IntersectionType(
  PickType(BaseUserRequestDto, ['firstName', 'lastName', 'email', 'password']),
  PickType(AuthBaseRequestDto, ['deviceId']),
) {}
