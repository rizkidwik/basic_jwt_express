require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const apiRouter = require('./apiRouter.js');

const jwt = require('jsonwebtoken')

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3001',
    credentials:true
}))
app.use(morgan('dev'))


app.use('/apiRouter', apiRouter);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
});
module.exports = app