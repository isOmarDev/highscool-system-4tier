import {
  InvalidRequestParamsException,
  InvalidUUIDException,
} from '../shared/exceptions';
import { isUUID } from '../shared/helpers';
import { ParamsDictionary } from 'express-serve-static-core';

export class GetAssignmentByIdDTO {
  private constructor(public readonly id: string) {}

  static validateRequest(params: ParamsDictionary) {
    if (!params || typeof params !== 'object') {
      throw new InvalidRequestParamsException(['id']);
    }

    const { id } = params as { id: string };

    if (!isUUID(id)) {
      throw new InvalidUUIDException(id);
    }

    return new GetAssignmentByIdDTO(id);
  }
}
