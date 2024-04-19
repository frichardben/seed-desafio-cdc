import { CreateAuthorDto } from '../dto/create-author.dto';
import { Author } from '../entities/author.entity';
interface AuthorResponse {
  authors: Record<string, Author[]>;
}

export abstract class AuthorRepository {
  abstract store(data: Author): Promise<CreateAuthorDto>;
  abstract findById(id: string): Promise<CreateAuthorDto | null>;
  abstract findAll(): Promise<AuthorResponse | null>;
}
