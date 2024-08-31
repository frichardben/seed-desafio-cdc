import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorModule } from '../author/author.module';
import { CategoryModule } from '../category/category.module';
import { BookRepository } from './repositories/book.repository';
import { TypeOrmBookRepository } from './repositories/typeorm/typeorm.book.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Book]), AuthorModule, CategoryModule],
  controllers: [BookController],
  providers: [
    BookService,
    { provide: BookRepository, useClass: TypeOrmBookRepository },
  ],
  exports: [BookService],
})
export class BookModule {}
