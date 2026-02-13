import { Router } from 'express';
import { StudentController } from '../controllers/studentController';

const router = Router();

const studentController = new StudentController();

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
