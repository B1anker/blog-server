import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 32, unique: true })
  account: string;

  @Column('simple-array')
  roles: string[];

  @Column('text')
  password: string;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
