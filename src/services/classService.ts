import {
  CreateClassDTO,
  EnrollStudentDTO,
  GetClassAssignmentsDTO,
} from '../dtos/classDTO';
import { AssignmentDatabase } from '../persistence/assignmentDatabase';
import { ClassDatabase } from '../persistence/classDatabase';
import { StudentDatabase } from '../persistence/studentDatabase';
import {
  ClassNotFoundException,
  StudentAlreadyEnrolledException,
  StudentNotFoundException,
} from '../shared/exceptions';

export class ClassService {
  constructor(
    private classDb: ClassDatabase,
    private assignmentDb: AssignmentDatabase,
    private studentDb: StudentDatabase,
  ) {}

  public async createClass(dto: CreateClassDTO) {
    const { name } = dto;
    const cls = await this.classDb.create(name);
    return cls;
  }

  public async getAssignments(dto: GetClassAssignmentsDTO) {
    const { id } = dto;

    // check if class exists
    const cls = await this.classDb.getById(id);

    if (!cls) {
      throw new ClassNotFoundException(id);
    }

    const assignments =
      await this.assignmentDb.getAssignmentsByClassId(id);

    return assignments;
  }

  public async enrollStudent(dto: EnrollStudentDTO) {
    const { classId, studentId } = dto;

    // check if student exists
    const student = await this.studentDb.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    // check if class exists
    const cls = await this.classDb.getById(classId);

    // check if student is already enrolled in class
    const duplicatedClassEnrollment =
      await this.classDb.getEnrollment(studentId, classId);

    if (duplicatedClassEnrollment) {
      throw new StudentAlreadyEnrolledException();
    }

    if (!cls) {
      throw new ClassNotFoundException(classId);
    }

    const classEnrollment = await this.classDb.createEnrollment(
      studentId,
      classId,
    );

    return classEnrollment;
  }
}
