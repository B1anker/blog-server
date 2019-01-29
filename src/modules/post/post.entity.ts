import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Posts {
  @Column('string')
  @PrimaryColumn()
  id: string;

  @Column({ length: 32, unique: true })
  title: string;

  @Column('int')
  created: number;

  @Column('int')
  updated: number;

  @Column('int')
  views: number;

  @Column('simple-array')
  tags: string[];

  @Column('simple-array')
  categories: string[];

  @Column('text')
  summary: string;

  @Column('text')
  content: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
