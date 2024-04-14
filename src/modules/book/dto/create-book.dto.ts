import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

import { isUnique, isFutureDate } from 'src/common/validation';

const format = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

export class CreateBookDto {
  @IsNotEmpty({ message: 'Title is required' })
  @isUnique({ tableName: 'books', column: 'title' })
  title: string;

  @IsNotEmpty({ message: 'Abstract is required' })
  @MaxLength(500, { message: 'Abstract cannot be longer than 500 characters.' })
  abstract: string;

  @IsOptional()
  summary?: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  @Min(20)
  price: number;

  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber()
  @Min(100)
  pageNumber: number;

  @IsNotEmpty({ message: 'Isbn is required' })
  @isUnique({ tableName: 'books', column: 'isbn' })
  isbn: string;

  @IsNotEmpty({ message: 'Release date is required' })
  @Matches(format, { message: 'Must be dd/mm/yyyy' })
  @isFutureDate()
  releaseDate: Date;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  authorId: string;
}
