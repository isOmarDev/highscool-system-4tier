import { InvalidRequestBodyException } from '../shared/exceptions';
import { isMissingKeys } from '../shared/helpers';

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
