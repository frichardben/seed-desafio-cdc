import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorRepository } from './repositories/author.repository';

@Injectable()
export class AuthorService {
  constructor(private authorRepo: AuthorRepository) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepo.store(createAuthorDto);
  }

  async findAll() {
    return await this.authorRepo.findAll();
  }

  async findById(id: string) {
    const author = await this.authorRepo.findById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }
}
