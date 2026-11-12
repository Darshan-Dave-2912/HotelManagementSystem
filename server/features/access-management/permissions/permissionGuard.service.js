const { Op } = require('sequelize');
const { Role, User, Module, ModuleActions, Permission } = require('../../../models');
const AppError = require('../../../utils/AppError');
const { MODULE_CODES, PERMISSION_MANAGEMENT_ACTIONS } = require('../../../config/accessControl.config');

// Is action ke kitne active users bachenge, jab changes apply ho jayein
const countActiveHolders = async (actionId, changes, transaction) => {
    const { revokingPermissionIds, excludedRoleIds, excludedUserIds } = changes;

    const where = { moduleActionId: actionId, revokedAt: null };

    if (revokingPermissionIds.length > 0) {
        where.id = { [Op.notIn]: revokingPermissionIds };
    }

    const remaining = await Permission.findAll({ where, attributes: ['roleId'], transaction });

    const excludedRoles = new Set(excludedRoleIds.map(String));
    const roleIds = [...new Set(remaining.map((permission) => String(permission.roleId)))]
        .filter((roleId) => !excludedRoles.has(roleId));

    if (roleIds.length === 0) return 0;

    const activeRoles = await Role.findAll({
        where: { id: { [Op.in]: roleIds }, isActive: true },
        attributes: ['id'],
        transaction,
    });

    if (activeRoles.length === 0) return 0;

    const userWhere = { roleId: { [Op.in]: activeRoles.map((role) => role.id) }, isActive: true };

    if (excludedUserIds.length > 0) {
        userWhere.id = { [Op.notIn]: excludedUserIds };
    }

    return User.count({ where: userWhere, transaction });
};

// Generic lockout guard (koi role name hardcoded nahi):
// change ke baad bhi kam se kam ek active user ke paas permission-management actions bachne chahiye.
// Use cases: permission revoke, role deactivate/delete, user deactivate/delete/role change
const assertManagementAccessRemains = async (
    { revokingPermissionIds = [], excludedRoleIds = [], excludedUserIds = [] } = {},
    transaction
) => {
    const hasExclusions = excludedRoleIds.length > 0 || excludedUserIds.length > 0;

    if (revokingPermissionIds.length === 0 && !hasExclusions) return;

    const permissionModule = await Module.findOne({
        where: { code: { [Op.iLike]: MODULE_CODES.PERMISSIONS }, isActive: true },
        attributes: ['id'],
        transaction,
    });

    if (!permissionModule) return;

    // Transaction ho to row lock: do requests ek saath guard na nikal paayein
    const managementActions = await ModuleActions.findAll({
        where: {
            moduleId: permissionModule.id,
            isActive: true,
            [Op.or]: PERMISSION_MANAGEMENT_ACTIONS.map((code) => ({ code: { [Op.iLike]: code } })),
        },
        attributes: ['id', 'code'],
        ...(transaction ? { lock: transaction.LOCK.UPDATE } : {}),
        transaction,
    });

    if (managementActions.length === 0) return;

    let affectedActions = managementActions;

    // Sirf permission revoke ho raha ho to wahi actions dekhne hain jo revoke ho rahe hain
    if (!hasExclusions) {
        const revoking = await Permission.findAll({
            where: {
                id: { [Op.in]: revokingPermissionIds },
                moduleActionId: { [Op.in]: managementActions.map((action) => action.id) },
            },
            attributes: ['moduleActionId'],
            transaction,
        });

        const affectedIds = new Set(revoking.map((permission) => String(permission.moduleActionId)));
        affectedActions = managementActions.filter((action) => affectedIds.has(String(action.id)));
    }

    const changes = { revokingPermissionIds, excludedRoleIds, excludedUserIds };
    const noChanges = { revokingPermissionIds: [], excludedRoleIds: [], excludedUserIds: [] };

    for (const action of affectedActions) {
        const after = await countActiveHolders(action.id, changes, transaction);
        if (after > 0) continue;

        // Pehle se koi holder hi nahi tha (bootstrap se pehle) to block nahi karna
        const before = await countActiveHolders(action.id, noChanges, transaction);

        if (before > 0) {
            throw new AppError(
                `This change would leave no active user with '${action.code.toUpperCase()}' access on permission management`,
                409
            );
        }
    }
};

module.exports = {
    assertManagementAccessRemains,
};