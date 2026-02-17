import Server from './server';

import assignmentRoutes from './routes/assignmentRoutes';

const server = new Server(assignmentRoutes);

export default server;
