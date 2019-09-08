import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Secrets {
  @Column('string')
  @PrimaryColumn()
  id: string;

  @Column({ length: 64, unique: true, type: 'varchar' })
  key: string;

  @Column('text')
  value: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column('int')
  created: number;

  @Column('int')
  updated: number;

  @Column('text')
  desc: string;
}
