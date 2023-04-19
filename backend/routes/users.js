var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

const UserModel = require('../models/users.model');

/* GET users listing. */
router.get('/seed', async (req, res) => {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {

  const {id, email, password, name} = req.body;

  if(password.length < 5) {
    console.log("Password must be at least 5 characters");
    return res.status(400).json({msg: "Password must be at least 5 characters"});
  }

  if(!email.includes("@") || !email.includes(".")) {
    console.log("Please enter a valid email address");
    return res.status(400).json({msg: "Please enter a valid email address"});
  } 

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = {
      id,
      email,
      email,
      password: encryptedPassword,
      name,
      isAdmin: false
    }

    const response = await UserModel.create(newUser);
    
    console.log("User created successfully: ", response);
    return res.status(200).send(generateToken(response));
    

  } catch (error) {
    if (error.code === 11000) {
      console.log("User already exists");
      return res.status(400).json({msg: "User already exists"});
    }
    throw error;
  }

});

router.post('/login', async (req, res) => {

  const {email, password} = req.body;

  if(!email || !password) {
    console.log("Please enter all fields");
    return res.status(400).json({msg: "Please enter all fields"});
  }

  if(!email.includes("@") || !email.includes(".")) {
    console.log("Please enter a valid email address");
    return res.status(400).json({msg: "Please enter a valid email address"});
  }

  const user = await UserModel.findOne({email}).lean();

  if(!user) {
    console.log("User does not exist");
    return res.status(400).json({msg: "User does not exist"});
  }

  if(await bcrypt.compare(password, user.password)) {
    console.log("Login successful");
    return res.status(200).send(generateToken(user));

  } else {
    console.log("Incorrect password");
    return res.status(400).json({msg: "Incorrect password"});
  }

});


const generateToken = (user) => {
  const token = jwt.sign({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  }, "Secret", {expiresIn: '2h'});

  user.token = token;
  return user;
}



module.exports = router;
