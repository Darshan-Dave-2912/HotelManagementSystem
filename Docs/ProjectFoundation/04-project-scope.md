# 04. Project Scope

## 1. Introduction

The Hotel Management System is a comprehensive web-based hospitality management platform intended to manage the operational and administrative activities of hospitality businesses through a centralized application.

The project aims to develop a complete hospitality ecosystem rather than a limited application focused only on room reservations or basic hotel administration.

The overall scope includes accommodation management, banquet and event operations, restaurant and kitchen management, recipe management, inventory, procurement, housekeeping, billing, employee management, administration, reporting, and future intelligent capabilities.

This document defines the functional boundaries, technical scope, development priorities, and future expansion direction of the platform.

## 2. Overall Product Scope

The long-term product scope includes the following major business domains:

1. Property and Accommodation Management.
2. Room and Reservation Management.
3. Guest and Customer Management.
4. Banquet and Event Management.
5. Restaurant and Food Service Management.
6. Kitchen and Order Management.
7. Menu and Recipe Management.
8. Inventory and Stock Management.
9. Purchase and Supplier Management.
10. Batch and Expiry Management.
11. Housekeeping and Maintenance.
12. Billing and Financial Management.
13. Employee and Staff Management.
14. Administration and Access Management.
15. Reports and Business Analytics.
16. SaaS Platform Management.
17. AI and Intelligent Automation.

These domains represent the overall product direction. They will be developed incrementally based on business requirements and technical priorities.

## 3. Functional Scope

### 3.1 Property and Accommodation Management

The system is intended to support:

- Property information management.
- Building and floor configuration.
- Room category and room type management.
- Individual room management.
- Room facilities and capacity.
- Room pricing and rate configuration.
- Room availability and occupancy.
- Room status management.

### 3.2 Reservation and Guest Management

The system is intended to support:

- Reservation creation and management.
- Booking availability checks.
- Walk-in reservations.
- Guest profile management.
- Guest check-in and check-out.
- Room allocation.
- Reservation modification and cancellation.
- Guest service records.
- Booking history.

### 3.3 Banquet and Event Management

The system is intended to support:

- Banquet hall and venue management.
- Venue capacity and configuration.
- Event and party bookings.
- Event scheduling.
- Customer and organizer information.
- Event packages and pricing.
- Catering arrangements.
- Event resource allocation.
- Event operational tracking.
- Event billing and payments.

### 3.4 Restaurant and Food Service Management

The system is intended to support:

- Restaurant and outlet configuration.
- Dining table management.
- Menu categories and menu items.
- Menu pricing and availability.
- Dine-in orders.
- Takeaway orders.
- Room-service orders.
- Banquet-related food orders.
- Order status tracking.
- Kitchen order integration.
- Restaurant billing.

### 3.5 Kitchen and Recipe Management

The system is intended to support:

- Recipe master management.
- Recipe-to-menu-item relationships.
- Ingredient management.
- Ingredient quantity configuration.
- Units of measurement and conversions.
- Recipe costing.
- Expected ingredient consumption calculations.
- Kitchen preparation workflows.
- Actual consumption tracking.
- Food wastage management.

### 3.6 Inventory and Stock Management

The system is intended to support:

- Item category management.
- Item master management.
- Item types and classifications.
- Unit of measurement management.
- Store and location management.
- Stock receiving.
- Stock issuing.
- Stock transfers.
- Stock adjustments.
- Inventory transaction history.
- Minimum stock levels.
- Stock valuation.
- Recipe-based ingredient consumption.

### 3.7 Purchase and Supplier Management

The system is intended to support:

- Supplier master management.
- Purchase requests.
- Purchase order management.
- Goods receiving.
- Purchase records.
- Supplier transaction history.
- Purchase returns.
- Procurement reporting.

### 3.8 Batch and Expiry Management

The system is intended to support:

- Batch and lot tracking.
- Batch-wise stock quantities.
- Manufacturing and expiry dates where applicable.
- Expiry monitoring.
- Expiry-related alerts.
- Expired stock identification.
- Batch selection policies such as FEFO.
- Expiry and wastage reporting.

### 3.9 Housekeeping and Maintenance

The system is intended to support:

