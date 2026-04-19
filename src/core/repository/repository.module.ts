import { Module } from '@nestjs/common';

import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [UserRepository, RefreshTokenRepository];

@Module({ providers: repositories, exports: repositories })
// providers — это список того, что Nest должен создать и положить в DI-контейнер внутри модуля.
export class RepositoryModule {}

// все репозитории зарегистрированы в одном месте
// можно переиспользовать в любом модуле