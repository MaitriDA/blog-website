const router=require("express").Router();
const User=require('../model/User.js');

//Get user
router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports=router