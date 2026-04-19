import { IsNotEmpty, IsString } from 'class-validator';

export class AuthBaseRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
