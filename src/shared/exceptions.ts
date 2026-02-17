export class InvalidRequestBodyException extends Error {
  constructor(missingKeys: string[]) {
    super('Body is missing required key: ' + missingKeys.join(', '));
  }
}

export class InvalidRequestParamsException extends Error {
  constructor(missingParams: string[]) {
    super(
      'Request is missing required params: ' +
        missingParams.join(', '),
    );
  }
}

export class InvalidUUIDException extends Error {
  constructor(field: string = 'id') {
    super(`${field} must be a valid UUID`);
    this.name = 'InvalidUUIDException';
  }
}

export class AssignmentNotFoundException extends Error {
  constructor() {
    super('Assignment not found');
  }
}
