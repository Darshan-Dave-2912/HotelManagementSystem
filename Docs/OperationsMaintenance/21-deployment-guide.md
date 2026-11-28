# 21. Deployment Guide

## 1. Deployment Overview

The application consists of three services:

- **Frontend:** React application built with Vite.
- **Backend:** Node.js and Express API.
- **Database:** PostgreSQL.
- **Optional:** Redis for permission caching.

## 2. Production Environment Variables

**Backend (`server/.env`)**

```env
NODE_ENV=production
PORT=5000

DB_HOST=
DB_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_DIALECT=postgres

JWT_ACCESS_SECRET=
REFRESH_TOKEN_EXPIRES_DAYS=7

REDIS_URL=
```

**Frontend (`client/.env.production`)**

```env
VITE_API_BASE_URL=https://api.example.com/api
```

Use strong secrets and never commit environment files.

## 3. Deployment Steps

1. Provision a production server and PostgreSQL database.
2. Configure backend environment variables.
3. Install backend dependencies using `npm ci`.
4. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate --env production
   ```

5. Start the backend using a production process manager.
6. Configure frontend environment variables and build:

   ```bash
   npm ci
   npm run build
   ```

7. Host the generated `client/dist` directory using a static web server.
8. Configure HTTPS and route API requests to the backend.

## 4. Production Checklist

- Use HTTPS and secure environment secrets.
- Configure frontend/API origins and credentialed CORS before deployment.
- Verify refresh-token cookie behavior in production.
- Restrict database access to trusted services.
- Configure database backups and application logs.
- Verify migrations and authentication before release.
- Configure Redis when permission caching is required.

> **Note:** Deployment infrastructure and automated CI/CD are not currently configured in the repository. Production deployment requires the corresponding server, hosting, and security configuration.