# High School Management System

A 4-tier backend system for managing high school operations. This system handles student management, class enrollments, assignments, grading, and report card generation with a clean, scalable architecture.

## 📋 Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Database Schema](#database-schema)

## 📝 Project Description

The High School Management System is a backend API built with Node.js and TypeScript that provides a robust solution for educational institutions to manage:

- **Student Information**: Create and manage student records
- **Class Management**: Organize classes and define curricula
- **Enrollment**: Track student enrollment in classes
- **Assignments**: Create and distribute assignments to students
- **Grading**: Record grades and track assignment completion status
- **Report Cards**: Generate comprehensive report cards for students
- **Grade Reports**: Aggregate grades at the class level

The system follows SOLID principles with a 4-tier architecture (Controllers → Services → Persistence → Database) ensuring maintainability, testability, and scalability.

## ✨ Features

- ✅ RESTful API with Express.js
- ✅ Type-safe database operations with Prisma ORM
- ✅ PostgreSQL database with full migration support
- ✅ Comprehensive error handling and validation
- ✅ Data Transfer Objects (DTOs) for request/response handling
- ✅ Database seeding capabilities
- ✅ Jest testing framework configured
- ✅ Development mode with hot-reload (Nodemon)
- ✅ TypeScript for type safety
- ✅ CORS support for cross-origin requests

## 🛠 Tech Stack

| Layer           | Technology | Version |
| --------------- | ---------- | ------- |
| **Runtime**     | Node.js    | 18+     |
| **Language**    | TypeScript | ^5.9.3  |
| **Framework**   | Express.js | ^5.2.1  |
| **ORM**         | Prisma     | ^7.3.0  |
| **Database**    | PostgreSQL | 12+     |
| **Testing**     | Jest       | ^30.2.0 |
| **Development** | Nodemon    | ^3.1.11 |

### Key Dependencies

- **@prisma/client**: Type-safe database client
- **@prisma/adapter-pg**: PostgreSQL adapter for Prisma
- **pg**: PostgreSQL driver for Node.js
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management
- **rimraf**: Cross-platform file/folder deletion

## 📁 Folder Structure

```
highschool-system-4tier/
├── src/
│   ├── index.ts                 # Application entry point
│   ├── server.ts                # Express server configuration
│   ├── bootstrap.ts             # Application initialization
│   ├── database.ts              # Database connection setup
│   ├── controllers/             # Request handlers
│   │   ├── studentController.ts
│   │   ├── classController.ts
│   │   ├── classEnrollmentController.ts
│   │   ├── assignmentController.ts
│   │   └── studentAssignmentController.ts
│   ├── services/                # Business logic layer
│   │   └── assignmentsService.ts
│   ├── persistence/             # Data access layer
│   │   └── assignmentDatabase.ts
│   ├── routes/                  # API route definitions
│   │   ├── studentRoutes.ts
│   │   ├── classRoutes.ts
│   │   ├── classEnrollmentRoutes.ts
│   │   ├── assignmentRoutes.ts
│   │   └── studentAssignmentRoutes.ts
│   ├── dtos/                    # Data Transfer Objects
│   │   ├── createAssignmentDTO.ts
│   │   └── getAssignmentByIdDTO.ts
│   └── shared/                  # Shared utilities and helpers
│       ├── errorExceptionHandler.ts
│       ├── errorExceptionTypes.ts
│       ├── exceptions.ts
│       └── helpers.ts
├── prisma/
│   ├── schema.prisma            # Database schema definition
│   ├── seed.ts                  # Database seeding script
│   └── migrations/              # Database migrations
│       ├── 20260210112915_init/
│       └── 20260210144449_add_student_class_class_enrollment_assignment_student_assignment_report_card/
├── generated/
│   └── prisma/                  # Auto-generated Prisma client and types
├── build/                       # Compiled JavaScript output
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── nodemon.json                 # Nodemon configuration
└── README.md                    # This file
```

