import { IsNotEmpty } from 'class-validator';
import { isUnique } from '@/common/validation';

export class CreateStateDto {
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'states', column: 'name' })
  name: string;

  @IsNotEmpty()
  countryId: number;
}
