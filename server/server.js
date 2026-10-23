const express = require("express");
const sequelize = require("./config/database");

const app = express();
const port = process.env.port || 5000;

// json request body ko read krne ke liye
app.use(express.json());

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
        app.listen(port, () =>{
        console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (error){
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
}

startServer();