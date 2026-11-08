const moduleService = require('./modules.service');

const createModule = async (req, res, next) => {
    try {
        const module = await moduleService.createModule(req.body);
        return res.status(201).json({
            success: true,
            message: 'Module created successfully',
            data: role,
        });
    }
    catch(error){
        next(error);
    }
};

const getModule = async (req, res, next) => {
    try{
        const result = await moduleService.getModule(req.query);

        return res.status(200).json({
            success: true,
            message:'Modules fetch successfully',
            data: result.data,
            pagination: result.pagination,
        });
    } catch(error){
        next(error);
    }
};

const getModuleById = async (req, res, next) => {
    try{
        const module = await moduleService.getModuleById(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Module fetch successfully',
            data: module,
        })
    }
    catch(error){
        next(error);
    }
};

const updateModule = async (req, res, next) => {
    try{
        const module = await moduleService.updateModule(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message:'Module update successfully',
            data: module,
        });
    }
    catch(error){
        next(error);
    }
}

const DeleteModule = async (req, res, next) => {
    try{
        const result = await moduleService.deleteModule(req.params.id);

        return res.status(200).json({
            success:true,
            message: 'Module delete successfully',
            data: result,
        })
    }
    catch(error)
    {
        next(error);
    }
}

module.exports = {
    createModule,
    getModule,
    getModuleById,
    updateModule,
    DeleteModule
}