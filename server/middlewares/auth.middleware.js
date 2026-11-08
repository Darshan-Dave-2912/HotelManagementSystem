const { User, Role } = require('../models');
const AppError = require('../utils/AppError');
const { verifyAccessToken } = require('../utils/token.util');
const userSessionService = require('../features/access-management/userSessions/userSession.service');

const authenticate = async (req, res, next) => 
{
    try
    {
        const [scheme, token] = (req.headers.authorization || '').split(' ');

        if(scheme !== 'Bearer' || !token)
        {
            throw new AppError('Authentication required', 401);
        }

        let payload;

        try
        {
            payload = verifyAccessToken(token);
        }
        catch(error)
        {
            throw new AppError('Invalid or expired access token', 401);
        }

        const session = await userSessionService.findActiveSessionById(payload.sid);

        if(!session || session.userId !== payload.sub)
        {
            throw new AppError('Session expired. Please login again', 401);
        }

        const user = await User.findByPk(payload.sub, {
            attributes: { exclude: ['passwordHash'] },
            include: [{ model: Role, attributes: ['id', 'name','code'] }],
        });

        if(!user || !user.isActive)
        {
            throw new AppError('User account is inactive or not found', 401);
        }

        req.user = user;
        req.sessionId = session.id;

        next();
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {
    authenticate,
};