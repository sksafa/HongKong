
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');;
const dotenv = require('dotenv')
const colors = require('colors');
const path = require("path");
const  connectDb  = require('./config/connectDb');
dotenv.config()

//database call

connectDb()

//rest obj
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/sector", require("./routes/sectorRoute"));
app.use("/api/v1/userInfo", require("./routes/userInfoRoute"));

app.get('/', (req,res)=>{
    res.send(`<h1>App is running</h1>`)
})

//static files
app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });


//listen port 
const PORT = 8080 ||  process.env.PORT
app.listen(PORT, ()=>{
    console.log(`port is running at ${PORT}`)
})