# 03. Business Workflow

## 1. Introduction

The Hotel Management System is designed to manage and integrate the business operations of a hospitality organization through a centralized application.

A hospitality business consists of multiple departments and operational activities that depend on one another.

For example:

- A room reservation affects room availability.
- A guest check-in creates an active accommodation record.
- A restaurant order creates kitchen preparation requirements.
- Kitchen preparation consumes ingredients.
- Ingredient consumption affects inventory stock.
- Purchase receiving increases available stock.
- Banquet bookings create event, catering, and resource requirements.
- Completed services generate billing and payment transactions.

The purpose of this document is to define the high-level business workflows and interactions between different modules.

Detailed module-specific functionality, validations, database structures, and technical implementation will be documented separately.

## 2. Overall Business Ecosystem

The platform is intended to support the following major business areas:

1. Property and Accommodation Management.
2. Reservations and Guest Management.
3. Banquet and Event Management.
4. Restaurant and Food Service Management.
5. Kitchen and Recipe Management.
6. Inventory and Procurement Management.
7. Housekeeping and Maintenance.
8. Billing and Financial Management.
9. Employee and Staff Management.
10. Administration and Access Management.
11. Reports and Business Analytics.

These business areas are interconnected and should share relevant operational information.

## 3. Property and Accommodation Workflow

### 3.1 Property Configuration

Before managing reservations, the property must be configured.

Typical setup includes:

- Property information.
- Buildings and floors, where applicable.
- Room categories and room types.
- Individual rooms.
- Room facilities and capacity.
- Room pricing and rate plans.
- Room operational statuses.

This configuration provides the foundation for accommodation operations.

### 3.2 Reservation Workflow

The reservation process generally follows these steps:

1. A customer requests a room.
2. The system checks room availability for the requested dates.
3. Available room types and applicable rates are presented.
4. The reservation is created with customer and booking information.
5. An advance payment may be recorded.
6. The reservation is confirmed according to the property's booking rules.
7. The room availability calendar is updated.

**Related modules:**
- Guest Management.
- Room Management.
- Reservation Management.
- Billing and Payments.

### 3.3 Guest Check-In Workflow

1. The guest arrives at the property.
2. Staff locate the reservation or create a walk-in booking.
3. Guest details and required information are verified.
4. An available room is allocated.
5. Check-in information is recorded.
6. The room status is updated to occupied.
7. The guest's active stay record is created.

Any applicable deposit or advance payment is associated with the guest's financial account.

### 3.4 Guest Stay Workflow

During the stay:

- Additional services may be requested.
- Restaurant orders may be charged to the room.
- Housekeeping tasks may be scheduled.
- Maintenance requests may be recorded.
- Additional charges may be added to the guest account.
- Payment transactions may be recorded.

Relevant charges should be associated with the appropriate guest stay or billing account.

### 3.5 Guest Check-Out Workflow

1. The guest requests check-out.
2. Staff review the guest's outstanding charges.
3. Room charges and additional services are consolidated.
4. Applicable taxes, discounts, and adjustments are calculated.
5. The final invoice is generated.
6. Payments are collected or outstanding balances are recorded according to business policy.
7. The stay is closed.
8. The room is marked for cleaning or housekeeping.
9. After cleaning and inspection, the room becomes available according to the property's operational rules.

## 4. Banquet and Event Management Workflow

Hotels may offer banquet halls, conference rooms, party venues, and other event spaces.

These services require scheduling, resource coordination, customer management, and financial tracking.

### 4.1 Venue Configuration

The property configures:

- Banquet halls and event venues.
- Venue capacity.
- Venue facilities.
- Seating arrangements.
- Available event packages.
- Pricing and applicable charges.
- Operational availability.

### 4.2 Event Booking Workflow

1. A customer contacts the hotel for an event.
2. Staff collect event requirements.
3. Available venues are checked for the requested date and time.
4. Suitable venue options and packages are presented.
5. Customer and event details are recorded.
6. The booking is created.
7. An advance payment may be collected.
8. The booking is confirmed according to business policy.

### 4.3 Event Planning and Preparation

After confirmation:

