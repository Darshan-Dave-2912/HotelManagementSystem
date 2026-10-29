const { Op, UniqueConstraintError } = require('sequelize');
const { Role } = require('../../../models');

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const ALLOWED_FIELDS = ['name', 'code', 'description', 'isActive'];

const normalizeRoleData = (data) => {
    const normalized = { } ;

    for(const Field of ALLOWED_FIELDS)
    {
        if (data[Field] !== undefined) normalized[Field] = data[Field];
    }

    if(typeof normalized.name === "string")
        {
            normalized.name = normalized.name.trim();
        }

        if(typeof normalized.code === "string")
        {
            normalized.code = normalized.code.trim().toUpperCase();
        }

        if(typeof normalized.description === "string")
        {
            normalized.description = normalized.description.trim();
        }

    return normalized;
    
}

const createRole = async (data) => {
    try {
        return await Role.create(normalizeRoleData(data));
    }
    catch (error) {
        if(error instanceof UniqueConstraintError){
            throw new AppError('Role name or code already exist', 409);
        }
        throw error;
    }
};

const getRole = async (filters) => {
    const page = Number.parseInt(filters.page, 10) || 1;
    const limit = Number.parseInt(filters.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if(filters.search)
    {
        const search = filters.search.trim().replace(/[%_\\]/g, '\\$&');

        where[Op.or] = [
            { name: { [Op.iLike]: `%${search}%` } },
            { code: { [Op.iLike]: `%${search}%` } },
            // { description: { [Op.iLike]: `%${search}%` } }
        ];
    }

    if(filters.isActive !== undefined)
    {
        where.isActive = ['true', '1'].includes(String(filters.isActive).toLowerCase());
    }

    const allowedSortFields = [
        'id',
        'name',
        'code',
        'createdAt',
        'updatedAt',
    ];

    const sortBy = allowedSortFields.includes(filters.sortBy) ? filters.sortBy : 'createdAt';

    const sortOrder = String(filters.sortOrder || '').toUpperCase() === 'ASC'? 'ASC' : 'DESC';

    const { count, rows } = await Role.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, sortOrder]],
    });

    return {
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


const getRoleById = async (id) => {
    const role = await Role.findByPk(id);

    if(!role)
    {
        throw new AppError('Role not found', 404);
    }

    return role;
}

const updateRole = async (id, data) => {
    const role = await getRoleById(id);

    try{
        await role.update(normalizeRoleData(data));
        return role;
    }
    catch(error)
    {
        if(error instanceof UniqueConstraintError)
        {
            throw new AppError('Role name or code already exists', 409);
        }
        throw error;
    }
}

const deleteRole = async (id) => {
    const role = await getRoleById(id);
    
    await role.destroy();

    return { id: role.id };
};

module.exports = {
    AppError,
    createRole,
    getRole,
    getRoleById,
    updateRole,
    deleteRole
};