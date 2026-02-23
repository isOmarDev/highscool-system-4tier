import Server from './server';

import assignmentRoutes from './routes/assignmentRoutes';
import classRoutes from './routes/classRoutes';
import studentRoutes from './routes/studentRoutes';

const server = new Server(
  assignmentRoutes,
  classRoutes,
  studentRoutes,
);

export default server;
