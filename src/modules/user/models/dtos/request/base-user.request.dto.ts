import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsEmail, IsNotEmpty, Length } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseUserRequestDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(6, 20)
  readonly password: string;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @Length(2, 50)
  readonly firstName: string;

  @Transform(TransformHelper.trim)
  @IsNotEmpty()
  @Length(2, 50)
  readonly lastName: string;
}
