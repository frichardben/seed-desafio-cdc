import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AppError } from 'src/common/error/AppError';

@Controller('api/v1/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    try {
      return this.authorService.create(createAuthorDto);
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }
    }
  }

  @Get()
  findAll() {
    const author = this.authorService.findAll();
    return {
      author,
    };
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.authorService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
