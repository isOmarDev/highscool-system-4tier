import { Errors } from '../shared/errors';
import { isUUID } from '../shared/helpers';
import { ParamsDictionary } from 'express-serve-static-core';

export class GetAssignmentByIdDTO {
  private constructor(public readonly id: string) {}

  static validateRequest(params: ParamsDictionary) {
    if (
      !params ||
      typeof params !== 'object' ||
      params.id === undefined
    ) {
      throw new Error(Errors.ValidationError);
    }

    const { id } = params as { id: string };

    if (!isUUID(id)) {
      throw new Error(Errors.ValidationError);
    }

    return new GetAssignmentByIdDTO(id);
  }
}
