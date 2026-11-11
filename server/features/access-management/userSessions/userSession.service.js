const { Op } = require('sequelize');
const { UserSession } = require('../../../models');

const REVOKE_REASONS = {
    LOGOUT: 'logout',
    ADMIN: 'admin',
    REUSE_DETECTED: 'reuse_detected',
    USER_INACTIVE: 'user_inactive',
};

const createSession = async ({ userId, refreshTokenHash, expiresAt, ipAddress, userAgent }, transaction) =>
{
    return UserSession.create(
        { userId, refreshTokenHash, expiresAt, ipAddress, userAgent, lastActiveAt: new Date() },
        { transaction }
    );
};

const findByRefreshHash = async (refreshTokenHash, transaction) =>
{
    return UserSession.findOne({
        where: { refreshTokenHash },
        transaction,
        lock: transaction ? transaction.LOCK.UPDATE : undefined,
    });
};

const findByPreviousRefreshHash = async (previousRefreshTokenHash, transaction) =>
{
    return UserSession.findOne({
        where: { previousRefreshTokenHash },
        transaction,
        lock: transaction ? transaction.LOCK.UPDATE : undefined,
    });
};

const findActiveSessionById = async (id) =>
{
    return UserSession.findOne({
        where: {
            id,
            revokedAt: null,
            expiresAt: { [Op.gt]: new Date() },
        },
    });
};

// Same row me refresh token rotate karta hai (id / sid wahi rehti hai)
const rotateSession = async (session, { newRefreshTokenHash, expiresAt, ipAddress }, transaction) =>
{
    return session.update(
        {
            previousRefreshTokenHash: session.refreshTokenHash,
            refreshTokenHash: newRefreshTokenHash,
            expiresAt,
            ipAddress,
            lastActiveAt: new Date(),
        },
        { transaction }
    );
};

const revokeSession = async (session, { reason, revokedBy = null }, transaction) =>
{
    if (!session.revokedAt)
    {
        await session.update(
            { revokedAt: new Date(), revokeReason: reason, revokedBy },
            { transaction }
        );
    }
};

const revokeAllForUser = async (userId, { reason, revokedBy = null }, transaction) =>
{
    return UserSession.update(
        { revokedAt: new Date(), revokeReason: reason, revokedBy },
        { where: { userId, revokedAt: null }, transaction }
    );
};

module.exports = {
    REVOKE_REASONS,
    createSession,
    findByRefreshHash,
    findByPreviousRefreshHash,
    findActiveSessionById,
    rotateSession,
    revokeSession,
    revokeAllForUser,
};