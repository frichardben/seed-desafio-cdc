import { Author } from 'src/modules/author/entities/author.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  abstract: string;

  @Column()
  summary: string;

  @Column()
  price: number;

  @Column()
  pageNumber: number;

  @Column()
  isbn: string;

  @Column()
  releaseDate: Date;

  @Column()
  categoryId: string;

  @Column()
  authorId: string;

  @ManyToOne(() => Category, (category) => category.books)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Author, (autho) => autho.books)
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
