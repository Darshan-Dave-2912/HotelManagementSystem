# Coding Standards

## 1. Purpose

These standards ensure that the codebase remains consistent, readable, reusable, and maintainable across all modules.

## 2. General Rules

- Write clean and readable JavaScript code.
- Use meaningful and descriptive names.
- Avoid unnecessary abbreviations and duplicate code.
- Keep functions focused on a single responsibility.
- Follow existing project patterns.
- Remove unused imports, dead code, and debugging statements.

## 3. Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `UserForm.jsx` |
| Variables | camelCase | `userName` |
| Functions | camelCase | `getUserById()` |
| Constants | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE` |
| Files | Follow existing feature conventions | `user.controller.js` |
| Database tables | snake_case | `user_sessions` |
| Database columns | snake_case | `created_at` |

## 4. Frontend Standards

- Use functional React components and hooks.
- Keep components small and reusable.
- Organize code using a feature-based structure.
- Separate API communication from UI components.
- Use TanStack Query for server-state management where appropriate.
- Use React Hook Form and Zod for form handling and validation.
- Use Tailwind CSS for styling.
- Avoid unnecessary global state.

## 5. Backend Standards

- Follow the feature-based backend structure.
- Keep routes, controllers, services, and models separated.
- Define API endpoints inside feature-level routes.
- Keep Sequelize database operations inside service layers.
- Keep business logic organized inside controllers according to the established project architecture.
- Use Express Validator for request validation.
- Use centralized error handling.
- Use database transactions for operations requiring data consistency.

## 6. Database Standards

- Use meaningful table and column names.
- Follow snake_case naming conventions.
- Define appropriate primary and foreign keys.
- Add unique constraints and indexes where required.
- Maintain proper relationships between tables.
- Use migrations for database schema changes.
- Avoid unnecessary duplicate data.

## 7. Code Formatting

- Follow the existing Prettier configuration.
- Maintain consistent indentation and formatting.
- Avoid unnecessary comments.
- Write comments only when the implementation requires additional explanation.

## 8. Quality Checks

Before committing code:

- Check for unused imports and variables.
- Verify affected functionality.
- Run available linting and formatting checks.
- Remove debugging statements.
- Review changes before committing.

## 9. Git Practices

- Use meaningful branch names.
- Write clear and descriptive commit messages.
- Keep commits focused on related changes.
- Avoid committing environment secrets, generated files, or dependencies.

---

**Core Principle:** Write code that another developer can easily understand, maintain, and extend.