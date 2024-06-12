import { AuthorService } from '../author.service';
import { InMemoryAuthorRepository } from 'test/repositories/in-memory-author-repository';

import { CreateAuthorDto } from '../dto/create-author.dto';

import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';

let service: AuthorService;
let inMemoryAuthorRepository: InMemoryAuthorRepository;

describe('AuthorService', () => {
  beforeEach(() => {
    inMemoryAuthorRepository = new InMemoryAuthorRepository();
    service = new AuthorService(inMemoryAuthorRepository);
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

    const createdAuthorInMemory = await service.create(authorData);

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

    const authorDataSecond: CreateAuthorDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      description: 'Lorem ipsum',
      register: new Date(),
    };
    await service.create(authorDataSecond);

    expect(inMemoryAuthorRepository.items).toHaveLength(2);
  });

  it('should not find author by id', async () => {
    const authorId = randomUUID();

    const findAuthorInMemory = service.findById(authorId);

    expect(findAuthorInMemory).rejects.toThrow(NotFoundException);
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
