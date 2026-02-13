import express from 'express';
import { prisma } from './database';

import cors from 'cors';

import studentRoutes from './routes/studentRoutes';
import classRoutes from './routes/classRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import classEnrollmentRoutes from './routes/classEnrollmentRoutes';
import studentAssignmentRoutes from './routes/studentAssignmentRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/students', studentRoutes);
app.use('/classes', classRoutes);
app.use('/assignments', assignmentRoutes);
app.use('/class-enrollments', classEnrollmentRoutes);
app.use('/student-assignments', studentAssignmentRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
