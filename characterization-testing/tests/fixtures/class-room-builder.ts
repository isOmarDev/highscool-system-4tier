import { faker } from '@faker-js/faker';
import { type Class } from '../../generated/prisma/client';
import { prisma } from '../../src/database';

export class ClassRoomBuilder {
  private classRoom: Partial<Class> = {
    name: faker.lorem.word(),
  };

  withName(name: string) {
    this.classRoom.name = name;
    return this;
  }

  async build() {
    const classRoom = await prisma.class.upsert({
      where: {
        name: this.classRoom.name as string,
      },
      create: {
        name: this.classRoom.name as string,
      },
      update: {
        name: this.classRoom.name as string,
      },
    });

    return classRoom;
  }
}
