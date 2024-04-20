import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../author.service';
import { TypeOrmAuthorRepository } from '../repositories/typeorm/typeorm.author.repository';
// import { CreateAuthorDto } from '../dto/create-author.dto';

let service: AuthorService;

const mockAuthorService = () => ({
  store: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
});

describe('AuthorService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: TypeOrmAuthorRepository,
          useFactory: mockAuthorService,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should create author', async () => {
  //   const authorData: CreateAuthorDto = {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     description: 'Lorem ipsum',
  //     register: new Date(),
  //   };
  //   const createdAuthor = await service.create(authorData);
  //   expect(createdAuthor).toBeDefined();
  // });
});
