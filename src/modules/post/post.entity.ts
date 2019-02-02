import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Categories } from '../category/category.entity';

@Entity()
export class Posts {
  @Column('string')
  @PrimaryColumn()
  id: string;

  @Column({ length: 64, unique: true })
  title: string;

  @Column('int')
  created: number;

  @Column('int')
  updated: number;

  @Column('int')
  views: number;

  @Column('simple-array')
  tags: string[];

  @Column('text')
  summary: string;

  @Column('text')
  content: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @ManyToMany((type) => Categories, (category) => category.name)
  @JoinTable()
  categories: Categories[];
}
