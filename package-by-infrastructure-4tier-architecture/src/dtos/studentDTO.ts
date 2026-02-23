import { InvalidRequestBodyException } from '../shared/exceptions';
import { isMissingKeys, isUUID } from '../shared/helpers';

export class CreateStudentDTO {
  constructor(public name: string) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ['name'];
    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { name } = body as { name: string };

    return new CreateStudentDTO(name);
  }
}

export class GetStudentByIdDTO {
  constructor(public id: string) {}

  static fromRequestParams(params: unknown) {
    const areParamsInvalid =
      !params ||
      typeof params !== 'object' ||
      'id' in params === false;

    if (areParamsInvalid) {
      throw new InvalidRequestBodyException(['id']);
    }

    const { id } = params as { id: string };

    if (!isUUID(id)) {
      throw new InvalidRequestBodyException(['id']);
    }

    return new GetStudentByIdDTO(id);
  }
}

export class GetStudentAssignmentsDTO {
  constructor(public id: string) {}

  static fromRequestParams(params: unknown) {
    const areParamsInvalid =
      !params ||
      typeof params !== 'object' ||
      'id' in params === false;

    if (areParamsInvalid) {
      throw new InvalidRequestBodyException(['id']);
    }

    const { id } = params as { id: string };

    if (!isUUID(id)) {
      throw new InvalidRequestBodyException(['id']);
    }

    return new GetStudentAssignmentsDTO(id);
  }
}
