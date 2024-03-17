import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Description is required' })
  @MaxLength(400)
  description: string;

  register: Date;
}
