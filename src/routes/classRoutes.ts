import { Router } from 'express';
import { prisma } from '../database';

import { ClassController } from '../controllers/classController';
import { ClassService } from '../services/classService';
import { ClassDatabase } from '../persistence/classDatabase';
import { AssignmentDatabase } from '../persistence/assignmentDatabase';
import { StudentDatabase } from '../persistence/studentDatabase';

const router = Router();

const classDatabase = new ClassDatabase(prisma);
const assignmentDatabase = new AssignmentDatabase(prisma);
const studentDatabase = new StudentDatabase(prisma);

const classService = new ClassService(
  classDatabase,
  assignmentDatabase,
  studentDatabase,
);

const classController = new ClassController(classService);

// POST create class
router.post('/', classController.createClass);

// GET all assignments for a class
router.get('/:id/assignments', classController.getClassAssignments);

// POST enroll student
router.post('/enrollments', classController.enrollStudent);

export default router;