- Event requirements are finalized.
- Guest count and expected attendance are recorded.
- Catering and menu requirements are collected.
- Additional services are selected.
- Required resources and equipment are identified.
- Staff responsibilities are assigned.
- Preparation tasks are tracked.

### 4.4 Event Execution

On the event date:

1. The venue is prepared.
2. Required resources are arranged.
3. Catering and service operations begin.
4. Event-related orders and additional services are tracked.
5. Operational changes are recorded.
6. Service completion is confirmed.

### 4.5 Event Billing and Closure

1. The original booking charges are retrieved.
2. Additional services and applicable charges are consolidated.
3. Discounts, taxes, and adjustments are calculated.
4. The final invoice is generated.
5. Payments are recorded.
6. Outstanding balances are tracked.
7. The event is closed.
8. Venue resources are released for future bookings.

**Related modules:**
- Customer Management.
- Banquet and Venue Management.
- Event Management.
- Restaurant and Catering.
- Inventory.
- Staff Management.
- Billing and Payments.

## 5. Restaurant and Order Management Workflow

Restaurant operations involve customer orders, kitchen preparation, food service, and billing.

### 5.1 Restaurant Configuration

The system may maintain:

- Restaurant outlets.
- Dining tables.
- Menu categories.
- Menu items.
- Item prices.
- Item availability.
- Service types.
- Applicable taxes and charges.

### 5.2 Order Creation

An order may originate from:

- Dine-in customers.
- Takeaway customers.
- Hotel room service.
- Banquet and event catering.
- Other configured service channels.

The general workflow:

1. A customer places an order.
2. Staff select the required menu items.
3. Quantities and applicable instructions are recorded.
4. The order is created.
5. The order is sent to the relevant kitchen.
6. Order status becomes available for kitchen processing.

### 5.3 Kitchen Order Processing

1. The kitchen receives the order.
2. Kitchen staff review the ordered items.
3. Preparation begins.
4. Preparation status is updated.
5. Items are marked ready when completed.
6. The order is served or dispatched.
7. Order completion is recorded.

The system should support order status tracking so restaurant staff can understand the progress of each order.

### 5.4 Restaurant Billing

1. Ordered items and quantities are retrieved.
2. Item prices are calculated.
3. Applicable taxes, discounts, and charges are applied.
4. The bill is generated.
5. Payment is collected or transferred to an authorized guest account.
6. The transaction is recorded.

## 6. Kitchen and Recipe Management Workflow

Recipe management is an important connection between restaurant operations and inventory.

### 6.1 Recipe Configuration

A recipe defines the ingredients and standard quantities required to prepare a menu item.

A recipe may contain:

- Recipe name.
- Associated menu item.
- Ingredient list.
- Ingredient quantities.
- Units of measurement.
- Preparation instructions.
- Expected yield or serving quantity.
- Recipe costing information.

### 6.2 Ingredient Consumption Calculation

When an order is completed or reaches the configured stock-consumption stage, the system can calculate the expected ingredient requirements.

Example:

A menu item requires:

- Flour: 100 grams.
- Oil: 20 millilitres.
- Other configured ingredients.

For an order quantity of five, the expected ingredient consumption is calculated using the recipe quantities.

The calculation should account for recipe yield, quantity conversions, and configured business rules.

### 6.3 Stock Deduction Workflow

1. A menu item is associated with an approved recipe.
2. An order reaches the configured consumption stage.
3. The system identifies the recipe ingredients.
4. Required quantities are calculated.
5. The relevant stock batches are selected according to inventory policy.
6. Ingredient consumption is recorded.
7. Inventory balances are updated.
8. The transaction is available for audit and reporting.

The exact stock-deduction trigger must be configurable or explicitly defined. For example, order completion, kitchen confirmation, or another approved operational event may trigger consumption.

### 6.4 Wastage and Adjustments

Actual ingredient usage may differ from standard recipe consumption.

The system should eventually support:

- Ingredient wastage records.
- Preparation losses.
- Stock adjustments.
- Additional ingredient usage.
- Returned or cancelled order handling.
- Variance reporting.

Expected consumption and actual consumption should be distinguishable.

## 7. Inventory and Procurement Workflow

Inventory management is responsible for maintaining accurate stock information across stores and operational departments.

