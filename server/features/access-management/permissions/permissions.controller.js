const permissionService = require('./permissions.service');

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


module.exports = {
    grantPermission,
    revokePermission,
    syncRolePermissions,
    getRolePermissions,
    getPermissionHistory
};