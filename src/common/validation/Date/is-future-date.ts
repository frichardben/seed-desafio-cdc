import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function isFutureDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const currentDate = new Date();
          const dateArray = value.split('/');
          const newDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
          const inputDate = new Date(newDate);

          const futureDate = inputDate < currentDate;
          return !futureDate;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a future date`;
        },
      },
    });
  };
}
