const express = require("express");
const sequelize = require("./config/database");
const routes = require("./routes/index");

const app = express();
const port = process.env.port || 5000;
const HOST = '0.0.0.0';

// json request body ko read krne ke liye
app.use(express.json());

//Central api route
app.use('/api/', routes);

async function startServer() {
    console.log({
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD_EXISTS: typeof process.env.DB_PASSWORD === "string"
    && process.env.DB_PASSWORD.length > 0,
});
    try{
        await sequelize.authenticate();
        console.log("Server Connect Successfully...!!!");
        //Server start
        app.listen(port, HOST, () =>{
        console.log(`Server is running at http://my ip:${port}`);
        });
    } catch (error){
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
}

startServer();