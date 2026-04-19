import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { TablesEnum } from './enums/tables.enum';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity({ name: TablesEnum.USER })
export class UserEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password?: string;

  @Column('text', { select: false })
  salt?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
