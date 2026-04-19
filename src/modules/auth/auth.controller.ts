import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser, SkipAuth } from '../../common/decorators';
import { IUserData } from '../../common/models/interfaces/user-data.interface';
import { CreateUserDto } from './dto/request/create-user.request.dto';
import { LoginUserDto } from './dto/request/login-user.request.dto';
import { AuthUserResponseDto } from './dto/response/auth-user.dto';
import { TokenResponseDto } from './dto/response/tokens.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { AuthService } from './services/auth.service';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Registration' })
  @Post('sign-up')
  public async signUp(
    @Body() dto: CreateUserDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Login' })
  @Post('sign-in')
  public async signIn(@Body() dto: LoginUserDto): Promise<AuthUserResponseDto> {
    return await this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout' })
  @Post('logout')
  public async logout(@CurrentUser() userData: IUserData): Promise<void> {
    await this.authService.logout(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Update token pair' })
  @Post('refresh')
  public async updateRefreshToken(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenResponseDto> {
    return await this.authService.refreshToken(userData);
  }
}
