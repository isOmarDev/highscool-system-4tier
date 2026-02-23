import {
  AssignStudentDTO,
  CreateAssignmentDTO,
  GetAssignmentByIdDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from '../dtos/assignmentDTO';
import { AssignmentDatabase } from '../persistence/assignmentDatabase';
import { StudentDatabase } from '../persistence/studentDatabase';
import {
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
  StudentNotFoundException,
} from '../shared/exceptions';

export class AssignmentService {
  constructor(
    private assignmentDb: AssignmentDatabase,
    private studentDb: StudentDatabase,
  ) {}

  public async createAssignment(dto: CreateAssignmentDTO) {
    const { classId, title } = dto;
    const assignment = await this.assignmentDb.create(classId, title);
    return assignment;
  }

  public async getAssignmentById(dto: GetAssignmentByIdDTO) {
    const { id } = dto;

    const assignment = await this.assignmentDb.getById(id);

    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    return assignment;
  }

  public async assignStudent(dto: AssignStudentDTO) {
    const { studentId, assignmentId } = dto;

    const student = await this.studentDb.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const assignment = await this.assignmentDb.getById(assignmentId);

    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    const response = await this.assignmentDb.createStudentAssignment(
      assignmentId,
      studentId,
    );

    return response;
  }

  public async submitAssignment(dto: SubmitAssignmentDTO) {
    const { studentId, assignmentId } = dto;

    const assignment = await this.assignmentDb.getStudentAssignment(
      assignmentId,
      studentId,
    );

    if (!assignment) {
      throw new StudentAssignmentNotFoundException();
    }

    const response = await this.assignmentDb.submit(assignment.id);

    return response;
  }

  public async gradeAssignment(dto: GradeAssignmentDTO) {
    const { studentId, assignmentId, grade } = dto;

    const assignment = await this.assignmentDb.getStudentAssignment(
      assignmentId,
      studentId,
    );

    if (!assignment) {
      throw new StudentAssignmentNotFoundException();
    }

    const response = await this.assignmentDb.grade(
      assignment.id,
      grade,
    );

    return response;
  }
}
