const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Authentication = require("../models/Authentication");
const loginValidationSchema = require("../models/validations/loginValidationSchema");


loginRouter.post("/login", async (req, res) => {
  console.log(req.body);
  // console.log(req);
  // console.log(req.cookies);
  const { error, value } = loginValidationSchema.validate({
    email: req.body.email,
    password: req.body.password
  });

  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {

      const attemptedUser = await Authentication.findOne({
        email: req.body.email
      });

    if (attemptedUser) {

      const validPass = await bcrypt.compare(
        req.body.password,
        attemptedUser.password
      );

      if (validPass) {

        const loginToken = jwt.sign(
          { _id: attemptedUser._id },
          process.env.SECRET_TOKEN
        );

        res.cookie("login-token", loginToken, {
          maxAge: 6 * 60 * 60 * 1000
        });

        res.send("Successful login, hold on to the login-token for future requests.")
      }
    } else {
      return res
        .status(404)
        .send({ errorMessage: "Email or password is wrong" });
    }
  }
});

module.exports = loginRouter;
