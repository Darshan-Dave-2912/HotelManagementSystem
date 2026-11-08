const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const generateAccessToken = ({ userId, roleId, sessionId }) =>
{
    return jwt.sign(
        { roleId, sid: sessionId },
        authConfig.accessSecret,
        {
            subject: String(userId),
            expiresIn: authConfig.accessExpiresIn,
            algorithm: 'HS256',
        }
    );
};

const verifyAccessToken = (token) => 
{
    return jwt.verify(token, authConfig.accessSecret, { algorithms: ['HS256'] });
};

const generateRefreshToken = () => crypto.randomBytes(48).toString('hex');

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

module.exports = {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    hashToken
};
