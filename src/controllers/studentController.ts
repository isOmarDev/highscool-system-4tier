import { Request, Response } from 'express';
import {
  isMissingKeys,
  isUUID,
  parseForResponse,
} from '../shared/helpers';
import { Errors } from '../shared/errors';
import { prisma } from '../database';

export class StudentController {
  constructor() {}

  public createStudent = async (req: Request, res: Response) => {
    try {
      if (isMissingKeys(req.body, ['name'])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { name } = req.body;

      const student = await prisma.student.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: Errors.ServerError,
        data: undefined,
        success: false,
      });
    }
  };

  public getAllStudents = async (req: Request, res: Response) => {
    try {
      const students = await prisma.student.findMany({
        include: {
          classes: true,
          assignments: true,
          reportCards: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      res.status(200).json({
        error: undefined,
        data: parseForResponse(students),
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: Errors.ServerError,
        data: undefined,
        success: false,
      });
    }
  };

  public getStudentById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
        include: {
          classes: true,
          assignments: true,
          reportCards: true,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: Errors.ServerError,
        data: undefined,
        success: false,
      });
    }
  };

  public getStudentAssignments = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments =
        await prisma.studentAssignment.findMany({
          where: {
            studentId: id,
            status: 'submitted',
          },
          include: {
            assignment: true,
          },
        });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: Errors.ServerError,
        data: undefined,
        success: false,
      });
    }
  };

  public getStudentGrades = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments =
        await prisma.studentAssignment.findMany({
          where: {
            studentId: id,
            status: 'submitted',
            grade: {
              not: null,
            },
          },
          include: {
            assignment: true,
          },
        });

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        error: Errors.ServerError,
        data: undefined,
        success: false,
      });
    }
  };
}
