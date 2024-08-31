import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from '../../dto/create-book.dto';
import { Book } from '../../entities/book.entity';
import { BookRepository } from '../book.repository';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

export class TypeOrmBookRepository implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}

  async store(data: CreateBookDto) {
    return await this.bookRepo.save(data);
  }

  async findById(id: string) {
    return await this.bookRepo.findOne({
      where: { id },
      relations: ['author', 'category'],
    });
  }

  async findAll() {
    const books = instanceToPlain(await this.bookRepo.find());
    return {
      books,
    };
  }
}
