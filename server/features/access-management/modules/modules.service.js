const { Op, UniqueConstraintError } = require('sequelize');
const { Module } = require('../../../models');
const AppError = require('../../../utils/AppError');

const ALLOWED_FIELDS = ['name', 'code', 'isActive'];

const normalizeModuleData = (data) => {
    const normalized = {  };

    for(const Field of ALLOWED_FIELDS)
    {
        if (data[Field] !== undefined) normalized[Field] = data[Field];
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

const createModule = async (data) => {
    try{
        return await Module.create(normalizeModuleData(data));
    }
    catch(error){
        if(error instanceof UniqueConstraintError){
            throw new AppError('Module name or code already exist', 409);
        }
        throw error;
    }
}

const getModule = async (filters) => {
    const page = Number.parseInt(filters.page, 10) || 1;
    const limit = Number.parseInt(filters.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if(filters.search)
    {
        const search = filters.search.trim().replace(/[%_\\]/g, '\\$%');

        where [Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { code: { [Op.iLike]: `%${search}%` } },
        ];
    }

    if(filters.isActive !== undefined)
    {
        where.isActive = ['true','1'].includes(String(filters.isActive).toLowerCase());
    }

    const allowedSortFields = [
        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt',
    ];

    const sortBy = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'createdAt';

    const sortOrder = String(filters.sortOrder || '').toUpperCase() === 'ASC' ? 'ASC':'DESC';

    const { count, rows } = await Module.findAndCountAll({
        where,
        limit,
        offset,
        order:[[sortBy, sortOrder]]
    });

    return{
        data: rows,
        pagination: {
            page,
            limit,
            totalRecords: count,
            totalPages: Math.ceil(count/limit),
            hasNextPage: page * limit < count,
            hasPreviousPage: page > 1,
        }
    }
}

const getModuleById = async (id) => {
    const module = await Module.findByPk(id);

    if(!module)
    {
        throw new AppError('Module not found', 404);
    }
    return module;
}

const updateModule = async (id, data) => {
    const module = await getModuleById(id);

    try{
        await module.update(normalizeModuleData(data));
        return module;
    }
    catch(error)
    {
        if(error instanceof UniqueConstraintError)
        {
            throw new AppError('Module name or code already exist', 409);
        }
        throw error;
    }
}

const deleteModule = async (id) => {
    const module = await getModuleById(id);

    await module.destroy();

    return { id: module.id };
}

module.exports = {
    AppError,
    createModule,
    getModule,
    getModuleById,
    updateModule,
    deleteModule
};
