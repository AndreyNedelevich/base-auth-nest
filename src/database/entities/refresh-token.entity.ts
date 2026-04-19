import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { CreatedUpdatedDateModel } from './_created-updated-date.model';
import { TablesEnum } from './enums/tables.enum';
import { UserEntity } from './user.entity';

@Unique(['deviceId', 'user_id'])
@Entity({ name: TablesEnum.REFRESH_TOKEN })
export class RefreshTokenEntity extends CreatedUpdatedDateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  deviceId: string;

  @Index()
  @Column('text')
  refreshToken: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
