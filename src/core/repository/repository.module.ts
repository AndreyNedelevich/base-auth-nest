import { Module } from '@nestjs/common';

import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [UserRepository, RefreshTokenRepository];

@Module({ providers: repositories, exports: repositories })
export class RepositoryModule {}
