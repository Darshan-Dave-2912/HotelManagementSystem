const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const sequelize = require('../../config/database');
const { User, Role } = require('../../models');
const AppErrpr = require('../../utils/AppError');
const authConfig = require('../../config/auth.config');
const userSessionService = require('../access-management/userSessions/userSession.service');
const {
generateAccessToken,
generateRefreshToken,
hashToken
} = require('../../utils/token.util');
const AppError = require('../../utils/AppError');

const DUMMY_HASH = bcrypt.hashSync('dumy-password-for-timing', 12);

const ROLE_INCLUDE = [
    {
        model: Role, attribute:['id','name','code']
    },
];

const buildExpiry = () => new Date(Date.now() + authConfig.refreshExpiresInMs);

const login = async ({ identifier, password }, { ipAddress }) =>
{
    const loginId = identifier.trim();

    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: loginId.toLowerCase() },
                { userName: loginId },
            ],
        },
        include: ROLE_INCLUDE,
    });

    const isPasswordValid = await bcrypt.compare(password, user? user.passwordHash : DUMMY_HASH);

    if (!user || !isPasswordValid)
    {
        throw new AppErrpr('Invalid credentials', 401);
    }

    if(!user.isActive)
    {
        throw new AppError('Your account is Active. Please contact administrator', 403);
    }

    const refreshToken = generateRefreshToken();

    const session = await sequelize.transaction(async (t) => 
    {
        const createdSession = await userSessionService.createSession(
            {
                userId: user.id,
                refreshTokenHash: hashToken(refreshToken),
                expiresAt: buildExpiry(),
                ipAddress,
            },
            t
        );

        await user.update({ lastLoginAt: new Date() }, { transaction: t });

        return createdSession;
    });

    const accessToken = generateAccessToken({
        userId: user.id,
        roleId: user.roleId,
        sessionId: session.id,
    });

    const { passwordHash, ...safeUSer } = user.get({ plain: true });

    return { accessToken, refreshToken, user: safeUSer };
};

const refresh = async (refreshToken, { ipAddress }) => 
{
    if(!refreshToken)
    {
        throw new AppError('Refresh token missing', 401);
    }

    const result = await sequelize.transaction(async (t) =>
    {
        const session = await userSessionService.findByRefreshHash(hashToken(refreshToken), t);

        if (!session)
        {
            return { status: 'invalid' };
        }

        if(session.expiresAt <= new Date())
        {
            return { status: 'expired' };
        }

        const user = await User.findByPk( session.userId, { transaction: t });

        if(!user || !user.isActive)
        {
            await userSessionService.revokeSession(session, t);
            return { status: 'inActive' };
        }

        const newRefreshToken = generateRefreshToken();

        await userSessionService.revokeSession(session, t);

        const newSession = await userSessionService.createSession(
            {
                userId: user.id,
                refreshTokenHash: hashToken(newRefreshToken),
                expiresAt: buildExpiry(),
                ipAddress,
            },
            t
        );

        const accessToken = generateAccessToken({
            userId: user.id,
            roleId: user.roleId,
            sessionId: newSession.id,
        });

        return { status: 'ok', accessToken, refreshToken: newRefreshToken };
    });

    if (result.status !== 'ok')
    {
        throw new AppError('Invalid or expired refresh token', 401);
    }

    return { accessToken: result.accessToken, refreshToken: result.refreshToken };
};

const logout = async (refreshToken) => 
{
    if(!refreshToken)
    {
        return;
    }

    const session = await userSessionService.findByRefreshHash(hashToken(refreshToken));

    if(session)
    {
        await userSessionService.revokeSession(session);
    }
};

module.exports = {
    login,
    refresh,
    logout,
};