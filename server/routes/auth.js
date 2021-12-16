const router=require("express").Router();
const User=require('../model/User.js');
const bcrypt=require('bcrypt');

//Register
router.post("/register",async (req,res)=>{
    try{
        var user=await User.findOne({email:req.body.email})
        if(user){
            res.status({message:"Email Already Registered"})
            console.log("Email Already Registered");
        }
        user=await User.findOne({username:req.body.username})
        if(user){
            res.status({message:"Username Already Existing"})
            console.log("Username Already Existing");
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(req.body.password,salt);
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        user=await newUser.save();
        res.status(200).json({message:"Registration Successful"})
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//Login
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({message:"Invalid Credential"});
        }
        const validate=await bcrypt.compare(req.body.password,user.password);
        if(!validate){
            res.status(400).json({message:"Invalid Credential"});
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err)
    }
})
module.exports=router