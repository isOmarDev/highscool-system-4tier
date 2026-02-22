import {
  CreateStudentDTO,
  GetStudentAssignmentsDTO,
  GetStudentByIdDTO,
} from '../dtos/studentDTO';
import { StudentDatabase } from '../persistence/studentDatabase';
import { StudentNotFoundException } from '../shared/exceptions';

export class StudentService {
  constructor(private studentDb: StudentDatabase) {}

  public async createStudent(dto: CreateStudentDTO) {
    const name = dto.name;

    const response = await this.studentDb.create(name);

    return response;
  }

  async getAllStudents() {
    const response = await this.studentDb.getAll();

    return response;
  }

  async getStudentById(dto: GetStudentByIdDTO) {
    const { id } = dto;
    const response = await this.studentDb.getById(id);

    if (!response) throw new StudentNotFoundException();
    return response;
  }

  public async getAssignments(dto: GetStudentAssignmentsDTO) {
    const { id } = dto;

    const studentExists = !!(await this.studentDb.getById(id));

    if (!studentExists) {
      throw new StudentNotFoundException();
    }

    const response = await this.studentDb.getAssignments(id);

    return response;
  }

  async getGrades(dto: GetStudentByIdDTO) {
    const { id } = dto;
    const studentExists = !!(await this.studentDb.getById(id));

    if (!studentExists) {
      throw new StudentNotFoundException();
    }

    const response = await this.studentDb.getGrades(id);

    return response;
  }
}
