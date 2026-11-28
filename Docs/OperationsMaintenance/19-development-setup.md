# 19. Development Setup

## Prerequisites

- Node.js and npm
- PostgreSQL
- Redis (optional; permission caching)
- Git

## 1. Clone the Repository

```bash
git clone https://github.com/Darshan-Dave-2912/HotelManagementSystem.git
cd HotelManagementSystem
```

## 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:

```env
NODE_ENV=development
PORT=5001

DB_HOST=localhost
DB_PORT=5432
DB_NAME=hotel_management
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres

JWT_ACCESS_SECRET=your_secret
REFRESH_TOKEN_EXPIRES_DAYS=7

REDIS_URL=redis://localhost:6379
```

Create the PostgreSQL database specified by `DB_NAME`, then run migrations:

```bash
npx sequelize-cli db:migrate
```

Start the backend:

```bash
npm run dev
```

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=/api
```

Start the frontend:

```bash
npm run dev
```

## 4. Development URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`
- API prefix: `/api`

**Note:** Keep environment files private. Redis is optional; the application can use PostgreSQL directly when Redis is unavailable. Run commands from their respective `client` or `server` directories.