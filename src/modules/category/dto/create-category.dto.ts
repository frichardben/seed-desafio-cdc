import { IsNotEmpty } from 'class-validator';
import { isUnique } from '@/common/validation';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'categories', column: 'name' })
  name: string;
}
