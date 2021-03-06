const router=require("express").Router();
const Post=require("../model/Post.js");
const fs=require('fs');

//Create new post
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Update post
router.put("/:id",async(req,res)=>{
    console.log(req.body);
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedPost);
                console.log("Update done")
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can update only your posts")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Delete Post
router.delete("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
                const photo=post.photo;
                //const path=`../images/${photo}`;
                const path=`../images/1639217493398None.png`;
                await post.delete();
                if(photo){
                fs.unlink(`images/${photo}`, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                  });
                }
                res.status(200).json("Post deleted");
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(401).json("You can delete only your post.")
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Get post
router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//Get all posts
router.get("/",async(req,res)=>{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username:username})
        }
        else if(catName){
            posts=await Post.find({category:{
                $in:[catName]
            }})
        }
        else{
            posts=await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})
module.exports=router