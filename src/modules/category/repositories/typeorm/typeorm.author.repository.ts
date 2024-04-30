import { CreateCategoryDto } from '../../dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { CategoryRepository } from '../category.repository';

export class TypeOrmCategoryRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async store(data: CreateCategoryDto) {
    return await this.categoryRepo.save(data);
  }

  async findById(id: string) {
    return await this.categoryRepo.findOne({ where: { id } });
  }

  async findAll() {
    const categories = instanceToPlain(await this.categoryRepo.find());
    return { categories };
  }
}
