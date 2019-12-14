const express = require("express");
const registerRouter = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const Authentication = require("../models/Authentication");

const registerValidationSchema = require("../models/validations/registerValidationSchema");

registerRouter.post("/register", async (req, res) => {
  console.log(req.body);
  // console.log(req.headers);

  const { error, value } = registerValidationSchema.validate({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirmpassword
  });

  console.log(req.body.username)

  if (error) {
    
    return res.status(400).json(error.details[0].message);
  
  } else {
  
    //   check if user already is registered
    const emailExist = await Authentication.findOne({
      email: req.body.email
    });

    if (emailExist)
      return res.status(400).json({message: "The Email you entered already exists"});
      // return res.send("The Email or username you entered already exists");

    const usernameExist = await Authentication.findOne({
      username: req.body.username
    });
    if (usernameExist) {

      return res.status(400).send({message: "The username you entered already exists"})
    }

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new Authentication({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });

    try {
      const savedUser = await user.save();
      console.log("reached account creation in DB")
      res.json({
        // render login page here, with a message for successful account creation
        username: user.username,
        email: user.email,
        message:
          "Your account has been successfully created. You can log In now !"
      });
      
    } catch (err) {
      // res.status(400).send(err);
      res.send(err);
    }
  }
}
);


module.exports = registerRouter;
