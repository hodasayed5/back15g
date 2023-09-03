const jwt = require('jsonwebtoken')
const User =require('../models/user')
// const auth = async(req,res,next) => {
// try{
// const token =req.header("Authorization").replace('Bearer' ,'')
// console.log(token)
// const decode = jwt.verify(token,'fatma500')
// console.log(decode)


// const user =await User.findOne({_id:decode._id,tokens:token})
// console.log(user)
// if(!user){
//     throw new Error()
// }
// req.user = user
// req.token = token
// next()
// }
// catch(e){
//     res.status(401).send({error:"please authenticate"})
// }
// }


const bcryptjs = require("bcryptjs");


 const auth = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(
      createError({
        status: 400,
        message: "name, email and password are required",
      })
    );
  }

  try {
    const salt = await bcryptjs.genSalt(8);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json("New user created");
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports= auth;
