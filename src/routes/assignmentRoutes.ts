import { Router } from 'express';
import { AssignmentController } from '../controllers/assignmentController';
import { AssignmentService } from '../services/assignmentsService';
import { AssignmentDatabase } from '../persistence/assignmentDatabase';
import { prisma } from '../database';

const router = Router();

const assignmentDatabase = new AssignmentDatabase(prisma);
const assignmentService = new AssignmentService(assignmentDatabase);
const assignmentController = new AssignmentController(
  assignmentService,
);

// POST create assignment
router.post('/', assignmentController.createAssignment);

// GET assignment by id
router.get('/:id', assignmentController.getAssignmentById);

export default router;