### 7.1 Inventory Master Configuration

Initial configuration includes:

- Item categories.
- Item master records.
- Units of measurement.
- Store and location records.
- Suppliers.
- Item types.
- Batch and expiry tracking requirements.

Items may include raw materials, finished goods, and consumables.

### 7.2 Purchase Workflow

1. A department identifies a stock requirement.
2. A purchase request may be created.
3. The requirement is reviewed and approved according to policy.
4. A purchase order is created.
5. The order is sent to the supplier.
6. Goods are received.
7. Received quantities are verified.
8. Batch and expiry information is recorded where applicable.
9. Accepted quantities are added to inventory.
10. Purchase records and supplier information are updated.

### 7.3 Stock Management Workflow

Inventory balances change through different types of transactions:

- Purchase receiving.
- Department issues.
- Recipe-based consumption.
- Stock transfers.
- Returns.
- Wastage.
- Manual adjustments.
- Other authorized stock movements.

Every stock movement should be traceable.

The system should maintain transaction history instead of relying only on manually updated stock quantities.

### 7.4 Batch and Expiry Management

For perishable items and ingredients:

1. A batch is recorded when goods are received.
2. Batch quantity and expiry date are maintained.
3. Available quantity is tracked for each batch.
4. Expiry-related alerts are generated according to configured rules.
5. Stock issuance follows an approved batch-selection policy, such as FEFO (First Expired, First Out), where appropriate.
6. Expired stock is identified and handled through an authorized process.

### 7.5 Low-Stock Monitoring

The system should compare available stock against configured minimum or reorder levels.

When stock reaches the defined threshold:

- A low-stock condition is identified.
- Relevant users may be notified.
- A purchase requirement may be suggested.
- Stock reports reflect the current position.

## 8. Housekeeping and Maintenance Workflow

Housekeeping manages room cleanliness and readiness.

### 8.1 Room Cleaning Workflow

1. A room becomes eligible for housekeeping.
2. A cleaning task is created.
3. The task is assigned to an authorized staff member.
4. Cleaning begins.
5. Task status is updated.
6. Cleaning is completed.
7. The room may undergo inspection.
8. The room is marked ready after successful verification.

### 8.2 Maintenance Workflow

1. A maintenance issue is reported.
2. A maintenance request is created.
3. The request is assigned to the relevant staff member.
4. Work begins.
5. Progress is recorded.
6. The issue is resolved.
7. Completion is verified.
8. Maintenance history is maintained.

A room requiring maintenance may be marked unavailable according to the property's operational rules.

## 9. Billing and Payment Workflow

Billing consolidates charges generated by different operational modules.

Potential charge sources include:

- Room accommodation.
- Restaurant orders.
- Room service.
- Banquet bookings.
- Event services.
- Additional guest services.
- Other configured business operations.

### 9.1 Invoice Generation

1. A billable operation is completed or reaches its billing stage.
2. Relevant charge details are retrieved.
3. Charges are calculated.
4. Applicable taxes and discounts are applied.
5. An invoice is generated.
6. The invoice is associated with the relevant customer, booking, event, or transaction.

### 9.2 Payment Processing

The system should support configured payment methods and payment workflows.

Potential capabilities include:

- Cash payments.
- Card payments.
- UPI and supported digital payment methods.
- Advance payments.
- Partial payments.
- Multiple payment transactions.
- Refunds.
- Outstanding balances.

Every payment should be recorded with its transaction details and relevant reference information.

### 9.3 Financial Reconciliation

Financial records should support comparison between:

- Generated invoices.
- Received payments.
- Refunds.
- Outstanding amounts.
- Operational transactions.

Detailed accounting and financial workflows will be defined separately when those modules are designed.

## 10. Employee and Staff Management Workflow

Staff management supports the organization and coordination of employees.

Potential workflows include:

- Employee registration.
- Department assignment.
- Designation management.
- Shift scheduling.
- Attendance recording.
- Task assignment.
- Staff availability.
- Employee access provisioning.
- Employee status management.

Operational tasks from different departments may be assigned to relevant staff members based on their responsibilities and access permissions.

## 11. Administration and Access Management Workflow

