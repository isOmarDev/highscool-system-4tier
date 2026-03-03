import { prisma } from '../../src/database';
import { StudentBuilder } from './student-builder';
import { ClassRoomBuilder } from './class-room-builder';

export class StudentEnrollmentBuilder {
  private classRoomBuilder?: ClassRoomBuilder;
  private studentBuilder?: StudentBuilder;

  from(classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  and(studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
    return this;
  }

  async build() {
    if (!this.classRoomBuilder)
      throw new Error('you must define classroom builder');
    if (!this.studentBuilder)
      throw new Error('you must define student builder');

    let classRoom = await this.classRoomBuilder.build();
    let student = await this.studentBuilder.build();

    const enrolledStudent = await prisma.classEnrollment.upsert({
      where: {
        studentId_classId: {
          studentId: student.id,
          classId: classRoom.id,
        },
      },
      create: { studentId: student.id, classId: classRoom.id },
      update: { studentId: student.id, classId: classRoom.id },
    });

    return { student, classRoom, enrolledStudent };
  }
}
