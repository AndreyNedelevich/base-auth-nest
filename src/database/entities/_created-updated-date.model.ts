import { CreateDateColumn, UpdateDateColumn } from 'typeorm';


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
