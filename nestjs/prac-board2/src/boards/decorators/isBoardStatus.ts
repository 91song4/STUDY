import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { BoardStatus } from '../board.entity';
import { BadRequestException } from '@nestjs/common';

export function IsBoardStatus(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBoardStatus',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          value = value.toUpperCase();

          if (Object.keys(BoardStatus).indexOf(value) === -1) {
            throw new BadRequestException(validationOptions.message);
          }
          return value;
        },
      },
    });
  };
}
