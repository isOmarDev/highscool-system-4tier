import { PrismaClient } from '../../generated/prisma/client';

export class AssignmentDatabase {
  constructor(private prisma: PrismaClient) {}

  public async create(classId: string, title: string) {
    const data = await this.prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return data;
  }

  public async getById(id: string) {
    const data = await this.prisma.assignment.findUnique({
      include: {
        class: true,
        studentTasks: true,
      },
      where: {
        id,
      },
    });

    return data;
  }
}
