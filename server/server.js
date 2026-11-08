require('dotenv').config();
const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes/index");
const { notFoundErrors, errorHandler } = require("./middlewares/errorHandlers");
const requestLogger = require('./middlewares/requestLogger');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// json request body ko read krne ke liye
app.use(express.json());

app.use(cookieParser());
app.use((req, res, next) => {
    console.log('cookies:', req.cookies);
    next();
});

app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        console.error('JSON Parsing Error:', err.message);

        return res.status(400).json({
            success: false,
            message: 'Invalid JSON in request body',
            details: err.message
        });
    }

    next(err);
});

// Request Logger
app.use(requestLogger);

//Central api route
app.use('/api/', routes);

// 404 Handler
app.use(notFoundErrors);

//Global Error Handler
app.use(errorHandler);

async function startServer() {
    try{
        await sequelize.authenticate();
        console.log("Database connected successfully...!!!");
        //Server start
        app.listen(port, HOST, () =>{
        console.log(`Server is running on port ${port}`);
        });
    } catch (error){
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
}

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaugh Exception:', err);
    process.exit(1);
});

startServer();