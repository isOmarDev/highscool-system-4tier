import Server from './server';

import studentRoutes from './routes/studentRoutes';
import classRoutes from './routes/classRoutes';
import assignmentRoutes from './routes/assignmentRoutes';
import classEnrollmentRoutes from './routes/classEnrollmentRoutes';
import studentAssignmentRoutes from './routes/studentAssignmentRoutes';

const server = new Server(
  studentRoutes,
  classRoutes,
  assignmentRoutes,
  classEnrollmentRoutes,
  studentAssignmentRoutes,
);

export default server;
