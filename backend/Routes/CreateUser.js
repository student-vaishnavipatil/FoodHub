const express = require('express');
const router=express.Router();
const user=require("../models/user");
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken")
const bcrypt=require('bcryptjs');
const jwtSecret="restarting due to changes"

router.post("/createuser", 
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
  
  body('password').isLength({ min: 5 }),async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const salt=await bcrypt.genSalt(10);
let secPassword=await bcrypt.hash(req.body.password,salt)

    try{
        
    await user.create({
        name:req.body.name,
        email:req.body.email,
        password:secPassword,
        location:req.body.location,

    })
    res.json({success:true})
    }catch(err){
        res.status(400).json({message:err.message});
        res.json({success:false});
    }
})



//LOGIN ROUTERS
router.post("/loginuser", 
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),async (req,res)=>{
 
  let email=req.body.email;
  
  try{
    let userData=await user.findOne({email});
    if(!userData){
        return res.status(400).json({message:"User not found"});
    }
    const pwdCompare=await bcrypt.compare(req.body.password,userData.password);
    if(!pwdCompare){
       return res.status(400).json({message:"Password incorrect"});
    }

    const data={
      user:{
        id:userData.id
      }
    }
    
    const authToken = jwt.sign(data, jwtSecret);
   return res.json({success:true,authToken:authToken});



  }catch(err){
      res.status(400).json({message:err.message});
      res.json({success:false});
  }
})

module.exports=router;