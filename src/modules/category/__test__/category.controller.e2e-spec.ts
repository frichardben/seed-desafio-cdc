import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { CategoryRepository } from '../repositories/category.repository';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository';
import { CreateCategoryDto } from '../dto/create-category.dto';

describe('CategoryController (E2E)', () => {
  let app: INestApplication;
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        { provide: CategoryRepository, useClass: InMemoryCategoryRepository },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/GET categories', () => {
    return request(app.getHttpServer())
      .get('/api/v1/categories')
      .expect(200)
      .expect([]);
  });

  it('/POST categories', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Drama',
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/categories')
      .send(createCategoryDto)
      .expect(201);

    expect(response.body).toMatchObject({
      name: createCategoryDto.name,
    });

    const CategoryController = await controller.findOne(response.body.id);
    expect(CategoryController).toBeDefined();
    expect(CategoryController.name).toBe(createCategoryDto.name);
  });

  it('/GET/:id categories', async () => {
    const createCategoryDto: CreateCategoryDto = {
      name: 'Drama',
    };

    const createAuthor = await request(app.getHttpServer())
      .post('/api/v1/categories')
      .send(createCategoryDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/api/v1/categories/${createAuthor.body.id}`)
      .send(createCategoryDto)
      .expect(200);

    expect(response.body).toMatchObject({
      name: createCategoryDto.name,
    });
  });
});
