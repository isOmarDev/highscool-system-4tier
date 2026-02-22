import { NextFunction, Request, Response } from 'express';

import { AssignmentService } from '../services/assignmentService';
import { parseForResponse } from '../shared/helpers';
import {
  AssignStudentDTO,
  CreateAssignmentDTO,
  GetAssignmentByIdDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from '../dtos/assignmentDTO';

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

  public assignStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = AssignStudentDTO.fromRequest(req.body);
      const data = await this.assignmentService.assignStudent(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public submitAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = SubmitAssignmentDTO.fromRequest(req.body);
      const data = await this.assignmentService.submitAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public gradeAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = GradeAssignmentDTO.fromRequest(req.body);
      const data = await this.assignmentService.gradeAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
