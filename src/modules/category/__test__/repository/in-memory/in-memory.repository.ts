import { CreateCategoryDto } from '@/modules/category/dto/create-category.dto';
import { Category } from '@/modules/category/entities/category.entity';
import { CategoryRepository } from '@/modules/category/repositories/category.repository';
import { instanceToPlain } from 'class-transformer';
import { randomUUID } from 'crypto';

export class InMemoryCategoryRepository implements CategoryRepository {
  public items: Category[] = [];

  async store(data: CreateCategoryDto) {
    const category = {
      id: randomUUID(),
      name: data.name,
      books: [],
    };

    await this.items.push(category);

    return category;
  }
  async findAll() {
    return instanceToPlain(await this.items.map((item) => item));
  }

  async findById(id: string) {
    const category = await this.items.find((items) => items.id === id);
    return category || null;
  }
}
