import { faker } from '@faker-js/faker';
import { Assignment } from '../../generated/prisma/client';
import { prisma } from '../../src/database';
import { ClassRoomBuilder } from './class-room-builder';

export class AssignmentBuilder {
  private assignment: Partial<Assignment> = {
    title: faker.lorem.sentence(),
  };
  private classRoomBuilder?: ClassRoomBuilder;

  from(classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  withTitle(title: string) {
    this.assignment.title = title;
    return this;
  }

  async build() {
    if (!this.classRoomBuilder)
      throw new Error('classroomBuilder not defined');

    const classRoom = await this.classRoomBuilder.build();

    const assignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title as string,
        classId: classRoom.id,
      },
    });

    return assignment;
  }
}
