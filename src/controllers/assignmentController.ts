import { NextFunction, Request, Response } from 'express';

import { CreateAssignmentDTO } from '../dtos/createAssignmentDTO';
import { GetAssignmentByIdDTO } from '../dtos/getAssignmentByIdDTO';
import { AssignmentService } from '../services/assignmentsService';
import { parseForResponse } from '../shared/helpers';

export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  public createAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = CreateAssignmentDTO.validateRequest(req.body);

      const assignment =
        await this.assignmentService.createAssignment(dto);

      return res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAssignmentById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = GetAssignmentByIdDTO.validateRequest(req.params);

      const assignment =
        await this.assignmentService.getAssignmentById(dto);

      return res.status(200).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
