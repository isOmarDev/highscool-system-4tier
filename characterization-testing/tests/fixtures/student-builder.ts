import { faker } from '@faker-js/faker';
import { type Student } from '../../generated/prisma/client';
import { prisma } from '../../src/database';

export class StudentBuilder {
  private student: Partial<Student> = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };

  withName(name: string) {
    this.student.name = name;
    return this;
  }

  withEmail(email: string) {
    this.student.email = email;
    return this;
  }

  async build() {
    const student = await prisma.student.upsert({
      where: {
        email: this.student.email as string,
      },
      create: {
        name: this.student.name as string,
        email: this.student.email as string,
      },
      update: {
        name: this.student.name as string,
        email: this.student.email as string,
      },
    });

    return student;
  }
}
