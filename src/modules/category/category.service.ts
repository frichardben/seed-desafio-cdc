import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepo.save(createCategoryDto);
    } catch {
      throw new ConflictException('Category already exists');
    }
  }

  async findAll() {
    const categories = instanceToPlain(await this.categoryRepo.find());
    return { categories };
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepo.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
