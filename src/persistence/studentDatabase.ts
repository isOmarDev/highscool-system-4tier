import { PrismaClient } from '../../generated/prisma/client';

export class StudentDatabase {
  constructor(private prisma: PrismaClient) {}

  public async create(name: string) {
    const data = await this.prisma.student.create({
      data: {
        name,
      },
    });

    return data;
  }

  public async getAll() {
    const data = await this.prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return data;
  }

  public async getById(id: string) {
    const data = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  public async getAssignments(id: string) {
    const data = await this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }

  public async getGrades(id: string) {
    const data = await this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }
}
