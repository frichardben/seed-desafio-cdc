import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { isUnique } from 'src/common/validation/is-unique';
export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  @isUnique({ tableName: 'authors', column: 'email' })
  email: string;

  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(400, {
    message: 'Description cannot be longer than 400 characters.',
  })
  description: string;

  register: Date;
}
