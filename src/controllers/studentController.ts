import { NextFunction, Request, Response } from 'express';
import { parseForResponse } from '../shared/helpers';
import {
  CreateStudentDTO,
  GetStudentAssignmentsDTO,
  GetStudentByIdDTO,
} from '../dtos/studentDTO';
import { StudentService } from '../services/studentService';

export class StudentController {
  constructor(private studentService: StudentService) {}

  public createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = CreateStudentDTO.fromRequest(req.body);
      const data = await this.studentService.createStudent(dto);
      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.studentService.getAllStudents();
      res
        .status(200)
        .json({ error: undefined, data: data, success: true });
    } catch (error) {
      next(error);
    }
  };

  public getStudentById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = GetStudentByIdDTO.fromRequestParams(req.params);
      const data = await this.studentService.getStudentById(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getStudentAssignments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = GetStudentAssignmentsDTO.fromRequestParams(
        req.params,
      );

      const studentAssignments =
        await this.studentService.getAssignments(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getStudentGrades = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const dto = GetStudentByIdDTO.fromRequestParams(req.params);

      const data = await this.studentService.getGrades(dto);

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
