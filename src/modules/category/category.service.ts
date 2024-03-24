import { ConflictException, Injectable } from '@nestjs/common';
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

  async findByCategory(name: string) {
    const category = await this.categoryRepo.findOne({ where: { name } });
    return category;
  }

  async findAll() {
    const categories = instanceToPlain(await this.categoryRepo.find());
    return categories;
  }

  findOne(id: string) {
    return this.categoryRepo.findOneOrFail({ where: { id } });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
