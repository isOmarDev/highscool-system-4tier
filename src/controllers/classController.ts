import { NextFunction, Request, Response } from 'express';

import { ClassService } from '../services/classService';
import { parseForResponse } from '../shared/helpers';
import {
  CreateClassDTO,
  EnrollStudentDTO,
  GetClassAssignmentsDTO,
} from '../dtos/classDTO';

export class ClassController {
  constructor(private classService: ClassService) {}

  public createClass = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = CreateClassDTO.validateRequest(req.body);

      const cls = await this.classService.createClass(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(cls),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getClassAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = GetClassAssignmentsDTO.validateRequest(req.params);

      const assignments = await this.classService.getAssignments(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignments),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public enrollStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = EnrollStudentDTO.fromRequest(req.body);

      const classEnrollment =
        await this.classService.enrollStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classEnrollment),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}
