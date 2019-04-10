const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 9000;
const userRouter = require("./src/routers/user");

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}))

app.use(userRouter);

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"]
    // ,credentials: true
  })
);

app.listen(port);

//TODO:

//High priority

//stop returning all the tokens of the user and instead return only the token of the current session
//create a logger service that considers the running mode (debugger or production)
//improve the exception handling adding a code to the error besides the error msg
//tests

//Low priority 

//set maxLength to user.tokens array
//use coockies to save user credentials
//create delete route
//improve the usage of jwt, make it more secure by analysing the algorithms it can receive
