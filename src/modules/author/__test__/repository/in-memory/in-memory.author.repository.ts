import { randomUUID } from 'crypto';
import { instanceToPlain } from 'class-transformer';
import { CreateAuthorDto } from '@/modules/author/dto/create-author.dto';
import { Author } from '@/modules/author/entities/author.entity';
import { AuthorRepository } from 'src/modules/author/repositories/author.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryAuthorRepository implements AuthorRepository {
  public items: Author[] = [];

  async store(data: CreateAuthorDto) {
    const author = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      description: data.description,
      register: new Date(),
      books: [],
    };

    await this.items.push(author);

    return author;
  }

  async findById(id: string) {
    const author = await this.items.find((item) => item.id === id);

    return author || null;
  }

  async findAll() {
    return instanceToPlain(await this.items.map((item) => item));
  }
}