- Housekeeping task management.
- Room cleaning schedules.
- Staff task assignment.
- Cleaning status tracking.
- Room inspection.
- Maintenance requests.
- Maintenance assignment.
- Maintenance status tracking.
- Maintenance history.

### 3.10 Billing and Financial Management

The system is intended to support:

- Guest billing.
- Room billing.
- Restaurant billing.
- Banquet and event billing.
- Additional service charges.
- Taxes and discounts.
- Advance payments.
- Partial payments.
- Multiple payment transactions.
- Refund management.
- Invoice management.
- Outstanding balance tracking.
- Financial reporting.

### 3.11 Employee and Staff Management

The system is intended to support:

- Employee records.
- Department management.
- Designation management.
- Staff assignment.
- Shift management.
- Attendance management.
- Employee status management.
- Staff-related operational reporting.

### 3.12 Administration and Access Management

The system is intended to support:

- User management.
- Role management.
- Module management.
- Module action management.
- Permission management.
- Role-based access control.
- User session management.
- Authentication.
- Authorization.
- Audit logging.
- Administrative configurations.

### 3.13 Reports and Business Analytics

The system is intended to provide operational and management reporting across different business areas.

Potential reporting categories include:

- Reservation and occupancy reports.
- Guest reports.
- Banquet and event reports.
- Restaurant sales reports.
- Kitchen and recipe consumption reports.
- Inventory and stock reports.
- Purchase and supplier reports.
- Batch and expiry reports.
- Housekeeping reports.
- Billing and payment reports.
- Revenue and expense reports.
- Employee activity reports.

## 4. Technical Scope

The project includes the development and maintenance of the following technical components.

### 4.1 Frontend Application

The frontend is responsible for:

- User interface and user experience.
- Responsive application layouts.
- Navigation and routing.
- Authentication-related screens.
- Permission-aware interface behavior.
- Master data management screens.
- Operational workflows.
- Form handling and validation.
- API communication.
- Data tables, filters, and pagination.
- Reports and dashboards.

### 4.2 Backend Application

The backend is responsible for:

- REST API development.
- Business workflow implementation.
- Request validation.
- Authentication and authorization.
- Database operations.
- Data integrity and transaction handling.
- Centralized error handling.
- Logging and auditing.
- Permission enforcement.
- Integration between modules.
- Background processing and automation where required.

### 4.3 Database Management

The database layer is responsible for:

- Structured relational data storage.
- Entity relationships.
- Constraints and indexes.
- Database migrations.
- Data validation.
- Transaction management.
- Audit-related records.
- Reliable stock and financial data.
- Future tenant and property data separation.

### 4.4 Infrastructure and Development Tools

The technical scope may include:

- Development environment configuration.
- Version control.
- Environment-specific configurations.
- Redis and caching.
- Application logging.
- Automated testing.
- Deployment infrastructure.
- Monitoring and backup processes.
- CI/CD automation as the project matures.

The exact technologies and versions are documented separately in `06-tech-stack.md`.

## 5. Security and Access Control Scope

Security is a core requirement across the platform.

The system should provide:

- Secure user authentication.
- Password hashing.
- Access and refresh token management.
- Session management.
- Role-based permissions.
- Backend authorization.
- Permission revocation.
- Protected API endpoints.
- Input validation.
- Secure handling of sensitive configuration.
- Audit logs for important operations.

Access to modules and business information should follow defined user permissions and organizational boundaries.

## 6. Integration Scope

One of the primary objectives is to integrate business modules through consistent workflows.

Expected integrations include:

| Module | Integration With | Purpose |
|---|---|---|
| Reservations | Rooms and Guests | Availability and booking management |
| Guest Services | Billing | Consolidated service charges |
| Restaurant | Kitchen | Order preparation |
| Kitchen | Recipes | Ingredient requirements |
| Recipes | Inventory | Ingredient consumption |
| Procurement | Inventory | Stock receiving |
| Inventory | Expiry Management | Batch and expiry tracking |
| Banquet | Restaurant and Kitchen | Catering operations |
| Banquet | Billing | Event charges |
| Housekeeping | Rooms | Cleaning and readiness |
| Maintenance | Rooms | Room availability |
| Operational Modules | Reports | Centralized business reporting |
| Access Management | All Modules | Controlled application access |

Module integration should use well-defined business rules and technical interfaces.

