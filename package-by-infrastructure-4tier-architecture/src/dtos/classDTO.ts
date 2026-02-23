import {
  InvalidRequestBodyException,
  InvalidRequestParamsException,
  InvalidUUIDException,
} from '../shared/exceptions';
import { isMissingKeys, isUUID } from '../shared/helpers';
import { ParamsDictionary } from 'express-serve-static-core';

export class CreateClassDTO {
  private constructor(public name: string) {}

  static validateRequest(body: unknown) {
    const requiredKeys = ['name'];

    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { name } = body as { name: string };

    return new CreateClassDTO(name);
  }
}

export class GetClassAssignmentsDTO {
  private constructor(public readonly id: string) {}

  static validateRequest(params: ParamsDictionary) {
    if (!params || typeof params !== 'object') {
      throw new InvalidRequestParamsException(['id']);
    }

    const { id } = params as { id: string };

    if (!isUUID(id)) {
      throw new InvalidUUIDException(id);
    }

    return new GetClassAssignmentsDTO(id);
  }
}

export class EnrollStudentDTO {
  constructor(
    public studentId: string,
    public classId: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ['studentId', 'classId'];
    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, classId } = body as {
      studentId: string;
      classId: string;
    };

    return new EnrollStudentDTO(studentId, classId);
  }
}
