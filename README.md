# 🏨 Hotel Management System

A modular, full-stack **Hotel Management Ecosystem** designed to manage and connect the complete workflow of a hotel through a single application.

The system aims to bring hotel administration, inventory, room operations, reservations, guest management, restaurant operations, billing, and access control together under one platform.

Rather than building separate applications for different departments, each business area will work as an independent module while sharing a common backend, database, and authentication system.

**Project Scope:** Single-hotel management system.

---

## 🎯 Project Vision

The goal is to build a centralized hotel management platform where different departments can manage their operations through interconnected modules.

```text
                 HOTEL MANAGEMENT SYSTEM
                           |
       +-------------------+-------------------+
       |                   |                   |
   Administration      Hotel Operations    Food Operations
       |                   |                   |
   Users & Roles       Rooms & Bookings     Menu & Orders
   Permissions         Guest Management     Restaurant / POS
   Dashboard           Billing              Ingredient Usage
       |                   |                   |
       +-------------------+-------------------+
                           |
                  Shared Backend & Database
```

Each module will manage its own responsibilities while supporting communication and data sharing with other modules wherever required.

## 🧩 Application Modules

The application is organized around the following major business areas.

### 1. Administration & Access Management

Provides centralized control over application users, roles, modules, and permissions.

- User Management
- Role Management
- Module Management
- Module Action Management
- Permission Management
- Authentication & Authorization
- Dashboard

### 2. Inventory Management

Manages hotel inventory, purchasing, stock movement, and ingredient consumption.

- Item Master
- Item Categories
- Units of Measurement
- Stock Management
- Purchase Management
- Supplier Management
- Store / Location Management
- Recipe & Ingredient Consumption
- Batch & Expiry Tracking
- Inventory Reports

### 3. Hotel Operations

Manages room-related activities and the guest lifecycle.

- Room Management
- Reservation & Booking Management
- Guest Management
- Check-in & Check-out
- Billing & Invoicing

### 4. Restaurant & Food Operations

Manages restaurant activities and food-related workflows.

- Menu Management
- Food Ordering / POS
- Parcel Orders
- Recipe Management
- Inventory Ingredient Integration

### 5. Reporting & Business Insights

Provides operational visibility across different hotel departments.

- Inventory Reports
- Purchase Reports
- Room Occupancy Reports
- Booking Reports
- Restaurant Sales Reports
- Business Performance Insights

*These modules and features will be implemented incrementally. Their listing does not indicate that they are already available.*

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, JavaScript, Tailwind CSS |
| UI Components | Radix UI, shadcn/ui |
| Data Fetching | TanStack Query |
| Forms & Validation | React Hook Form, Zod |
| API Communication | Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| ORM | Sequelize |
| Permission Cache | Redis (Optional) |
| Authentication | JWT, HTTP-only Cookies |
| Development Tools | Git, GitHub, VS Code, Postman, pgAdmin |

---

## 🏗️ Architecture Overview

The application follows a feature-based and modular architecture.

```text
Hotel Management System
│
├── client/
│   └── React Application
│       ├── Features
│       ├── Components
│       ├── Routes
│       ├── Services
│       └── Shared Utilities
│
└── server/
    ├── Features
    ├── Routes
    ├── Middlewares
    ├── Models
    ├── Database
    ├── Config
    └── Utilities
```

**Architecture Principles:**

- Feature-based module organization.
- Separation of routes, controllers, and services.
- Shared authentication and authorization.
- Relational database design with Sequelize.
- Centralized error handling.
- Reusable frontend components.
- Permission-based resource access.
- Optional Redis-based permission caching.

---

## 🔐 Authentication & Authorization

The system includes a centralized access-control foundation.

- JWT-based authentication.
- Access and refresh token workflow.
- Role-based access control (RBAC).
- Module and action-based permissions.
- Protected frontend routes.
- Backend authentication and authorization middleware.
- Optional Redis permission caching with PostgreSQL fallback.

Administrators can manage users, roles, modules, and permissions to control access to application resources.

---

## 📌 Current Development Status

<text>**Status: In Development**</text>

The current implementation focuses on establishing the application's core foundation.

### Implemented Foundation

- [x] React frontend setup
- [x] Express backend setup
- [x] PostgreSQL database integration
- [x] Sequelize ORM configuration
- [x] Authentication foundation
- [x] Dashboard
- [x] User Management
- [x] Role Management
- [x] Module Management
- [x] Module Action Management
- [x] Permission Management
- [x] Authentication and authorization middleware
- [x] Optional Redis permission-cache configuration

### Planned Development

- [ ] Complete Inventory Management
- [ ] Purchase and Supplier workflows
- [ ] Stock and Ingredient Consumption
- [ ] Room Management
- [ ] Reservation and Booking Management
- [ ] Guest Management
- [ ] Check-in and Check-out
- [ ] Restaurant and POS Management
- [ ] Billing and Invoicing
- [ ] Cross-module integration
- [ ] Automated testing
- [ ] Production deployment

---

## 🗺️ Development Roadmap

```text
Core Application Foundation
          |
          v
Inventory Management
          |
          v
Hotel Operations
          |
          v
Restaurant & Food Operations
          |
          v
Cross-Module Integration
          |
          v
Testing & Optimization
          |
          v
Production Deployment
```

---

## 📚 Project Documentation

The project documentation covers the system's requirements, scope, business workflows, architecture, database design, coding standards, development practices, testing strategy, deployment, and future roadmap.

It serves as the reference for maintaining consistency as new modules are developed.

---

## 💡 Project Goals

- Build a centralized hotel management ecosystem.
- Understand real-world business workflows.
- Apply scalable database and backend design principles.
- Develop reusable and maintainable application modules.
- Implement secure authentication and authorization.
- Integrate different hotel departments through shared data.
- Maintain a professional development workflow using Git and GitHub.

---

## 🔮 Future Direction

The long-term vision is to develop a complete, interconnected hotel management platform where all major hotel departments can operate through one application.

The current scope focuses on a single hotel. Multi-hotel support may be considered in the future.

---

**Built as a full-stack development and portfolio project focused on real-world hotel management workflows.**