# 06. Technology Stack

## 1. Overview

The Hotel Management System uses a modern JavaScript-based technology stack to build a maintainable, scalable, and modular hospitality management platform.

## 2. Frontend

| Technology | Purpose |
|---|---|
| JavaScript (ES Modules) | Primary frontend language |
| React 19 | User interface development |
| Vite | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive layouts |
| React Router DOM | Client-side routing |
| TanStack Query | Server-state management and API data synchronization |
| Axios | HTTP requests to the backend |
| React Hook Form | Form state management |
| Zod | Schema validation |
| Radix UI / shadcn | Reusable UI components |
| Lucide React | Icons |
| Sonner | Toast notifications |

## 3. Backend

| Technology | Purpose |
|---|---|
| JavaScript (CommonJS) | Backend programming language and module system |
| Node.js | JavaScript runtime |
| Express 5 | REST API development |
| Sequelize 6 | ORM and database operations |
| PostgreSQL | Primary relational database |
| Redis | Planned caching and session-related operations |
| JSON Web Token (JWT) | Authentication |
| Bcrypt | Password hashing |
| Express Validator | Request validation |
| UUID | Unique identifier generation |

## 4. Development Tools

| Tool | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source code hosting and collaboration |
| VS Code | Code editor |
| Postman | API testing |
| pgAdmin | PostgreSQL database management |
| Docker | Containerization and development infrastructure |
| ESLint | Code quality checks |
| Prettier | Code formatting |

## 5. Application Architecture

The application is divided into two primary parts:

- **Frontend:** React-based client application responsible for user interaction and presentation.
- **Backend:** Node.js and Express-based server responsible for APIs, business operations, authentication, and database communication.

The backend uses PostgreSQL as its primary database, with Sequelize as the ORM.

## 6. Technology Selection Principles

- Prefer stable and actively maintained technologies.
- Keep dependencies focused on actual project requirements.
- Prioritize maintainability, security, and scalability.
- Avoid introducing unnecessary libraries.
- Evaluate additional technologies based on practical requirements.

## 7. Future Considerations

The following technologies may be evaluated as the platform evolves:

- Redis for expanded caching and session management.
- Docker-based deployment infrastructure.
- Background job processing for asynchronous operations.
- Monitoring and logging solutions.
- Integration services for external hospitality systems.

