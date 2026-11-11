const authService = require('./auth.service');
const authConfig = require('../../config/auth.config');

const setRefreshCookie = (res, refreshToken) => 
{
    res.cookie(authConfig.refreshCookieName, refreshToken,{
        ...authConfig.refreshCookieBaseOptions,
        maxAge: authConfig.refreshExpiresInMs,
    });
};

const clearRefreshCookie = (res) =>
{
    res.clearCookie(authConfig.refreshCookieName, authConfig.refreshCookieBaseOptions);
};

const login = async (req, res, next) => 
{
    try{
        const { accessToken, refreshToken, user } = await authService.login(
            req.body,
            { ipAddress: req.ip, userAgent: req.get('user-agent')?.slice(0, 255) }
        );

        setRefreshCookie(res, refreshToken);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                accessToken,
                expiresIn: authConfig.accessExpiresIn,
                user,
            },
        });
    }
    catch(error)
    {
        next(error);
    }
};

const refresh = async (req, res, next) =>
{
    try
    {
        const oldRefreshToken = req.cookies?.[authConfig.refreshCookieName];

        const { accessToken, refreshToken } = await authService.refresh(
            oldRefreshToken,
            { ipAddress: req.ip }
        );

        setRefreshCookie(res, refreshToken);
        
        return res.status(200).json({
            success: true,
            message: 'Token refreshed successfully',
            data: {
                accessToken,
                expiresIn: authConfig.accessExpiresIn,
            },
        });
    }
    catch(error)
    {
        clearRefreshCookie(res);
        next(error);
    }
};

const logout = async (req, res, next) => 
{
    try
    {
        await authService.logout(req.cookies?.[authConfig.refreshCookieName]);

        clearRefreshCookie(res);

        return res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    }
    catch(error)
    {
        next(error);
    }
};

const me = async (req, res, next) => 
{
    try
    {
        return res.status(200).json({
            success: true,
            message: 'Current user fetch successfully',
            data: req.user,
        });
    }
    catch(error)
    {
        next(error);
    }
};

module.exports = {
    login,
    refresh,
    logout,
    me,
};