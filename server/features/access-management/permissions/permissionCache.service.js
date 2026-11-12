const { Op } = require('sequelize');
const { Role, Permission, ModuleActions, Module } = require('../../../models');
const { redisClient, isRedisReady } = require('../../../config/redis.config');

const CACHE_PREFIX = 'permissions:role:';
const CACHE_TTL_SECONDS = Number(process.env.PERMISSION_CACHE_TTL_SECONDS) || 300;

const cacheKey = (roleId) => `${CACHE_PREFIX}${roleId}`;

// PostgreSQL = source of truth. Role/module/action sab active aur non-deleted hone chahiye
const loadRolePermissionCodesFromDb = async (roleId) => {
    const role = await Role.findOne({
        where: { id: roleId, isActive: true },
        attributes: ['id'],
    });

    if (!role) return [];

    const permissions = await Permission.findAll({
        where: { roleId, revokedAt: null },
        attributes: ['moduleActionId'],
    });

    if (permissions.length === 0) return [];

    const moduleActions = await ModuleActions.findAll({
        where: {
            id: { [Op.in]: permissions.map((permission) => permission.moduleActionId) },
            isActive: true,
        },
        attributes: ['id', 'code', 'moduleId'],
    });

    if (moduleActions.length === 0) return [];

    const modules = await Module.findAll({
        where: {
            id: { [Op.in]: [...new Set(moduleActions.map((action) => action.moduleId))] },
            isActive: true,
        },
        attributes: ['id', 'code'],
    });

    const moduleCodeById = new Map(modules.map((module) => [String(module.id), module.code.toUpperCase()]));

    const codes = new Set();

    for (const action of moduleActions) {
        const moduleCode = moduleCodeById.get(String(action.moduleId));
        if (moduleCode) codes.add(`${moduleCode}:${action.code.toUpperCase()}`);
    }

    return [...codes];
};

// Returns array like ['ROLE:VIEW', 'PERM:GRANT']
// Redis fail ho to DB se aata hai, DB fail ho to error throw (access kabhi allow nahi hoga)
const getRolePermissionCodes = async (roleId) => {
    const key = cacheKey(roleId);

    if (isRedisReady()) {
        try {
            const cached = await redisClient.get(key);

            if (cached !== null) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (error) {
            console.error('Permission cache read failed, falling back to DB:', error.message);
        }
    }

    const codes = await loadRolePermissionCodesFromDb(roleId);

    if (isRedisReady()) {
        try {
            await redisClient.setEx(key, CACHE_TTL_SECONDS, JSON.stringify(codes));
        } catch (error) {
            console.error('Permission cache write failed:', error.message);
        }
    }

    return codes;
};

// Sirf us role ki cache hatati hai. Kabhi throw nahi karta (TTL safety net hai)
const invalidateRole = async (roleId) => {
    if (!isRedisReady()) {
        console.warn(`Redis unavailable, cache for role ${roleId} will expire by TTL`);
        return false;
    }

    try {
        await redisClient.del(cacheKey(roleId));
        return true;
    } catch (error) {
        console.error(`Permission cache invalidate failed for role ${roleId}:`, error.message);
        return false;
    }
};

// Module / moduleAction deactivate ya delete hone par saare roles ki cache hatane ke liye
const invalidateAllRoles = async () => {
    if (!isRedisReady()) {
        console.warn('Redis unavailable, role caches will expire by TTL');
        return false;
    }

    try {
        for await (const batch of redisClient.scanIterator({ MATCH: `${CACHE_PREFIX}*`, COUNT: 100 })) {
            // node-redis v4 me ek key, v5 me keys ka array milta hai
            const keys = Array.isArray(batch) ? batch : [batch];
            if (keys.length > 0) await redisClient.del(keys);
        }
        return true;
    } catch (error) {
        console.error('Permission cache invalidate-all failed:', error.message);
        return false;
    }
};

module.exports = {
    getRolePermissionCodes,
    invalidateRole,
    invalidateAllRoles,
};