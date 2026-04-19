import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { TokenModule } from './modules/token/token.module';
import { AuthService } from './services/auth.service';
import { AuthCacheService } from './services/auth-cache.service';

@Module({
  controllers: [AuthController],
  imports: [TokenModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    AuthCacheService,
  ],
  exports: [TokenModule, AuthCacheService],
})
export class AuthModule {}
