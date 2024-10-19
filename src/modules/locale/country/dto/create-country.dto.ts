import { IsNotEmpty } from 'class-validator';
import { isUnique } from '@/common/validation';

export class CreateCountryDto {
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'countries', column: 'name' })
  name: string;
}
