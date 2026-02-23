import { PrismaClient } from '../../generated/prisma/client';

export class ClassDatabase {
  constructor(private prisma: PrismaClient) {}

  public async create(name: string) {
    const data = await this.prisma.class.create({
      data: {
        name,
      },
    });

    return data;
  }

  public async getById(id: string) {
    const data = await this.prisma.class.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  public async createEnrollment(studentId: string, classId: string) {
    const data = await this.prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return data;
  }

  public async getEnrollment(studentId: string, classId: string) {
    const data = await this.prisma.classEnrollment.findFirst({
      where: {
        classId,
        studentId,
      },
    });

    return data;
  }
}
