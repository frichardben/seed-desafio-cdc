import { IsNotEmpty } from 'class-validator';
import { isUnique } from '@/common/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'countries', column: 'name' })
  name: string;
}
