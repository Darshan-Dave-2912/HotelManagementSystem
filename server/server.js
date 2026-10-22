const express = require("express");

const app = express();
const port = 5001;

// json request body ko read krne ke liye
app.use(express.json());

// Home route
app.get("/", (req, res) => {

    res.send("Inventory Application Server is running! ");
});

//Server start
app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
});