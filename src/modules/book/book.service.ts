import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';
import { BookRepository } from '@/modules/book/repositories/book.repository';
import { instanceToPlain } from "class-transformer";

@Injectable()
export class BookService {
  constructor(
    private bookRepo: BookRepository,
    private authorService: AuthorService,
    private categoryService: CategoryService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    await this.authorService.findById(createBookDto.authorId);

    await this.categoryService.findOne(createBookDto.categoryId);

    return await this.bookRepo.store(createBookDto);
  }

  async findAll() {
    const books = instanceToPlain(
      await this.bookRepo.findAll(),
    );
    return books;
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }
}
