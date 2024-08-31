import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('api/v1/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }
}
