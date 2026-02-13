import { Router } from 'express';
import { AssignmentController } from '../controllers/assignmentController';
const router = Router();

const assignmentController = new AssignmentController();

// POST create assignment
router.post('/', assignmentController.createAssignment);

// GET assignment by id
router.get('/:id', assignmentController.getAssignmentById);

export default router;
