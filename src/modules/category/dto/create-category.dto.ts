import { IsNotEmpty } from 'class-validator';
import { isUnique } from '@/common/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'categories', column: 'name' })
  name: string;
}
