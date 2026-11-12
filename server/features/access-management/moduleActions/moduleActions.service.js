const { Op, UniqueConstraintError } = require('sequelize');
const { Module, ModuleActions } = require('../../../models');
const AppError = require('../../../utils/AppError');
const permissionCache = require('../permissions/permissionCache.service');

const ALLOWED_FIELDS = ['name','code','isActive'];

const normalizeModuleActionData = (data) => 
{
    const normalized = {};
    for(const field of ALLOWED_FIELDS)
    {
        if(data[field] !== undefined) normalized[field] = data[field];
    }

    if(typeof normalized.name === 'string')
    {
        normalized.name = normalized.name.trim();
    }

    if(typeof normalized.code === 'string')
    {
        normalized.code = normalized.code.trim().toUpperCase();
    }
    return normalized;
}

const createModuleAction = async (data) => 
{
    const module = await Module.findByPk(data.moduleId);

    if(!module){
        throw new Error('Module not found', 404);
    }

    try{
        return await ModuleActions.create({ 
            moduleId: data.moduleId,
            ...normalizeModuleActionData(data) 
        });
    }
    catch(error)
    {
        if(error instanceof UniqueConstraintError)
        {
            throw new Error('Action code already exists for this module',409);
        }
        throw error;
    }
};

const getModuleActions = async (filters) => {
    const page = Number.parseInt(filters.page, 10) || 1;
    const limit = Number.parseInt(filters.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if(filters.moduleId){
        where.moduleId = filters.moduleId;
    }

    if(filters.search){
        const search = filters.search.trim().replace(/[%_\\]/g, '\\$&');

        where[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { code: { [Op.iLike]: `%${search}%` } },
        ];
    }

    if(filters.isActive !== undefined){
        where.isActive = ['true','1'].includes(String(filters.isActive).toLowerCase());
    }

    const allowedSortFields = ['id','name','code','createdAt','updatedAt'];

    const sortBy = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'createdAt';

    const sortOrder = String(filters.sortOrder || '').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { count, rows } = await ModuleActions.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, sortOrder]],
        include: [{ model: Module, attributes: ['id', 'name', 'code'] }],
    });

    return {
        data: rows,
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

const getModuleActionById = async (id) => {
    const moduleAction = await ModuleActions.findByPk(id,
        {
            include: [{model: Module, attributes: ['id','name','code']}],
        });
    
    if(!moduleAction)
    {
        throw new Error('Module action not found', 404);
    }
    return moduleAction;
};

const updateModuleAction= async (id, data) => {
    const moduleAction = await getModuleActionById(id);

    try{
        await moduleAction.update(normalizeModuleActionData(data));

        if (data.isActive !== undefined || data.code !== undefined) {
            await permissionCache.invalidateAllRoles();
        }

        return moduleAction;
    } catch(error){
        if(error instanceof UniqueConstraintError){
            throw new AppError('Action code already exists for this module', 409);
        }
        throw error;
    }
};

const deleteModuleAction = async (id) => {
    const moduleAction = await getModuleActionById(id);

    await moduleAction.destroy();

    await permissionCache.invalidateAllRoles();

    return { id: moduleAction.id };
};

module.exports = {
    createModuleAction,
    getModuleActions,
    getModuleActionById,
    updateModuleAction,
    deleteModuleAction,
};