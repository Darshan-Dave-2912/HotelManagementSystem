# 16. Security Guidelines

## 1. Overview

Security is a core requirement of the Hotel Management System. The application uses authentication, role-based authorization, secure password handling, and session management to protect sensitive operations and data.

## 2. Authentication & Password Security

- Passwords must never be stored in plain text.
- Use bcrypt for password hashing (currently 12 salt rounds).
- Access tokens must be signed using the configured JWT secret.
- Use short-lived access tokens.
- Refresh tokens must be stored as hashes in the database.
- Refresh tokens must be rotated after successful refresh operations.
- Detect refresh token reuse and revoke the associated session.

## 3. Session Security

- Maintain user sessions in PostgreSQL.
- Validate session status during authentication.
- Reject expired, revoked, or invalid sessions.
- Support individual and administrative session revocation.
- Store session metadata such as IP address and user agent.

## 4. Authorization & Access Control

- Protect private API routes using authentication middleware.
- Apply role-based permissions using authorization middleware.
- Verify permissions on the backend, not only in the frontend.
- Use Redis for permission caching with PostgreSQL as the source of truth.
- Deny access when permission verification fails.

## 5. Cookie & Token Security

Refresh-token cookies must use:

- `httpOnly: true`
- `secure: true` in production
- `sameSite: strict`
- Restricted cookie path (`/api/auth`)

Never expose refresh tokens in API response bodies or browser-accessible storage.

## 6. Database & Environment Security

- Store credentials and secrets in environment variables.
- Never commit `.env` files or production credentials.
- Use parameterized ORM queries.
- Exclude password hashes from API responses.
- Restrict database access to authorized application services.

## 7. API & Error Security

- Validate all incoming API requests.
- Reject unsupported request fields.
- Avoid exposing stack traces and internal errors in production.
- Apply authentication and authorization to protected resources.

## 8. Additional Security Requirements

Before production deployment, implement and review:

- API rate limiting, especially for authentication endpoints.
- HTTP security headers using Helmet.
- CSRF protection where applicable.
- HTTPS enforcement.
- Request body size limits.
- Secure logging without exposing tokens, passwords, or sensitive data.