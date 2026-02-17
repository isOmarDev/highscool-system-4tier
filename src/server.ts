import { Server as HttpServer } from 'http';
import express from 'express';
import type { Router, Application } from 'express';

import cors from 'cors';

import { prisma } from './database';

class Server {
  private readonly instance: Application;

  constructor(
    private studentRoutes: Router,
    private classRoutes: Router,
    private assignmentRoutes: Router,
    private classEnrollmentRoutes: Router,
    private studentAssignmentRoutes: Router,
  ) {
    this.instance = express();
    this.addMiddlewares();
    this.registerRoutes();
  }

  private addMiddlewares() {
    this.instance.use(express.json());
    this.instance.use(cors());
  }

  private registerRoutes() {
    this.instance.use('/students', this.studentRoutes);
    this.instance.use('/classes', this.classRoutes);
    this.instance.use('/assignments', this.assignmentRoutes);
    this.instance.use(
      '/class-enrollments',
      this.classEnrollmentRoutes,
    );
    this.instance.use(
      '/student-assignments',
      this.studentAssignmentRoutes,
    );
  }

  private enableGracefulShutdown(server: HttpServer) {
    const gracefulShutdown = async () => {
      console.log('SIGTERM received, closing server...');
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });

      setTimeout(() => {
        console.error(
          'Could not close connections in time, forcefully shutting down',
        );
        process.exit(1);
      }, 10000);
    };

    // Graceful shutdown
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  }

  public start(port: number) {
    const server = this.instance.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    this.enableGracefulShutdown(server);
  }
}

export default Server;
