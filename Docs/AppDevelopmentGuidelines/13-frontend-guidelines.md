# 13. Frontend Guidelines

## 1. Purpose

Define frontend development practices based on the current React application to maintain consistency, readability, and reusability.

## 2. Technology Standards

| Area | Technology |
|---|---|
| UI | React |
| Language | JavaScript (ES Modules) |
| Build Tool | Vite |
| Routing | React Router |
| Server State | TanStack Query |
| Global Auth State | React Context API |
| API Client | Axios |
| Forms | React Hook Form |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui and Radix UI |

## 3. Project Organization

- Follow the existing feature-based folder structure.
- Keep feature-specific components, hooks, schemas, and routes inside their respective feature.
- Keep reusable UI components in `components/common` and `components/ui`.
- Keep application-level configuration and providers inside `app`.
- Keep shared API utilities and helpers inside `lib`, `services`, and `utils` according to their responsibilities.

## 4. Component Guidelines

- Use functional React components.
- Use PascalCase for component names.
- Keep components focused on a single responsibility.
- Extract reusable UI elements into shared components.
- Move complex reusable logic into custom hooks.
- Use props for component communication.
- Avoid unnecessarily large components.

## 5. State Management

- Use `useState` for local component state.
- Use React Context API for shared application-level state where appropriate.
- Use TanStack Query for server-state management.
- Use query keys to organize and identify cached queries.
- Invalidate relevant queries after successful mutations.
- Avoid maintaining duplicate server data in local state.

## 6. API Integration

- Use the centralized Axios instance from `lib/axios.js`.
- Keep API request functions inside service files.
- Use TanStack Query hooks for queries and mutations.
- Handle loading, error, and empty states.
- Reuse the centralized API error handling.
- Avoid direct API requests inside reusable UI components.

## 7. Forms & Validation

- Use React Hook Form for form management.
- Use Zod schemas with `zodResolver` for validation.
- Keep feature-specific schemas inside the feature's `schemas` directory.
- Display field-level validation errors.
- Map backend validation errors to their respective form fields.
- Disable submission while a request is processing.

## 8. Styling & UI

- Use Tailwind CSS utility classes for styling.
- Prefer existing shadcn/ui components before creating new UI elements.
- Keep shared UI components reusable and consistent.
- Use Lucide React for icons.
- Maintain responsive layouts and consistent spacing.
- Use Sonner for application toast notifications where appropriate.

## 9. Naming & Formatting

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `RoleFormDialog.jsx` |
| Hooks | camelCase with `use` | `useRolesTable.js` |
| Functions | camelCase | `handleSubmit` |
| Variables | camelCase | `roleList` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_SORT` |
| Schemas | Descriptive naming | `roles.schema.js` |

Follow the existing Prettier configuration:

- No semicolons.
- Single quotes.
- Trailing commas.
- Print width of 100 characters.

## 10. Code Quality

- Prefer simple, readable, and reusable implementations.
- Avoid duplicate API and UI logic.
- Use meaningful variable and function names.
- Keep business rules out of presentation components.
- Remove unused imports, variables, and dead code.
- Follow the existing ESLint and Prettier configuration.

---

**Note:** These guidelines describe the current frontend implementation. Any future technology or architectural changes must be documented separately.