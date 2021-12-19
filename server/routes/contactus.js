const router=require("express").Router();
const ContactUs=require("../model/ContactUs");
const fs=require('fs');

//Create new post
router.post("/",async(req,res)=>{
    console.log(req.body);
    const newContact=new ContactUs(req.body);
    try{
        const savedContact=await newContact.save();
        res.status(200).json(savedContact);
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports=router