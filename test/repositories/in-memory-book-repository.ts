import { randomUUID } from 'crypto';
import { CreateBookDto } from '@/modules/book/dto/create-book.dto';
import { Book } from '@/modules/book/entities/book.entity';
import { BookRepository } from '@/modules/book/repositories/book.repository';
import { instanceToPlain } from 'class-transformer';

export class InMemoryBookRepository implements BookRepository {
  public items: Book[] = [];

  async store(data: CreateBookDto) {
    const book = {
      id: randomUUID(),
      title: data.title,
      summary: data.summary,
      abstract: data.abstract,
      isbn: data.isbn,
      pageNumber: data.pageNumber,
      price: data.price,
      releaseDate: data.releaseDate,
      categoryId: data.categoryId,
      authorId: data.authorId,
      category: null,
      author: null,
    };

    await this.items.push(book);

    return book;
  }

  async findAll() {
    return instanceToPlain(await this.items.map((item) => item));
  }

  async findById(id: string) {
    const book = await this.items.find((item) => item.id === id);

    return book || null;
  }
}
