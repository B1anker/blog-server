import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32, unique: true })
  name: string;

  @Column('int')
  created: number;

  @Column('int')
  updated: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
