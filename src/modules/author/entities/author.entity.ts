import { Book } from 'src/modules/book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
