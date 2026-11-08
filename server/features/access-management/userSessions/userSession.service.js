const { Op, Transaction } = require('sequelize');
const { UserSession } = require('../../../models');

const createSession = async({ userId, refreshTokenHash, expiresAt, ipAddress, transaction }) => 
{
    return UserSession.create(
        { userId, refreshTokenHash, expiresAt, ipAddress },
        { transaction }
    );
};

const findByRefreshHash = async (refreshTokenHash, transaction) =>
{
    return UserSession.findOne({
        where: { refreshTokenHash },
        transaction,
        lock: transaction? transaction.LOCK.UPDATE : undefined,
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

const revokeSession = async (session, transaction) => 
{
    if(!session.revokedAt)
    {
        await session.update({ revokedAt: new Date() }, { transaction });
    }
};

const revokeAllForUser = async (userId, transaction) =>
{
    return UserSession.update(
        { revokedAt: new Date() },
        { where: {userId, revokedAt: null}, transaction }
    );
};

module.exports = {
    createSession,
    findByRefreshHash,
    findActiveSessionById,
    revokeSession,
    revokeAllForUser,
};