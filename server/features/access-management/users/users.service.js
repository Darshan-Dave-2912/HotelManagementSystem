const bcrypt = require('bcrypt');
const { Op, UniqueConstraintError } = require('sequelize');
const { User, Role } = require('../../../models');

const SALT_ROUNDS = 12;

class AppError extends Error {
    constructor (message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

const ALLOWED_FIELDS = ['roleId', 'username', 'email', 'phone', 'isActive'];

const SAFE_ATTRIBUTES = { exclude: ['passwordHash'] };

const ROLE_INCLUDE = [
    {
        model: Role, attributes: ['id','name','code']
    },
];

const normalizeUserData = (data) => 
{
    const normalized = {};
    for(const field of ALLOWED_FIELDS)
    {
        if(data[field] !== undefined) normalized[field] = data[field];
    }

    if(typeof normalized.username === 'string')
    {
        normalized.username = normalized.username.trim()
    }

    if(typeof normalized.email === 'string')
    {
        normalized.email = normalized.email.trim()
    }

    if(typeof normalized.phone === 'string')
    {
        normalized.phone = normalized.phone.trim()
    }

    return normalized;
}

const toSafeUser = (user) => {
    const { passwordHash, ...safeUser } = user.get({ plain: true });

    return safeUser;
}

const assertRoleExists = async (roleId) => {
    const role = await Role.findByPk(roleId);

    if(!role)
    {
        throw new AppError('role not found', 400);
    }
};

const createUser = async (data) =>
{
    const normalized = normalizeUserData(data);

    await assertRoleExists(normalized.roleId);

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

    try
    {
        const user = await User.create({...normalized, passwordHash});
        return toSafeUser(user);
    }
    catch(error)
    {
        if(error instanceof UniqueConstraintError)
        {
            throw new AppError('Username, email or phone already exists', 409);
        }
        throw error;
    }
}

const getUser = async (filters) => {
    const page = Number.parseInt(filters.page, 10) || 1;
    const limit = Number.parseInt(filters.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const where = {};

    if(filters.search)
    {
        const search =  filters.search.trim().replace(/[%_\\]/g,'\\$&');

        where[Op.or] = [
            { username: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
            { phone: { [Op.iLike]: `%${search}%` } },
        ];
    }

    if(filters.roleId !== undefined)
    {
        where.roleId = Number.parseInt(filters.roleId, 10);
    }

    if(filters.isActive !== undefined)
    {
        where.isActive = ['true', '1'].includes(String(filters.isActive).toLowerCase());
    }

    const allowSortFields = [
        'username',
        'email',
        'phone',
        'lastLoginAt',
        'createdAt',
        'updatedAt'
    ];

    const sortBy = allowSortFields.includes(filters.sortBy) ? filters.sortBy : 'createdAt';

    const sortOrder = String(filters.sortOrder || '').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { count, rows} = await User.findAndCountAll({
        where,
        attributes: SAFE_ATTRIBUTES,
        include: ROLE_INCLUDE,
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
            totalPages: Math.ceil(counts / limit),
            hasNextPage: page * limit < counts,
            hasPreviousPage: page > 1,
        }
    }
}

const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: SAFE_ATTRIBUTES,
        include: ROLE_INCLUDE
    });

    if(!user)
    {
        throw new AppError('User not found', 404);
    }

    return user;
}

const updateUser = async (id, data) => {
    
    const user = await getUserById(id);

    const normalized = normalizeUserData(data);

    if(normalized.roleId !== undefined)
    {
        await assertRoleExists(normalized.roleId);
    }

    try
    {
        await user.update(normalized);

        return await getUserById(id);
    }
    catch(error)
    {
        if(error instanceof UniqueConstraintError)
        {
            throw new AppError('username, email or phone already exists', 409);
        }

        throw error;
    }
}

const deleteUser = async (id) => {
    const user = await getUserById(id);

     user.destroy();

    return  { id: user.id };
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
}