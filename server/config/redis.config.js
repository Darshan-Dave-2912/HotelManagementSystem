const { createClient } = require('redis');
require('dotenv').config();

const REDIS_URL = process.env.REDIS_URL;

const redisClient = createClient({
    url: REDIS_URL,
    disableOfflineQueue: true,
    socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries) => Math.min(retries * 200, 5000),
    },
});



let lastErrorMessage = null;

redisClient.on('error', (error) => {
        if  (error.message !== lastErrorMessage) {
            console.error('Redis Error:', error.message);
            lastErrorMessage = error.message;
        }
    }
);

redisClient.on('ready', () => {
        lastErrorMessage = null;
        console.log('Redis connected successfully...!!!');
    }
);
redisClient.on('end', () => {
        console.warn('Redis connection closed')
    }
);

const isRedisReady = () => redisClient.isReady;

const connectRedis = async () => {
    if (!REDIS_URL) {
        console.warn('REDIS_URL not set. Permission cache disabled, PostgreSQL will be used directly');
        return;
    }

    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Redis initial connection failed:', error.message);
    }
};

const disconnectRedis = async () => {
    if (!redisClient.isOpen) return;

    try {
        if (redisClient.isReady) {
            await redisClient.quit();
        } else if (typeof redisClient.destroy === 'function') {
            redisClient.destroy();
        } else {
            await redisClient.disconnect();
        }
    } catch (error) {
        console.error('Redis disconnect failed:', error.message);
    }
};

module.exports = {
    redisClient,
    isRedisReady,
    connectRedis,
    disconnectRedis,
};