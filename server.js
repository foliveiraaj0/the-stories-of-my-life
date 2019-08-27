const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 9000;
const userRouter = require("./src/routers/user");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}))

/* app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"]
    // ,credentials: true
  })
); */

/* app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json, Authorization');
  next();
}); */

var corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(userRouter, cors(corsOptions));

app.listen(port);

//TODO:

//High priority

//create a logger service that considers the running mode (debugger or production)
//improve the exception handling adding a code to the error besides the error msg
//tests

//Low priority

//set maxLength to user.tokens array
//use coockies to save user credentials
//create delete route
//improve the usage of jwt, make it more secure by analysing the algorithms it can receive
