import { Request, Response } from 'express';
import { parseForResponse } from '../shared/helpers';
import { Errors } from '../shared/errors';
import { CreateAssignmentDTO } from '../dtos/createAssignmentDTO';
import { AssignmentService } from '../services/assignmentsService';
import { GetAssignmentByIdDTO } from '../dtos/getAssignmentByIdDTO';

export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  public createAssignment = async (req: Request, res: Response) => {
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
      switch (error.message) {
        case Errors.ValidationError: {
          return res.status(400).json({
            error: Errors.ValidationError,
            data: undefined,
            success: false,
          });
        }

        default: {
          return res.status(500).json({
            error: Errors.ServerError,
            data: undefined,
            success: false,
          });
        }
      }
    }
  };

  public getAssignmentById = async (req: Request, res: Response) => {
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
      switch (error.message) {
        case Errors.ValidationError: {
          return res.status(400).json({
            error: Errors.ValidationError,
            data: undefined,
            success: false,
          });
        }
        case Errors.AssignmentNotFound: {
          return res.status(404).json({
            error: Errors.AssignmentNotFound,
            data: undefined,
            success: false,
          });
        }
        default: {
          return res.status(500).json({
            error: Errors.ServerError,
            data: undefined,
            success: false,
          });
        }
      }
    }
  };
}
