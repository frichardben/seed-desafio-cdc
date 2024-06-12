import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsUniqueConstraint } from './is-unique-constraint';
import { IsUniqueInterface } from '@/common/types/is-unique';

export function isUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
