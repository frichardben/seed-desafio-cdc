import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { AuthorController } from '../author.controller';
import { AuthorService } from '../author.service';
import { AuthorRepository } from '../repositories/author.repository';
import { InMemoryAuthorRepository } from 'test/repositories/in-memory-author-repository';
import { CreateAuthorDto } from '../dto/create-author.dto';

describe('AuthorController (E2E)', () => {
  let app: INestApplication;
  let controller: AuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [
        AuthorService,
        { provide: AuthorRepository, useClass: InMemoryAuthorRepository },
      ],
      exports: [AuthorService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<AuthorController>(AuthorController);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/GET authors', () => {
    return request(app.getHttpServer())
      .get('/api/v1/authors')
      .expect(200)
      .expect([]);
  });

  it('/POST authors', async () => {
    const createAuthorDto: CreateAuthorDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      description: 'A new author',
      register: new Date(),
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/authors')
      .send(createAuthorDto)
      .expect(201);

    expect(response.body).toMatchObject({
      name: createAuthorDto.name,
      email: createAuthorDto.email,
      description: createAuthorDto.description,
    });

    const AuthorController = await controller.findById(response.body.id);
    expect(AuthorController).toBeDefined();
    expect(AuthorController.name).toBe(createAuthorDto.name);
  });

  it('/GET/:id authors', async () => {
    const createAuthorDto: CreateAuthorDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      description: 'A new author',
      register: new Date(),
    };

    const createAuthor = await request(app.getHttpServer())
      .post('/api/v1/authors')
      .send(createAuthorDto)
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/api/v1/authors/${createAuthor.body.id}`)
      .send(createAuthorDto)
      .expect(200);

    expect(response.body).toMatchObject({
      name: createAuthorDto.name,
      email: createAuthorDto.email,
      description: createAuthorDto.description,
    });
  });
});
