import { Controller, Delete, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators';
import { IUserData } from '../../common/models/interfaces/user-data.interface';
import { UserResponseDto } from './models/dtos/response/user.response.dto';
import { UserMapper } from './services/user.mapper';
import { UserService } from './services/user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private usersService: UserService) {}

  @ApiOperation({ description: 'Get current user' })
  @Get('me')
  public async getCurrentUser(
    @CurrentUser() userData: IUserData,
  ): Promise<UserResponseDto> {
    const result = await this.usersService.currentUser(userData);
    return UserMapper.toResponseDto(result);
  }

  @ApiOperation({ description: 'Delete my profile' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('me')
  public async deleteUser(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.deleteUser(userData);
  }
}
