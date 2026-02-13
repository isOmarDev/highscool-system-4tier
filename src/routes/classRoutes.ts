import { Router } from 'express';
import { ClassController } from '../controllers/classController';
const router = Router();

const classController = new ClassController();

// POST create class
router.post('/', classController.createClass);

// GET all assignments for a class
router.get('/:id/assignments', classController.getClassAssignments);

export default router;
