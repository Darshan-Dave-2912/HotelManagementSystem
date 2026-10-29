const roleService = require('./roles.service');

const createRole = async (req, res, next) => {

    try{
        const role = await roleService.createRole(req.body);

        return res.status(201).json({
            success: true,
            message: 'Role created successfully',
            data: role,
        });
    }
    catch(error){
        next(error);
    }
};

const getRole = async (req, res, next) => {
    
    try{
        const result = await roleService.getRole(req.query);

        return res.status(200).json({
            success:true,
            message:'Roles fetch successfully',
            data: result.data,
            pagination: result.pagination,
        });
    } catch(error){
        next(error);
    }
};

const getRoleById = async (req, res, next) => {

    try{
        const role = await roleService.getRoleById(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Role fetch successfully',
            data: role,
        })
    }
    catch (error){  
        next(error);
    }
};

const updateRole = async (req, res, next) => {

    try{
        const role = await roleService.updateRole(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Role update successfully',
            data: role,
        })
    }
    catch(error){
        next(error);
    }
}

const DeleteRole = async (req, res, next) =>{
    try{
        const result = await roleService.deleteRole(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Role delete successfully',
            data: result,
        })
    }
    catch(error){
        next(error);
    }
}

module.exports = {
    createRole,
    getRole,
    getRoleById,
    updateRole,
    DeleteRole
};