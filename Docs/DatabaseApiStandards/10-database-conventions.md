# 10. Database Conventions

## 1. Purpose

This document defines database naming standards, schema rules, and implementation practices to maintain consistency, data integrity, and maintainability across the application.

## 2. Naming Conventions

| Database Object | Convention | Example |
|---|---|---|
| Tables | `snake_case`, plural | `users`, `roles` |
| Columns | `snake_case` | `created_at` |
| Primary Keys | `id` | `id` |
| Foreign Keys | `{referenced_table_singular}_id` | `role_id` |
| Indexes | `idx_{table}_{column}` | `idx_users_email` |
| Unique Constraints | `uq_{table}_{column}` | `uq_users_email` |
| Foreign Key Constraints | `fk_{table}_{column}` | `fk_users_role_id` |

## 3. Primary & Foreign Keys

- Use `BIGINT` auto-incrementing primary keys for standard entities.
- Use foreign keys to establish relationships between tables.
- Maintain referential integrity through database constraints.
- Use appropriate `ON DELETE` and `ON UPDATE` rules.
- Avoid unnecessary cascading deletes.

## 4. Column Standards

- Use appropriate PostgreSQL data types.
- Define `NOT NULL` for mandatory fields.
- Use `DEFAULT` values wherever applicable.
- Use `BOOLEAN` for true/false attributes.
- Use `NUMERIC` for financial and monetary values.
- Use `DATE` or `TIMESTAMP` according to business requirements.
- Avoid storing multiple values in a single column.

## 5. Timestamp & Soft Delete Standards

Standard timestamp columns:

- `created_at`
- `updated_at`

For entities requiring soft deletion:

- `deleted_at`

Use Sequelize timestamps and paranoid options where applicable. Soft deletion should be enabled only when business requirements justify record recovery or historical retention.

## 6. Indexing & Constraints

- Add indexes to frequently searched and filtered columns.
- Use unique constraints for fields requiring uniqueness.
- Index foreign keys where query patterns justify it.
- Avoid unnecessary indexes that increase write overhead.
- Prefer database-level constraints for critical data integrity rules.

## 7. Sequelize & Migration Standards

- Every schema change must be introduced through Sequelize migrations.
- Keep migrations small and focused.
- Maintain consistency between migrations and Sequelize models.
- Define model associations explicitly.
- Use `underscored: true` for snake_case database columns.
- Use transactions for operations involving multiple related database changes.
- Never modify production database schemas manually.

## 8. Data Integrity & Query Standards

- Validate input before database operations.
- Use parameterized queries and Sequelize query methods.
- Prevent duplicate records through database constraints.
- Handle transaction rollback when an operation fails.
- Avoid unnecessary database queries and N+1 query problems.
- Store only necessary business data and avoid redundant fields.

## 9. General Rules

1. Follow consistent naming conventions across all modules.
2. Do not use reserved SQL keywords as table or column names.
3. Avoid duplicate or unnecessary columns.
4. Keep relationships explicit and properly constrained.
5. Preserve existing data during schema changes.
6. Review indexes and constraints when introducing new modules.

---

**Reference:** PostgreSQL Documentation and Sequelize Documentation.