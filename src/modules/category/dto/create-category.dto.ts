import { IsNotEmpty } from 'class-validator';
import { isUnique } from 'src/common/validation/is-unique';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'categories', column: 'name' })
  name: string;
}
