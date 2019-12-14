
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");


mongoose.connect(
    "mongodb://localhost/travelersHunt",
    { useNewUrlParser: true },
    () => {
        
        console.log("connected to database");
    }
);

const app = express();
app.use(express.json()); // for json responses

app.use(cookieParser());

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");

app.use("", registerRouter);
app.use("", loginRouter);



const port = 3000;
app.listen(port, err => {
    if (err) {
      return console.log("Can't listen to the App PORT", err);
    }
  
    console.log(`server is listening on ${port}`);
    let i = 0;
    function logShow() {
      console.log(`Hello!!!! ${i}     listening on ${port}`);
      i++;
    }
    setInterval(logShow, 2000);
  });