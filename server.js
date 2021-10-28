//require express
const express = require("express");
//creation of instance
const app = express();
//require connectdb
const connectDB = require("./config/connectDB");
connectDB();
//require of dotenv
require("dotenv").config();
//creation of port
const PORT = process.env.PORT;
//routing 
//middleware global
app.use(express.json())
//route
app.use("/api/user", require('./routes/user'))
//creation of server
app.listen(PORT, (error) => {
    error
        ? console.error(error)
        : console.log(`app is running on port :${PORT}`);
});
//creation base de donnee :creation dossier config
