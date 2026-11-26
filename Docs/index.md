# Hotel Management System — Technical Documentation

## 1. Introduction

This directory contains the complete technical documentation for the Hotel Management System.

The purpose of this documentation is to establish a clear and consistent reference for the application's technology stack, coding standards, architecture, database design, development practices, security, and deployment procedures.

All documentation must reflect the actual project implementation. Planned features and future enhancements must be clearly distinguished from currently implemented functionality.

## 2. Documentation Index

### 2.1 Project Foundation

| No. | Document | Description |
|---|---|---|
| 01 | [Project Overview](/Docs/ProjectFoundation/01-project-overview.md) | Introduction to the application, its purpose, system overview, and technical objectives. |
| 02 | [Project Vision and Goals](/Docs/ProjectFoundation/02-project-vision-and-goals.md) | Long-term technical vision, development objectives, and expected outcomes. |
| 03 | [Business Workflow](/Docs/ProjectFoundation/03-business-workflow.md) | Overview of hotel business operations and how different departments interact. |
| 04 | [Project Scope](/Docs/ProjectFoundation/04-project-scope.md) | Functional boundaries, included features, exclusions, and planned capabilities. |

### 2.2 Development Standards and Architecture

| No. | Document | Description |
|---|---|---|
| 05 | [Coding Standards](/Docs/DevelopmentStandards/05-coding-standards.md) | Detailed coding conventions, naming rules, formatting, code organization, and implementation guidelines. |
| 06 | [Technology Stack](/Docs/DevelopmentStandards/06-tech-stack.md) | Technologies, frameworks, libraries, development tools, and their installed versions. |
| 07 | [Project Architecture](/Docs/DevelopmentStandards/07-project-architecture.md) | Overall system architecture, application layers, component interactions, and architectural decisions. |
| 08 | [Folder Structure](/Docs/DevelopmentStandards/08-folder-structure.md) | Frontend and backend directory organization and the responsibility of each folder and file. |

### 2.3 Database and API Standards

| No. | Document | Description |
|---|---|---|
| 09 | [Database Design](/Docs/DatabaseApiStandards/09-database-design.md) | Database entities, relationships, constraints, ER diagrams, and data organization. |
| 10 | [Database Conventions](/Docs/DatabaseApiStandards/10-database-conventions.md) | Table and column naming, Sequelize models, migrations, associations, and database query conventions. |
| 11 | [API Standards](/Docs/DatabaseApiStandards/11-api-standards.md) | REST API conventions, endpoint naming, HTTP methods, request and response formats, and status codes. |
| 12 | [Authentication and Authorization](/Docs/DatabaseApiStandards/12-authentication-and-authorization.md) | Authentication flow, JWT, refresh tokens, sessions, roles, permissions, and access control. |

### 2.4 Application Development Guidelines

| No. | Document | Description |
|---|---|---|
| 13 | [Frontend Guidelines](/Docs/AppDevelopmentGuidelines/13-frontend-guidelines.md) | React development practices, components, hooks, routing, state management, and API integration. |
| 14 | [Backend Guidelines](/Docs/AppDevelopmentGuidelines/14-backend-guidelines.md) | Express application development, routes, controllers, services, middleware, and business logic organization. |
| 15 | [Error Handling and Validation](/Docs/AppDevelopmentGuidelines/15-error-handling-and-validation.md) | Centralized error handling, request validation, application errors, and consistent error responses. |
| 16 | [Security Guidelines](/Docs/AppDevelopmentGuidelines/16-security-guidelines.md) | Application security practices, input protection, password security, token handling, and data protection. |

### 2.5 Project Operations and Maintenance

| No. | Document | Description |
|---|---|---|
| 17 | [Module Documentation](/Docs/OperationsMaintenance/17-module-documentation.md) | Technical reference for individual modules, their responsibilities, dependencies, and interactions. |
| 18 | [Git and Branching Strategy](/Docs/OperationsMaintenance/18-git-and-branching-strategy.md) | Branch naming, commit conventions, merging, pull requests, and version control practices. |
| 19 | [Development Setup](/Docs/OperationsMaintenance/19-development-setup.md) | Prerequisites, environment configuration, installation, and local development instructions. |
| 20 | [Testing Strategy](/Docs/OperationsMaintenance/20-testing-strategy.md) | Testing approach, test organization, tools, and quality assurance practices. |
| 21 | [Deployment Guide](/Docs/OperationsMaintenance/21-deployment-guide.md) | Production configuration, environment variables, deployment process, and operational considerations. |
| 22 | [Roadmap and Future Enhancements](/Docs/OperationsMaintenance/22-roadmap-and-future-enhancements.md) | Planned technical improvements, future capabilities, and development priorities. |

## 3. Documentation Guidelines

1. Each document must focus on its defined subject.
2. All technical details must be verified against the actual source code and project configuration.
3. Installed package versions must be taken from the project manifests and lockfiles.
4. Implemented, in-progress, and planned functionality must be clearly identified.
5. Code examples must follow the project's approved coding standards.
6. When architecture or implementation changes, the relevant documentation must also be updated.
7. Avoid duplicating detailed information across multiple documents. Use relative links to reference other documentation where appropriate.
8. Keep documentation clear, structured, maintainable, and developer-friendly.

## 4. Documentation Status

All documents will be developed incrementally.

| Status | Meaning |
|---|---|
| Planned | Document is listed but not yet written. |
| In Progress | Document is currently being prepared. |
| Completed | Document has been reviewed and approved. |

**Current Status:** Documentation planning.