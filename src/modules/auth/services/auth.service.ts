import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CryptoHelper } from '../../../common/helpers/crypto.helper';
import { IUserData } from '../../../common/models/interfaces/user-data.interface';
import { RefreshTokenRepository } from '../../../core/repository/services/refresh-token.repository';
import { UserRepository } from '../../../core/repository/services/user.repository';
import { CreateUserDto } from '../dto/request/create-user.request.dto';
import { LoginUserDto } from '../dto/request/login-user.request.dto';
import { AuthUserResponseDto } from '../dto/response/auth-user.dto';
import { TokenResponseDto } from '../dto/response/tokens.dto';
import { TokenService } from '../modules/token/token.service';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly refreshRepository: RefreshTokenRepository,
  ) {}

  public async signUp(dto: CreateUserDto): Promise<AuthUserResponseDto> {
    const { hash, salt } = CryptoHelper.hashPassword(dto.password);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password: hash, salt }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        dto.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        dto.deviceId,
        tokens.accessToken,
      ),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async signIn(dto: LoginUserDto): Promise<AuthUserResponseDto> {
    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
      select: { id: true, password: true, salt: true },
    });
    if (!userEntity) {
      throw new UnauthorizedException();
    }

    const isPasswordsMatch = await CryptoHelper.compare(
      dto.password,
      userEntity.password,
      userEntity.salt,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({ id: userEntity.id });

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });

    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
        deviceId: dto.deviceId,
      }),
      this.authCacheService.removeToken(user.id, dto.deviceId),
    ]);

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        dto.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        dto.deviceId,
        tokens.accessToken,
      ),
    ]);

    return AuthMapper.toResponseDto(user, tokens);
  }

  public async logout(userData: IUserData): Promise<void> {
    await Promise.all([
      this.refreshRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
      this.authCacheService.removeToken(userData.userId, userData.deviceId),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    await Promise.all([
      this.refreshRepository.delete({
        user_id: user.id,
        deviceId: userData.deviceId,
      }),
      this.authCacheService.removeToken(user.id, userData.deviceId),
    ]);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: userData.deviceId,
    });

    await Promise.all([
      this.refreshRepository.saveToken(
        user.id,
        userData.deviceId,
        tokens.refreshToken,
      ),
      this.authCacheService.saveToken(
        user.id,
        userData.deviceId,
        tokens.accessToken,
      ),
    ]);
    return tokens;
  }
}
