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
      where: {
        id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return data;
  }

  public async getAssignmentsByClassId(classId: string) {
    const data = await this.prisma.assignment.findMany({
      where: {
        classId,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return data;
  }

  public async createStudentAssignment(
    assignmentId: string,
    studentId: string,
  ) {
    const data = await this.prisma.studentAssignment.create({
      data: {
        assignmentId,
        studentId,
      },
    });

    return data;
  }

  public async getStudentAssignment(
    assignmentId: string,
    studentId: string,
  ) {
    const data = await this.prisma.studentAssignment.findFirst({
      where: {
        assignmentId,
        studentId,
      },
    });

    return data;
  }

  public async submit(id: string) {
    const data = await this.prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        status: 'submitted',
      },
    });

    return data;
  }

  public async grade(id: string, grade: string) {
    const data = await this.prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });

    return data;
  }
}
