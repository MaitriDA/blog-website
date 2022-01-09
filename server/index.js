const express=require('express')
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const authRoute=require('./routes/auth.js');
const userRoute=require('./routes/users.js');
const postRoute=require('./routes/posts.js')
const categoryRoute=require('./routes/category.js');
const contactUsRoute=require('./routes/contactus.js');
const multer=require('multer');
const path=require('path');

const app=express();
dotenv.config();

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Server running");
})

app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(
    console.log("Connected to Database")
).catch((err)=>{
    console.log(err)
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});


const upload=multer({storage:storage});
app.post('/server/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})

app.use('/server/auth',authRoute)
app.use('/server/user',userRoute)
app.use('/server/post',postRoute)
app.use('/server/category',categoryRoute)
app.use('/server/contactus',contactUsRoute)

app.use("/",(req,res)=>{})