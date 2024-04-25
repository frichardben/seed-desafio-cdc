import { Repository } from 'typeorm';
import { Author } from '../../entities/author.entity';
import { AuthorRepository } from '../author.repository';
import { CreateAuthorDto } from '../../dto/create-author.dto';
import { instanceToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

export class TypeOrmAuthorRepository implements AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  async store(data: CreateAuthorDto) {
    return await this.authorRepo.save(data);
  }

  async findById(id: string) {
    return await this.authorRepo.findOne({ where: { id } });
  }

  async findAll() {
    const authors = instanceToPlain(await this.authorRepo.find());
    return { authors };
  }
}
