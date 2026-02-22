import { Router } from 'express';
import { prisma } from '../database';

import { StudentController } from '../controllers/studentController';
import { StudentDatabase } from '../persistence/studentDatabase';
import { StudentService } from '../services/studentService';

const router = Router();

const studentDatabase = new StudentDatabase(prisma);
const studentService = new StudentService(studentDatabase);
const studentController = new StudentController(studentService);

// POST create student
router.post('/', studentController.createStudent);

// GET all students
router.get('/', studentController.getAllStudents);

// GET student by id
router.get('/:id', studentController.getStudentById);

// GET student assignments
router.get(
  '/:id/assignments',
  studentController.getStudentAssignments,
);

// GET student grades
router.get('/:id/grades', studentController.getStudentGrades);

export default router;
