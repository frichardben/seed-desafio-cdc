import { CreateBookDto } from '../dto/create-book.dto';
import { Book } from '../entities/book.entity';

export abstract class BookRepository {
  abstract store(data: CreateBookDto): Promise<Book>;
  abstract findById(id: string): Promise<Book | null>;
  abstract findAll(): Promise<any | null>;
}
