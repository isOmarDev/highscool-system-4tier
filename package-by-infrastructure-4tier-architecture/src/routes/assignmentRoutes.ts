import { Router } from 'express';
import { AssignmentController } from '../controllers/assignmentController';
import { AssignmentService } from '../services/assignmentService';
import { AssignmentDatabase } from '../persistence/assignmentDatabase';
import { prisma } from '../database';
import { StudentDatabase } from '../persistence/studentDatabase';

const router = Router();

const assignmentDatabase = new AssignmentDatabase(prisma);
const studentDatabase = new StudentDatabase(prisma);

const assignmentService = new AssignmentService(
  assignmentDatabase,
  studentDatabase,
);

const assignmentController = new AssignmentController(
  assignmentService,
);

// POST create assignment
router.post('/', assignmentController.createAssignment);

// GET assignment by id
router.get('/:id', assignmentController.getAssignmentById);

// POST assign student to assignment
router.post('/assign-student', assignmentController.assignStudent);

// POST submit student assignment
router.post('/submit', assignmentController.submitAssignment);

// POST grade student assignment
router.post('/grade', assignmentController.gradeAssignment);

export default router;
