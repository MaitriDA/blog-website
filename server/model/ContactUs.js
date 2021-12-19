const mongoose=require('mongoose');

const ContactUsSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false,
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports=mongoose.model("ContactUs",ContactUsSchema);