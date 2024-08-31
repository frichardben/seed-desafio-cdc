import { BookService } from '../book.service';
import { InMemoryAuthorRepository } from 'test/repositories/in-memory-author-repository';
import { InMemoryBookRepository } from 'test/repositories/in-memory-book-repository';
import { InMemoryCategoryRepository } from 'test/repositories/in-memory-category-repository';
import { CreateBookDto } from '@/modules/book/dto/create-book.dto';
import { CreateAuthorDto } from '@/modules/author/dto/create-author.dto';
import { CreateCategoryDto } from '@/modules/category/dto/create-category.dto';
import { AuthorService } from '@/modules/author/author.service';
import { CategoryService } from '@/modules/category/category.service';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;
  let inMemoryBookRespository: InMemoryBookRepository;
  let inMemoryAuthorRepository: InMemoryAuthorRepository;
  let inMemoryCategoryRepository: InMemoryCategoryRepository;
  let authorService: AuthorService;
  let categoryService: CategoryService;

  beforeEach(() => {
    inMemoryAuthorRepository = new InMemoryAuthorRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    inMemoryBookRespository = new InMemoryBookRepository();
    service = new BookService(
      inMemoryBookRespository,
      authorService,
      categoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const authorData: CreateAuthorDto = {
      name: 'John Doe',
      email: 'john@example.com',
      description: 'Lorem ipsum',
      register: new Date(),
    };

    const authorInMemory = await inMemoryAuthorRepository.store(authorData);

    if (authorInMemory) {
      return;
    }

    const categoryData: CreateCategoryDto = {
      name: 'Drama',
    };

    const categoryInMemory =
      await inMemoryCategoryRepository.store(categoryData);

    if (categoryInMemory) {
      return;
    }

    const bookDto: CreateBookDto = {
      title: 'Story Li',
      abstract:
        'The overview of the abstract book is the introduction of the general aspects of the conference.',
      summary: '',
      price: 20,
      pageNumber: 100,
      isbn: '978–85–333–0228',
      releaseDate: new Date(),
      categoryId: categoryInMemory.id,
      authorId: authorInMemory.id,
    };

    const createBookInMemory = await service.create(bookDto);

    expect(inMemoryBookRespository.items).toContainEqual(createBookInMemory);
  });


  it('should not find book by id', async () => {
    const bookId = randomUUID();

    const findAuthorInMemory = service.findOne(bookId);

    expect(findAuthorInMemory).rejects.toThrow(NotFoundException);
  });
});
