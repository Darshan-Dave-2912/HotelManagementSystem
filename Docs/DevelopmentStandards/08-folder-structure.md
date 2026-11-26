# 08. Folder Structure

## 1. Overview

The project follows a feature-based folder structure to keep frontend and backend code organized, modular, and maintainable.

- `client/` – Frontend application.
- `server/` – Backend application.
- Each feature keeps its related files together.
- Shared resources are maintained in dedicated folders.

## 2. Root Structure

```text
HotelManagementSystem/
├── client/
├── server/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 3. Frontend Structure

```text
client/
└── src/
    ├── app/
    │   ├── App.jsx
    │   ├── providers.jsx
    │   └── queryClient.js
    │
    ├── assets/
    ├── components/
    │   ├── common/
    │   └── ui/
    │
    ├── constants/
    ├── features/
    │   ├── auth/
    │   ├── dashboard/
    │   ├── errors/
    │   └── access-management/
    │       ├── users/
    │       ├── roles/
    │       ├── modules/
    │       ├── moduleActions/
    │       ├── permissions/
    │       └── userSessions/
    │
    ├── hooks/
    ├── layouts/
    ├── lib/
    ├── routes/
    ├── services/
    ├── utils/
    ├── index.css
    └── main.jsx
```

### Frontend Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `app/` | Application initialization and providers |
| `assets/` | Static assets |
| `components/common/` | Reusable application components |
| `components/ui/` | Reusable UI primitives |
| `constants/` | Application-wide constants |
| `features/` | Feature-specific implementation |
| `hooks/` | Shared custom React hooks |
| `layouts/` | Application layouts |
| `lib/` | API client and shared libraries |
| `routes/` | Application-level route configuration |
| `services/` | API communication services |
| `utils/` | Shared utility functions |

### Feature Structure

Each feature maintains its own components, hooks, pages, routes, and supporting files as required.

Example:

```text
features/
└── access-management/
    └── roles/
        ├── components/
        ├── hooks/
        ├── pages/
        ├── schemas/
        ├── index.js
        ├── queryKeys.js
        └── routes.jsx
```

Not every feature needs every folder. Add folders only when required.

## 4. Backend Structure

```text
server/
├── config/
├── database/
│   └── migrations/
│
├── features/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.route.js
│   │   ├── auth.service.js
│   │   └── auth.validator.js
│   │
│   └── access-management/
│       ├── users/
│       ├── roles/
│       ├── modules/
│       ├── moduleActions/
│       ├── permissions/
│       └── userSessions/
│
├── logs/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .sequelizerc
└── server.js
```

### Backend Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `config/` | Database, authentication, Redis and application configuration |
| `database/migrations/` | Database schema migrations |
| `features/` | Feature-specific backend implementation |
| `logs/` | Application log files |
| `middlewares/` | Authentication, authorization and request handling middleware |
| `models/` | Sequelize models and associations |
| `routes/` | Central API route registration |
| `utils/` | Shared utility functions and application helpers |
| `server.js` | Backend application entry point |

### Backend Feature Structure

Backend features organize their related controllers, services, routes, and validators.

Example:

```text
features/
└── access-management/
    └── roles/
        ├── roles.controller.js
        ├── roles.route.js
        ├── roles.service.js
        └── roles.validator.js
```

Not every feature requires identical files. Add files according to its responsibilities.

## 5. Folder Organization Rules

1. Keep feature-specific code inside its respective feature folder.
2. Place reusable components and utilities in shared folders.
3. Keep database models and migrations in their designated locations.
4. Avoid unnecessary nesting and duplicate files.
5. Follow consistent naming conventions.
6. Do not create empty folders for features that are not yet implemented.
7. Update this document whenever the overall folder structure changes.

## 6. Future Module Expansion

New hotel modules should follow the same feature-based organization.

Examples of future frontend and backend features:

- Reservations
- Rooms and Accommodation
- Guest Management
- Restaurant and POS
- Kitchen Management
- Housekeeping
- Procurement
- Inventory
- Finance and Accounting
- Staff Management
- Reports and Analytics

These are planned product areas, not a statement that their folders or implementations already exist.