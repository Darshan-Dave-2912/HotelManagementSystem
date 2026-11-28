# 14. Backend Guidelines

## 1. Purpose

Define backend development practices based on the current implementation to maintain consistency, security, readability, and maintainability.

## 2. Technology Standards

| Area | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Language | JavaScript (CommonJS) |
| ORM | Sequelize 6 |
| Database | PostgreSQL |
| Cache | Redis |
| Authentication | JWT + Refresh Token |
| Validation | express-validator |
| Password Hashing | bcrypt |

## 3. Architecture & Responsibilities

Follow the existing feature-based modular architecture.

| Layer | Responsibility |
|---|---|
| Routes | Define endpoints and middleware sequence |
| Validators | Validate request parameters, query, and body |
| Controllers | Handle HTTP requests and responses |
| Services | Implement business logic and database operations |
| Models | Define database entities and associations |
| Middlewares | Handle authentication, authorization, logging, and errors |
| Config | Manage database, Redis, authentication, and application configuration |
| Utils | Provide reusable helpers and application utilities |

Keep business logic out of controllers and route files.

## 4. Feature Organization

- Keep related backend functionality inside its feature directory.
- Maintain separate route, controller, service, and validator files.
- Use feature-specific services for related operations.
- Register feature routes through the central route index.
- Keep shared models, middleware, configuration, and utilities in their respective directories.

## 5. API & Controller Guidelines

- Use RESTful HTTP methods and resource-oriented endpoints.
- Use `async/await` for asynchronous operations.
- Return consistent JSON responses.
- Use appropriate HTTP status codes.
- Forward controller errors using `next(error)`.
- Keep controllers focused on request handling and response formatting.

## 6. Validation Guidelines

- Use express-validator for request validation.
- Validate request body, route parameters, and query parameters.
- Use `.bail()` where subsequent validation depends on previous checks.
- Reject unsupported fields in update requests.
- Normalize and sanitize input where appropriate.
- Return field-level validation errors using the existing response structure.

## 7. Database & Sequelize Guidelines

- Use Sequelize models for database operations.
- Keep model associations centralized in `models/index.js`.
- Use migrations for database schema changes.
- Use transactions for operations involving multiple dependent database changes.
- Pass the transaction object to every related database operation.
- Use Sequelize operators for filtering and searching.
- Use allowlisted fields for sorting and updates.
- Avoid exposing sensitive model attributes in API responses.

## 8. Business Logic Guidelines

- Keep business logic inside service files.
- Use reusable helper functions for repeated operations.
- Normalize input data before database operations.
- Handle expected database errors and convert them into meaningful application errors.
- Use `AppError` for operational errors with appropriate status codes.
- Preserve database consistency during multi-step operations.

## 9. Authentication & Authorization

- Use JWT access tokens for protected API requests.
- Manage refresh tokens through the session system.
- Hash refresh tokens before storing them.
- Use bcrypt for password hashing and verification.
- Apply authentication middleware before authorization middleware.
- Use role-based module/action permissions for access control.
- Do not rely on JWT role claims for current authorization decisions.
- Never expose password hashes, tokens, or secrets in API responses.

## 10. Redis & Caching

- Use Redis for role-permission caching.
- Treat PostgreSQL as the source of truth.
- Use role-specific cache keys and configurable TTL.
- Invalidate relevant cache entries after permission changes.
- Fall back to PostgreSQL when Redis is unavailable.
- Never grant access when permission verification fails.

## 11. Error Handling & Logging

- Use centralized 404 and global error-handling middleware.
- Keep error responses consistent.
- Handle Sequelize validation, unique constraint, and foreign-key errors.
- Avoid exposing internal stack traces in production responses.
- Log request method, URL, status code, duration, IP, and timestamp.
- Handle unhandled rejections and uncaught exceptions.

## 12. Security & Code Quality

- Store credentials and secrets in environment variables.
- Never hardcode sensitive configuration.
- Use allowlisted fields to prevent unintended updates.
- Validate all external input.
- Keep authentication and authorization checks on protected routes.
- Use meaningful names and consistent formatting.
- Remove unused imports, debugging statements, and dead code.

---

**Note:** These guidelines describe the current backend architecture and implementation. Future architectural changes and additional standards should be documented separately.