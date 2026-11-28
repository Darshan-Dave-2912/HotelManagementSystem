# 15. Error Handling & Validation

## 1. Overview

The backend uses centralized error handling and feature-level request validation to maintain consistent API responses and handle application errors safely.

## 2. Error Handling Architecture

The backend uses:

- `AppError.js` – Custom operational error class.
- `errorHandlers.js` – Handles application, database, and unexpected errors.
- `notFoundErrors` – Handles undefined API routes.
- `next(error)` – Forwards controller errors to the global error handler.

### Error Flow

```text
API Request
    |
    v
Request Validation
    |
    +---- Invalid ----> HTTP 400 Response
    |
    v
Controller
    |
    +---- Error -----> next(error)
    |                       |
    v                       v
Service              Global Error Handler
    |                       |
    v                       v
Database              API Error Response
```

## 3. Custom Application Errors

Custom errors are defined in:

`server/utils/AppError.js`

The `AppError` class extends the native JavaScript `Error` class and supports:

- Custom error messages.
- HTTP status codes.
- Operational error identification through `isOperational`.

## 4. Global Error Handler

Location: `server/middlewares/errorHandlers.js`

The centralized error handler supports:

| Error Type | HTTP Status |
|---|---:|
| Unique Constraint Error | 409 |
| Foreign Key Constraint Error | 400 |
| Sequelize Validation Error | 400 |
| Invalid JSON | 400 |
| Undefined Route | 404 |
| Unexpected Server Error | 500 |

Unexpected server errors return a generic message in production. Stack traces are included in development responses.

## 5. Request Validation

The project uses `express-validator` for validating incoming requests.

Validation is implemented separately within feature modules.

Example:

`server/features/access-management/roles/roles.validator.js`

Supported validation operations include:

- Required field validation.
- Data type validation.
- String length validation.
- Parameter validation.
- Query parameter validation.
- Allowed field validation.
- Custom validation rules.

Invalid requests return HTTP 400 with field-level error messages.

## 6. Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Role name is required"
    }
  ]
}
```

The `errors` property is included when field-level errors are available.

## 7. Error Logging

The global error handler logs:

- HTTP method and request URL.
- HTTP status code.
- Error message.
- Client IP address.
- Timestamp.
- Stack trace.

Request logging is handled separately through `requestLogger.js`.

## 8. Guidelines

- Validate incoming requests before controller execution.
- Keep validation rules inside their respective feature modules.
- Use `AppError` for operational application errors.
- Forward controller errors using `next(error)`.
- Avoid exposing internal error details in production responses.
- Maintain consistent API response structures.