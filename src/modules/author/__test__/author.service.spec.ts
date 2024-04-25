import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { InMemoryAuthorRepository } from './repository/in-memory/in-memory.author.repository';
import { CreateAuthorDto } from '../dto/create-author.dto';

import { AuthorRepository } from '../repositories/author.repository';
import { randomUUID } from 'crypto';

let service: AuthorService;
let inMemoryAuthorRepository: InMemoryAuthorRepository;

describe('AuthorService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        InMemoryAuthorRepository,
        {
          provide: AuthorRepository,
          useClass: InMemoryAuthorRepository,
        },
      ],
    }).compile();

    inMemoryAuthorRepository = module.get<InMemoryAuthorRepository>(
      InMemoryAuthorRepository,
    );
    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an author', async () => {
    const authorData: CreateAuthorDto = {
      name: 'John Doe',
      email: 'john@example.com',
      description: 'Lorem ipsum',
      register: new Date(),
    };

    const createdAuthorInMemory =
      await inMemoryAuthorRepository.store(authorData);

    expect(inMemoryAuthorRepository.items).toContainEqual(
      createdAuthorInMemory,
    );
  });

  it('should find all authors', async () => {
    const authorDataFirst: CreateAuthorDto = {
      name: 'John Doe',
      email: 'john@example.com',
      description: 'Lorem ipsum',
      register: new Date(),
    };
    await service.create(authorDataFirst);

    await inMemoryAuthorRepository.store(authorDataFirst);

    const authorDataSecond: CreateAuthorDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      description: 'Lorem ipsum',
      register: new Date(),
    };
    await service.create(authorDataSecond);

    await inMemoryAuthorRepository.store(authorDataSecond);

    const allAuthors = await service.findAll();

    expect(allAuthors).toHaveLength(2);
  });

  it('should not find author by id', async () => {
    const authorId = randomUUID();

    const findAuthorInMemory =
      await inMemoryAuthorRepository.findById(authorId);

    expect(findAuthorInMemory).toBeNull();
  });

  it('should  find author by id', async () => {
    const authorData: CreateAuthorDto = {
      name: 'John Doe',
      email: 'john@example.com',
      description: 'Lorem ipsum',
      register: new Date(),
    };
    const createdAuthor = await service.create(authorData);

    const createdAuthorInMemory =
      await inMemoryAuthorRepository.store(authorData);

    expect(
      await inMemoryAuthorRepository.findById(createdAuthorInMemory.id),
    ).toEqual(createdAuthorInMemory);
    expect(await service.findById(createdAuthor.id)).toEqual(createdAuthor);
  });
});
