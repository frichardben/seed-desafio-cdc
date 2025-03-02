import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { isUnique } from '@/common/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  @isUnique({ tableName: 'authors', column: 'email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(400, {
    message: 'Description cannot be longer than 400 characters.',
  })
  description: string;

  @ApiProperty()
  register: Date;
}