Centralized administration controls access to the application.

### 11.1 User and Role Management

1. An authorized administrator creates a user.
2. User details are recorded.
3. A role is assigned.
4. Permissions are configured for that role.
5. The user receives access according to the assigned permissions.

### 11.2 Permission Management

The access management system should support:

- Module-level access.
- Action-level permissions.
- Role-based permission assignment.
- User account activation and deactivation.
- Session management.
- Access revocation.
- Audit tracking for important administrative operations.

Authorization must be enforced by the backend, even if the frontend also hides or disables unavailable actions.

## 12. Reporting and Business Analytics Workflow

Operational modules should generate reliable data that can be used for reporting and management analysis.

Potential reports include:

- Room occupancy reports.
- Reservation reports.
- Guest reports.
- Banquet booking reports.
- Restaurant sales reports.
- Kitchen performance reports.
- Inventory stock reports.
- Purchase reports.
- Ingredient consumption reports.
- Expiry and wastage reports.
- Housekeeping reports.
- Revenue and payment reports.
- Employee activity reports.

Reports should respect user permissions and relevant property or organization boundaries.

## 13. Cross-Module Integration Map

The following relationships represent the intended high-level integration between business areas.

| Source Module | Related Module | Business Relationship |
|---|---|---|
| Reservations | Rooms | Availability and room allocation |
| Reservations | Guests | Guest and booking information |
| Guest Services | Billing | Additional service charges |
| Restaurant Orders | Kitchen | Order preparation |
| Kitchen | Recipes | Ingredient requirements |
| Recipes | Inventory | Expected ingredient consumption |
| Inventory | Procurement | Stock requirements |
| Procurement | Inventory | Received stock updates |
| Inventory | Expiry Management | Batch and expiry tracking |
| Banquet Events | Restaurant/Kitchen | Catering requirements |
| Banquet Events | Billing | Event charges |
| Housekeeping | Rooms | Cleaning and readiness status |
| Maintenance | Rooms | Maintenance availability |
| All Operational Modules | Reports | Business and operational information |
| Access Management | All Modules | Authorized application access |

## 14. Important Business Rules

The following principles should guide future workflow implementation:

1. A room must not be allocated to overlapping confirmed stays unless the business explicitly supports an approved exception.
2. Venue bookings must respect availability and scheduling rules.
3. Restaurant orders must follow valid menu and order status transitions.
4. Recipe-based consumption must use defined ingredient quantities and unit conversions.
5. Stock changes must be traceable through inventory transactions.
6. Batch and expiry information must be maintained for items that require it.
7. Expired or otherwise restricted stock must not be issued through normal inventory workflows.
8. Billing must preserve the relationship between charges, invoices, and payments.
9. Financial transactions and stock movements must have appropriate authorization and audit records.
10. Users must only access operations permitted by their assigned permissions.
11. Cancellation, refund, reversal, and adjustment operations must follow explicitly defined business rules.
12. Important workflows should maintain a history of relevant status changes.

These are high-level business principles. Detailed rules, exceptions, and validation conditions will be defined within the relevant module documentation.

## 15. Workflow Design Principles

The platform's business workflows should follow these principles:

- **Consistency:** Related modules must use consistent business information.
- **Traceability:** Important operations must have a transaction history.
- **Accuracy:** Stock, billing, and booking calculations must be reliable.
- **Integration:** Data should flow between modules through well-defined interfaces.
- **Authorization:** Every protected operation must enforce backend permissions.
- **Automation:** Repetitive processes should be automated where business rules permit.
- **Configurability:** Business-specific rules should be configurable where appropriate.
- **Extensibility:** New workflows and modules should be introduced without unnecessarily disrupting existing operations.

## 16. Conclusion

The Hotel Management System is intended to connect the complete operational workflow of a hospitality business.

Accommodation, reservations, events, restaurants, kitchen operations, recipes, inventory, procurement, housekeeping, billing, employees, and administration should operate as interconnected parts of one platform.

The purpose of defining these workflows is to establish a clear understanding of how the business operates before implementing individual modules.

This business workflow document provides the foundation for detailed functional requirements, module design, database relationships, API development, and future system integrations.