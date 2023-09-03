const express = require('express')
const User = require('../models/user')
const auth =require('../middleware/auth')
const router = express.Router()
const bcryptjs = require('bcryptjs')
////////////////////////////////LEC 11 ////////////////////////////////////////////////////

////////////////////////post///////////////////////////////////
router.post('/users',(req,res)=>{
console.log(req.body)
const user = new User (req.body)
user.save()
.then((user) => {res.status(200).send(user)})
.catch((e)=>{res.status(400).send(e)})
})
////////////////////////get all//////////////////////////////////

router.get('/gets'
,(req ,res) =>{
User.find({})
.then((get) => {res.status(200).send(get)})
.catch((e)=>{res.status(400).send(e)})
})
//////////////////////////get one/////////////////////////////////
router.get('/gets/:id',(req ,res) =>{
const _id = req.params.id
User.findById(_id)
.then((user) => { 
if(!user) {
return res.status(404).send('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
}  
res.status(200).send(user)})
.catch((e)=>{res.status(500).send(e)})  
})
///////////////////////////patch    then///////////////////////////////
// router.patch('/patch/:id' , (req , res) =>{
// const _id = req.params.id
// const user= User.findByIdAndUpdate(_id , req.body ,{
//     new : true,
//     runValidators:true
// })
// .then((user) => { 
//     if(!user) {
//     return res.status(404).send('errrrrrrrrrhfgdgerterfdrrrrrrrrrrrrrrrrrrrrrrr')
//     }  
//     res.status(200).send(user)})
//     .catch((e)=>{res.status(500).send(e)})  
// })
////////////////////////patch    async///////////////////////////////////////////////////
// router.patch('/patch/:id' , async(req , res) =>{
// try{
// const _id = req.params.id
// const user= await User.findByIdAndUpdate(_id , req.body ,{
// new : true,
// runValidators:true
// })
// if(!user) {
// return res.status(404).send('errrrrrrrrrhfgdgerterfdrrrrrrrrrrrrrrrrrrrrrrr')
// }  
// res.status(200).send(user)}
// catch(e){res.status(500).send(e)} 
// })
///////////////////////////////delet///////////////////////////////////////////////
router.delete('/delet/:id' ,(req , res) =>{
const _id = req.params.id
const user =User.findByIdAndDelete(_id)
.then((user) =>{
    if(!user) {
        return res.status(404).send('errrrrrrrrrhffffffffffffffffffffffffffffffdrrrrrrrrrrrrrrrrrrrrrrr')
        }  
        res.status(200).send(user)})
        .catch((e)=>{res.status(500).send(e)})  

    
})
//////////////////////////////////////LEC 12//////////////////////////////////////////////////////////
router.patch('/patch/:id' , async(req , res) =>{
try{
 const update = Object.keys(req.body)  
const _id = req.params.id
const user= await User.findById(_id)
if(!user) {
return res.status(404).send('errrrrrrrrrhfgdgerterfdrrrrrrrrrrrrrrrrrrrrrrr')
}  

update.forEach((e)=>(user[e]= req.body[e]))
await user.save()
res.status(200).send(user)}
catch(e){res.status(500).send(e)} 
})
///////////////////////////////////////      LEC 13      /////////////////////////////////////////////////////////

// ///////////////////////////////////       LOGIN   /////////////////////////////////////////////////

// router.post('/register', async (req, res) => {
//     if (!req.body.username || !req.body.email || !req.body.password) {
//       return res.status(400).send('errrrrrrrrrhfgdgerterfd')
//     }
  
//     try {
//       const salt = await bcryptjs.genSalt(8);
//       const hashedPassword = await bcryptjs.hash(req.body.password, salt);
  
//       const newUser = new User({
//         name: req.body.username,
//         email: req.body.email,
//         password: hashedPassword,
//       });
//       await newUser.save();
//       return res.status(201).json("New user created");
//     } catch (err) {
//       console.log(err);

//     }
//   });




//   router.post('/register', async (req, res) => {
//   const {username , password} = req.body
// const admin =await User.findOne({username})
// if(admin){

//  return res.json({message : " errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"})}
// const hashedPassword =  bcryptjs.hash(password , 10);


// const newUser = new User({username, password : hashedPassword});


// await newUser.save();

// return res.json({message:"okkkkkkkkkkkkkkky"})
 
//   })



















router.post('/register', async (req,res)=>{
   try{
    const user = await User.findByCredentials(req.body.email , req.body.password)
    // const token=await user.generateToken()
    res.status(200).send({user})
   }
   catch(e){
    res.status(400).send(e.message)
   }})

//    //////////////////////////////////////////     token         ///////////////////////////////////////////////////////
router.post('/token', async (req,res)=>{
    try{
     const user = new User(req.body)
     const token=await user.generateToken()
     await user.save()
     res.status(200).send({user,token})
    }
    catch(e){
     res.status(400).send(e)
    }})



module.exports = router
