import { ParamsDictionary } from 'express-serve-static-core';
import {
  InvalidRequestBodyException,
  InvalidRequestParamsException,
  InvalidUUIDException,
} from '../shared/exceptions';
import { isMissingKeys, isUUID } from '../shared/helpers';

export class CreateAssignmentDTO {
  private constructor(
    public classId: string,
    public title: string,
  ) {}

  static validateRequest(body: unknown) {
    const requiredKeys = ['classId', 'title'];

    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { classId, title } = body as {
      classId: string;
      title: string;
    };

    return new CreateAssignmentDTO(classId, title);
  }
}

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

export class AssignStudentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ['studentId', 'assignmentId'];
    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId } = body as {
      studentId: string;
      assignmentId: string;
    };

    return new AssignStudentDTO(studentId, assignmentId);
  }
}

export class SubmitAssignmentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ['studentId', 'assignmentId'];
    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId } = body as {
      studentId: string;
      assignmentId: string;
    };

    return new SubmitAssignmentDTO(studentId, assignmentId);
  }
}

export class GradeAssignmentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
    public grade: string,
  ) {}

  static fromRequest(body: unknown) {
    const requiredKeys = ['studentId', 'assignmentId', 'grade'];
    const isRequestInvalid =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (isRequestInvalid) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { studentId, assignmentId, grade } = body as {
      studentId: string;
      assignmentId: string;
      grade: string;
    };

    return new GradeAssignmentDTO(studentId, assignmentId, grade);
  }
}
