import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const authorAlreadyExist = await this.findByEmail(createAuthorDto.email);
    if (authorAlreadyExist) {
      throw new ConflictException('User already exists');
    }
    const author = await this.authorRepo.save(createAuthorDto);

    return {
      author,
    };
  }

  async findByEmail(email: string) {
    const author = await this.authorRepo.findOne({ where: { email } });
    return author;
  }

  findAll() {
    return this.authorRepo.find();
  }

  findById(id: string) {
    return this.authorRepo.findOneOrFail({ where: { id } });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
