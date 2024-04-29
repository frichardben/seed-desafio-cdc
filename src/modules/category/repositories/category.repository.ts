import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract store(data: CreateCategoryDto): Promise<Category>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findAll(): Promise<any | null>;
}
