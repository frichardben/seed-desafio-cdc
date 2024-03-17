import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'authors' })
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  register: Date;
}
