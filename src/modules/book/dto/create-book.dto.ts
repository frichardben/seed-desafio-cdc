import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

import { isUnique, isFutureDate } from 'src/common/validation';
import { ApiProperty } from '@nestjs/swagger';

const format = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @isUnique({ tableName: 'books', column: 'title' })
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Abstract is required' })
  @MaxLength(500, { message: 'Abstract cannot be longer than 500 characters.' })
  abstract: string;

  @ApiProperty()
  @IsOptional()
  summary?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber()
  @Min(20)
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber()
  @Min(100)
  pageNumber: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Isbn is required' })
  @isUnique({ tableName: 'books', column: 'isbn' })
  isbn: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Release date is required' })
  @Matches(format, { message: 'Must be dd/mm/yyyy' })
  @isFutureDate()
  releaseDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  authorId: string;
}
