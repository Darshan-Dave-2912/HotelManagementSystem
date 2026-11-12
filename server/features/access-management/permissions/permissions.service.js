const { Op, UniqueConstraintError } = require('sequelize');
const sequelize = require('../../../config/database');
const { Role, User, Module, ModuleActions, Permission } = require('../../../models');
const AppError = require('../../../utils/AppError');
const permissionCache = require('./permissionCache.service');
const { assertManagementAccessRemains } = require('./permissionGuard.service');

const scheduleCacheInvalidation = (transaction, roleId) => {
    transaction.afterCommit(() => permissionCache.invalidateRole(roleId));
};

const assertRoleExists = async (roleId, transaction) => {
    const role = await Role.findByPk(roleId, { transaction });

    if (!role) {
        throw new AppError('Role not found', 404);
    }

    return role;
};

const grantPermission = async ({ roleId, moduleActionId }, actorId) => {
    try {
        return await sequelize.transaction(async (transaction) => {
            await assertRoleExists(roleId, transaction);

            const moduleAction = await ModuleActions.findByPk(moduleActionId, { transaction });

            if (!moduleAction) {
                throw new AppError('Module action not found', 404);
            }

            const existing = await Permission.findOne({
                where: { roleId, moduleActionId, revokedAt: null },
                transaction,
            });

            if (existing) {
                throw new AppError('Permission is already granted to this role', 409);
            }

            const permission = await Permission.create(
                { roleId, moduleActionId, grantedBy: actorId, grantedAt: new Date() },
                { transaction }
            );

            scheduleCacheInvalidation(transaction, roleId);

            return permission;
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new AppError('Permission is already granted to this role', 409);
        }
        throw error;
    }
};

const revokePermission = async ({ roleId, moduleActionId }, actorId) => {
    return sequelize.transaction(async (transaction) => {
        await assertRoleExists(roleId, transaction);

        const permission = await Permission.findOne({
            where: { roleId, moduleActionId, revokedAt: null },
            transaction,
        });

        if (!permission) {
            throw new AppError('Active permission not found for this role and action', 404);
        }

        await assertManagementAccessRemains({ revokingPermissionIds: [permission.id] }, transaction);

        const [affectedRows] = await Permission.update(
            { revokedAt: new Date(), revokedBy: actorId },
            { where: { id: permission.id, revokedAt: null }, transaction }
        );

        if (affectedRows === 0) {
            throw new AppError('Active permission not found for this role and action', 404);
        }

        scheduleCacheInvalidation(transaction, roleId);

        return permission.reload({ transaction });
    });
};

// Role ke permissions ko desired list ke barabar kar deta hai (admin UI ke checkboxes ek call me save)
const syncRolePermissions = async (roleId, moduleActionIds, actorId) => {
    // DB UUIDs lowercase me aate hain, isliye input bhi lowercase karke compare karte hain
    const desired = [...new Set(moduleActionIds.map((id) => id.toLowerCase()))];

    try {
        return await sequelize.transaction(async (transaction) => {
            await assertRoleExists(roleId, transaction);

            if (desired.length > 0) {
                const found = await ModuleActions.findAll({
                    where: { id: { [Op.in]: desired } },
                    attributes: ['id'],
                    transaction,
                });

                const foundIds = new Set(found.map((action) => action.id));
                const missing = desired.filter((id) => !foundIds.has(id));

                if (missing.length > 0) {
                    throw new AppError(`Module actions not found: ${missing.join(', ')}`, 404);
                }
            }

            const active = await Permission.findAll({
                where: { roleId, revokedAt: null },
                transaction,
            });

            const activeActionIds = new Set(active.map((permission) => permission.moduleActionId));
            const desiredSet = new Set(desired);

            const toGrant = desired.filter((id) => !activeActionIds.has(id));
            const toRevoke = active.filter((permission) => !desiredSet.has(permission.moduleActionId));

            if (toGrant.length === 0 && toRevoke.length === 0) {
                return { granted: 0, revoked: 0, unchanged: active.length };
            }

            await assertManagementAccessRemains(
                { revokingPermissionIds: toRevoke.map((permission) => permission.id) },
                transaction
            );

            const now = new Date();

            if (toGrant.length > 0) {
                await Permission.bulkCreate(
                    toGrant.map((moduleActionId) => ({
                        roleId,
                        moduleActionId,
                        grantedBy: actorId,
                        grantedAt: now,
                    })),
                    { transaction }
                );
            }

            if (toRevoke.length > 0) {
                await Permission.update(
                    { revokedAt: now, revokedBy: actorId },
                    { where: { id: { [Op.in]: toRevoke.map((permission) => permission.id) }, revokedAt: null }, transaction }
                );
            }

            scheduleCacheInvalidation(transaction, roleId);

            return {
                granted: toGrant.length,
                revoked: toRevoke.length,
                unchanged: active.length - toRevoke.length,
            };
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw new AppError('Permissions were changed by another request. Please retry', 409);
        }
        throw error;
    }
};

// Module -> actions ki list, har action pe granted true/false (UI matrix ke liye)
const getRolePermissions = async (roleId) => {
    const role = await Role.findByPk(roleId);

    if (!role) {
        throw new AppError('Role not found', 404);
    }

    const [modules, actions, activePermissions] = await Promise.all([
        Module.findAll({ attributes: ['id', 'name', 'code', 'isActive'], order: [['name', 'ASC']] }),
        ModuleActions.findAll({ attributes: ['id', 'moduleId', 'name', 'code', 'isActive'], order: [['name', 'ASC']] }),
        Permission.findAll({
            where: { roleId, revokedAt: null },
            attributes: ['id', 'moduleActionId', 'grantedAt', 'grantedBy'],
        }),
    ]);

    const grantedByAction = new Map(
        activePermissions.map((permission) => [String(permission.moduleActionId), permission])
    );

    const actionsByModule = new Map();

    for (const action of actions) {
        const permission = grantedByAction.get(String(action.id));
        const list = actionsByModule.get(String(action.moduleId)) || [];

        list.push({
            moduleActionId: action.id,
            name: action.name,
            code: action.code,
            isActive: action.isActive,
            granted: Boolean(permission),
            permissionId: permission ? permission.id : null,
            grantedAt: permission ? permission.grantedAt : null,
        });

        actionsByModule.set(String(action.moduleId), list);
    }

    return {
        role: { id: role.id, name: role.name, code: role.code },
        modules: modules.map((module) => ({
            moduleId: module.id,
            name: module.name,
            code: module.code,
            isActive: module.isActive,
            actions: actionsByModule.get(String(module.id)) || [],
        })),
    };
};

// Poori grant/revoke history (revoked rows ke saath), paginated
const getPermissionHistory = async (filters) => {
    const page = Number.parseInt(filters.page, 10) || 1;
    const limit = Number.parseInt(filters.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if (filters.roleId) where.roleId = filters.roleId;
    if (filters.moduleActionId) where.moduleActionId = filters.moduleActionId;

    if (filters.status === 'revoked') {
        where.revokedAt = { [Op.ne]: null };
    } else if (filters.status !== 'all') {
        // default: sirf active
        where.revokedAt = null;
    }

    const allowedSortFields = ['grantedAt', 'revokedAt'];
    const sortBy = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'grantedAt';
    const sortOrder = String(filters.sortOrder || '').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { count, rows } = await Permission.findAndCountAll({
        where,
        include: [
            { model: ModuleActions, as: 'moduleAction', attributes: ['id', 'name', 'code', 'moduleId'], required: false },
            { model: User, as: 'grantedByUser', attributes: ['id', 'email'], required: false },
            { model: User, as: 'revokedByUser', attributes: ['id', 'email'], required: false },
        ],
        limit,
        offset,
        order: [[sortBy, sortOrder]],
        distinct: true,
    });

    const data = rows.map((row) => row.toJSON());

    const moduleIds = [...new Set(
        data.filter((row) => row.moduleAction).map((row) => row.moduleAction.moduleId)
    )];

    if (moduleIds.length > 0) {
        const modules = await Module.findAll({
            where: { id: { [Op.in]: moduleIds } },
            attributes: ['id', 'name', 'code'],
        });

        const moduleMap = new Map(modules.map((module) => [String(module.id), module.toJSON()]));

        for (const row of data) {
            if (row.moduleAction) {
                row.moduleAction.module = moduleMap.get(String(row.moduleAction.moduleId)) || null;
            }
        }
    }

    return {
        data,
        pagination: {
            page,
            limit,
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            hasNextPage: page * limit < count,
            hasPreviousPage: page > 1,
        },
    };
};

module.exports = {
    grantPermission,
    revokePermission,
    syncRolePermissions,
    getRolePermissions,
    getPermissionHistory,
};