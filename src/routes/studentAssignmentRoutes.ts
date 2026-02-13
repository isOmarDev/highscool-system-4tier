import { Router } from 'express';
import { StudentAssignmentController } from '../controllers/studentAssignmentController';

const router = Router();

const studentAssignmentController = new StudentAssignmentController();

// POST assign student to assignment
router.post('/', studentAssignmentController.createStudentAssignment);

// POST submit student assignment
router.post(
  '/submit',
  studentAssignmentController.submitStudentAssignment,
);

// POST grade student assignment
router.post(
  '/grade',
  studentAssignmentController.gradeStudentAssignment,
);

export default router;
