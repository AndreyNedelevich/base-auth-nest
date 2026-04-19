import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Это базовая модель для всех таблиц, которая автоматически добавляет:

// created → когда запись создана
// updated → когда запись обновлена
export class CreatedUpdatedDateModel {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date;
}