### Architecture Layer Breakdown

- **Controllers**: Handle HTTP requests, parse input, call services, and return responses
- **Services**: Contain business logic and orchestrate database operations
- **Persistence**: Data access layer handling direct database queries
- **Database**: Schema definition and migrations managed by Prisma

## 🚀 Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **npm** or **yarn**: Package manager
- **PostgreSQL**: v12 or higher installed and running

### Installation Steps

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd highschool-system-4tier
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your configuration (see [Environment Variables](#environment-variables))

4. **Setup the database**

   ```bash
   npm run db:setup
   ```

   This command will:
   - Run all pending migrations
   - Generate Prisma client types
   - Seed the database with initial data

5. **Start development server**
   ```bash
   npm run dev
   ```
   The server will start on the configured port (default: 3000) with hot-reload enabled.

### Alternative Database Setup Commands

```bash
# Run migrations only
npm run db:migrate

# Generate Prisma client (after schema changes)
npm run db:generate

# Seed database
npm run db:seed

# Reset database (⚠️ clears all data)
npm run db:reset

# Reset and reseed database
npm run db:reset:seed

# Open Prisma Studio for visual database management
npm run db:studio
```

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/highschool_db"

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration (optional)
CORS_ORIGIN=*

# Optional: Prisma logging
PRISMA_LOG_QUERIES=false
```

### Variable Descriptions

| Variable             | Description                  | Example                                        | Required |
| -------------------- | ---------------------------- | ---------------------------------------------- | -------- |
| `DATABASE_URL`       | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` | ✅ Yes   |
| `PORT`               | Server port                  | `3000`                                         | ✅ Yes   |
| `NODE_ENV`           | Environment mode             | `development`, `production`                    | ✅ Yes   |
| `CORS_ORIGIN`        | Allowed CORS origins         | `http://localhost:3000` or `*`                 | ❌ No    |
| `PRISMA_LOG_QUERIES` | Enable Prisma query logging  | `true`, `false`                                | ❌ No    |

### PostgreSQL Connection String Format

```
postgresql://[username][:password]@[host][:port]/[database]
```

**Example**:

```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/highschool_db"
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot-reload
npm run build            # Compile TypeScript to JavaScript

# Database Management
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run pending migrations
npm run db:migrate:seed  # Run migrations and seed
npm run db:sync          # Run migrations and generate client
npm run db:setup         # Full setup (migrate + generate + seed)
npm run db:seed          # Run seed script
npm run db:reset         # Reset database
npm run db:reset:seed    # Reset and reseed database
npm run db:studio        # Open Prisma Studio UI

# Production
npm start                # Build and run application

# Testing
jest                     # Run tests (Jest configured)
```

## 🗄 Database Schema

### Entity Relationship Overview

```
Student (1) ──── (M) ClassEnrollment ──── (1) Class
  │
  ├──────── (1) ReportCard
  │
  └──────── (M) StudentAssignment ──── (1) Assignment ──── (1) Class
                                                             │
                                                       └──── (1) ClassGradeReport
```

### Main Entities

- **Student**: Contains student information (id, name)
- **Class**: Educational classes (id, name)
- **ClassEnrollment**: Junction table linking students to classes
- **Assignment**: Assignments created for classes (id, classId, title)
- **StudentAssignment**: Tracks student progress on assignments (grade, status)
- **ReportCard**: Student report cards (id, studentId)
- **ClassGradeReport**: Aggregated grades for classes (id, classId)

## 🧪 Testing

The project is configured with Jest for unit testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🤝 Contributing

When contributing to this project:

1. Follow the established 4-tier architecture pattern
2. Create appropriate DTOs for new endpoints
3. Add error handling using the shared exception utilities
4. Write tests for new features
5. Update the database schema in `prisma/schema.prisma` for any data changes
6. Run `npm run db:generate` after schema changes

## 📄 License

ISC

---

**Last Updated**: February 2026
