# 11. API Standards

## 1. Purpose

This document defines API design and implementation conventions based on the existing backend modules to ensure consistency, maintainability, and predictable communication between frontend and backend.

## 2. API Structure

- Base API prefix: `/api`
- Use RESTful resource-based endpoints.
- Use plural resource names wherever possible.
- Use lowercase URL paths.
- Use resource IDs as route parameters.

Example:

```http
/api/roles
/api/roles/:id
/api/users
/api/users/:id
```

## 3. HTTP Methods

| Method | Purpose |
|---|---|
| GET | Retrieve records |
| POST | Create records or perform actions |
| PATCH | Partially update records |
| PUT | Replace or synchronize resources |
| DELETE | Delete records |

Use HTTP methods according to the operation's purpose.

## 4. HTTP Status Codes

| Status | Usage |
|---|---|
| 200 | Successful retrieval, update or deletion |
| 201 | Resource created successfully |
| 400 | Validation failure or invalid request |
| 401 | Authentication required or failed |
| 403 | Access denied |
| 404 | Resource or endpoint not found |
| 409 | Duplicate or conflicting resource |
| 500 | Internal server error |

## 5. Request Conventions

- Use JSON for request and response bodies.
- Use `req.body` for request payloads.
- Use `req.params` for resource identifiers.
- Use `req.query` for filtering, searching, sorting and pagination.
- Validate incoming requests using `express-validator`.
- Reject unsupported fields in create and update operations.
- Keep validation rules in feature-specific validator files.

## 6. Response Structure

**Success Response**

```json
{
  "success": true,
  "message": "Role created successfully",
  "data": {}
}
```

**List Response**

```json
{
  "success": true,
  "message": "Roles fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalRecords": 50,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

**Validation Error Response**

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

**General Error Response**

```json
{
  "success": false,
  "message": "Resource not found"
}
```

## 7. Search, Filtering & Pagination

List APIs should support relevant query parameters:

| Parameter | Purpose |
|---|---|
| `page` | Current page |
| `limit` | Records per page |
| `search` | Search records |
| `sortBy` | Sorting field |
| `sortOrder` | ASC or DESC |
| `isActive` | Filter active/inactive records |

- Default page: `1`
- Default limit: `10`
- Maximum limit: `100`
- Validate sorting fields against an allowed list.
- Return pagination metadata with list responses.

Only implement filters relevant to the resource.

## 8. Authentication & Authorization

- Apply authentication middleware to protected routes.
- Use authorization middleware for module and action-level access control.
- Keep public authentication endpoints separate from protected endpoints.
- Do not rely on frontend permission checks for backend security.
- Validate active sessions before granting authenticated access.

## 9. Backend Implementation Rules

Follow the existing feature-based structure:

| Layer | Responsibility |
|---|---|
| Routes | Define endpoints, middleware and validators |
| Validators | Validate request parameters, body and query |
| Controllers | Handle HTTP requests and responses |
| Services | Execute business logic and database operations |

Additional rules:

- Use asynchronous controllers and services.
- Forward controller errors using `next(error)`.
- Use `AppError` for application-specific errors.
- Handle unexpected errors through centralized error middleware.
- Keep database queries out of controllers.
- Avoid duplicate business logic across features.

## 10. API Naming & Consistency

- Use consistent resource naming across endpoints.
- Use meaningful controller and service method names.
- Follow consistent CRUD endpoint patterns.
- Keep response property names consistent.
- Avoid exposing internal database errors to clients.
- Maintain backward compatibility when modifying existing APIs.

## 11. General Rules

1. Every endpoint must have appropriate validation.
2. Protected endpoints must enforce backend authorization.
3. Every API must return a predictable response structure.
4. Database operations must handle errors appropriately.
5. Avoid unnecessary API endpoints and duplicate functionality.
6. Follow existing conventions when introducing new modules.

---

**Reference:** Existing Authentication and Access Management API implementations.