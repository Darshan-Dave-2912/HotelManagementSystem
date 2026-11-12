const permissionService = require('./permissions.service');
const permissionCache = require('./permissionCache.service');

const grantPermission = async (req, res, next) => {
    try{
        const permission = await permissionService.grantPermission(req.body, req.user.id);

        return res.status(201).json({
            success: true,
            message: 'Permission granted successfully',
            data: permission,
        });
    }
    catch(error){
        next(error);
    }
};

const revokePermission = async (req, res, next) => {
    try{
        const permission = await permissionService.revokePermission(req.body, req.user.id);

        return res.status(200).json({
            success: true,
            message: 'Permission revoked successfully',
            data: permission,
        });
    }
    catch(error){
        next(error);
    }
};

const syncRolePermissions = async (req, res, next) => {
    try{
        const result = await permissionService.syncRolePermissions(
            req.params.roleId,
            req.body.moduleActionIds,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: 'Role permissions synced successfully',
            data: result,
        });
    }
    catch(error){
        next(error);
    }
};

const getRolePermissions = async (req, res, next) => {
    try{
        const result = await permissionService.getRolePermissions(req.params.roleId);

        return res.status(200).json({
            success: true,
            message: 'Role permissions fetch successfully',
            data: result,
        });
    }
    catch(error){
        next(error);
    }
};

const getPermissionHistory = async (req, res, next) => {
    try{
        const result = await permissionService.getPermissionHistory(req.query);

        return res.status(200).json({
            success: true,
            message: 'Permission history fetch successfully',
            data: result.data,
            pagination: result.pagination,
        });
    }
    catch(error){
        next(error);
    }
};

// Logged-in user ke current role ki effective permissions (frontend menu/buttons ke liye)
const getMyPermissions = async (req, res, next) => {
    try{
        const codes = await permissionCache.getRolePermissionCodes(req.user.roleId);

        const grouped = {};
        for(const code of codes){
            const [moduleCode, actionCode] = code.split(':');
            (grouped[moduleCode] ||= []).push(actionCode);
        }

        return res.status(200).json({
            success: true,
            message: 'My permissions fetch successfully',
            data: {
                roleId: req.user.roleId,
                permissions: grouped,
            },
        });
    }
    catch(error){
        next(error);
    }
};

module.exports = {
    grantPermission,
    revokePermission,
    syncRolePermissions,
    getRolePermissions,
    getPermissionHistory,
    getMyPermissions,
};