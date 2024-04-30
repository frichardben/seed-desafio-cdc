import { CategoryService } from '../category.service';
import { InMemoryCategoryRepository } from './repository/in-memory/in-memory.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;

  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    service = new CategoryService(inMemoryCategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const categoryData: CreateCategoryDto = {
      name: 'Comedy',
    };

    const createdCategoryInMemory = await service.create(categoryData);

    expect(inMemoryCategoryRepository.items).toContainEqual(
      createdCategoryInMemory,
    );
  });

  it('should find all categories', async () => {
    const categoryData = {
      name: 'Comedy',
    };

    await service.create(categoryData);

    const findCategory = await service.findAll();

    expect(findCategory).toHaveLength(1);
  });

  it('should find category by id', async () => {
    const categoryData = {
      name: 'Comedy',
    };

    const createCategory = await service.create(categoryData);

    expect(await service.findOne(createCategory.id)).toEqual(createCategory);
  });

  it('should not find category by id', async () => {
    const categoryId = randomUUID();

    const findCategory = await service.findOne(categoryId);

    expect(findCategory).rejects.toThrow(NotFoundException);

    expect(service.findOne(categoryId)).rejects.toThrow(NotFoundException);
    expect(() => service.findOne(categoryId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
