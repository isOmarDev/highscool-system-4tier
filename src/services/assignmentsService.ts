import { CreateAssignmentDTO } from '../dtos/createAssignmentDTO';
import { GetAssignmentByIdDTO } from '../dtos/getAssignmentByIdDTO';
import { AssignmentDatabase } from '../persistence/assignmentDatabase';
import { Errors } from '../shared/errors';

export class AssignmentService {
  constructor(private db: AssignmentDatabase) {}

  public async createAssignment(dto: CreateAssignmentDTO) {
    const { classId, title } = dto;

    const assignment = await this.db.create(classId, title);

    return assignment;
  }

  public async getAssignmentById(dto: GetAssignmentByIdDTO) {
    const { id } = dto;

    const assignment = await this.db.getById(id);

    if (!assignment) {
      throw new Error(Errors.AssignmentNotFound);
    }

    return assignment;
  }
}
