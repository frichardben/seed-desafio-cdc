import { IsNotEmpty } from 'class-validator';
import { isUnique } from '@/common/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @isUnique({ tableName: 'states', column: 'name' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  countryId: number;
}
