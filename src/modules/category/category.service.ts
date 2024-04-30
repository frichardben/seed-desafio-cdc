import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepo.store(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepo.findAll();
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
