import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32 })
  type: string;

  @Column('bigint')
  count: number;

  @Column('text')
  from: string;
}
