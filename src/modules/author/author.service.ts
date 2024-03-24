import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepo.save(createAuthorDto);
  }

  async findAll() {
    const authors = instanceToPlain(await this.authorRepo.find());
    return { authors };
  }

  async findById(id: string) {
    const author = await this.authorRepo.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepo.update(id, updateAuthorDto);
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
