const moduleActionService = require('./moduleActions.service');

const createModuleAction = async (req,res,next) => {
    try {
        const moduleAction = await moduleActionService.createModuleAction(req.body);

        return res.status(201).json({
            success:true,
            message: 'Module action createdsuccessfully',
            data: moduleAction,
        });
    } catch(error) {
        next(error);
    }
};

const getModuleActions = async (req,res,next) => {

    try {
        const result = await moduleActionService.getModuleActions(req.query);

        return res.status(200).json({
            success: true,
            message: 'Module actions fetch successfully',
            data: result.data,
            pagination: result.pagination,
        });
    } catch(error) {
        next(error);
    }
}

const getModuleActionById = async (req,res,next) => {

    try {
        const moduleAction = await moduleActionService.getModuleActionById(req.params.id);

        return res.status(200).json({
            success:true,
            message: 'Module action fetch successfully',
            data: moduleAction,
        });
    } catch(error) {
        next(error);
    }
}

const updateModuleAction = async (req, res, next) => {

    try {
        const moduleAction = await moduleActionService.updateModuleAction(req.params.id, req.body);

        return res.status(200).json({
            success:true,
            message: 'Module action update successfully',
            data: moduleAction,
        });
    } catch(error) {
        next(error);
    }
};

const deleteModuleAction = async (req,res,next) => {
    try {
        const result = await moduleActionService.deleteModuleAction(req.params.id);
        
        return res.status(200).json({
            success: true,
            message: 'Module action delete successfully',
            data: result,
        });
    } catch(error) {
        next(error);
    }
};

module.exports = {
    createModuleAction,
    getModuleActions,
    getModuleActionById,
    updateModuleAction,
    deleteModuleAction,
};