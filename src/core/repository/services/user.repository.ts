import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database';
@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
}

//UserRepository — это кастомный класс для работы с таблицей users.
// Он расширяет TypeORM Repository, чтобы использовать готовые методы (find, save и т.д.) и добавлять свои.
// DataSource — это подключение к базе данных, которое передаётся в super, чтобы связать репозиторий с конкретной таблицей и БД.
// В итоге ты получаешь удобный объект для работы с пользователями вместо ручного SQL.