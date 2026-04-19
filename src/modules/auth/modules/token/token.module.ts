import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenService } from './token.service';

@Module({
  imports: [JwtModule],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
