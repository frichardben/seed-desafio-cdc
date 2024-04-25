import { CreateAuthorDto } from '../dto/create-author.dto';
import { Author } from '../entities/author.entity';

export abstract class AuthorRepository {
  abstract store(data: CreateAuthorDto): Promise<Author>;
  abstract findById(id: string): Promise<Author | null>;
  abstract findAll(): Promise<any | null>;
}
