import path from 'path';
import { defineFeature, loadFeature } from 'jest-cucumber';
import request, { type Response } from 'supertest';
import { faker } from '@faker-js/faker';
import type {
  Assignment,
  Student,
  StudentAssignment,
} from '../../generated/prisma/client';

import { app, Errors } from '../../src';
import {
  resetDatabase,
  ClassRoomBuilder,
  StudentBuilder,
} from '../fixtures';
import { StudentEnrollmentBuilder } from '../fixtures/student-enrollment-builder';
import { AssignmentBuilder } from '../fixtures/assignment-builder';
import { StudentAssignmentBuilder } from '../fixtures/student-assignment-builder';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/assign_student_to_assignment.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Assign a student to an assignment', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: { studentId: string; assignmentId: string };
    let response: Response;

    let student: Student;
    let assignment: Assignment;

    let aClassRoom: ClassRoomBuilder;

    given(
      'there is an existing student enrolled to a class',
      async () => {
        aClassRoom = new ClassRoomBuilder();
        const classRoomBuilder = aClassRoom.withName('Math');

        const aStudent = new StudentBuilder();
        const studentBuilder = aStudent
          .withName('omar')
          .withEmail('omar@gmail.com');

        const anEnrolledStudent = new StudentEnrollmentBuilder();
        const enrolledStudent = await anEnrolledStudent
          .from(classRoomBuilder)
          .and(studentBuilder)
          .build();

        student = enrolledStudent.student;
      },
    );

    and('an assignment exists for a class', async () => {
      const classRoomBuilder = aClassRoom.withName('Math');

      const anAssignment = new AssignmentBuilder();
      const assignmentResult = await anAssignment
        .from(classRoomBuilder)
        .build();

      assignment = assignmentResult;
    });

    when('i assign the student the assignment', async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then('the student should be assigned to the assignment', () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(
        requestBody.studentId,
      );
      expect(response.body.data.assignmentId).toBe(
        requestBody.assignmentId,
      );
    });
  });

  test('Fail to assign a student to an assignment when student does not exist', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: { studentId: string; assignmentId: string };
    let response: Response;

    let assignment: Assignment;

    given('a student does not exist', () => {});

    and('an assignment exists for a class', async () => {
      const classRoomBuilder = new ClassRoomBuilder();

      const anAssignment = new AssignmentBuilder();
      const assignmentResult = await anAssignment
        .from(classRoomBuilder)
        .build();

      assignment = assignmentResult;
    });

    when('i assign the student the assignment', async () => {
      requestBody = {
        studentId: faker.string.uuid(),
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then('i should get a student not found error', () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(Errors.StudentNotFound);
    });
  });

  test('Fail to assign a student to an assignment when assignment does not exist', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: { studentId: string; assignmentId: string };
    let response: Response;

    let student: Student;

    given(
      'there is an existing student enrolled to a class',
      async () => {
        const studentBuilder = new StudentBuilder();
        const classRoomBuilder = new ClassRoomBuilder();

        const studentEnrollmentBuilder =
          new StudentEnrollmentBuilder();
        const enrolledStudent = await studentEnrollmentBuilder
          .from(classRoomBuilder)
          .and(studentBuilder)
          .build();

        student = enrolledStudent.student;
      },
    );

    and('an assignment does not exist', () => {});

    when('i assign the student the assignment', async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: faker.string.uuid(),
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then('i should get an assignment not found error', () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(Errors.AssignmentNotFound);
    });
  });

  test('Fail to assign a student to an assignment when student is not enrolled', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: { studentId: string; assignmentId: string };
    let response: Response;

    let student: Student;
    let assignment: Assignment;

    given(
      'there is an existing student that is not enrolled to a class',
      async () => {
        const studentResult = await new StudentBuilder().build();
        student = studentResult;
      },
    );

    and('an assignment exists for a class', async () => {
      const classRoomBuilder = new ClassRoomBuilder();
      const anAssignment = new AssignmentBuilder();
      assignment = await anAssignment.from(classRoomBuilder).build();
    });

    when('i assign the student the assignment', async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then('i should get a student not enrolled error', () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(Errors.StudentNotEnrolled);
    });
  });

  test('Fail to assign a student to an assignment when already assigned', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: { studentId: string; assignmentId: string };
    let response: Response;

    let studentAssignment: StudentAssignment;

    let classRoomBuilder: ClassRoomBuilder;
    let assignmentBuilder: AssignmentBuilder;
    let studentEnrollmentBuilder: StudentEnrollmentBuilder;

    given(
      'there is an existing student enrolled to a class',
      async () => {
        classRoomBuilder = new ClassRoomBuilder();
        const studentBuilder = new StudentBuilder();

        const anEnrolledStudent = new StudentEnrollmentBuilder();
        studentEnrollmentBuilder = anEnrolledStudent
          .from(classRoomBuilder)
          .and(studentBuilder);
      },
    );

    and('an assignment exists for a class', async () => {
      const anAssignment = new AssignmentBuilder();
      assignmentBuilder = anAssignment.from(classRoomBuilder);
    });

    and(
      'the student is already assigned to the assignment',
      async () => {
        const astudentAssignment = new StudentAssignmentBuilder();
        studentAssignment = await astudentAssignment
          .from(studentEnrollmentBuilder)
          .and(assignmentBuilder)
          .build();
      },
    );

    when('i assign the student the assignment', async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId,
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then('i should get an already assigned error', () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe(
        Errors.AlreadyAssignedAssignmentToStudent,
      );
    });
  });
});
