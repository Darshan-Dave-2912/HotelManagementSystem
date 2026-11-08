if(!process.env.JWT_ACCESS_SECRET)
{
    throw new Error('JWT_ACCESS_SECRET is not defined in .env');
}

const refreshDays = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) || 7;

module.exports = {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_SECRET_IN || '15m',
    refreshExpiresInMs: refreshDays * 24 * 60 * 60 * 1000,

    refreshCookieName: 'refreshToken',
    refreshCookieBaseOptions:{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/api/auth',
    }
};