## 7. SaaS and Multi-Property Expansion Scope

The long-term product scope includes evolving the platform into a multi-tenant SaaS application.

Potential capabilities include:

- Multiple organizations or tenants.
- Multiple properties under an organization.
- Tenant-specific data isolation.
- Property-level configurations.
- Organization-level administration.
- Subscription and plan management.
- Feature-based subscription access.
- Centralized platform administration.
- Scalable infrastructure.

The initial implementation may operate for a single hotel.

Multi-tenant SaaS functionality will be introduced when the architecture and business requirements are ready for it.

## 8. AI and Intelligent Automation Scope

AI integration is part of the future product scope.

Potential capabilities include:

- AI-powered business assistance.
- Natural-language reporting.
- Inventory demand forecasting.
- Ingredient consumption predictions.
- Expiry risk analysis.
- Purchase recommendations.
- Occupancy forecasting.
- Revenue analysis.
- Operational insights.
- Intelligent workflow recommendations.
- Automated reporting summaries.

AI features will be introduced progressively and will respect authorization, data security, and business rules.

## 9. Development Scope and Prioritization

The product will be developed incrementally.

The following stages represent an indicative development roadmap.

### Stage 1 — Technical Foundation

- Project architecture.
- Coding standards.
- Frontend and backend infrastructure.
- Database foundation.
- Authentication.
- Authorization.
- User and role management.
- Module and permission management.
- Error handling and validation.

### Stage 2 — Core Hotel Operations

- Property configuration.
- Room and room type management.
- Guest management.
- Reservations.
- Check-in and check-out.
- Housekeeping.
- Basic billing.

### Stage 3 — Restaurant and Inventory Operations

- Restaurant configuration.
- Menu management.
- Order management.
- Kitchen operations.
- Recipe management.
- Ingredient management.
- Supplier management.
- Purchase management.
- Inventory management.
- Batch and expiry tracking.

### Stage 4 — Banquet and Event Operations

- Venue management.
- Event and party bookings.
- Event packages.
- Catering.
- Resource allocation.
- Event billing.

### Stage 5 — Advanced Business Operations

- Financial management.
- Employee management.
- Advanced reporting.
- Business analytics.
- Operational automation.

### Stage 6 — SaaS Evolution

- Multi-tenant architecture.
- Multiple properties.
- Subscription management.
- Tenant configurations.
- Platform administration.

### Stage 7 — AI and Intelligent Capabilities

- AI assistant.
- Predictive analytics.
- Intelligent recommendations.
- Forecasting.
- Advanced automation.

These stages are planning guidelines and may be reordered or refined as development progresses.

## 10. Out of Scope for the Initial Implementation

The following capabilities are not mandatory for the initial implementation and should be considered future enhancements unless specifically prioritized:

- Fully implemented multi-tenant SaaS infrastructure.
- Subscription and payment gateway management for SaaS customers.
- Advanced AI-powered functionality.
- Predictive machine learning models.
- Advanced business intelligence systems.
- Extensive third-party integrations.
- Native Android and iOS applications.
- Complex multi-property automation.
- Enterprise-level distributed infrastructure.

Being outside the initial implementation does not mean these capabilities are permanently excluded from the product vision.

## 11. Scope Management Principles

Project scope will be managed according to the following principles:

1. Every new feature must have a clear business requirement.
2. Features should be assigned to an appropriate module.
3. Cross-module dependencies must be identified before implementation.
4. Changes to business workflows should be documented.
5. Technical complexity should be justified by actual requirements.
6. Existing functionality should not be broken by unnecessary changes.
7. Security and data integrity must be considered for every module.
8. Planned capabilities must not be represented as implemented functionality.
9. Scope changes should be reflected in the relevant documentation.
10. The platform should remain extensible as new business requirements emerge.

## 12. Conclusion

The scope of the Hotel Management System extends beyond basic hotel administration.

The long-term objective is to build a comprehensive hospitality management platform that supports accommodation, events, restaurants, kitchen operations, recipes, inventory, procurement, housekeeping, finance, staff, administration, and business analytics.

The project will begin with a manageable implementation scope while maintaining a broader product vision.

This approach allows the platform to grow incrementally into a scalable, integrated, and SaaS-oriented hospitality ecosystem with future AI and intelligent automation capabilities.