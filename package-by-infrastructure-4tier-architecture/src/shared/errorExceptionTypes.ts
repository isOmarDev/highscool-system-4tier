export const ErrorExceptionType = {
  ValidationError: 'ValidationError',
  InvalidUUID: 'InvalidUUID',
  StudentNotFound: 'StudentNotFound',
  ClassNotFound: 'ClassNotFound',
  AssignmentNotFound: 'AssignmentNotFound',
  ServerError: 'ServerError',
  ClientError: 'ClientError',
  StudentAlreadyEnrolled: 'StudentAlreadyEnrolled',
} as const;
