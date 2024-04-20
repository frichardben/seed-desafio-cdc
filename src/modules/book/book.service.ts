import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { AuthorService } from '../author/author.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    private authorService: AuthorService,
    private categoryService: CategoryService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    await this.authorService.findById(createBookDto.authorId);
    await this.categoryService.findOne(createBookDto.categoryId);

    return await this.bookRepo.save(createBookDto);
  }

  async findAll() {
    const books = instanceToPlain(
      await this.bookRepo.find({ select: ['id', 'title'] }),
    );
    return { books };
  }

  async findOne(id: string) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author', 'category'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookRepo.update(id, updateBookDto);
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
