import { Router } from 'express';
import { ClassEnrollmentController } from '../controllers/classEnrollmentController';
const router = Router();

const classEnrollmentController = new ClassEnrollmentController();

// POST enroll student in class
router.post('/', classEnrollmentController.createClassEnrollment);

export default router;
