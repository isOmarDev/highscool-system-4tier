import { prisma } from '../../src/database';
import { AssignmentBuilder } from './assignment-builder';
import { StudentEnrollmentBuilder } from './student-enrollment-builder';

export class StudentAssignmentBuilder {
  private studentEnrollmentBuilder?: StudentEnrollmentBuilder;
  private assignmentBuilder?: AssignmentBuilder;

  from(studentEnrollmentBuilder: StudentEnrollmentBuilder) {
    this.studentEnrollmentBuilder = studentEnrollmentBuilder;
    return this;
  }

  and(assignmentBuilder: AssignmentBuilder) {
    this.assignmentBuilder = assignmentBuilder;
    return this;
  }

  async build() {
    if (!this.studentEnrollmentBuilder)
      throw new Error('studentEnrollmentBuilder must be defined');
    if (!this.assignmentBuilder)
      throw new Error('assignmentBuilder must be defined');

    const enrolledStudent =
      await this.studentEnrollmentBuilder.build();
    const assignment = await this.assignmentBuilder.build();

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: enrolledStudent.student.id,
        assignmentId: assignment.id,
      },
    });

    return studentAssignment;
  }
}
