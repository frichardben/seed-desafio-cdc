import { IsNotEmpty } from 'class-validator';
import { isUnique } from 'src/common/validation';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'categories', column: 'name' })
  name: string;
}
